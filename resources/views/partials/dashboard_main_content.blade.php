@php
    $thesisDocuments = [
        [
            'fileKey' => 'smart-barangay-queueing',
            'title' => 'Smart Barangay Queueing with Predictive Wait-Time Models',
            'authors' => 'J. Dela Cruz, A. Santos',
            'adviser' => 'Prof. M. Reyes',
            'year' => 2025,
            'track' => 'Web Development',
            'abstract' => 'A lightweight municipal queue system that predicts service delays using historical patterns.',
        ],
        [
            'fileKey' => 'iot-greenhouse-monitoring',
            'title' => 'IoT Greenhouse Monitoring for Urban Campuses',
            'authors' => 'C. Lim, V. Flores',
            'adviser' => 'Mr. P. Cruz',
            'year' => 2024,
            'track' => 'AI',
            'abstract' => 'Sensor-driven greenhouse analytics with adaptive watering and dashboard reporting.',
        ],
        [
            'fileKey' => 'campus-mobility-heatmap',
            'title' => 'Campus Mobility Heatmap and Shuttle Optimization',
            'authors' => 'R. Tan, K. Ramos',
            'adviser' => 'Prof. M. Reyes',
            'year' => 2025,
            'track' => 'AI',
            'abstract' => 'Route optimization model for student transport accessibility and reduced waiting time.',
        ],
        [
            'fileKey' => 'secure-student-credential-verification',
            'title' => 'Secure Student Credential Verification with QR Audit Trails',
            'authors' => 'D. Herrera, J. Aquino',
            'adviser' => 'Ms. L. Navarro',
            'year' => 2023,
            'track' => 'Web Development',
            'abstract' => 'Document verification with tamper-evident logs for institutional validation flows.',
        ],
        [
            'fileKey' => 'adaptive-lms-recommendation-engine',
            'title' => 'Adaptive LMS Recommendation Engine for Capstone Advising',
            'authors' => 'M. Salvador, T. Ong',
            'adviser' => 'Prof. E. Villanueva',
            'year' => 2026,
            'track' => 'AI',
            'abstract' => 'Recommendation modeling for adviser-led capstone intervention and content matching.',
        ],
        [
            'fileKey' => 'flood-alert-mapping-sms',
            'title' => 'Flood Alert Mapping and SMS Notification for Community Response',
            'authors' => 'N. Rivera, A. Castillo',
            'adviser' => 'Mr. P. Cruz',
            'year' => 2026,
            'track' => 'AI',
            'abstract' => 'Emergency response prototype with geospatial risk mapping and alert distribution.',
        ],
        [
            'fileKey' => 'cost-aware-cloud-lab-deployment',
            'title' => 'Cost-Aware Cloud Lab Deployment for Computing Courses',
            'authors' => 'G. Soriano, E. Domingo',
            'adviser' => 'Ms. L. Navarro',
            'year' => 2024,
            'track' => 'Web Development',
            'abstract' => 'Cloud allocation strategy for academic labs with scalable student access.',
        ],
        [
            'fileKey' => 'learning-outcome-predictor-rubric',
            'title' => 'Learning Outcome Predictor using Rubric Features',
            'authors' => 'B. Torres, S. David',
            'adviser' => 'Prof. E. Villanueva',
            'year' => 2025,
            'track' => 'AI',
            'abstract' => 'Predictive model trained on rubric vectors for academic intervention planning.',
        ],
    ];

    $thesisDocuments = array_map(static function (array $item): array {
        $fileKey = (string) ($item['fileKey'] ?? '');
        $base = '/student/site-thesis/file/' . rawurlencode($fileKey);
        $item['viewUrl'] = $base . '?mode=view';
        $item['downloadUrl'] = $base . '?mode=download';
        $item['available'] = is_file(storage_path('app/thesis-library/' . $fileKey . '.pdf'));

        return $item;
    }, $thesisDocuments);

    $bookmarkStorageKey = 'srms_bookmarks_' . md5(strtolower((string) ($user['email'] ?? 'guest')));
    $openedStorageKey = 'srms_opened_files_' . md5(strtolower((string) ($user['email'] ?? 'guest')));
