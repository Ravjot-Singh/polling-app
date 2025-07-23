import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    optionValue: {
      type: String,
      required: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    votedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      
    },
  },
  { timestamps: true }
);


export const Option = mongoose.model("Option" , optionSchema);