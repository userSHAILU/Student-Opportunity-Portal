import Training from '../models/Training.js';

export const createTraining = async (req, res) => {
  try {
    const { title, description, skills, department, startDate, endDate, instructor } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const training = new Training({
      title,
      description,
      skills: Array.isArray(skills) ? skills : [skills],
      department,
      startDate,
      endDate,
      instructor,
      createdBy: req.userId,
    });

    await training.save();

    res.status(201).json({
      success: true,
      message: 'Training created successfully',
      training,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainings = async (req, res) => {
  try {
    const { department } = req.query;

    let query = {};
    if (department) {
      query = { $or: [{ department }, { department: 'All' }] };
    }

    const trainings = await Training.find(query)
      .populate('createdBy', 'name')
      .sort({ startDate: 1 });

    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerForTraining = async (req, res) => {
  try {
    const { trainingId } = req.params;

    const training = await Training.findById(trainingId);
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    if (!training.registeredStudents.includes(req.userId)) {
      training.registeredStudents.push(req.userId);
      await training.save();
    }

    res.json({ success: true, message: 'Registered for training', training });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({
      registeredStudents: req.userId,
    }).sort({ startDate: 1 });

    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const training = await Training.findById(id);

    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    if (training.createdBy.toString() !== req.userId && req.role !== 'tp') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Training.findByIdAndDelete(id);
    res.json({ success: true, message: 'Training deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
