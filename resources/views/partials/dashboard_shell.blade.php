<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $dashboardRole }} Dashboard</title>
    <link rel="stylesheet" href="/dashboard-shell.css">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body style="--accent: {{ $accent }};">
    @php
        $departmentMap = [
            'IT' => 'Information Technology',
            'CPE' => 'Computer Engineering',
            'CE' => 'Civil Engineering',
        ];

        $roleLabelMap = [
            'STUDENT' => 'Student',
            'TEACHER' => 'Faculty Advisor',
            'ADMIN' => 'Panelist',
        ];

        $department = $departmentMap[$user['course']] ?? $user['course'];
        $roleLabel = $roleLabelMap[$user['role']] ?? $user['role'];
    @endphp

    <div class="container">
        <header class="topbar">
            <div class="logo">SRMS</div>
            <input class="search" type="text" placeholder="Search research title, author, or keyword">
            <div class="profile">
                <div class="avatar">{{ strtoupper(substr($roleLabel, 0, 1)) }}</div>
                <div>
                    <div class="profile-role">{{ $roleLabel }}</div>
                    <div class="profile-dept">{{ $department }}</div>
                </div>
            </div>
            @if(!empty($actionLabel ?? ''))
                @if(!empty($actionHref ?? ''))
                    <a
                        class="action-btn"
                        href="{{ $actionHref }}"
                        @if(($actionLabel ?? '') === '+ Student') id="teacherAddStudentTrigger" @endif
                    >{{ $actionLabel }}</a>
                @else
                    <button class="action-btn" type="button">{{ $actionLabel }}</button>
                @endif
            @endif
        </header>

        <div class="workspace">
            @include('partials.sidebar_navigation', ['user' => $user])
            @include($contentView ?? 'partials.dashboard_main_content')
        </div>
    </div>

    <div id="add-student-modal-root"></div>
</body>
</html>