<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <style>
        :root {
            --bg: #f4f6f8;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #6b7280;
            --button: #bfdbfe;
            --button-hover: #93c5fd;
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

        .card {
            width: 100%;
            max-width: 520px;
            background: var(--card);
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
            padding: 28px 24px;
        }

        .title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 16px;
        }

        .meta {
            margin-bottom: 8px;
            font-size: 0.95rem;
            color: var(--muted);
        }

        .meta strong {
            color: var(--text);
        }

        button {
            margin-top: 20px;
            border: 0;
            background: var(--button);
            color: #1e3a8a;
            border-radius: 10px;
            padding: 11px 16px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.18s ease;
        }

        button:hover {
            background: var(--button-hover);
        }
    </style>
</head>
<body>
    <main class="card">
        <h1 class="title">DASHBOARD</h1>

        <p class="meta"><strong>Email:</strong> {{ $user['email'] }}</p>
        <p class="meta"><strong>Course:</strong> {{ $user['course'] }}</p>
        <p class="meta"><strong>Role:</strong> {{ $user['role'] }}</p>

        <form method="POST" action="/logout">
            @csrf
            <button type="submit">Log Out</button>
        </form>
    </main>
</body>
</html>
