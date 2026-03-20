<?php

use App\Http\Controllers\StudentDraftController;
use App\Support\SrmsWorkspaceStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

if (!function_exists('srms_activity_session_key')) {
    function srms_activity_session_key(array $user): string
    {
        return 'activity_log_' . md5(strtolower((string) ($user['email'] ?? 'guest')));
    }
}

if (!function_exists('srms_log_activity')) {
    function srms_log_activity(Request $request, string $title): void
    {
        $user = $request->session()->get('auth_user');

        if (!$user) {
            return;
        }

        $key = srms_activity_session_key($user);
        $log = $request->session()->get($key, []);
        $entry = [
            'title' => $title,
            'time' => date('M d, g:i A'),
        ];

        if (!empty($log) && ($log[0]['title'] ?? null) === $title) {
            $log[0] = $entry;
        } else {
            array_unshift($log, $entry);
        }

        $request->session()->put($key, array_slice($log, 0, 12));
    }
}

if (!function_exists('srms_recent_activity')) {
    function srms_recent_activity(Request $request): array
    {
        $user = $request->session()->get('auth_user');

        if (!$user) {
            return [];
        }

        $key = srms_activity_session_key($user);
        return $request->session()->get($key, []);
    }
}

if (!function_exists('srms_get_student_feedback')) {
    function srms_get_student_feedback(Request $request, string $studentEmail): array
    {
        return SrmsWorkspaceStore::getStudentFeedback($studentEmail);
    }
}

if (!function_exists('srms_add_student_feedback')) {
    function srms_add_student_feedback(Request $request, string $studentEmail, array $entry): void
    {
        SrmsWorkspaceStore::addStudentFeedback($studentEmail, $entry);
    }
}

if (!function_exists('srms_get_student_submissions')) {
    function srms_get_student_submissions(Request $request, string $studentEmail): array
    {
        return SrmsWorkspaceStore::getStudentSubmissions($studentEmail);
    }
}

if (!function_exists('srms_add_student_submission')) {
    function srms_add_student_submission(Request $request, string $studentEmail, array $entry): void
    {
        SrmsWorkspaceStore::addStudentSubmission($studentEmail, $entry);
    }
}

if (!function_exists('srms_site_thesis_files')) {
    function srms_site_thesis_files(): array
    {
        return [
            'smart-barangay-queueing' => 'smart-barangay-queueing.pdf',
            'iot-greenhouse-monitoring' => 'iot-greenhouse-monitoring.pdf',
            'campus-mobility-heatmap' => 'campus-mobility-heatmap.pdf',
            'secure-student-credential-verification' => 'secure-student-credential-verification.pdf',
            'adaptive-lms-recommendation-engine' => 'adaptive-lms-recommendation-engine.pdf',
            'flood-alert-mapping-sms' => 'flood-alert-mapping-sms.pdf',
            'cost-aware-cloud-lab-deployment' => 'cost-aware-cloud-lab-deployment.pdf',
            'learning-outcome-predictor-rubric' => 'learning-outcome-predictor-rubric.pdf',
        ];
    }
}

Route::get('/', function () {
    return view('login');
});

Route::get('/login', function () {
    return view('login');
});

Route::post('/login', function (Request $request) {
    $data = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
        'course' => ['nullable', 'in:IT,CPE,CE'],
        'role' => ['required', 'in:STUDENT,TEACHER,ADMIN'],
    ]);

    if (in_array(($data['role'] ?? ''), ['STUDENT', 'TEACHER'], true) && empty($data['course'])) {
        return back()->withErrors([
            'course' => 'Course is required for student and teacher login.',
        ])->withInput();
    }

    if (!str_ends_with(strtolower($data['email']), '@spup.edu.ph')) {
        return back()->withErrors([
            'email' => 'Email must end with @spup.edu.ph',
        ])->withInput();
    }

    $course = in_array(($data['role'] ?? ''), ['STUDENT', 'TEACHER'], true)
        ? (string) ($data['course'] ?? '')
        : 'N/A';

    $request->session()->put('auth_user', [
        'email' => $data['email'],
        'course' => $course,
        'role' => $data['role'],
    ]);

    srms_log_activity($request, 'Signed in to SRMS account');

    return redirect('/dashboard');
});

