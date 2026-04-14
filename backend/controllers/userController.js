import User from '../models/User.js';
import Certificate from '../models/Certificate.js';
import Opportunity from '../models/Opportunity.js';

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const students = await User.find({
      role: 'student',
      department,
    }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const certificates = await Certificate.find({ studentId });
    const opportunities = await Opportunity.find({
      postedBy: studentId,
      status: 'approved',
    });

    res.json({
      student,
      certificates: certificates.length,
      opportunitiesShared: opportunities.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userId === id && req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
