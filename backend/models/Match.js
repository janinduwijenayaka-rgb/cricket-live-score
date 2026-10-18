import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    teamA: {
      type: String,
      required: [true, 'Team A name is required'],
      trim: true,
    },
    teamB: {
      type: String,
      required: [true, 'Team B name is required'],
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    matchType: {
      type: String,
      enum: ['T20', 'ODI', 'Test'],
      default: 'T20',
      trim: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'finished'],
      default: 'upcoming',
    },
    tossWinner: {
      type: String,
      trim: true,
    },
    tossDecision: {
      type: String,
      enum: ['bat', 'bowl'],
    },
    matchDate: {
      type: Date,
      default: Date.now,
    },
    summary: {
      type: String,
      trim: true,
    },
    winner: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model('Match', matchSchema);

export default Match;
