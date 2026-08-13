"use client";

import { useEffect, useState } from "react";
import { InstagramEmbed } from "@/components/InstagramEmbedClient";
import AdminShell from "@/components/admin/AdminShell";

const EMPTY = {
  postUrl: "",
  published: true
};

export default function AdminInstagramPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/instagram?all=1");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.postUrl.trim()) {
      setError("Paste the Instagram post or reel URL.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postUrl: form.postUrl.trim(),
          published: form.published
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setForm(EMPTY);
      setMessage("Instagram post saved.");
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this Instagram post from the homepage?")) return;
    await fetch(`/api/instagram/${id}`, { method: "DELETE" });
    await load();
  }

  async function togglePublished(item) {
    await fetch(`/api/instagram/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !item.published })
    });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">Instagram</h1>
      <p className="text-bone-dim mt-2">
        Paste public Instagram post or reel URLs. The homepage embeds them with{" "}
        <code className="text-bone">react-social-media-embed</code> — no API keys or image uploads needed.
      </p>

      {error && <p className="text-sm text-[#e07a5f] mt-4">{error}</p>}
      {message && <p className="text-sm text-brass mt-4">{message}</p>}

      <form onSubmit={handleSubmit} className="border border-white/10 p-6 mt-8 space-y-5 max-w-2xl">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-brass">Add a post</h2>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            Instagram post URL
          </label>
          <input
            value={form.postUrl}
            onChange={(e) => setForm({ ...form, postUrl: e.target.value })}
            placeholder="https://www.instagram.com/p/… or /reel/…"
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
          />
          <p className="text-xs text-bone-dim mt-1">
            Open a post on Instagram → … → Copy link. The post must be public.
          </p>
        </div>

        {form.postUrl.trim() && (
          <div>
            <p className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim mb-3">Preview</p>
            <div className="instagram-embed-tile">
              <InstagramEmbed url={form.postUrl.trim()} width="100%" />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save post"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-bone-dim mb-4">
          Homepage posts ({items.length})
        </h2>

        {loading ? (
          <p className="text-bone-dim text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-bone-dim text-sm">No Instagram posts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item._id} className="border border-white/10 p-4 space-y-3">
                <div className="instagram-embed-tile">
                  <InstagramEmbed url={item.postUrl} width="100%" />
                </div>
                <p className="text-xs text-bone-dim break-all">{item.postUrl}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublished(item)}
                    className="px-3 py-1 text-xs font-cond uppercase tracking-[.1em] border border-white/15 hover:border-brass"
                  >
                    {item.published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 text-xs font-cond uppercase tracking-[.1em] border border-white/15 hover:border-[#e07a5f] hover:text-[#e07a5f]"
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
