const SETTINGS_FIELDS = [
  "gymName",
  "ownerName",
  "ownerPhotoUrl",
  "ownerPhotoPublicId",
  "whatsappNumber",
  "phone",
  "address",
  "city",
  "mapEmbedUrl",
  "latitude",
  "longitude",
  "hoursWeekday",
  "hoursSunday",
  "metaDescription",
  "instagramHandle",
  "instagramUrl"
];

function parseCoordinate(value) {
  if (value === "" || value == null) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export function buildSettingsUpdate(body) {
  const update = {};

  for (const key of SETTINGS_FIELDS) {
    if (!(key in body)) continue;

    if (key === "latitude" || key === "longitude") {
      update[key] = parseCoordinate(body[key]);
      continue;
    }

    update[key] = body[key] ?? "";
  }

  return update;
}
