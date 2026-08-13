"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UploadField from "@/components/admin/UploadField";

const EMPTY = {
  name: "",
  category: "fat-loss",
  days: 90,
  metricLabel: "Body weight",
  metricValue: "",
  isVideo: false,
  before: null,
  after: null,
  video: null,
  published: true
};

export default function AdminTransformationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/transformations?all=1");
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
      category: item.category,
      days: item.days,
      metricLabel: item.metricLabel || "Body weight",
      metricValue: item.metricValue || "",
      isVideo: item.isVideo,
      before: { url: item.beforeUrl, publicId: item.beforePublicId },
      after: { url: item.afterUrl, publicId: item.afterPublicId },
      video: item.videoUrl ? { url: item.videoUrl, publicId: item.videoPublicId } : null,
      published: item.published
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.isVideo && (!form.before || !form.after)) {
      setError("Upload both a before and an after photo.");
      return;
    }
    if (form.isVideo && !form.video) {
      setError("Upload a video.");
      return;
    }

    setSaving(true);
    const payload = {
      name: form.name,
      category: form.category,
      days: Number(form.days),
      metricLabel: form.metricLabel,
      metricValue: form.metricValue,
      isVideo: form.isVideo,
      published: form.published,
      beforeUrl: form.before?.url || "",
      beforePublicId: form.before?.publicId || "",
      afterUrl: form.after?.url || "",
      afterPublicId: form.after?.publicId || "",
      videoUrl: form.video?.url || "",
      videoPublicId: form.video?.publicId || ""
    };

    try {
      const res = await fetch(editingId ? `/api/transformations/${editingId}` : "/api/transformations", {
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

  async function handleDelete(id) {
    if (!confirm("Delete this transformation? This removes the photos/video from storage too.")) return;
    await fetch(`/api/transformations/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">Transformations</h1>
      <p className="text-bone-dim mt-2">These power the hero slider and the Results section on the site.</p>

      <form onSubmit={handleSubmit} className="border border-white/10 p-6 mt-8 space-y-5">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-brass">
          {editingId ? "Edit transformation" : "Add a transformation"}
        </h2>

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
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            >
              <option value="fat-loss">Fat loss</option>
              <option value="muscle-gain">Muscle gain</option>
              <option value="recomp">Recomp</option>
            </select>
          </div>
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Days
            </label>
            <input
              type="number"
              min="1"
              required
              value={form.days}
              onChange={(e) => setForm({ ...form, days: e.target.value })}
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            />
          </div>
          <div>
            <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
              Result metric (e.g. -14 kg)
            </label>
            <input
              value={form.metricValue}
              onChange={(e) => setForm({ ...form, metricValue: e.target.value })}
              className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-bone-dim">
          <input
            type="checkbox"
            checked={form.isVideo}
            onChange={(e) => setForm({ ...form, isVideo: e.target.checked })}
          />
          This is a video transformation instead of before/after photos
        </label>

        {form.isVideo ? (
          <UploadField
            label="Transformation video"
            accept="video/*"
            value={form.video}
            onChange={(v) => setForm({ ...form, video: v })}
            folder="ar-fitness/videos"
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <UploadField
              label="Before photo"
              accept="image/*"
              value={form.before}
              onChange={(v) => setForm({ ...form, before: v })}
              folder="ar-fitness/transformations"
            />
            <UploadField
              label="After photo"
              accept="image/*"
              value={form.after}
              onChange={(v) => setForm({ ...form, after: v })}
              folder="ar-fitness/transformations"
            />
          </div>
        )}

        <label className="flex items-center gap-2 text-sm text-bone-dim">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published (visible on the live site)
        </label>

        {error && <p className="text-sm text-[#e07a5f]">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add transformation"}
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
          All transformations ({items.length})
        </h2>
        {loading ? (
          <p className="text-bone-dim text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-bone-dim text-sm">Nothing added yet.</p>
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
                    {item.category} · {item.days} days · {item.published ? "Published" : "Hidden"}
                    {item.isVideo ? " · Video" : ""}
                  </p>
                </div>
                <div className="flex gap-2 flex-none">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-4 py-1.5 text-xs font-cond uppercase tracking-[.12em] border border-white/15 hover:border-brass hover:text-brass"
                  >
                    Edit
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
