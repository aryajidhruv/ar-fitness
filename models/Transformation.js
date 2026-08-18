import mongoose from "mongoose";

const TransformationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["fat-loss", "muscle-gain", "recomp"],
      required: true
    },
    days: { type: Number, required: true, min: 1 },
    metricLabel: { type: String, default: "Body weight" },
    metricValue: { type: String, default: "" }, // e.g. "-14 kg" or "+8 kg"
    beforeUrl: { type: String, required: true },
    beforePublicId: { type: String, required: true },
    afterUrl: { type: String, required: true },
    afterPublicId: { type: String, required: true },
    videoUrl: { type: String, default: "" },
    videoPublicId: { type: String, default: "" },
    isVideo: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    featuredInHero: { type: Boolean, default: false },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Transformation ||
  mongoose.model("Transformation", TransformationSchema);
