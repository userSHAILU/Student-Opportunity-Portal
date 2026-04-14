import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    skills: [String],
    department: {
      type: String,
      enum: ['CSE', 'ECE', 'EEE', 'Civil', 'Mechanical', 'All'],
    },
    startDate: Date,
    endDate: Date,
    instructor: String,
    registeredStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Training', trainingSchema);
