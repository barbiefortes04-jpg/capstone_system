@php
    $currentPath = request()->path();
    $icon = static fn(string $name): string => match ($name) {
        'home' => '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path></svg>',
        'folder' => '<svg viewBox="0 0 24 24"><path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path></svg>',
        'inbox' => '<svg viewBox="0 0 24 24"><path d="M3 12h5l2 3h4l2-3h5"></path><path d="M4 5h16l1 7v7H3v-7l1-7z"></path></svg>',
        'books' => '<svg viewBox="0 0 24 24"><path d="M4 5h4v14H4z"></path><path d="M10 5h4v14h-4z"></path><path d="M16 5h4v14h-4z"></path></svg>',
        'clip' => '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="17" rx="2"></rect><path d="M9 4.5h6"></path><path d="M9 10h6"></path></svg>',
        'grid' => '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8"></rect><rect x="13" y="3" width="8" height="8"></rect><rect x="3" y="13" width="8" height="8"></rect><rect x="13" y="13" width="8" height="8"></rect></svg>',
        'users' => '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"></circle><circle cx="17" cy="9" r="2.5"></circle><path d="M3 19c1.2-2.7 3.3-4 6-4s4.8 1.3 6 4"></path><path d="M14 19c.7-1.7 2-2.7 4-3"></path></svg>',
        'doc-search' => '<svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"></path><path d="M14 3v5h5"></path><circle cx="11" cy="14" r="2.5"></circle><path d="M13 16l2 2"></path></svg>',
        'calendar' => '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M3 10h18"></path></svg>',
        'star' => '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.2 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.2 6.1-.9z"></path></svg>',
        'chart' => '<svg viewBox="0 0 24 24"><path d="M4 20V4"></path><path d="M4 20h16"></path><path d="M8 16v-4"></path><path d="M12 16V9"></path><path d="M16 16v-7"></path></svg>',
        'shield' => '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.3 8.2-8 9-4.7-.8-8-4-8-9V6z"></path></svg>',
        'database' => '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path></svg>',
        'sliders' => '<svg viewBox="0 0 24 24"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path><circle cx="9" cy="6" r="2"></circle><circle cx="15" cy="12" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>',
        'download-folder' => '<svg viewBox="0 0 24 24"><path d="M3 7h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path><path d="M12 11v5"></path><path d="M10 14l2 2 2-2"></path></svg>',
        default => '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle></svg>',
    };
@endphp

