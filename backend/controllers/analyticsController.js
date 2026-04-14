import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import Opportunity from '../models/Opportunity.js';
import {
  getDepartmentSkillAnalysis,
  identifySkillGaps,
} from '../utils/departmentAnalyzer.js';
import { getSkillFrequency } from '../utils/skillAnalyzer.js';

export const getOverallSkillDistribution = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    
    const allSkills = [];
    certificates.forEach((cert) => {
      if (cert.skills) allSkills.push(...cert.skills);
    });

    const skillFrequency = getSkillFrequency(allSkills);

    res.json({
      totalCertificates: certificates.length,
      uniqueSkills: [...new Set(allSkills)].length,
      skillDistribution: skillFrequency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartmentWiseInsights = async (req, res) => {
  try {
    const { department } = req.query;

    // Get all students
    const students = await User.find({ role: 'student' });

    // Get certificates for each student
    const studentsWithCerts = await Promise.all(
      students.map(async (student) => ({
        student,
        certificates: await Certificate.find({ studentId: student._id }),
      }))
    );

    // Get department analysis
    const analysis = getDepartmentSkillAnalysis(studentsWithCerts);

    if (department) {
      return res.json(analysis[department] || {});
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSkillGapAnalysis = async (req, res) => {
  try {
    const { department } = req.query;

    const students = await User.find({ role: 'student', department });
    const studentsWithCerts = await Promise.all(
      students.map(async (student) => ({
        student,
        certificates: await Certificate.find({ studentId: student._id }),
      }))
    );

    const analysis = getDepartmentSkillAnalysis(studentsWithCerts);
    const deptAnalysis = analysis[department];

    // Identify gaps based on top skills overall
    const allCerts = await Certificate.find();
    const topSkillsOverall = new Set();
    allCerts.forEach((cert) => {
      if (cert.skills) {
        cert.skills.slice(0, 3).forEach((skill) => topSkillsOverall.add(skill));
      }
    });

    const gaps = identifySkillGaps(
      deptAnalysis,
      Array.from(topSkillsOverall)
    );

    res.json({
      department,
      totalStudents: deptAnalysis.totalStudents,
      skillGaps: gaps,
      recommendations: gaps.map((gap) => ({
        skill: gap.skill,
        recommendation: `Conduct training for ${gap.skill} in ${department}`,
        priority: gap.percentage > 70 ? 'high' : 'medium',
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrends = async (req, res) => {
  try {
    // Get certificates from last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentCerts = await Certificate.find({
      createdAt: { $gte: thirtyDaysAgo },
    });

    const recentSkills = [];
    recentCerts.forEach((cert) => {
      if (cert.skills) recentSkills.push(...cert.skills);
    });

    const trendingSkills = getSkillFrequency(recentSkills);

    res.json({
      period: 'Last 30 days',
      recentCertificates: recentCerts.length,
      trendingSkills: trendingSkills.slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSuggestedTrainings = async (req, res) => {
  try {
    const { department } = req.query;

    // Get skill gaps
    const students = await User.find({ role: 'student', department });
    const studentsWithCerts = await Promise.all(
      students.map(async (student) => ({
        student,
        certificates: await Certificate.find({ studentId: student._id }),
      }))
    );

    const analysis = getDepartmentSkillAnalysis(studentsWithCerts);
    const deptAnalysis = analysis[department];

    // Suggest trainings for weak skills
    const suggestions = deptAnalysis.weakSkills.slice(0, 5).map((skill) => ({
      skill: skill.skill,
      trainingTitle: `${skill.skill} Fundamentals for ${department}`,
      targetStudents: deptAnalysis.totalStudents - skill.count,
      priority: 'high',
    }));

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
