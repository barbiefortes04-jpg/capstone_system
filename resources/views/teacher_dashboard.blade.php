@include('partials.dashboard_shell', [
    'dashboardRole' => 'Teacher',
    'accent' => '#1e3a8a',
    'actionLabel' => '+ Student',
    'actionHref' => '/teacher/pending-reviews?open_add_student=1',
    'contentView' => $contentView ?? 'partials.teacher_dashboard_content',
    'user' => $user,
])
