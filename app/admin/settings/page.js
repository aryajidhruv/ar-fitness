"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UploadField from "@/components/admin/UploadField";

export default function AdminSettingsPage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!form) {
    return (
      <AdminShell>
        <p className="text-bone-dim text-sm">Loading…</p>
      </AdminShell>
    );
  }

  const field = (key, label, hint) => (
    <div>
      <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">{label}</label>
      <input
        value={form[key] || ""}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
      />
      {hint && <p className="text-xs text-bone-dim mt-1">{hint}</p>}
    </div>
  );

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">Settings</h1>
      <p className="text-bone-dim mt-2">
        Controls the WhatsApp link, contact info, and hours shown across the whole site.
      </p>

      <form onSubmit={handleSubmit} className="border border-white/10 p-6 mt-8 space-y-5 max-w-xl">
        {field("gymName", "Gym name")}
        <UploadField
          label="Site logo"
          accept="image/*"
          folder="ar-fitness/logo"
          previewClassName="w-28 h-28"
          previewObjectFit="contain"
          value={form.logoUrl ? { url: form.logoUrl, publicId: form.logoPublicId } : null}
          onChange={async (photo) => {
            const next = {
              ...form,
              logoUrl: photo?.url || "",
              logoPublicId: photo?.publicId || ""
            };
            setForm(next);

            setSaving(true);
            setSaved(false);
            try {
              const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(next)
              });
              if (!res.ok) throw new Error("Failed to save logo");
              setForm(await res.json());
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            } catch (err) {
              console.error(err);
            } finally {
              setSaving(false);
            }
          }}
        />
        <p className="text-xs text-bone-dim -mt-3">
          Shown in the nav, footer, loading screen, and admin. PNG or SVG with a transparent background works best.
        </p>
        {field("ownerName", "Owner name")}
        <UploadField
          label="Owner photo"
          accept="image/*"
          folder="ar-fitness/coach"
          value={
            form.ownerPhotoUrl
              ? { url: form.ownerPhotoUrl, publicId: form.ownerPhotoPublicId }
              : null
          }
          onChange={async (photo) => {
            const next = {
              ...form,
              ownerPhotoUrl: photo?.url || "",
              ownerPhotoPublicId: photo?.publicId || ""
            };
            setForm(next);

            setSaving(true);
            setSaved(false);
            try {
              const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(next)
              });
              if (!res.ok) throw new Error("Failed to save owner photo");
              setForm(await res.json());
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            } catch (err) {
              console.error(err);
            } finally {
              setSaving(false);
            }
          }}
        />
        {field(
          "whatsappNumber",
          "WhatsApp number",
          "Digits only, with country code, no + or spaces — e.g. 919876543210"
        )}
        {field("phone", "Phone number (for the Call button)")}
        {field("address", "Address")}
        {field("city", "City")}
        {field(
          "instagramHandle",
          "Instagram handle",
          "Without @ — e.g. arfitnessdelhi. Used for the Follow button in the Instagram gallery."
        )}
        {field(
          "instagramUrl",
          "Instagram profile URL",
          "Optional full profile link. Leave blank to build it from the handle."
        )}
        {field("hoursWeekday", "Monday–Saturday hours")}
        {field("hoursSunday", "Sunday hours")}
        {field(
          "mapEmbedUrl",
          "Google Maps embed",
          "Paste the full iframe code or just the embed URL from Google Maps → Share → Embed a map"
        )}

        <div className="grid grid-cols-2 gap-4">
          {field("latitude", "Latitude", "Optional, improves local SEO")}
          {field("longitude", "Longitude")}
        </div>

        <div>
          <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">
            SEO description
          </label>
          <textarea
            rows={3}
            value={form.metaDescription || ""}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full bg-iron-2 border border-white/10 px-3 py-2.5 focus:border-brass outline-none"
          />
          <p className="text-xs text-bone-dim mt-1">
            Shown under your listing in Google search results. Keep it under ~155 characters.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 font-cond uppercase tracking-[.14em] font-semibold bg-brass text-iron hover:bg-brass-lite transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
          {saved && <span className="text-sm text-brass">Saved.</span>}
        </div>
      </form>
    </AdminShell>
  );
}
