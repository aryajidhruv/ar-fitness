"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAdmin(email, password);

    setLoading(false);

    if (!result.ok) {
      setError(result.error || "Wrong email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-iron text-bone font-body grid place-items-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <span className="w-9 h-9 grid place-items-center border border-brass font-display font-black text-brass">
            AR
          </span>
          <span className="font-display font-extrabold text-xl uppercase tracking-wide">
            AR <span className="text-brass">Fitness</span>
          </span>
        </div>
        <h1 className="font-cond uppercase tracking-[.18em] text-sm text-bone-dim text-center mb-6">
          Admin sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-iron-2 border border-white/10 px-4 py-3 focus:border-brass outline-none"
            />
          </div>
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-iron-2 border border-white/10 px-4 py-3 focus:border-brass outline-none"
            />
          </div>

          {error && <p className="text-sm text-[#e07a5f]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