@endphp

<main class="content">
    <section class="hero">
        <h1>Welcome back. Here is your capstone progress.</h1>

        <div class="timeline">
            <div class="phase">Title Proposal</div>
            <div class="phase">Research Planning</div>
            <div class="phase current">System Development</div>
        </div>

        <div class="todo">
            <h2>Immediate Academic To-Do</h2>
            <ul>
                <li>Revise Chapter 2 literature synthesis</li>
                <li>Awaiting advisor approval on methodology</li>
                <li>Submit conceptual framework draft</li>
            </ul>
        </div>
    </section>

    <section class="main-grid">
        <div class="panel">
            <h2>Library: Department Showcases</h2>

            <section class="thesis-browser" id="thesisBrowser">
                <div class="thesis-controls-scroll">
                    <div class="thesis-controls-row">
                        <div class="thesis-search-wrap">
                            <span class="thesis-search-icon">🔎</span>
                            <input id="thesisSearch" class="thesis-search" type="text" placeholder="Search thesis titles, keywords, or abstracts...">
                        </div>

                        <select id="thesisYear" class="thesis-filter">
                            <option value="">Year</option>
                        </select>

                        <select id="thesisAdviser" class="thesis-filter">
                            <option value="">Teacher / Adviser</option>
                        </select>

                        <select id="thesisTrack" class="thesis-filter">
                            <option value="">Program / Track</option>
                            <option value="Web Development">Web Development</option>
                            <option value="AI">AI</option>
                        </select>

                        <div class="thesis-view-toggle" role="group" aria-label="View mode">
                            <button class="thesis-view-btn active" id="gridViewBtn" type="button" title="Grid View">▦</button>
                            <button class="thesis-view-btn" id="listViewBtn" type="button" title="List View">☰</button>
                        </div>
                    </div>
                </div>

                <div id="activeFilterTags" class="active-filter-tags"></div>

                <div id="thesisGrid" class="thesis-grid"></div>

                <div id="thesisList" class="thesis-list" hidden>
                    <table class="thesis-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Authors</th>
                                <th>Adviser</th>
                                <th>Track</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="thesisListBody"></tbody>
                    </table>
                </div>

                <div class="thesis-pagination" id="thesisPagination"></div>
            </section>

        </div>

        <div class="panel">
            <h2>My Desk: Manuscripts</h2>
            <div class="workspace-drop">
                Drag and drop PDF drafts, source code links, and references here.
            </div>

            <h2>Advisor Feedback</h2>
            <div class="feedback-list">
                <div class="note">Please tighten Chapter 3 sampling explanation.<div class="tag">Needs Revision</div></div>
                <div class="note">Approved conceptual framework with minor edits.<div class="tag">Approved</div></div>
                <div class="note">Add citation for related local implementation study.<div class="tag">Action Required</div></div>
            </div>

            <h2 style="margin-top: 14px;">Bookmarked Literature</h2>
            <div class="bookmarks" id="bookmarksList"></div>

            
        </div>
    </section>
</main>