Route::get('/register', function () {
    return view('register');
});

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string', 'min:6'],
        'course' => ['nullable', 'in:IT,CPE,CE'],
        'role' => ['required', 'in:STUDENT,TEACHER,ADMIN'],
    ]);

    if (in_array(($data['role'] ?? ''), ['STUDENT', 'TEACHER'], true) && empty($data['course'])) {
        return back()->withErrors([
            'course' => 'Course is required for student and teacher registration.',
        ])->withInput();
    }

    if (!str_ends_with(strtolower($data['email']), '@spup.edu.ph')) {
        return back()->withErrors([
            'email' => 'Email must end with @spup.edu.ph',
        ])->withInput();
    }

    return redirect('/login');
});

Route::get('/student/site-thesis', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'STUDENT') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Viewed SITE THESIS library');

    return view('student_dashboard', [
        'user' => $user,
        'recentSubmissions' => srms_recent_activity($request),
    ]);
});

Route::get('/student/overview', function () {
    return redirect('/student/site-thesis');
});

Route::get('/student/site-thesis/file/{fileKey}', function (Request $request, string $fileKey) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    $catalog = srms_site_thesis_files();

    if (!isset($catalog[$fileKey])) {
        abort(404, 'Thesis file record not found.');
    }

    $fileName = $catalog[$fileKey];
    $absolutePath = storage_path('app/thesis-library/' . $fileName);

    if (!is_file($absolutePath)) {
        abort(404, 'Thesis file is not uploaded yet.');
    }

    $mimeType = (string) (mime_content_type($absolutePath) ?: 'application/octet-stream');
    $mode = strtolower((string) $request->query('mode', 'view'));

    if ($mode === 'download') {
        return response()->download($absolutePath, $fileName, ['Content-Type' => $mimeType]);
    }

    return response()->file($absolutePath, ['Content-Type' => $mimeType]);
});

Route::get('/student/workspace/drafts', [StudentDraftController::class, 'index']);
Route::post('/student/workspace/drafts/submit', [StudentDraftController::class, 'submit']);

Route::get('/student/workspace/system-development', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'STUDENT') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Updated System Development workspace');

    return view('student_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'System Development',
        'sectionSubtitle' => 'Project Build Links',
        'sectionDescription' => 'Store repository URLs, staging links, and prototype assets for your capstone system implementation.',
        'sectionItems' => [
            'Attach GitHub repository and branch links',
            'Save staging or test deployment URLs',
            'Organize UI assets and documentation files',
        ],
    ]);
});

Route::get('/student/advisor-feedback', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'STUDENT') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Reviewed adviser feedback updates');
    $email = (string) ($user['email'] ?? '');
    $teacherFeedback = srms_get_student_feedback($request, $email);
    $thesisSubmissions = srms_get_student_submissions($request, $email);
    $adviserCheckedLatest = !empty($teacherFeedback) && !empty($thesisSubmissions);

    return view('student_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'Advisor Feedback',
        'sectionSubtitle' => 'Comments',
        'sectionDescription' => 'Review returned comments, clarification requests, and required revisions from your adviser.',
        'sectionItems' => [
            'Read chapter-level comments from adviser',
            'List action items before resubmission',
            'Mark completed changes for final review',
        ],
        'teacherFeedback' => $teacherFeedback,
        'thesisSubmissions' => $thesisSubmissions,
        'adviserCheckedLatest' => $adviserCheckedLatest,
    ]);
});

Route::get('/student/repository', function () {
    return redirect('/student/site-thesis');
});

Route::get('/teacher/dashboard', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Opened teacher dashboard');

    $pendingQueue = [];

    $adviseeRoster = [];

    $defenseEvents = [];

    $facultyToolkit = [
        ['label' => 'Plagiarism Checker Tool', 'href' => '#'],
        ['label' => 'Department Grading Rubrics', 'href' => '#'],
        ['label' => 'Capstone Format Guidelines', 'href' => '#'],
    ];

    $upcomingThisWeek = collect($defenseEvents)->filter(static fn(array $event): bool => str_contains($event['date'], 'Mar'))->count();

    return view('teacher_dashboard', [
        'user' => $user,
        'contentView' => 'partials.teacher_dashboard_content',
        'pendingQueue' => $pendingQueue,
        'adviseeRoster' => $adviseeRoster,
        'defenseEvents' => $defenseEvents,
        'facultyToolkit' => $facultyToolkit,
        'stats' => [
            'pendingReviews' => count($pendingQueue),
            'activeGroups' => count($adviseeRoster),
            'upcomingDefenses' => $upcomingThisWeek,
        ],
    ]);
});

