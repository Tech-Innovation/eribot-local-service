import mongoose from "mongoose";

const readingsSchema = mongoose.Schema(
  {
    cellBarcode: {
      type: Object,
      required: true,
    },
    loadUnitsBarcodes: {
      type: Object,
      required: true,
    },
    isInFirebase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Readings = mongoose.model("Readings", readingsSchema);

export default Readings;
