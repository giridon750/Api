import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .trim()
  .replace(/\/+$/, "");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState("Checking backend...");
  const [connectionStatus, setConnectionStatus] = useState("checking");

  useEffect(() => {
    async function checkBackendConnection() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/message`);
        setConnectionMessage(response.data.message);
        setConnectionStatus("connected");
      } catch {
        setConnectionMessage("Cannot connect to backend server");
        setConnectionStatus("disconnected");
      }
    }

    checkBackendConnection();
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginMessage("");
    setLoggedInUsername("");

    if (!username.trim() || !password) {
      setLoginMessage("Username and password are required.");
      return;
    }

    setIsLoginLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username: username,
        password: password,
      });

      setLoginMessage(response.data.message);
      setLoggedInUsername(response.data.user.username);
    } catch (error) {
      if (error.response) {
        setLoginMessage(error.response.data.message);
      } else {
        setLoginMessage("Cannot connect to backend server");
      }
    } finally {
      setIsLoginLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-violet-100 px-5 py-10 font-sans text-slate-800">
      <section className="w-full max-w-md rounded-3xl border border-white/80 bg-white/90 p-7 shadow-2xl shadow-slate-300/60 backdrop-blur sm:p-10">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 text-blue-700">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3.5a5 5 0 0 0-5 5v2H5.5v9h13v-9H17v-2a5 5 0 0 0-5-5Zm-3 7v-2a3 3 0 1 1 6 0v2H9Zm3 2.5a1.5 1.5 0 0 1 .75 2.8V17h-1.5v-1.2a1.5 1.5 0 0 1 .75-2.8Z" />
          </svg>
        </div>

        <p className="mb-2 mt-7 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
          Your account
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome Back
        </h1>
        <p className="mb-8 mt-2 text-sm leading-6 text-slate-500">
          Login to continue to your dashboard
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 fill-slate-400" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
              </svg>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 fill-slate-400" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM10 6a2 2 0 0 1 4 0v2h-4V6Zm2 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
            type="submit"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {loginMessage && (
          <div
            className={`mt-5 rounded-xl border px-4 py-3 text-sm font-medium ${
              loggedInUsername
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800"
            }`}
            role="status"
          >
            <p>{loginMessage}</p>
            {loggedInUsername && (
              <p className="mt-1 font-semibold">Welcome, {loggedInUsername}!</p>
            )}
          </div>
        )}

        <div className="mt-7 flex items-center gap-2.5 border-t border-slate-100 pt-5 text-xs text-slate-500" aria-live="polite">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              connectionStatus === "connected"
                ? "bg-emerald-500"
                : connectionStatus === "checking"
                  ? "bg-amber-400"
                  : "bg-rose-500"
            }`}
            aria-hidden="true"
          />
          <span>{connectionMessage}</span>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Practice credentials: <strong className="font-semibold text-slate-500">admin / 12345</strong>
        </p>
      </section>
    </main>
  );
}

export default App;
