import asyncHandler from "express-async-handler";
import Readings from "../models/Readings.js";

// @description     Get all Readings
// @route           GET /api/readings
// @access          Public
const getReadings = asyncHandler(async (req, res) => {
  const { isInFirebase, startDate, endDate } = req.query;

  if (isInFirebase) {
    const readings = await Readings.find({ isInFirebase: isInFirebase });

    res.json(readings);
    return;
  }

  let query = {};

  if (startDate && endDate) {
    query = {
      createdAt: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    };
  }

  const readings = await Readings.find(query).sort({ createdAt: -1 });

  res.json(readings);
});

// @description      Get a single Readings
// @route            GET /api/readings/:id
// @access           Public
const getReadingsById = asyncHandler(async (req, res) => {
  const readings = await Readings.findById(req.params.id);

  if (readings) {
    res.json(readings);
  } else {
    res.status(404);
    throw new Error("Readings not found");
  }
});

// @description      Create a single Readings
// @route            POST /api/readings
// @access           Public
const addReadings = asyncHandler(async (req, res) => {
  const { cellBarcode, loadUnitsBarcodes } = req.body;
  const readings = new Readings({ cellBarcode, loadUnitsBarcodes });
  const savedReadings = await readings.save();

  res.status(201).json(savedReadings);
});

// @description      Update a single Readings
// @route            PUT /api/readings/:id
// @access           Public
const updateReadings = asyncHandler(async (req, res) => {
  const { cellBarcode, loadUnitsBarcodes, isInFirebase } = req.body;
  const readings = await Readings.findById(req.params.id);

  if (readings) {
    readings.cellBarcode = cellBarcode;
    readings.loadUnitsBarcodes = loadUnitsBarcodes;
    readings.isInFirebase = isInFirebase;

    const updatedReadings = await readings.save();
    res.json(updatedReadings);
  } else {
    res.status(404);
    throw new Error("Readings not found");
  }
});

export { getReadings, getReadingsById, addReadings, updateReadings };