Route::get('/teacher/advisees', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Reviewed advisee groups and tracks');

    $adviseeGroups = [];

    $teacherEmail = strtolower((string) ($user['email'] ?? 'teacher@local'));
    $customAdviseeKey = 'teacher_custom_advisees_' . md5($teacherEmail);
    $customAdvisees = $request->session()->get($customAdviseeKey, []);

    foreach ($customAdvisees as $custom) {
        $groupNumber = (int) ($custom['group_number'] ?? 0);
        $groupLabel = $groupNumber > 0 ? 'Group ' . $groupNumber : 'New Group';
        $studentEmail = strtolower((string) ($custom['student_email'] ?? ''));
        $studentName = (string) ($custom['student_name'] ?? 'New Student');

        $adviseeGroups[] = [
            'projectTitle' => $groupLabel . ': ' . ((string) ($custom['capstone_title'] ?? 'New Capstone Project')),
            'track' => (string) ($custom['track'] ?? 'Web Development'),
            'academicYear' => (string) ($custom['academic_year'] ?? 'SY 2026'),
            'phase' => 'Proposal Review',
            'progress' => 0,
            'status' => 'On Track',
            'statusEmoji' => '🟢',
            'lastUpdate' => 'Last update: just now',
            'leadEmail' => $studentEmail,
            'manuscriptUrl' => '/student/site-thesis/file/smart-barangay-queueing?mode=view',
            'systemUrl' => '#',
            'messageEmails' => [$studentEmail],
            'researchFiles' => [
                [
                    'name' => $studentName . ' - Initial Capstone Placeholder',
                    'uploadedAt' => 'Added just now',
                    'viewUrl' => '/student/site-thesis/file/smart-barangay-queueing?mode=view',
                    'downloadUrl' => '/student/site-thesis/file/smart-barangay-queueing?mode=download',
                ],
            ],
        ];
    }

    return view('teacher_dashboard', [
        'user' => $user,
        'contentView' => 'partials.teacher_advisees_content',
        'adviseeGroups' => $adviseeGroups,
    ]);
});

Route::post('/teacher/advisees/add-student', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    $data = $request->validateWithBag('addStudent', [
        'student_name' => ['required', 'string', 'max:120'],
        'student_email' => ['required', 'email'],
        'partner_name' => ['nullable', 'string', 'max:120'],
        'capstone_title' => ['required', 'string', 'max:180'],
        'track' => ['required', 'string', 'max:80'],
        'academic_year' => ['required', 'string', 'max:20'],
        'group_number' => ['nullable', 'integer', 'min:1', 'max:99'],
    ]);

    if (!str_ends_with(strtolower($data['student_email']), '@spup.edu.ph')) {
        return redirect('/teacher/pending-reviews?open_add_student=1')->withErrors([
            'student_email' => 'Student email must end with @spup.edu.ph',
        ], 'addStudent')->withInput();
    }

    $teacherEmail = strtolower((string) ($user['email'] ?? 'teacher@local'));
    $customAdviseeKey = 'teacher_custom_advisees_' . md5($teacherEmail);
    $existing = $request->session()->get($customAdviseeKey, []);

    foreach ($existing as $item) {
        if (strtolower((string) ($item['student_email'] ?? '')) === strtolower($data['student_email'])) {
            return redirect('/teacher/pending-reviews?open_add_student=1')->withErrors([
                'student_email' => 'This student is already listed in your advisees.',
            ], 'addStudent')->withInput();
        }
    }

    $existing[] = [
        'student_name' => (string) $data['student_name'],
        'student_email' => strtolower((string) $data['student_email']),
        'partner_name' => trim((string) ($data['partner_name'] ?? '')),
        'capstone_title' => (string) $data['capstone_title'],
        'track' => (string) $data['track'],
        'academic_year' => (string) $data['academic_year'],
        'group_number' => (int) ($data['group_number'] ?? 0),
    ];

    $request->session()->put($customAdviseeKey, $existing);

    srms_log_activity($request, 'Added a new advisee: ' . $data['student_name']);

    return redirect('/teacher/pending-reviews?open_add_student=1&student_email=' . urlencode((string) $data['student_email']))
        ->with('add_student_status', 'New student added to your capstone advisees.');
});

