"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UploadField from "@/components/admin/UploadField";

const DEFAULT_CREDENTIALS =
  "Certified personal trainer, Sports nutrition, Strength & conditioning, Post-injury training";

const EMPTY = {
  name: "",
  role: "Personal trainer",
  bio: "",
  bioExtra: "",
  credentials: DEFAULT_CREDENTIALS,
  quote: "",
  photo: null,
  order: 0,
  published: true,
  isPrimary: false
};

function parseCredentials(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatCredentials(list) {
  return (list || []).join(", ");
}

export default function AdminTrainersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/trainers?all=1");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setForm(EMPTY);
    setEditingId(null);
  }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name,
      role: item.role || "Personal trainer",
      bio: item.bio || "",
      bioExtra: item.bioExtra || "",
      credentials: formatCredentials(item.credentials) || DEFAULT_CREDENTIALS,
      quote: item.quote || "",
      photo: item.photoUrl ? { url: item.photoUrl, publicId: item.photoPublicId } : null,
      order: item.order ?? 0,
      published: item.published,
      isPrimary: item.isPrimary ?? false
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      bioExtra: form.bioExtra,
      credentials: parseCredentials(form.credentials),
      quote: form.quote,
      photoUrl: form.photo?.url || "",
      photoPublicId: form.photo?.publicId || "",
      order: Number(form.order) || 0,
      published: form.published,
      isPrimary: form.isPrimary
    };

    try {
      const res = await fetch(editingId ? `/api/trainers/${editingId}` : "/api/trainers", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Save failed");
      resetForm();
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(item) {
    await fetch(`/api/trainers/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, published: !item.published })
    });
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this trainer? Their photo will be removed from storage too.")) return;
    await fetch(`/api/trainers/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">Trainers</h1>
      <p className="text-bone-dim mt-2">
        Add and manage coaches shown in the Team section on the homepage. Lower order numbers appear first.
      </p>

      <form onSubmit={handleSubmit} className="border border-white/10 p-6 mt-8 space-y-5">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-brass">
          {editingId ? "Edit trainer" : "Add a trainer"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Full name
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
              Role / title
            </label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Head coach, Strength coach"
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            />
          </div>
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Display order
            </label>
            <input
              type="number"
              min="0"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Bio (first paragraph)
          </label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none resize-y"
          />
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Bio (second paragraph, optional)
          </label>
          <textarea
            rows={3}
            value={form.bioExtra}
            onChange={(e) => setForm({ ...form, bioExtra: e.target.value })}
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none resize-y"
          />
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Credentials (comma-separated)
          </label>
          <input
            value={form.credentials}
            onChange={(e) => setForm({ ...form, credentials: e.target.value })}
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
          />
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Quote
          </label>
          <textarea
            rows={2}
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none resize-y"
          />
        </div>

        <UploadField
          label="Photo"
          accept="image/*"
          value={form.photo}
          onChange={(v) => setForm({ ...form, photo: v })}
          folder="ar-fitness/coach"
        />

        <label className="flex items-center gap-2 text-sm text-bone-dim">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published (visible on the live site)
        </label>

        <label className="flex items-center gap-2 text-sm text-bone-dim">
          <input
            type="checkbox"
            checked={form.isPrimary}
            onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })}
          />
          Primary coach (featured first; used for WhatsApp greetings)
        </label>

        {error && <p className="text-sm text-[#e07a5f]">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add trainer"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 font-cond uppercase tracking-[.14em] border border-white/15 hover:border-brass hover:text-brass transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-bone-dim mb-4">
          All trainers ({items.length})
        </h2>
        {loading ? (
          <p className="text-bone-dim text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-bone-dim text-sm">No trainers yet. Add your first coach above.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 border border-white/10 p-4"
              >
                <div>
                  <b className="font-display font-bold uppercase">{item.name}</b>
                  <p className="text-xs text-bone-dim font-cond uppercase tracking-[.1em] mt-0.5">
                    {item.role || "Trainer"} · Order {item.order ?? 0} ·{" "}
                    {item.published ? "Published" : "Hidden"}
                    {item.isPrimary ? " · Primary" : ""}
                  </p>
                </div>
                <div className="flex gap-2 flex-none flex-wrap justify-end">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-4 py-1.5 text-xs font-cond uppercase tracking-[.12em] border border-white/15 hover:border-brass hover:text-brass"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublished(item)}
                    className="px-4 py-1.5 text-xs font-cond uppercase tracking-[.12em] border border-white/15 hover:border-brass hover:text-brass"
                  >
                    {item.published ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-1.5 text-xs font-cond uppercase tracking-[.12em] border border-white/15 hover:border-[#e07a5f] hover:text-[#e07a5f]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
