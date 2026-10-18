import mongoose from 'mongoose';

const batsmanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    runs: {
      type: Number,
      default: 0,
    },
    balls: {
      type: Number,
      default: 0,
    },
    isStriker: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const bowlerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: '',
    },
    overs: {
      type: Number,
      default: 0,
    },
    runsConceded: {
      type: Number,
      default: 0,
    },
    wickets: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const commentaryItemSchema = new mongoose.Schema(
  {
    over: {
      type: String,
    },
    ball: {
      type: Number,
    },
    text: {
      type: String,
    },
    runs: {
      type: Number,
      default: 0,
    },
    isWicket: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const scoreboardSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      required: [true, 'Match ID is required'],
      unique: true,
    },
    totalRuns: {
      type: Number,
      default: 0,
    },
    wickets: {
      type: Number,
      default: 0,
    },
    overs: {
      type: Number,
      default: 0,
    },
    balls: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    currentInnings: {
      type: Number,
      default: 1,
    },
    battingTeam: {
      type: String,
      trim: true,
    },
    bowlingTeam: {
      type: String,
      trim: true,
    },
    currentBatsmen: [batsmanSchema],
    currentBowler: {
      type: bowlerSchema,
      default: () => ({}),
    },
    commentary: [commentaryItemSchema],
  },
  {
    timestamps: true,
  }
);

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

export default Scoreboard;
