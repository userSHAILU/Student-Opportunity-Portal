import { DEPARTMENTS } from '../config/constants.js';

// Get department-wise skill distribution
export const getDepartmentSkillAnalysis = (studentsWithCerts) => {
  const analysis = {};

  DEPARTMENTS.forEach((dept) => {
    analysis[dept] = {
      totalStudents: 0,
      skills: {},
      topSkills: [],
      weakSkills: [],
    };
  });

  studentsWithCerts.forEach(({ student, certificates }) => {
    const dept = student.department;
    if (!analysis[dept]) return;

    analysis[dept].totalStudents += 1;

    certificates.forEach((cert) => {
      if (cert.skills) {
        cert.skills.forEach((skill) => {
          analysis[dept].skills[skill] =
            (analysis[dept].skills[skill] || 0) + 1;
        });
      }
    });
  });

  // Sort and identify top and weak skills
  Object.keys(analysis).forEach((dept) => {
    const skills = Object.entries(analysis[dept].skills)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);

    analysis[dept].topSkills = skills.slice(0, 5);
    analysis[dept].weakSkills = skills.slice(-5).reverse();
  });

  return analysis;
};

// Identify skill gaps in a department
export const identifySkillGaps = (departmentAnalysis, targetSkills) => {
  const gaps = [];

  targetSkills.forEach((skill) => {
    const skillCount = departmentAnalysis.skills[skill] || 0;
    if (skillCount === 0 || skillCount < departmentAnalysis.totalStudents * 0.3) {
      gaps.push({
        skill,
        gap: departmentAnalysis.totalStudents - skillCount,
        percentage: 100 - Math.round((skillCount / departmentAnalysis.totalStudents) * 100),
      });
    }
  });

  return gaps.sort((a, b) => b.gap - a.gap);
};
