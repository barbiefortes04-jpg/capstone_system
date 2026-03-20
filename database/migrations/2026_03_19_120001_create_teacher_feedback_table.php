<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teacher_feedback', function (Blueprint $table): void {
            $table->id();
            $table->string('student_email')->index();
            $table->string('chapter', 120);
            $table->string('action', 20);
            $table->text('request_text');
            $table->string('teacher_name', 200);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacher_feedback');
    }
};
