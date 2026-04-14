import Opportunity from '../models/Opportunity.js';
import Certificate from '../models/Certificate.js';
import { validateOpportunity } from '../utils/validators.js';
import { getStudentSkills, calculateSkillMatch } from '../utils/skillAnalyzer.js';

export const createOpportunity = async (req, res) => {
  try {
    const { title, description, skills, deadline, opportunityType, link } = req.body;

    const validation = validateOpportunity(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const opportunity = new Opportunity({
      title,
      description,
      skills: Array.isArray(skills) ? skills : [skills],
      deadline,
      opportunityType,
      link,
      postedBy: req.userId,
      status: 'pending',
    });

    await opportunity.save();

    res.status(201).json({
      success: true,
      message: 'Opportunity created and pending approval',
      opportunity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: 'approved' })
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    // For students, add skill match
    if (req.role === 'student') {
      const certificates = await Certificate.find({ studentId: req.userId });
      const studentSkills = getStudentSkills(certificates);

      const opportunitiesWithMatch = opportunities.map((opp) => ({
        ...opp.toObject(),
        matchPercentage: calculateSkillMatch(studentSkills, opp.skills),
      }));

      return res.json(opportunitiesWithMatch);
    }

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: 'pending' })
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findByIdAndUpdate(
      id,
      { status: 'approved', approvedBy: req.userId },
      { new: true }
    );

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.json({ success: true, message: 'Opportunity approved', opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const opportunity = await Opportunity.findByIdAndUpdate(
      id,
      { status: 'rejected', rejectionReason: reason },
      { new: true }
    );

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.json({ success: true, message: 'Opportunity rejected', opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookmarkOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.bookmarkedBy.includes(req.userId)) {
      opportunity.bookmarkedBy = opportunity.bookmarkedBy.filter(
        (id) => id.toString() !== req.userId
      );
    } else {
      opportunity.bookmarkedBy.push(req.userId);
    }

    await opportunity.save();
    res.json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.likes.includes(req.userId)) {
      opportunity.likes = opportunity.likes.filter(
        (id) => id.toString() !== req.userId
      );
    } else {
      opportunity.likes.push(req.userId);
    }

    await opportunity.save();
    res.json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (
      opportunity.postedBy.toString() !== req.userId &&
      req.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Opportunity.findByIdAndDelete(id);
    res.json({ success: true, message: 'Opportunity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
