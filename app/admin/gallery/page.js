"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UploadField from "@/components/admin/UploadField";
import { GALLERY_SLOTS } from "@/lib/gallerySlots";

const PREVIEW_CLASS = {
  tall: "w-24 aspect-[9/10]",
  wide: "w-full max-w-[280px] aspect-[11/3]",
  large: "w-full max-w-[220px] aspect-[7/4]",
  normal: "w-full max-w-[180px] aspect-[16/9]"
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({});
  const [savingSlot, setSavingSlot] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/gallery?all=1");
    const data = await res.json();
    setItems(data);

    const nextDrafts = {};
    for (const slot of GALLERY_SLOTS) {
      const item = data.find((entry) => entry.slot === slot.slot);
      nextDrafts[slot.slot] = {
        alt: item?.alt || "",
        photo: item ? { url: item.url, publicId: item.publicId } : null
      };
    }
    setDrafts(nextDrafts);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveSlot(slotConfig) {
    const draft = drafts[slotConfig.slot];
    setError("");

    if (!draft?.photo) {
      setError(`Upload a photo for ${slotConfig.label}.`);
      return;
    }
    if (!draft.alt.trim()) {
      setError(`Add a description for ${slotConfig.label}.`);
      return;
    }

    setSavingSlot(slotConfig.slot);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: slotConfig.slot,
          url: draft.photo.url,
          publicId: draft.photo.publicId,
          alt: draft.alt,
          published: true
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSlot("");
    }
  }

  async function handleDelete(slot) {
    const item = items.find((entry) => entry.slot === slot);
    if (!item || !confirm("Remove this gym photo?")) return;
    await fetch(`/api/gallery/${item._id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">Inside the gym</h1>
      <p className="text-bone-dim mt-2">
        Upload one photo for each homepage slot. Each slot only accepts the matching aspect ratio.
      </p>

      {error && <p className="text-sm text-[#e07a5f] mt-4">{error}</p>}

      {loading ? (
        <p className="text-bone-dim text-sm mt-8">Loading…</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5 mt-8">
          {GALLERY_SLOTS.map((slot) => {
            const draft = drafts[slot.slot] || { alt: "", photo: null };
            const saved = items.find((entry) => entry.slot === slot.slot);

            return (
              <div key={slot.slot} className="border border-white/10 p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-cond uppercase tracking-[.14em] text-sm text-brass">{slot.label}</h2>
                    <p className="text-xs text-bone-dim mt-1">
                      Grid: {slot.span.replace("-", " ")} · Ratio: {slot.ratioLabel}
                    </p>
                  </div>
                  {saved && (
                    <button
                      type="button"
                      onClick={() => handleDelete(slot.slot)}
                      className="px-3 py-1 text-xs font-cond uppercase tracking-[.1em] border border-white/15 hover:border-[#e07a5f] hover:text-[#e07a5f]"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <UploadField
                  label="Photo"
                  accept="image/*"
                  folder="ar-fitness/gallery"
                  expectedRatio={slot.ratio}
                  ratioLabel={slot.ratioLabel}
                  previewClassName={PREVIEW_CLASS[slot.span]}
                  value={draft.photo}
                  onChange={(photo) =>
                    setDrafts({
                      ...drafts,
                      [slot.slot]: { ...draft, photo }
                    })
                  }
                />

                <div>
                  <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
                    Description (SEO alt text)
                  </label>
                  <input
                    value={draft.alt}
                    onChange={(e) =>
                      setDrafts({
                        ...drafts,
                        [slot.slot]: { ...draft, alt: e.target.value }
                      })
                    }
                    placeholder={`Describe the ${slot.label.toLowerCase()} area`}
                    className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={savingSlot === slot.slot}
                  onClick={() => saveSlot(slot)}
                  className="px-5 py-2 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
                >
                  {savingSlot === slot.slot ? "Saving…" : saved ? "Update photo" : "Save photo"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
