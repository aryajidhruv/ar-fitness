export const GALLERY_SLOTS = [
  {
    slot: "floor-01",
    label: "FLOOR-01",
    span: "tall",
    order: 0,
    ratio: 267 / 312,
    ratioLabel: "9:10 portrait",
    gridClass: "gallery-slot-floor",
    tone: "warm"
  },
  {
    slot: "rack-area",
    label: "RACK-AREA",
    span: "wide",
    order: 1,
    ratio: 546 / 150,
    ratioLabel: "11:3 landscape",
    gridClass: "gallery-slot-rack",
    tone: "warm"
  },
  {
    slot: "cardio-zone",
    label: "CARDIO-ZONE",
    span: "normal",
    order: 2,
    ratio: 267 / 150,
    ratioLabel: "16:9 landscape",
    gridClass: "gallery-slot-cardio",
    tone: "neutral"
  },
  {
    slot: "class-01",
    label: "CLASS-01",
    span: "normal",
    order: 3,
    ratio: 267 / 150,
    ratioLabel: "16:9 landscape",
    gridClass: "gallery-slot-class",
    tone: "cool"
  },
  {
    slot: "deadlift-platform",
    label: "DEADLIFT-PLATFORM",
    span: "tall",
    order: 4,
    ratio: 267 / 312,
    ratioLabel: "9:10 portrait",
    gridClass: "gallery-slot-deadlift",
    tone: "neutral"
  },
  {
    slot: "dumbbells",
    label: "DUMBBELLS",
    span: "normal",
    order: 5,
    ratio: 267 / 150,
    ratioLabel: "16:9 landscape",
    gridClass: "gallery-slot-dumbbells",
    tone: "neutral"
  },
  {
    slot: "reception",
    label: "RECEPTION",
    span: "wide",
    order: 6,
    ratio: 546 / 150,
    ratioLabel: "11:3 landscape",
    gridClass: "gallery-slot-reception",
    tone: "warm"
  }
];

export const GALLERY_SLOT_IDS = GALLERY_SLOTS.map((s) => s.slot);

export function getGallerySlot(slot) {
  return GALLERY_SLOTS.find((s) => s.slot === slot);
}

export function sortGalleryItems(items) {
  const order = Object.fromEntries(GALLERY_SLOTS.map((s, i) => [s.slot, i]));
  return [...items].sort((a, b) => (order[a.slot] ?? 99) - (order[b.slot] ?? 99));
}
