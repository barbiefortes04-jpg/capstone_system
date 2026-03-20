<main class="content">
    @if(($sectionTitle ?? '') !== 'Advisor Feedback')
        <section class="hero">
            <h1>{{ $sectionTitle ?? 'Student Workspace' }}</h1>
            @if(!empty($sectionSubtitle ?? '') || !empty($sectionItems ?? []))
                <div class="todo">
                    <h2>{{ $sectionSubtitle ?? 'Section Overview' }}</h2>
                    <ul>
                        @foreach(($sectionItems ?? []) as $item)
                            <li>{{ $item }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </section>
    @endif

    <section class="main-grid">
        <div class="panel">
            @if(($sectionTitle ?? '') === 'Manuscript Drafts')
                <section class="draft-submit-block" style="margin-bottom: 12px;">
                    <h2>Submit Thesis Draft</h2>

                    @if(session('submit_success'))
                        <div class="submit-success">{{ session('submit_success') }}</div>
                    @endif

                    @if ($errors->any())
                        <div class="teacher-form-errors" style="margin-bottom: 10px;">
                            @foreach ($errors->all() as $error)
                                <div>{{ $error }}</div>
                            @endforeach
                        </div>
                    @endif

                    <form method="POST" action="/student/workspace/drafts/submit" enctype="multipart/form-data" class="teacher-form">
                        @csrf
                        <label class="teacher-form-label" for="thesis_title">Thesis Title</label>
                        <input class="teacher-form-input" id="thesis_title" name="thesis_title" type="text" value="{{ old('thesis_title') }}" placeholder="Enter full manuscript title" required>

                        <label class="teacher-form-label" for="thesis_file">Upload Draft File (PDF/DOC/DOCX)</label>
                        <input class="teacher-form-input" id="thesis_file" name="thesis_file" type="file" accept=".pdf,.doc,.docx" required>

                        <label class="teacher-form-label" for="submission_notes">Revision Notes (optional)</label>
                        <textarea class="teacher-form-input teacher-form-textarea" id="submission_notes" name="submission_notes" placeholder="Write what changed in this version...">{{ old('submission_notes') }}</textarea>

                        <button class="action-btn" type="submit">Submit for Adviser Review</button>
                    </form>
                </section>

                <h2>Details</h2>
                <div class="note" style="margin-bottom: 10px;">Consolidated adviser instructions on what to revise, change, update, and add in your thesis manuscript.</div>

                @if(!empty($teacherFeedback ?? []))
                    <h2>Teacher Feedback Feed</h2>
                @endif

                <div class="teacher-feed">
                    @foreach($teacherFeedback as $feedback)
                        <article class="teacher-feed-item">
                            <div class="teacher-feed-top">
                                <strong>{{ $feedback['chapter'] }}</strong>
                                <span class="teacher-feed-badge">{{ $feedback['action'] }}</span>
                            </div>
                            <p class="teacher-feed-request">{{ $feedback['request'] }}</p>
                            <div class="teacher-feed-meta">
                                <span>{{ $feedback['teacher'] }}</span>
                                <span>{{ $feedback['updatedAt'] }}</span>
                            </div>
                        </article>
                    @endforeach
                </div>
            @elseif(($sectionTitle ?? '') === 'Advisor Feedback')
                <h2>Checked Thesis Files</h2>
                <div class="submission-list">
                    @forelse(($thesisSubmissions ?? []) as $submission)
                        <article class="submission-item">
                            <div class="submission-top">
                                <strong>{{ $submission['title'] }}</strong>
                                @if(($loop->first ?? false) && ($adviserCheckedLatest ?? false))
                                    <span class="teacher-feed-badge">Checked by adviser</span>
                                @else
                                    <span class="teacher-feed-badge">{{ $submission['status'] }}</span>
                                @endif
                            </div>
                            <p class="submission-file">File: {{ $submission['fileName'] }}</p>
                            @if(!empty($submission['notes']))
                                <p class="submission-notes">{{ $submission['notes'] }}</p>
                            @endif
                            <div class="teacher-feed-meta">
                                <span>Submitted</span>
                                <span>{{ $submission['submittedAt'] }}</span>
                            </div>
                        </article>
                    @empty
                        <div class="note">No thesis file submitted yet.</div>
                    @endforelse
                </div>
            @else
                <h2>Details</h2>
                <div class="note">{{ $sectionDescription ?? 'No details available.' }}</div>
            @endif
        </div>

        <div class="panel">
            @if(($sectionTitle ?? '') === 'Manuscript Drafts')
                <h2>Revision Versions & Timestamps</h2>
                <div class="submission-list">
                    @forelse(($thesisSubmissions ?? []) as $submission)
                        <article class="submission-item">
                            <div class="submission-top">
                                <strong>{{ $submission['title'] }}</strong>
                                <span class="teacher-feed-badge">{{ $submission['status'] }}</span>
                            </div>
                            <p class="submission-file">File: {{ $submission['fileName'] }}</p>
                            @if(!empty($submission['notes']))
                                <p class="submission-notes">{{ $submission['notes'] }}</p>
                            @endif
                            <div class="teacher-feed-meta">
                                <span>Version saved</span>
                                <span>{{ $submission['submittedAt'] }}</span>
                            </div>
                        </article>
                    @empty
                        <div class="note">No thesis submission yet. Upload your first draft now.</div>
                    @endforelse
                </div>
            @elseif(($sectionTitle ?? '') === 'Advisor Feedback')
                <h2>Adviser Review Comments</h2>
                <div class="teacher-feed">
                    @forelse(($teacherFeedback ?? []) as $feedback)
                        <article class="teacher-feed-item">
                            <div class="teacher-feed-top">
                                <strong>{{ $feedback['chapter'] }}</strong>
                                <span class="teacher-feed-badge">{{ $feedback['action'] }}</span>
                            </div>
                            <p class="teacher-feed-request">{{ $feedback['request'] }}</p>
                            <div class="teacher-feed-meta">
                                <span>{{ $feedback['teacher'] }}</span>
                                <span>{{ $feedback['updatedAt'] }}</span>
                            </div>
                        </article>
                    @empty
                        <div class="note">No adviser comments posted yet for your submissions.</div>
                    @endforelse
                </div>
            @endif

            
        </div>
    </section>
</main>
