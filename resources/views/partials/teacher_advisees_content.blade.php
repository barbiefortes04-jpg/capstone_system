@php
    $groups = $adviseeGroups ?? [];
    $tracks = collect($groups)->pluck('track')->unique()->sort()->values()->all();
    $years = collect($groups)->pluck('academicYear')->unique()->sortDesc()->values()->all();

    $statusMap = [
        'On Track' => 'On Track',
        'Warning' => 'Warning',
        'Lagging' => 'Lagging',
    ];
@endphp

<main class="content teacher-advisees-page">
    <section class="hero teacher-advisees-hero">
        <h1>My Advisees</h1>
        <p class="teacher-advisees-subtitle">Student and track-based advisee listing</p>
        <div class="teacher-advisees-toolbar">
            <div class="teacher-advisees-filters" id="adviseeFilters">
                <select id="filterTrack" class="thesis-filter">
                    <option value="">Filter by Track</option>
                    @foreach($tracks as $track)
                        <option value="{{ $track }}">{{ $track }}</option>
                    @endforeach
                </select>

                <select id="filterStatus" class="thesis-filter">
                    <option value="">Filter by Status</option>
                    @foreach($statusMap as $value => $label)
                        <option value="{{ $value }}">{{ $label }}</option>
                    @endforeach
                </select>

                <select id="filterYear" class="thesis-filter">
                    <option value="">Filter by Academic Year</option>
                    @foreach($years as $year)
                        <option value="{{ $year }}">{{ $year }}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </section>

    <section class="teacher-advisees-grid" id="adviseeRoster">
        @if(empty($groups))
            <div class="note">No student added yet.</div>
        @else
        @foreach($groups as $group)
            @php
                $statusClass = match ($group['status']) {
                    'On Track' => 'is-green',
                    'Warning' => 'is-yellow',
                    default => 'is-red',
                };

                $trackClass = match ($group['track']) {
                    'Web Development' => 'is-web',
                    'AI' => 'is-data',
                    default => 'is-web',
                };

                $messageUrl = 'mailto:' . implode(',', $group['messageEmails'] ?? [])
                    . '?subject=' . rawurlencode('Capstone Reminder: ' . ($group['projectTitle'] ?? 'Advisee Group'));
            @endphp
            <details
                class="teacher-advisee-row"
                data-track="{{ $group['track'] }}"
                data-status="{{ $group['status'] }}"
                data-year="{{ $group['academicYear'] }}"
                {{ $loop->first ? 'open' : '' }}
            >
                <summary class="teacher-advisee-summary">
                    <div class="teacher-advisee-col teacher-col-project">
                        <h2>{{ $group['projectTitle'] }}</h2>
                        <div class="teacher-advisee-top-tags">
                            <span class="track-pill {{ $trackClass }}">{{ $group['track'] }}</span>
                            <span class="track-pill is-year">{{ $group['academicYear'] }}</span>
                        </div>
                    </div>

                    <div class="teacher-advisee-col teacher-col-phase">
                        <span class="teacher-row-label">Phase</span>
                        <strong>{{ $group['phase'] }}</strong>
                    </div>

                    <div class="teacher-advisee-col teacher-col-progress">
                        <div class="teacher-advisee-progress-wrap">
                            <div class="teacher-advisee-progress-head">
                                <span>Progress</span>
                                <span>{{ $group['progress'] }}%</span>
                            </div>
                            <div class="teacher-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{ $group['progress'] }}">
                                <div class="teacher-progress-fill" style="width: {{ $group['progress'] }}%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="teacher-advisee-col teacher-col-status">
                        <span class="teacher-status-badge {{ $statusClass }}">{{ $group['statusEmoji'] }} {{ $group['status'] }}</span>
                        <span class="teacher-last-update">{{ $group['lastUpdate'] }}</span>
                    </div>

                    <span class="teacher-accordion-hint">Files ▾</span>
                </summary>

                <div class="teacher-advisee-drawer">
                    <div class="teacher-file-list">
                        <h3>Research Files</h3>
                        @forelse(($group['researchFiles'] ?? []) as $file)
                            <article class="teacher-file-tile">
                                <div class="teacher-file-tile-top">
                                    <span class="teacher-file-badge">Research File</span>
                                    <a class="teacher-file-view" href="{{ $file['viewUrl'] }}" target="_blank" rel="noopener">View PDF</a>
                                </div>
                                <h4 class="teacher-file-title">{{ $file['name'] }}</h4>
                                <p class="teacher-file-submeta">{{ $file['uploadedAt'] }}</p>
                                <div class="teacher-file-tile-actions">
                                    <a href="{{ $file['viewUrl'] }}" target="_blank" rel="noopener">Open</a>
                                    <a href="{{ $file['downloadUrl'] }}">Download</a>
                                </div>
                            </article>
                        @empty
                            <div class="note">No uploaded research files yet.</div>
                        @endforelse
                    </div>

                    <div class="teacher-advisee-progress-head">
                        <span>Quick Actions</span>
                    </div>
                    <div class="teacher-advisee-actions">
                        <a href="{{ $group['manuscriptUrl'] }}" title="View Manuscript" aria-label="View Manuscript">📄</a>
                        <a href="{{ $group['systemUrl'] }}" target="_blank" rel="noopener" title="View System or Code" aria-label="View System or Code">🔗</a>
                        <a href="{{ $messageUrl }}" title="Message Group" aria-label="Message Group">💬</a>
                    </div>
                </div>
            </details>
        @endforeach
        @endif
    </section>

    <div class="note" id="adviseeEmpty" style="display:none;">No advisee groups match the selected filters.</div>
</main>

<script>
    (function () {
        const track = document.getElementById('filterTrack');
        const status = document.getElementById('filterStatus');
        const year = document.getElementById('filterYear');
        const cards = Array.from(document.querySelectorAll('.teacher-advisee-row'));
        const empty = document.getElementById('adviseeEmpty');

        if (!track || !status || !year || cards.length === 0 || !empty) {
            return;
        }

        const applyFilters = () => {
            const trackValue = track.value;
            const statusValue = status.value;
            const yearValue = year.value;
            let visible = 0;

            cards.forEach((card) => {
                const trackPass = !trackValue || card.dataset.track === trackValue;
                const statusPass = !statusValue || card.dataset.status === statusValue;
                const yearPass = !yearValue || card.dataset.year === yearValue;
                const show = trackPass && statusPass && yearPass;

                card.style.display = show ? '' : 'none';
                if (show) {
                    visible += 1;
                }
            });

            empty.style.display = visible === 0 ? '' : 'none';
        };

        track.addEventListener('change', applyFilters);
        status.addEventListener('change', applyFilters);
        year.addEventListener('change', applyFilters);
    })();
</script>