Route::get('/teacher/pending-reviews', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Checked pending thesis reviews');

    $reviewGroups = [];

    $studentFallbackFiles = [];

    $teacherEmail = strtolower((string) ($user['email'] ?? 'teacher@local'));
    $customAdviseeKey = 'teacher_custom_advisees_' . md5($teacherEmail);
    $customAdvisees = $request->session()->get($customAdviseeKey, []);
    $customStudentNames = [];
    $customPartnerNames = [];

    foreach ($customAdvisees as $custom) {
        $email = strtolower((string) ($custom['student_email'] ?? ''));
        if ($email === '') {
            continue;
        }

        $groupNumber = (int) ($custom['group_number'] ?? 0);
        $groupLabel = $groupNumber > 0
            ? 'Group ' . $groupNumber
            : (string) ($custom['student_name'] ?? $email);

        $existingGroupIndex = null;
        foreach ($reviewGroups as $index => $group) {
            if (strtolower((string) ($group['label'] ?? '')) === strtolower($groupLabel)) {
                $existingGroupIndex = $index;
                break;
            }
        }

        if ($existingGroupIndex === null) {
            $reviewGroups[] = [
                'label' => $groupLabel,
                'students' => [$email],
            ];
        } elseif (!in_array($email, $reviewGroups[$existingGroupIndex]['students'] ?? [], true)) {
            $reviewGroups[$existingGroupIndex]['students'][] = $email;
        }

        $customStudentNames[$email] = (string) ($custom['student_name'] ?? '');
        $customPartnerNames[$email] = trim((string) ($custom['partner_name'] ?? ''));
        if (!isset($studentFallbackFiles[$email])) {
            $studentFallbackFiles[$email] = 'smart-barangay-queueing';
        }
    }

    $emailToName = static function (string $email): string {
        $local = (string) (explode('@', strtolower($email))[0] ?? '');
        return ucwords(str_replace(['.', '_', '-'], ' ', $local));
    };

    $reviewGroups = collect($reviewGroups)->map(function (array $group) use ($request, $emailToName, $studentFallbackFiles, $customStudentNames, $customPartnerNames): array {
        $students = collect($group['students'] ?? [])->map(function (string $email) use ($request, $emailToName, $studentFallbackFiles, $customStudentNames, $customPartnerNames): array {
            $submissions = srms_get_student_submissions($request, $email);
            $fileKey = (string) ($studentFallbackFiles[strtolower($email)] ?? '');
            return [
                'email' => $email,
                'name' => (string) ($customStudentNames[strtolower($email)] ?? $emailToName($email)),
                'partnerName' => (string) ($customPartnerNames[strtolower($email)] ?? ''),
                'latestSubmissionId' => (int) ($submissions[0]['id'] ?? 0),
                'fallbackFileKey' => $fileKey,
            ];
        })->all();

        $studentNames = collect($students)
            ->pluck('name')
            ->filter(static fn ($name) => is_string($name) && trim($name) !== '')
            ->values();

        $label = 'Advisee Group';
        $firstStudent = $students[0] ?? null;
        $firstPartner = trim((string) ($firstStudent['partnerName'] ?? ''));
        if ($firstStudent && $firstPartner !== '') {
            $label = (string) ($firstStudent['name'] ?? '') . ' - ' . $firstPartner;
        } elseif ($studentNames->count() >= 2) {
            $label = (string) $studentNames->get(0) . ' - ' . (string) $studentNames->get(1);
        } elseif ($studentNames->count() === 1) {
            $label = (string) $studentNames->get(0);
        }

        return [
            'label' => $label,
            'students' => $students,
        ];
    })->all();

    $selectedStudent = (string) $request->query('student_email', '');
    $feedbackLog = $selectedStudent !== '' ? srms_get_student_feedback($request, $selectedStudent) : [];
    $thesisSubmissions = $selectedStudent !== '' ? srms_get_student_submissions($request, $selectedStudent) : [];
    $selectedSubmissionId = (int) $request->query('submission_id', (int) ($thesisSubmissions[0]['id'] ?? 0));

    $activeSubmission = collect($thesisSubmissions)->firstWhere('id', $selectedSubmissionId);
    if (!$activeSubmission && !empty($thesisSubmissions)) {
        $activeSubmission = $thesisSubmissions[0];
        $selectedSubmissionId = (int) ($activeSubmission['id'] ?? 0);
    }

    $versionHistory = collect($thesisSubmissions)->values()->map(static function (array $submission, int $index): array {
        return [
            'id' => (int) $submission['id'],
            'label' => 'Version ' . ($index + 1) . ' · ' . (string) $submission['submittedAt'],
        ];
    })->all();

    $selectedGroupLabel = collect($reviewGroups)->first(function (array $group) use ($selectedStudent): bool {
        if ($selectedStudent === '') {
            return false;
        }

        foreach (($group['students'] ?? []) as $student) {
            if (strtolower((string) ($student['email'] ?? '')) === strtolower($selectedStudent)) {
                return true;
            }
        }

        return false;
    });

    $groupName = (string) (($selectedGroupLabel['label'] ?? '') !== ''
        ? $selectedGroupLabel['label']
        : 'No advisee selected');

    $documentTitle = $activeSubmission
        ? ((string) ($activeSubmission['title'] ?? 'Submitted Document') . ' - ' . (string) ($activeSubmission['fileName'] ?? ''))
        : 'No submission selected';

    $documentViewUrl = ($selectedStudent !== '' && $selectedSubmissionId > 0)
        ? '/teacher/submissions/' . $selectedSubmissionId . '/file?student_email=' . urlencode($selectedStudent)
        : '';

    if ($documentViewUrl === '' && $selectedStudent !== '') {
        $fallbackFileKey = (string) ($studentFallbackFiles[strtolower($selectedStudent)] ?? '');
        if ($fallbackFileKey !== '') {
            $documentViewUrl = '/student/site-thesis/file/' . $fallbackFileKey . '?mode=view';
            $documentTitle = 'Fallback Thesis Preview';
        }
    }

    return view('teacher_dashboard', [
        'user' => $user,
        'contentView' => 'partials.teacher_feedback_manager',
        'selectedStudent' => $selectedStudent,
        'feedbackLog' => $feedbackLog,
        'thesisSubmissions' => $thesisSubmissions,
        'selectedSubmissionId' => $selectedSubmissionId,
        'versionHistory' => $versionHistory,
        'reviewGroups' => $reviewGroups,
        'groupName' => $groupName,
        'documentTitle' => $documentTitle,
        'documentViewUrl' => $documentViewUrl,
    ]);
});

