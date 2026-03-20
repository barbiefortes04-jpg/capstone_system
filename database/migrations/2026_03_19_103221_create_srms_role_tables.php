<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->enum('course', ['IT', 'CPE', 'CE']);
            $table->enum('role', ['STUDENT', 'TEACHER', 'ADMIN']);
        });

        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->enum('course', ['IT', 'CPE', 'CE']);
            $table->enum('role', ['STUDENT', 'TEACHER', 'ADMIN']);
        });

        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->enum('course', ['IT', 'CPE', 'CE']);
            $table->enum('role', ['STUDENT', 'TEACHER', 'ADMIN']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
        Schema::dropIfExists('teachers');
        Schema::dropIfExists('students');
    }
};
