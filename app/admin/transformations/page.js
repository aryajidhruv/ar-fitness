"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UploadField from "@/components/admin/UploadField";
import { sortByOrder } from "@/lib/sortByOrder";

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
  order: 0,
  featuredInHero: false,
  published: true
};

export default function AdminTransformationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const sortedItems = useMemo(() => sortByOrder(items), [items]);

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
      order: item.order ?? 0,
      featuredInHero: item.featuredInHero ?? false,
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
      order: Number(form.order) || 0,
      featuredInHero: !form.isVideo && form.featuredInHero,
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
    const res = await fetch(`/api/transformations/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed. Try refreshing the page and again.");
      return;
    }
    setError("");
    load();
  }

  async function reorderList(nextItems) {
    await fetch("/api/transformations/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: nextItems.map((item) => item._id) })
    });
    load();
  }

  function moveItem(index, direction) {
    const next = [...sortedItems];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    reorderList(next);
  }

  async function setHeroFeatured(item) {
    if (item.isVideo) {
      setError("Only before/after photo transformations can appear in the hero.");
      return;
    }
    setError("");
    const res = await fetch(`/api/transformations/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, featuredInHero: true })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not set hero transformation.");
      return;
    }
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

        <label className="flex items-center gap-2 text-sm text-bone-dim">
          <input
            type="checkbox"
            checked={form.isVideo}
            onChange={(e) =>
              setForm({
                ...form,
                isVideo: e.target.checked,
                featuredInHero: e.target.checked ? false : form.featuredInHero
              })
            }
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

        <label className={`flex items-center gap-2 text-sm ${form.isVideo ? "text-bone-dim/50" : "text-bone-dim"}`}>
          <input
            type="checkbox"
            checked={form.featuredInHero}
            disabled={form.isVideo}
            onChange={(e) => setForm({ ...form, featuredInHero: e.target.checked })}
          />
          Featured in hero section (before/after slider on homepage)
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
          All transformations ({sortedItems.length})
        </h2>
        <p className="text-xs text-bone-dim mb-4">
          Use the arrows to reorder. Mark one photo transformation as the hero feature.
        </p>
        {loading ? (
          <p className="text-bone-dim text-sm">Loading…</p>
        ) : sortedItems.length === 0 ? (
          <p className="text-bone-dim text-sm">Nothing added yet.</p>
        ) : (
          <div className="space-y-3">
            {sortedItems.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 border border-white/10 p-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex flex-col gap-1 flex-none">
                    <button
                      type="button"
                      onClick={() => moveItem(index, -1)}
                      disabled={index === 0}
                      className="px-2 py-0.5 text-xs border border-white/15 hover:border-brass disabled:opacity-30"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, 1)}
                      disabled={index === sortedItems.length - 1}
                      className="px-2 py-0.5 text-xs border border-white/15 hover:border-brass disabled:opacity-30"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="min-w-0">
                    <b className="font-display font-bold uppercase">{item.name}</b>
                    <p className="text-xs text-bone-dim font-cond uppercase tracking-[.1em] mt-0.5">
                      Order {item.order ?? 0} · {item.category} · {item.days} days ·{" "}
                      {item.published ? "Published" : "Hidden"}
                      {item.isVideo ? " · Video" : ""}
                      {item.featuredInHero ? " · Hero" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-none flex-wrap justify-end">
                  {!item.isVideo && (
                    <button
                      type="button"
                      onClick={() => setHeroFeatured(item)}
                      className={`px-4 py-1.5 text-xs font-cond uppercase tracking-[.12em] border ${
                        item.featuredInHero
                          ? "border-brass text-brass"
                          : "border-white/15 hover:border-brass hover:text-brass"
                      }`}
                    >
                      {item.featuredInHero ? "Hero" : "Set hero"}
                    </button>
                  )}
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
