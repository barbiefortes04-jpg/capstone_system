@php
    $teacherName = 'Professor';

    if (!empty($user['email'] ?? '')) {
        $local = explode('@', (string) $user['email'])[0] ?? '';
        $local = str_replace(['.', '_', '-'], ' ', $local);
        $teacherName = ucwords(trim($local));
    }

    $stats = $stats ?? ['pendingReviews' => 0, 'activeGroups' => 0, 'upcomingDefenses' => 0];
    $pendingQueue = $pendingQueue ?? [];
    $adviseeRoster = $adviseeRoster ?? [];
    $defenseEvents = $defenseEvents ?? [];
    $facultyToolkit = $facultyToolkit ?? [];
@endphp

<main class="content teacher-command">
    <section class="teacher-hero">
        <h1>Good morning, Prof. {{ $teacherName }}. Here is your advisory overview.</h1>
        <div class="teacher-kpi-grid">
            <article class="teacher-kpi-card is-alert">
                <div class="teacher-kpi-label">Pending Reviews</div>
                <div class="teacher-kpi-value">{{ $stats['pendingReviews'] }}</div>
            </article>
            <article class="teacher-kpi-card">
                <div class="teacher-kpi-label">Active Research Groups</div>
                <div class="teacher-kpi-value">{{ $stats['activeGroups'] }} Groups</div>
            </article>
            <article class="teacher-kpi-card">
                <div class="teacher-kpi-label">Upcoming Defenses</div>
                <div class="teacher-kpi-value">{{ $stats['upcomingDefenses'] }} This Week</div>
            </article>
        </div>
    </section>

    <section class="main-grid teacher-grid">
        <div class="teacher-main-column">
            <section class="panel teacher-panel">
                <h2>Awaiting Your Review</h2>
                <div class="teacher-queue-list">
                    @forelse($pendingQueue as $entry)
                        <article class="teacher-queue-item">
                            <div>
                                <h3>{{ $entry['group'] }}</h3>
                                <p class="teacher-queue-doc">{{ $entry['document'] }}</p>
                                <p class="teacher-queue-meta">Lead: {{ $entry['lead'] }} • {{ $entry['submitted'] }}</p>
                            </div>
                            <a class="teacher-review-btn" href="/teacher/pending-reviews?student_email={{ urlencode($entry['studentEmail']) }}">Review &amp; Comment</a>
                        </article>
                    @empty
                        <div class="note">No pending document reviews right now.</div>
                    @endforelse
                </div>
            </section>

            <section class="panel teacher-panel">
                <h2>Advisee Progress Tracker</h2>
                <div class="teacher-roster-grid">
                    @foreach($adviseeRoster as $row)
                        @php
                            $statusClass = match ($row['status']) {
                                'On Track' => 'is-green',
                                'Revisions Needed' => 'is-yellow',
                                default => 'is-red',
                            };
                        @endphp
                        <article class="teacher-roster-item">
                            <div class="teacher-roster-top">
                                <h3>{{ $row['group'] }}</h3>
                                <span class="teacher-status-badge {{ $statusClass }}">{{ $row['status'] }}</span>
                            </div>
                            <p class="teacher-roster-stage">Milestone: {{ $row['milestone'] }}</p>
                            <div class="teacher-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{ $row['progress'] }}">
                                <div class="teacher-progress-fill" style="width: {{ $row['progress'] }}%;"></div>
                            </div>
                            <div class="teacher-roster-foot">
                                <span>{{ $row['progress'] }}% complete</span>
                                <a class="teacher-message-btn" href="mailto:{{ $row['email'] }}" title="Send message" aria-label="Send message">✉</a>
                            </div>
                        </article>
                    @endforeach
                </div>
            </section>
        </div>

        <aside class="teacher-side-column">
            <section class="panel teacher-panel">
                <h2>Defense Schedule Timeline</h2>
                <div class="teacher-timeline">
                    @forelse($defenseEvents as $event)
                        <article class="teacher-event-item">
                            <div class="teacher-event-date">{{ $event['date'] }} • {{ $event['time'] }}</div>
                            <div class="teacher-event-group">{{ $event['group'] }}</div>
                            <div class="teacher-event-meta">{{ $event['location'] }}</div>
                            <span class="teacher-role-tag">{{ $event['role'] }}</span>
                        </article>
                    @empty
                        <div class="note">No defense events scheduled yet.</div>
                    @endforelse
                </div>
            </section>

            <section class="panel teacher-panel">
                <h2>Faculty Toolkit</h2>
                <div class="teacher-toolkit">
                    @foreach($facultyToolkit as $tool)
                        <a class="teacher-tool-link" href="{{ $tool['href'] }}">
                            <span class="teacher-tool-icon">◻</span>
                            <span>{{ $tool['label'] }}</span>
                        </a>
                    @endforeach
                </div>
            </section>

            <form method="POST" action="/logout">
                @csrf
                <button class="logout" type="submit">Log Out</button>
            </form>
        </aside>
    </section>
</main>
