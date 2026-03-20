<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SRMS Login</title>
    <style>
        :root {
            --bg: #f4f6f8;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #6b7280;
            --line: #d1d5db;
            --focus: #0f766e;
            --focus-soft: rgba(15, 118, 110, 0.12);
            --button: #0f766e;
            --button-hover: #115e59;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            min-height: 100vh;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: radial-gradient(circle at top right, #e8f6f4 0%, var(--bg) 45%);
            color: var(--text);
            display: grid;
            place-items: center;
            padding: 20px;
        }

        .login-card {
            width: 100%;
            max-width: 420px;
            background: var(--card);
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
            padding: 28px 24px;
        }

        .login-title {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.2px;
            margin-bottom: 8px;
        }

        .login-subtitle {
            font-size: 0.95rem;
            color: var(--muted);
            margin-bottom: 22px;
        }

        .field {
            margin-bottom: 14px;
        }

        label {
            display: inline-block;
            margin-bottom: 6px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        input,
        select {
            width: 100%;
            border: 1px solid var(--line);
            border-radius: 10px;
            padding: 11px 12px;
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.18s ease, box-shadow 0.18s ease;
            background: #fff;
        }

        input:focus,
        select:focus {
            border-color: var(--focus);
            box-shadow: 0 0 0 4px var(--focus-soft);
        }

        .hint {
            margin-top: 6px;
            font-size: 0.8rem;
            color: var(--muted);
        }

        button {
            width: 100%;
            margin-top: 10px;
            border: 0;
            background: var(--button);
            color: #fff;
            border-radius: 10px;
            padding: 12px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.18s ease;
        }

        button:hover {
            background: var(--button-hover);
        }

        .switch-link {
            margin-top: 14px;
            text-align: center;
            font-size: 0.9rem;
            color: var(--muted);
        }

        .switch-link a {
            color: var(--focus);
            text-decoration: none;
            font-weight: 600;
        }

        .switch-link a:hover {
            text-decoration: underline;
        }

        @media (max-width: 520px) {
            .login-card {
                padding: 22px 18px;
            }
        }
    </style>
</head>
<body>
    <main class="login-card">
        <h1 class="login-title">LOGIN</h1>

        <form method="POST" action="/login">
            @csrf

            <div class="field">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@spup.edu.ph"
                    value="{{ old('email') }}"
                    required
                >
                <p class="hint">Use your SPUP email address.</p>
                @error('email')
                    <p class="hint" style="color:#b91c1c;">{{ $message }}</p>
                @enderror
            </div>

            <div class="field">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                >
            </div>

            <div class="field">
                <label for="course">Course</label>
                <select id="course" name="course">
                    <option value="" selected disabled>Select your course</option>
                    <option value="IT" {{ old('course') === 'IT' ? 'selected' : '' }}>IT</option>
                    <option value="CPE" {{ old('course') === 'CPE' ? 'selected' : '' }}>CPE</option>
                    <option value="CE" {{ old('course') === 'CE' ? 'selected' : '' }}>CE</option>
                </select>
                <p class="hint">Required when role is STUDENT or TEACHER.</p>
                @error('course')
                    <p class="hint" style="color:#b91c1c;">{{ $message }}</p>
                @enderror
            </div>

            <div class="field">
                <label for="role">Role</label>
                <select id="role" name="role" required>
                    <option value="" selected disabled>Select your role</option>
                    <option value="STUDENT" {{ old('role') === 'STUDENT' ? 'selected' : '' }}>STUDENT</option>
                    <option value="TEACHER" {{ old('role') === 'TEACHER' ? 'selected' : '' }}>TEACHER</option>
                    <option value="ADMIN" {{ old('role') === 'ADMIN' ? 'selected' : '' }}>ADMIN</option>
                </select>
            </div>

            <button type="submit">Log In</button>
        </form>

        <p class="switch-link">
            No account yet?
            <a href="/register">Register</a>
        </p>
    </main>

    <script>
        (function () {
            const role = document.getElementById('role');
            const course = document.getElementById('course');

            if (!role || !course) {
                return;
            }

            const syncCourseRequirement = () => {
                const needsCourse = role.value === 'STUDENT' || role.value === 'TEACHER';
                course.required = needsCourse;
                course.disabled = !needsCourse;

                if (!needsCourse) {
                    course.value = '';
                }
            };

            role.addEventListener('change', syncCourseRequirement);
            syncCourseRequirement();
        })();
    </script>
</body>
</html>
