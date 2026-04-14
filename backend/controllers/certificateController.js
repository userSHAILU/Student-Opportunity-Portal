import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import { validateCertificate } from '../utils/validators.js';

export const uploadCertificate = async (req, res) => {
  try {
    const { title, organization, date, skills, description } = req.body;

    const validation = validateCertificate(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const certificate = new Certificate({
      studentId: req.userId,
      title,
      organization,
      date,
      skills: Array.isArray(skills) ? skills : [skills],
      description,
      certificateURL: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await certificate.save();

    res.status(201).json({
      success: true,
      message: 'Certificate uploaded successfully',
      certificate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ studentId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    if (certificate.studentId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('studentId', 'name email department')
      .sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