Route::get('/teacher/submissions/{submissionId}/file', function (Request $request, int $submissionId) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    if (!\App\Support\SrmsWorkspaceStore::isDatabaseAvailable()) {
        abort(503, 'Submission repository is temporarily unavailable.');
    }

    $studentEmail = strtolower((string) $request->query('student_email', ''));

    try {
        $query = \Illuminate\Support\Facades\DB::table('thesis_submissions')->where('id', $submissionId);
        if ($studentEmail !== '') {
            $query->where('student_email', $studentEmail);
        }

        $row = $query->first();
    } catch (\Throwable $exception) {
        abort(503, 'Submission repository is temporarily unavailable.');
    }

    if (!$row) {
        abort(404, 'Submission file not found.');
    }

    $absolutePath = storage_path('app/' . (string) $row->stored_path);
    if (!is_file($absolutePath)) {
        abort(404, 'Stored file is missing.');
    }

    $mimeType = (string) (mime_content_type($absolutePath) ?: 'application/octet-stream');
    return response()->file($absolutePath, ['Content-Type' => $mimeType]);
});

Route::post('/teacher/feedback/store', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    $data = $request->validate([
        'student_email' => ['required', 'email'],
        'chapter' => ['required', 'string', 'max:120'],
        'action' => ['required', 'in:REVISE,CHANGE,UPDATE,ADD'],
        'request' => ['required', 'string', 'max:1200'],
    ]);

    if (!str_ends_with(strtolower($data['student_email']), '@spup.edu.ph')) {
        return back()->withErrors([
            'student_email' => 'Student email must end with @spup.edu.ph',
        ])->withInput();
    }

    srms_add_student_feedback($request, $data['student_email'], [
        'chapter' => $data['chapter'],
        'action' => $data['action'],
        'request' => $data['request'],
        'teacher' => 'Adviser: ' . ($user['email'] ?? 'Faculty Adviser'),
        'updatedAt' => 'Updated: ' . date('M d, Y · g:i A'),
    ]);

    srms_log_activity($request, 'Posted thesis revision feedback for ' . $data['student_email']);

    return redirect('/teacher/pending-reviews?student_email=' . urlencode($data['student_email']));
});

