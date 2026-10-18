import Match from '../models/Match.js';

// @desc    Get all cricket matches
// @route   GET /api/matches
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json({ success: true, count: matches.length, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single match by ID
// @route   GET /api/matches/:id
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    res.json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new match
// @route   POST /api/matches
export const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
