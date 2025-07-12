import React from "react";

const Style = () => (
  <style>{`
        :root {
            --text-dark: #374151;
            --text-light: #4b5563;
            --bg-dark: #0f172a;
            --button-bg: #2563eb;
            --text-color: #333;
            --border-color: #ccc;
            --error-color: #d32f2f;
            --success-color: #2e7d32;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0 1rem;
        }
        .container {
            background-color: white;
            padding: 2rem 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            // width: 100%;
            max-width: 420px;
            text-align: center;
        }
        h1 {
            color: var(--text-dark);
            margin-bottom: 0.5rem;
            margin-top: 0;
        }
        p {
            color: var(--text-light);
            font-size: 1rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }

        .otp-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .otp-inputs {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            max-width: 300px;
        }

        .otp-inputs input {
            width: 3rem;
            height: 3rem;
            text-align: center;
            font-size: 1.25rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .otp-inputs input:focus {
            border-color: #007bff;
            box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            font-size: 0.9rem;
        }
        input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: var(--button-bg);
            box-shadow: 0 0 0 2px rgba(0, 115, 230, 0.2);
        }
        button {
            width: 100%;
            padding: 0.8rem;
            background-color: var(--button-bg);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        button:disabled {
            background-color: #a0a0a0;
            cursor: not-allowed;
        }
        button:not(:disabled):hover {
            background-color: #005cb3;
        }
        .loader {
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 0.6s linear infinite;
            display: inline-block;
            vertical-align: middle;
            margin-left: 8px;
        }

            @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        .message {
            margin-top: 1.5rem;
            padding: 1rem;
            border-radius: 4px;
            font-weight: 500;
        }
        .message.error {
            background-color: #ffebee;
            color: var(--error-color);
            border: 1px solid var(--error-color);
        }
        .message.success {
            background-color: #e8f5e9;
            color: var(--success-color);
            border: 1px solid var(--success-color);
        }
        .message.info {
            background-color: #e3f2fd;
            color: #1e88e5;
            border: 1px solid #1e88e5;
        }
    `}</style>
);

export default Style;
