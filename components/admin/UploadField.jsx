"use client";

import { useRef, useState } from "react";

function checkAspectRatio(file, expectedRatio, ratioLabel, tolerance = 0.12) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      const actual = img.width / img.height;
      const delta = Math.abs(actual - expectedRatio) / expectedRatio;
      if (delta > tolerance) {
        reject(
          new Error(
            `This slot needs a ${ratioLabel || "matching"} photo. Your image is ${img.width}×${img.height}px.`
          )
        );
        return;
      }
      resolve();
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image dimensions."));
    };

    img.src = url;
  });
}

export default function UploadField({
  label,
  accept = "image/*",
  value,
  onChange,
  folder = "ar-fitness",
  expectedRatio,
  ratioLabel,
  previewClassName = "w-28 aspect-[3/4]",
  previewObjectFit = "cover"
}) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError("");

    try {
      if (expectedRatio) {
        await checkAspectRatio(file, expectedRatio, ratioLabel);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange({ url: data.url, publicId: data.publicId });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="font-cond uppercase tracking-[.12em] text-xs text-bone-dim block mb-1.5">{label}</label>
      {ratioLabel && (
        <p className="text-xs text-bone-dim mb-2">Use a {ratioLabel} photo for this slot.</p>
      )}
      {value?.url && (
        <div className={`mb-2 border border-white/10 overflow-hidden ${previewClassName}`}>
          {accept.startsWith("video") ? (
            <video src={value.url} className="w-full h-full object-cover" muted />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.url} alt="" className={`w-full h-full ${previewObjectFit === "contain" ? "object-contain p-2" : "object-cover"}`} />
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        disabled={busy}
        className="text-sm text-bone-dim file:mr-3 file:px-3 file:py-1.5 file:border file:border-white/15 file:bg-iron-2 file:text-bone file:font-cond file:uppercase file:tracking-[.1em] file:text-xs"
      />
      {busy && <p className="text-xs text-brass mt-1">Uploading…</p>}
      {error && <p className="text-xs text-[#e07a5f] mt-1">{error}</p>}
    </div>
  );
}
