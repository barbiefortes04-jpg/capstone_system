<?php

namespace App\Support;

use Throwable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SrmsWorkspaceStore
{
    private static ?bool $databaseAvailable = null;

    private static function normalizedEmail(string $email): string
    {
        return strtolower(trim($email));
    }

    public static function isDatabaseAvailable(): bool
    {
        if (self::$databaseAvailable !== null) {
            return self::$databaseAvailable;
        }

        $driver = (string) config('database.default', 'mysql');
        $connection = config('database.connections.' . $driver, []);
        $host = (string) ($connection['host'] ?? '127.0.0.1');
        $port = (int) ($connection['port'] ?? 3306);

        $errno = 0;
        $errstr = '';
        $socket = @fsockopen($host, $port, $errno, $errstr, 0.35);

        if (is_resource($socket)) {
            fclose($socket);
            self::$databaseAvailable = true;
            return true;
        }

        self::$databaseAvailable = false;
        return false;
    }

    private static function canAccessTable(string $table, string $studentEmail): bool
    {
        if ($studentEmail === '') {
            return false;
        }

        if (!self::isDatabaseAvailable()) {
            return false;
        }

        try {
            return Schema::hasTable($table);
        } catch (Throwable $exception) {
            return false;
        }
    }

    private static function createdLabel(mixed $createdAt): string
    {
        return date('M d, Y · g:i A', strtotime((string) ($createdAt ?? 'now')));
    }

    public static function getStudentFeedback(string $studentEmail): array
    {
        if (!self::canAccessTable('teacher_feedback', $studentEmail)) {
            return [];
        }

        try {
            $rows = DB::table('teacher_feedback')
                ->where('student_email', self::normalizedEmail($studentEmail))
                ->orderByDesc('id')
                ->limit(30)
                ->get();
        } catch (Throwable $exception) {
            return [];
        }

        return $rows->map(static function ($row): array {
            return [
                'chapter' => (string) $row->chapter,
                'action' => (string) $row->action,
                'request' => (string) $row->request_text,
                'teacher' => (string) $row->teacher_name,
                'updatedAt' => 'Updated: ' . self::createdLabel($row->created_at),
            ];
        })->all();
    }

    public static function addStudentFeedback(string $studentEmail, array $entry): void
    {
        if (!self::canAccessTable('teacher_feedback', $studentEmail)) {
            return;
        }

        try {
            DB::table('teacher_feedback')->insert([
                'student_email' => self::normalizedEmail($studentEmail),
                'chapter' => (string) $entry['chapter'],
                'action' => (string) $entry['action'],
                'request_text' => (string) $entry['request'],
                'teacher_name' => (string) $entry['teacher'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (Throwable $exception) {
            // Ignore workspace persistence errors when database is unavailable.
        }
    }

    public static function getStudentSubmissions(string $studentEmail): array
    {
        if (!self::canAccessTable('thesis_submissions', $studentEmail)) {
            return [];
        }

        try {
            $rows = DB::table('thesis_submissions')
                ->where('student_email', self::normalizedEmail($studentEmail))
                ->orderByDesc('id')
                ->limit(20)
                ->get();
        } catch (Throwable $exception) {
            return [];
        }

        return $rows->map(static function ($row): array {
            return [
                'id' => (int) $row->id,
                'title' => (string) $row->title,
                'notes' => (string) ($row->notes ?? ''),
                'fileName' => (string) $row->file_name,
                'storedPath' => (string) $row->stored_path,
                'submittedAt' => self::createdLabel($row->created_at),
                'status' => (string) $row->status,
            ];
        })->all();
    }

    public static function addStudentSubmission(string $studentEmail, array $entry): void
    {
        if (!self::canAccessTable('thesis_submissions', $studentEmail)) {
            return;
        }

        try {
            DB::table('thesis_submissions')->insert([
                'student_email' => self::normalizedEmail($studentEmail),
                'title' => (string) $entry['title'],
                'notes' => (string) ($entry['notes'] ?? ''),
                'file_name' => (string) $entry['fileName'],
                'stored_path' => (string) $entry['storedPath'],
                'status' => (string) ($entry['status'] ?? 'Submitted for adviser review'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (Throwable $exception) {
            // Ignore workspace persistence errors when database is unavailable.
        }
    }
}