<aside class="sidebar">
    <div class="side-title">NAVIGATION</div>
    <nav class="menu">
        @if(($user['role'] ?? '') === 'STUDENT')
            <a class="menu-item {{ in_array($currentPath, ['dashboard', 'student/site-thesis', 'student/overview', 'student/repository'], true) ? 'active' : '' }}" href="/student/site-thesis">
                <span class="icon">{!! $icon('books') !!}</span>
                <span>SITE THESIS<small>Current phase, next steps, and approved capstones</small></span>
            </a>

            <details class="accordion" {{ str_starts_with($currentPath, 'student/workspace') ? 'open' : '' }}>
                <summary class="accordion-head {{ str_starts_with($currentPath, 'student/workspace') ? 'active' : '' }}">
                    <span class="icon">{!! $icon('folder') !!}</span>
                    <span>My Workspace<small>Drafts, development links, and project assets</small></span>
                </summary>
                <div class="accordion-menu">
                    <a class="submenu-item {{ $currentPath === 'student/workspace/drafts' ? 'active' : '' }}" href="/student/workspace/drafts">Manuscript Drafts</a>
                    <a class="submenu-item {{ $currentPath === 'student/workspace/system-development' ? 'active' : '' }}" href="/student/workspace/system-development">System Development</a>
                </div>
            </details>

            <a class="menu-item {{ $currentPath === 'student/advisor-feedback' ? 'active' : '' }}" href="/student/advisor-feedback">
                <span class="icon">{!! $icon('inbox') !!}</span>
                <span>Advisor Feedback<small>Returned revisions and adviser notes</small></span>
                <span class="dot"></span>
            </a>

            <div class="side-bottom">
                <a class="menu-item {{ $currentPath === 'student/formatting-rubrics' ? 'active' : '' }}" href="/student/formatting-rubrics">
                    <span class="icon">{!! $icon('clip') !!}</span>
                    <span>Formatting & Rubrics<small>School format standards and grading guides</small></span>
                </a>
            </div>
        @elseif(($user['role'] ?? '') === 'TEACHER')
            <a class="menu-item {{ $currentPath === 'teacher/dashboard' ? 'active' : '' }}" href="/teacher/dashboard">
                <span class="icon">{!! $icon('grid') !!}</span>
                <span>Advisor Dashboard<small>Assigned groups and progress overview</small></span>
            </a>

            <details class="accordion" {{ $currentPath === 'teacher/advisees' ? 'open' : '' }}>
                <summary class="accordion-head {{ $currentPath === 'teacher/advisees' ? 'active' : '' }}">
                    <span class="icon">{!! $icon('users') !!}</span>
                    <span>My Advisees<small>Student and track-based advisee listing</small></span>
                </summary>
                <div class="accordion-menu">
                    <a class="submenu-item {{ $currentPath === 'teacher/advisees' ? 'active' : '' }}" href="/teacher/advisees">View Advisee List</a>
                </div>
            </details>

            <a class="menu-item {{ $currentPath === 'teacher/pending-reviews' ? 'active' : '' }}" href="/teacher/pending-reviews">
                <span class="icon">{!! $icon('doc-search') !!}</span>
                <span>Pending Reviews<small>Chapters and system modules for approval</small></span>
                <span class="count-badge">6</span>
            </a>

            <a class="menu-item {{ $currentPath === 'teacher/defense-schedules' ? 'active' : '' }}" href="/teacher/defense-schedules">
                <span class="icon">{!! $icon('calendar') !!}</span>
                <span>Defense Schedules<small>Hearings, demos, and final defense tracking</small></span>
            </a>

            <a class="menu-item {{ $currentPath === 'teacher/approved-publications' ? 'active' : '' }}" href="/teacher/approved-publications">
                <span class="icon">{!! $icon('star') !!}</span>
                <span>Approved Publications<small>Finalized advisee papers in repository</small></span>
            </a>
        @else
            <a class="menu-item {{ $currentPath === 'admin/analytics' ? 'active' : '' }}" href="/admin/analytics">
                <span class="icon">{!! $icon('chart') !!}</span>
                <span>System Analytics<small>Repository growth and submission metrics</small></span>
            </a>

            <a class="menu-item {{ $currentPath === 'admin/user-management' ? 'active' : '' }}" href="/admin/user-management">
                <span class="icon">{!! $icon('shield') !!}</span>
                <span>User Management<small>Role permissions for students, advisers, and panelists</small></span>
            </a>

            <a class="menu-item {{ $currentPath === 'admin/repository-masterlist' ? 'active' : '' }}" href="/admin/repository-masterlist">
                <span class="icon">{!! $icon('database') !!}</span>
                <span>Repository Masterlist<small>Metadata, tags, and publication controls</small></span>
            </a>

            <a class="menu-item {{ $currentPath === 'admin/audit-logs' ? 'active' : '' }}" href="/admin/audit-logs">
                <span class="icon">{!! $icon('download-folder') !!}</span>
                <span>Audit Logs<small>Export compliance and user activity reports</small></span>
            </a>

            <div class="side-bottom">
                <a class="menu-item {{ $currentPath === 'admin/taxonomy-settings' ? 'active' : '' }}" href="/admin/taxonomy-settings">
                    <span class="icon">{!! $icon('sliders') !!}</span>
                    <span>Taxonomy & Settings<small>Academic years, tracks, and global filters</small></span>
                </a>
            </div>
        @endif
    </nav>
</aside>
