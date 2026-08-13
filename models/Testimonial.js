import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tenure: { type: String, default: "" }, // e.g. "Member · 2 years"
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