<script>
    (function () {
        const thesisData = @json($thesisDocuments);
        const bookmarkStorageKey = @json($bookmarkStorageKey);
        const openedStorageKey = @json($openedStorageKey);

        const searchInput = document.getElementById('thesisSearch');
        const yearSelect = document.getElementById('thesisYear');
        const adviserSelect = document.getElementById('thesisAdviser');
        const trackSelect = document.getElementById('thesisTrack');
        const gridViewBtn = document.getElementById('gridViewBtn');
        const listViewBtn = document.getElementById('listViewBtn');
        const tagsWrap = document.getElementById('activeFilterTags');
        const gridWrap = document.getElementById('thesisGrid');
        const listWrap = document.getElementById('thesisList');
        const listBody = document.getElementById('thesisListBody');
        const paginationWrap = document.getElementById('thesisPagination');
        const bookmarksWrap = document.getElementById('bookmarksList');

        if (!searchInput || !yearSelect || !adviserSelect || !trackSelect || !gridWrap || !listBody || !paginationWrap || !bookmarksWrap) {
            return;
        }

        const savedKeys = (() => {
            try {
                const raw = localStorage.getItem(bookmarkStorageKey);
                const parsed = raw ? JSON.parse(raw) : [];
                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                return [];
            }
        })();

        const bookmarkedKeys = new Set(savedKeys);
        const openedKeys = (() => {
            try {
                const raw = localStorage.getItem(openedStorageKey);
                const parsed = raw ? JSON.parse(raw) : [];
                return new Set(Array.isArray(parsed) ? parsed : []);
            } catch (error) {
                return new Set();
            }
        })();

        const state = {
            q: '',
            year: '',
            adviser: '',
            track: '',
            view: 'grid',
            page: 1,
            perPage: 6,
        };

        const persistBookmarks = () => {
            localStorage.setItem(bookmarkStorageKey, JSON.stringify([...bookmarkedKeys]));
        };

        const persistOpened = () => {
            localStorage.setItem(openedStorageKey, JSON.stringify([...openedKeys]));
        };

        const hasOpened = (fileKey) => openedKeys.has(fileKey);

        const isBookmarked = (fileKey) => bookmarkedKeys.has(fileKey);

        const bookmarkLabel = (fileKey) => (isBookmarked(fileKey) ? 'Bookmarked' : 'Bookmark');
        const bookmarkIcon = (fileKey) => {
            const activeClass = isBookmarked(fileKey) ? 'is-active' : '';
            return `
                <svg class="bookmark-icon ${activeClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M7 3h10a2 2 0 0 1 2 2v16l-7-4-7 4V5a2 2 0 0 1 2-2z"></path>
                </svg>
            `;
        };

        const escapeHtml = (value) => {
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        };

        const renderBookmarks = () => {
            const marked = thesisData.filter((item) => bookmarkedKeys.has(item.fileKey));

            bookmarksWrap.innerHTML = '';

            if (marked.length === 0) {
                bookmarksWrap.innerHTML = '<div class="note">No bookmarked thesis yet. Use Bookmark on any thesis card.</div>';
                return;
            }

            marked.forEach((item) => {
                const canDownload = item.available && hasOpened(item.fileKey);
                const row = document.createElement('div');
                row.className = 'note bookmark-item';
                row.innerHTML = `
                    <div class="bookmark-item-title">${escapeHtml(item.title)}</div>
                    <div class="tag">${escapeHtml(String(item.year))} · ${escapeHtml(item.track)}</div>
                    <div class="thesis-actions" style="margin-top: 8px; margin-bottom: 0;">
                        ${item.available ? `<a class="thesis-inline-link thesis-open-link" data-file-key="${escapeHtml(item.fileKey)}" href="${item.viewUrl}" target="_blank" rel="noopener">Open</a>` : '<span class="thesis-inline-link is-disabled">File not uploaded</span>'}
                        ${canDownload ? `<a class="thesis-inline-link" href="${item.downloadUrl}">Download</a>` : ''}
                        <button type="button" class="thesis-inline-link thesis-bookmark-btn is-bookmarked" data-file-key="${escapeHtml(item.fileKey)}">Remove</button>
                    </div>
                `;
                bookmarksWrap.appendChild(row);
            });

            bindBookmarkEvents();
        };

        const markOpened = (fileKey) => {
            if (!fileKey) {
                return;
            }

            if (!openedKeys.has(fileKey)) {
                openedKeys.add(fileKey);
                persistOpened();
                render();
                renderBookmarks();
            }
        };

        const toggleBookmark = (fileKey) => {
            if (!fileKey) {
                return;
            }

            if (bookmarkedKeys.has(fileKey)) {
                bookmarkedKeys.delete(fileKey);
            } else {
                bookmarkedKeys.add(fileKey);
            }

            persistBookmarks();
            render();
            renderBookmarks();
        };

        const bindBookmarkEvents = () => {
            document.querySelectorAll('.thesis-bookmark-btn').forEach((button) => {
                button.addEventListener('click', () => {
                    toggleBookmark(button.dataset.fileKey || '');
                });
            });

            document.querySelectorAll('.thesis-open-link').forEach((link) => {
                link.addEventListener('click', () => {
                    markOpened(link.dataset.fileKey || '');
                });
            });
        };

        const uniqueYears = [...new Set(thesisData.map((item) => String(item.year)))].sort((a, b) => Number(b) - Number(a));
        const uniqueAdvisers = [...new Set(thesisData.map((item) => item.adviser))].sort((a, b) => a.localeCompare(b));

        uniqueYears.forEach((year) => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });

        uniqueAdvisers.forEach((name) => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            adviserSelect.appendChild(option);
        });

        const getFiltered = () => {
            return thesisData.filter((item) => {
                const hay = `${item.title} ${item.abstract} ${item.authors} ${item.adviser} ${item.track} ${item.year}`.toLowerCase();
                const qPass = !state.q || hay.includes(state.q.toLowerCase());
                const yearPass = !state.year || String(item.year) === state.year;
                const adviserPass = !state.adviser || item.adviser === state.adviser;
                const trackPass = !state.track || item.track === state.track;
                return qPass && yearPass && adviserPass && trackPass;
            });
        };

        const renderTags = () => {
            const tags = [];
            if (state.year) tags.push({ key: 'year', label: `Year: ${state.year}` });
            if (state.adviser) tags.push({ key: 'adviser', label: `Adviser: ${state.adviser}` });
            if (state.track) tags.push({ key: 'track', label: `Track: ${state.track}` });

            tagsWrap.innerHTML = '';

            tags.forEach((tag) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'filter-tag';
                button.textContent = `${tag.label} ✕`;
                button.addEventListener('click', () => {
                    state[tag.key] = '';
                    if (tag.key === 'year') yearSelect.value = '';
                    if (tag.key === 'adviser') adviserSelect.value = '';
                    if (tag.key === 'track') trackSelect.value = '';
                    state.page = 1;
                    render();
                });
                tagsWrap.appendChild(button);
            });
        };

        const renderPagination = (totalPages) => {
            paginationWrap.innerHTML = '';
            if (totalPages <= 1) return;

            const createBtn = (label, disabled, onClick, active = false) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `pager-btn ${active ? 'active' : ''}`;
                btn.textContent = label;
                btn.disabled = disabled;
                btn.addEventListener('click', onClick);
                return btn;
            };

            paginationWrap.appendChild(createBtn('< Prev', state.page === 1, () => {
                state.page -= 1;
                render();
            }));

            for (let i = 1; i <= totalPages; i += 1) {
                paginationWrap.appendChild(createBtn(String(i), false, () => {
                    state.page = i;
                    render();
                }, i === state.page));
            }

            paginationWrap.appendChild(createBtn('Next >', state.page === totalPages, () => {
                state.page += 1;
                render();
            }));
        };

        const render = () => {
            const filtered = getFiltered();
            const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
            state.page = Math.min(state.page, totalPages);

            const start = (state.page - 1) * state.perPage;
            const pageData = filtered.slice(start, start + state.perPage);

            renderTags();

            const showEmpty = filtered.length === 0;
            paginationWrap.hidden = showEmpty;
            gridWrap.hidden = state.view !== 'grid' || showEmpty;
            listWrap.hidden = state.view !== 'list' || showEmpty;

            gridWrap.innerHTML = '';
            listBody.innerHTML = '';

            pageData.forEach((item) => {
                const titleMarkup = item.available
                    ? `<h3><a class="thesis-title-link thesis-open-link" data-file-key="${item.fileKey}" href="${item.viewUrl}" target="_blank" rel="noopener">${item.title}</a></h3>`
                    : `<h3>${item.title}</h3>`;
                const viewMarkup = item.available
                    ? `<a class="view-pdf-btn thesis-open-link" data-file-key="${item.fileKey}" href="${item.viewUrl}" target="_blank" rel="noopener">View PDF</a>`
                    : '<span class="view-pdf-btn is-disabled">No File Yet</span>';
                const openAction = item.available
                    ? `<a class="thesis-inline-link thesis-open-link" data-file-key="${item.fileKey}" href="${item.viewUrl}" target="_blank" rel="noopener">Open</a>`
                    : '<span class="thesis-inline-link is-disabled">Open</span>';
                const downloadAction = item.available && hasOpened(item.fileKey)
                    ? `<a class="thesis-inline-link" href="${item.downloadUrl}">Download</a>`
                    : '';
                const listTitle = item.available
                    ? `<a class="thesis-title-link thesis-open-link" data-file-key="${item.fileKey}" href="${item.viewUrl}" target="_blank" rel="noopener">${item.title}</a>`
                    : `${item.title}`;
                const listOpenAction = item.available
                    ? `<a class="thesis-inline-link thesis-open-link" data-file-key="${item.fileKey}" href="${item.viewUrl}" target="_blank" rel="noopener">View</a>`
                    : '<span class="thesis-inline-link is-disabled">View</span>';
                const listDownloadAction = item.available && hasOpened(item.fileKey)
                    ? `<a class="thesis-inline-link" href="${item.downloadUrl}">Download</a>`
                    : '';

                const card = document.createElement('article');
                card.className = 'thesis-card';
                card.innerHTML = `
                    <div class="thesis-card-cover">
                        <span class="thesis-track-ribbon">${item.track}</span>
                        ${titleMarkup}
                        ${viewMarkup}
                    </div>
                    <div class="thesis-card-details">
                        <p class="thesis-authors">By: ${item.authors}</p>
                        <p class="thesis-adviser">Adviser: ${item.adviser}</p>
                        <div class="thesis-actions">
                            <div class="thesis-action-links">
                                ${openAction}
                                ${downloadAction}
                            </div>
                            <button
                                type="button"
                                class="thesis-bookmark-btn thesis-bookmark-icon-btn ${isBookmarked(item.fileKey) ? 'is-bookmarked' : ''}"
                                data-file-key="${item.fileKey}"
                                title="${bookmarkLabel(item.fileKey)}"
                                aria-label="${bookmarkLabel(item.fileKey)}"
                            >${bookmarkIcon(item.fileKey)}</button>
                        </div>
                        <div class="thesis-card-footer"><span>${item.year}</span><span>📄</span></div>
                    </div>
                `;
                gridWrap.appendChild(card);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${listTitle}</td>
                    <td>${item.authors}</td>
                    <td>${item.adviser}</td>
                    <td>${item.track}</td>
                    <td>${item.year}</td>
                    <td>
                        ${listOpenAction}
                        ${listDownloadAction ? '<span> · </span>' + listDownloadAction : ''}
                        <span> · </span>
                        <button
                            type="button"
                            class="thesis-bookmark-btn thesis-bookmark-icon-btn ${isBookmarked(item.fileKey) ? 'is-bookmarked' : ''}"
                            data-file-key="${item.fileKey}"
                            title="${bookmarkLabel(item.fileKey)}"
                            aria-label="${bookmarkLabel(item.fileKey)}"
                        >${bookmarkIcon(item.fileKey)}</button>
                    </td>
                `;
                listBody.appendChild(row);
            });

            bindBookmarkEvents();
            gridViewBtn.classList.toggle('active', state.view === 'grid');
            listViewBtn.classList.toggle('active', state.view === 'list');
            renderPagination(totalPages);
        };

        searchInput.addEventListener('input', () => {
            state.q = searchInput.value.trim();
            state.page = 1;
            render();
        });

        yearSelect.addEventListener('change', () => {
            state.year = yearSelect.value;
            state.page = 1;
            render();
        });

        adviserSelect.addEventListener('change', () => {
            state.adviser = adviserSelect.value;
            state.page = 1;
            render();
        });

        trackSelect.addEventListener('change', () => {
            state.track = trackSelect.value;
            state.page = 1;
            render();
        });

        gridViewBtn.addEventListener('click', () => {
            state.view = 'grid';
            render();
        });

        listViewBtn.addEventListener('click', () => {
            state.view = 'list';
            render();
        });

        renderBookmarks();
        render();
    })();
</script>
