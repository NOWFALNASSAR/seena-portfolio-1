"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-deep px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-gold/20 p-10"
      >
        <h1 className="font-display text-xl text-center mb-8 tracking-widest">
          ADMIN
        </h1>
        <label className="block text-xs tracking-[0.2em] uppercase text-gold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border border-ivory/20 focus:border-gold outline-none px-4 py-3 mb-5 text-ivory"
          autoFocus
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-emerald-deep py-3 text-xs tracking-[0.2em] uppercase hover:bg-gold-soft transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
