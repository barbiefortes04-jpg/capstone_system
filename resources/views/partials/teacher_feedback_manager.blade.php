<main class="content review-shell">
    <header class="review-context-bar">
        <a class="review-back-link" href="/teacher/advisees">← Back to Advisees</a>
        <div class="review-context-center">
            <h1>{{ $groupName ?? 'Teacher Review Interface' }}</h1>
            <p>{{ $documentTitle ?? 'No document selected' }}</p>
        </div>
        <form method="GET" action="/teacher/pending-reviews" class="review-version-form">
            @if(!empty($versionHistory ?? []))
                <input type="hidden" name="student_email" value="{{ $selectedStudent ?? '' }}">
                <select name="submission_id" class="review-version-select" onchange="this.form.submit()">
                    @foreach(($versionHistory ?? []) as $version)
                        <option value="{{ $version['id'] }}" {{ (int) ($selectedSubmissionId ?? 0) === (int) $version['id'] ? 'selected' : '' }}>
                            {{ $version['label'] }}
                        </option>
                    @endforeach
                </select>
            @else
                <details class="review-students-dropdown" open>
                    <summary class="review-version-select review-students-toggle">STUDENTS</summary>
                    <div class="review-students-menu">
                        @if(empty($reviewGroups ?? []))
                            <div class="note">No student added yet.</div>
                        @else
                            @foreach(($reviewGroups ?? []) as $group)
                                <section class="review-students-group">
                                    <h4>{{ $group['label'] }}</h4>
                                    <div class="review-students-list">
                                        @foreach(($group['students'] ?? []) as $student)
                                            @php
                                                $isActive = strtolower((string) ($selectedStudent ?? '')) === strtolower((string) ($student['email'] ?? ''));
                                                $studentUrl = '/teacher/pending-reviews?student_email=' . urlencode((string) ($student['email'] ?? ''));
                                                if (!empty($student['latestSubmissionId'])) {
                                                    $studentUrl .= '&submission_id=' . (int) $student['latestSubmissionId'];
                                                }
                                            @endphp
                                            <a href="{{ $studentUrl }}" class="review-student-row {{ $isActive ? 'active' : '' }}">
                                                <span class="review-student-name">{{ $student['name'] }}</span>
                                            </a>
                                        @endforeach
                                    </div>
                                </section>
                            @endforeach
                        @endif
                    </div>
                </details>
            @endif
        </form>
    </header>

    <section class="review-workspace">
        <section class="review-canvas-area">
            <div class="review-annotation-toolbar" aria-label="Annotation tools">
                <button type="button" title="Highlight Text">🟨</button>
                <button type="button" title="Add Sticky Note">🟦</button>
                <button type="button" title="Strikethrough">🟥</button>
            </div>

            <div class="review-paper-wrap">
                <div class="review-paper-canvas">
                    @if(!empty($documentViewUrl ?? ''))
                        <iframe src="{{ $documentViewUrl }}" title="Submitted document preview"></iframe>
                    @else
                        <div class="review-empty-paper">
                            <h2>No document selected</h2>
                            <p>Select an advisee submission from Pending Reviews to begin annotations.</p>
                        </div>
                    @endif

                    <span class="review-anchor review-anchor-yellow" aria-hidden="true"></span>
                    <span class="review-anchor review-anchor-blue" aria-hidden="true"></span>
                </div>
            </div>
        </section>

        <aside class="review-side-panel">
            <div class="review-tabs" role="tablist" aria-label="Review panel tabs">
                <button type="button" class="review-tab active" data-tab="comments" role="tab" aria-selected="true">Comments</button>
                <button type="button" class="review-tab" data-tab="rubric" role="tab" aria-selected="false">Rubric / Grading</button>
            </div>

            <section class="review-tab-panel active" data-panel="comments" role="tabpanel">
                <div class="review-comment-feed">
                    @forelse(($feedbackLog ?? []) as $feedback)
                        <article class="review-comment-card">
                            <div class="review-comment-head">
                                <span class="review-avatar">{{ strtoupper(substr((string) ($feedback['teacher'] ?? 'T'), 0, 1)) }}</span>
                                <div>
                                    <strong>{{ $feedback['chapter'] }}</strong>
                                    <div class="review-comment-time">{{ $feedback['updatedAt'] }}</div>
                                </div>
                                <span class="teacher-feed-badge">{{ $feedback['action'] }}</span>
                            </div>
                            <p class="review-comment-snippet">Reference: “{{ \Illuminate\Support\Str::limit($feedback['request'], 95) }}”</p>
                            <p class="review-comment-body">{{ $feedback['request'] }}</p>
                        </article>
                    @empty
                        <div class="note">No comments yet for this submission.</div>
                    @endforelse
                </div>

                <form method="POST" action="/teacher/feedback/store" class="teacher-form review-inline-form">
                    @csrf
                    <input type="hidden" name="student_email" value="{{ $selectedStudent ?? '' }}">

                    <label class="teacher-form-label" for="chapter">Chapter / Section</label>
                    <input class="teacher-form-input" id="chapter" name="chapter" type="text" value="{{ old('chapter') }}" placeholder="Chapter 3 - Methodology" required>

                    <label class="teacher-form-label" for="action">Action Type</label>
                    <select class="teacher-form-input" id="action" name="action" required>
                        <option value="">Select action</option>
                        @foreach(['REVISE', 'CHANGE', 'UPDATE', 'ADD'] as $action)
                            <option value="{{ $action }}" {{ old('action') === $action ? 'selected' : '' }}>{{ $action }}</option>
                        @endforeach
                    </select>

                    <label class="teacher-form-label" for="request">Comment</label>
                    <textarea class="teacher-form-input teacher-form-textarea" id="request" name="request" placeholder="Write line-by-line feedback for this document..." required>{{ old('request') }}</textarea>

                    <button class="action-btn" type="submit">Post Comment</button>
                </form>
            </section>

            <section class="review-tab-panel" data-panel="rubric" role="tabpanel" hidden>
                <div class="review-rubric-list">
                    @foreach(['Introduction Clarity', 'System Architecture Diagram', 'Code Quality', 'Testing and Validation'] as $criterion)
                        <details class="review-rubric-item" {{ $loop->first ? 'open' : '' }}>
                            <summary>{{ $criterion }}</summary>
                            <div class="review-score-pills" role="group" aria-label="{{ $criterion }} score">
                                @for($score = 1; $score <= 5; $score++)
                                    <button type="button">{{ $score }}</button>
                                @endfor
                            </div>
                        </details>
                    @endforeach
                </div>
            </section>

            <footer class="review-action-footer">
                <form method="POST" action="/teacher/feedback/store" id="reviewDecisionForm" class="review-decision-form">
                    @csrf
                    <input type="hidden" name="student_email" value="{{ $selectedStudent ?? '' }}">
                    <input type="hidden" name="chapter" value="Final Decision">
                    <input type="hidden" name="action" id="decisionAction" value="REVISE">

                    <label for="decisionRequest" class="teacher-form-label">Overall Remarks</label>
                    <textarea class="teacher-form-input review-remarks" id="decisionRequest" name="request" placeholder="Summarize final comments before returning this submission..." required></textarea>

                    @if ($errors->any())
                        <div class="teacher-form-errors">
                            @foreach ($errors->all() as $error)
                                <div>{{ $error }}</div>
                            @endforeach
                        </div>
                    @endif

                    <div class="review-decision-buttons">
                        <button type="submit" class="review-btn-secondary" data-decision="REVISE">Request Revisions</button>
                        <button type="submit" class="review-btn-primary" data-decision="UPDATE">Approve &amp; Mark as Passed</button>
                    </div>
                </form>
            </footer>
        </aside>
    </section>

    <script>
        (function () {
            const tabButtons = Array.from(document.querySelectorAll('.review-tab'));
            const tabPanels = Array.from(document.querySelectorAll('.review-tab-panel'));
            const decisionButtons = Array.from(document.querySelectorAll('.review-decision-buttons button'));
            const decisionAction = document.getElementById('decisionAction');

            tabButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const selected = button.dataset.tab;

                    tabButtons.forEach((tab) => {
                        const active = tab === button;
                        tab.classList.toggle('active', active);
                        tab.setAttribute('aria-selected', active ? 'true' : 'false');
                    });

                    tabPanels.forEach((panel) => {
                        const active = panel.dataset.panel === selected;
                        panel.classList.toggle('active', active);
                        panel.hidden = !active;
                    });
                });
            });

            decisionButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (decisionAction) {
                        decisionAction.value = button.dataset.decision || 'REVISE';
                    }
                });
            });
        })();
    </script>
</main>