Route::get('/teacher/defense-schedules', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Updated defense schedule view');

    return view('teacher_dashboard', [
        'user' => $user,
        'contentView' => 'partials.teacher_defense_schedules_content',
    ]);
});

Route::get('/teacher/approved-publications', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'TEACHER') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Viewed approved publications list');

    return view('teacher_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'Approved Publications',
        'sectionSubtitle' => 'Published Advisee Output',
        'sectionDescription' => 'Browse final approved studies authored by your advisees and published to the institutional repository.',
        'sectionItems' => [
            'View finalized and archived capstone studies',
            'Filter approved outputs by year and program',
            'Export records for adviser portfolio reports',
        ],
    ]);
});

Route::get('/admin/analytics', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'ADMIN') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Opened system analytics');

    return view('admin_dashboard', [
        'user' => $user,
        'recentSubmissions' => srms_recent_activity($request),
    ]);
});

Route::get('/admin/user-management', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'ADMIN') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Managed user accounts and permissions');

    return view('admin_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'User Management',
        'sectionSubtitle' => 'Role and Permission Control',
        'sectionDescription' => 'Manage user onboarding, account roles, and access levels for students, advisers, and panelists.',
        'sectionItems' => [
            'Create and update user accounts',
            'Assign permissions by institutional role',
            'Deactivate or restore platform access',
        ],
    ]);
});

Route::get('/admin/repository-masterlist', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'ADMIN') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Edited repository masterlist records');

    return view('admin_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'Repository Masterlist',
        'sectionSubtitle' => 'Metadata and Publication Control',
        'sectionDescription' => 'Maintain repository records, edit tags, and publish final approved studies to the searchable archive.',
        'sectionItems' => [
            'Edit academic metadata and keywords',
            'Correct track and department classifications',
            'Publish approved manuscripts to repository',
        ],
    ]);
});

Route::get('/admin/audit-logs', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'ADMIN') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Exported or reviewed audit logs');

    return view('admin_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'Audit Logs',
        'sectionSubtitle' => 'Security and Compliance Reports',
        'sectionDescription' => 'Track platform activity history, review compliance events, and export reports for governance needs.',
        'sectionItems' => [
            'Review recent user and system events',
            'Filter logs by date, actor, and action type',
            'Export logs for compliance documentation',
        ],
    ]);
});

Route::get('/admin/taxonomy-settings', function (Request $request) {
    $user = $request->session()->get('auth_user');

    if (!$user) {
        return redirect('/login');
    }

    if (($user['role'] ?? null) !== 'ADMIN') {
        return redirect('/dashboard');
    }

    srms_log_activity($request, 'Updated taxonomy and system settings');

    return view('admin_dashboard', [
        'user' => $user,
        'contentView' => 'partials.student_section_content',
        'sectionTitle' => 'Taxonomy & Settings',
        'sectionSubtitle' => 'Academic Terms and Filters',
        'sectionDescription' => 'Configure academic years, degree tracks, and search filter taxonomies used across the platform.',
        'sectionItems' => [
            'Add or edit academic year entries',
            'Maintain track and program taxonomies',
            'Configure repository global search filters',
        ],
    ]);
});

Route::get('/dashboard', function (Request $request) {
    $role = $request->session()->get('auth_user.role');

    return redirect(match ($role) {
        'STUDENT' => '/student/site-thesis',
        'TEACHER' => '/teacher/dashboard',
        'ADMIN' => '/admin/analytics',
        default => '/login',
    });
});

Route::post('/logout', function (Request $request) {
    $request->session()->forget('auth_user');

    return redirect('/login');
});
