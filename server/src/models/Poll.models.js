import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


export default Poll = mongoose.model("Poll" , pollSchema);