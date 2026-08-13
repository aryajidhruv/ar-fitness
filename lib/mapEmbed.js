export function parseMapEmbedInput(input) {
  const value = String(input || "").trim();
  if (!value) return "";

  const srcMatch = value.match(/\bsrc=["']([^"']+)["']/i);
  if (srcMatch) return srcMatch[1];

  if (value.startsWith("https://www.google.com/maps/embed")) {
    return value;
  }

  return value;
}

export function parseMapCoordinates(embedUrl) {
  if (!embedUrl) return { latitude: null, longitude: null };

  const latMatch = embedUrl.match(/!3d(-?\d+\.?\d*)/);
  const lngMatch = embedUrl.match(/!2d(-?\d+\.?\d*)/);

  return {
    latitude: latMatch ? Number(latMatch[1]) : null,
    longitude: lngMatch ? Number(lngMatch[1]) : null
  };
}
