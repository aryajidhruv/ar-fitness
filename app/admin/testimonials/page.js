"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

const EMPTY = { name: "", tenure: "", text: "", rating: 5, published: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/testimonials?all=1");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Save failed");
      setForm(EMPTY);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  async function togglePublished(item) {
    await fetch(`/api/testimonials/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !item.published })
    });
    load();
  }

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">Testimonials</h1>
      <p className="text-bone-dim mt-2">Member quotes shown in the &ldquo;Why they stayed&rdquo; section.</p>

      <form onSubmit={handleSubmit} className="border border-white/10 p-6 mt-8 space-y-5">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-brass">Add a testimonial</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Member name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            />
          </div>
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Tenure (e.g. Member · 2 years)
            </label>
            <input
              value={form.tenure}
              onChange={(e) => setForm({ ...form, tenure: e.target.value })}
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Quote
          </label>
          <textarea
            required
            rows={3}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
          />
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Rating
          </label>
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            className="w-full sm:w-40 bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-[#e07a5f]">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Add testimonial"}
        </button>
      </form>

      <div className="mt-10 space-y-3">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-bone-dim mb-4">
          All testimonials ({items.length})
        </h2>
        {loading ? (
          <p className="text-bone-dim text-sm">Loading…</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="border border-white/10 p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <b className="font-cond uppercase tracking-[.1em]">{item.name}</b>
                  <span className="text-brass ml-2">{"★".repeat(item.rating)}</span>
                </div>
                <div className="flex gap-2 flex-none">
                  <button
                    onClick={() => togglePublished(item)}
                    className="px-3 py-1 text-xs font-cond uppercase tracking-[.1em] border border-white/15 hover:border-brass hover:text-brass"
                  >
                    {item.published ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 text-xs font-cond uppercase tracking-[.1em] border border-white/15 hover:border-[#e07a5f] hover:text-[#e07a5f]"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-bone-dim mt-2">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
