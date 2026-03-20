<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('thesis_submissions', function (Blueprint $table): void {
            $table->id();
            $table->string('student_email')->index();
            $table->string('title', 150);
            $table->text('notes')->nullable();
            $table->string('file_name', 255);
            $table->string('stored_path', 255);
            $table->string('status', 80)->default('Submitted for adviser review');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('thesis_submissions');
    }
};
