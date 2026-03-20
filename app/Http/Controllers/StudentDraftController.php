<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentDraftController extends Controller
{
    private function ensureStudentUser(Request $request): array|string
    {
        $user = $request->session()->get('auth_user');

        if (!$user || (($user['role'] ?? null) !== 'STUDENT')) {
            return $user ? '/dashboard' : '/login';
        }

        return $user;
    }

    private function validatedDraftData(Request $request): array
    {
        return $request->validate([
            'thesis_title' => ['required', 'string', 'max:150'],
            'submission_notes' => ['nullable', 'string', 'max:1000'],
            'thesis_file' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:20480'],
        ]);
    }

    private function buildSubmissionEntry(array $data, string $originalName, string $storedPath): array
    {
        return [
            'title' => $data['thesis_title'],
            'notes' => (string) ($data['submission_notes'] ?? ''),
            'fileName' => $originalName,
            'storedPath' => $storedPath,
            'submittedAt' => date('M d, Y · g:i A'),
            'status' => 'Submitted for adviser review',
        ];
    }

    public function index(Request $request)
    {
        $user = $this->ensureStudentUser($request);
        if (!is_array($user)) {
            return redirect($user);
        }

        srms_log_activity($request, 'Updated Manuscript Drafts workspace');
        $email = (string) ($user['email'] ?? '');

        return view('student_dashboard', [
            'user' => $user,
            'contentView' => 'partials.student_section_content',
            'sectionTitle' => 'Manuscript Drafts',
            'sectionSubtitle' => 'Chapter Organization',
            'sectionDescription' => 'Consolidated adviser instructions on what to revise, change, update, and add in your thesis manuscript.',
            'sectionItems' => ['Upload or replace chapter draft files', 'Track revision versions and timestamps', 'Prepare manuscript package for adviser review'],
            'teacherFeedback' => srms_get_student_feedback($request, $email),
            'thesisSubmissions' => srms_get_student_submissions($request, $email),
        ]);
    }

    public function submit(Request $request)
    {
        $user = $this->ensureStudentUser($request);
        if (!is_array($user)) {
            return redirect($user);
        }

        $data = $this->validatedDraftData($request);

        $storedPath = $request->file('thesis_file')->store('thesis_uploads');
        $originalName = (string) $request->file('thesis_file')->getClientOriginalName();

        srms_add_student_submission(
            $request,
            (string) ($user['email'] ?? ''),
            $this->buildSubmissionEntry($data, $originalName, $storedPath)
        );

        srms_log_activity($request, 'Submitted thesis draft: ' . $data['thesis_title']);

        return redirect('/student/workspace/drafts')->with('submit_success', 'Thesis draft submitted successfully.');
    }
}
