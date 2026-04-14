// Calculate skill match between student skills and opportunity skills
export const calculateSkillMatch = (studentSkills, opportunitySkills) => {
  if (!opportunitySkills || opportunitySkills.length === 0) return 0;

  const matches = opportunitySkills.filter((skill) =>
    studentSkills.some(
      (s) => s.toLowerCase() === skill.toLowerCase()
    )
  ).length;

  return Math.round((matches / opportunitySkills.length) * 100);
};

// Get student's total skills from certificates
export const getStudentSkills = (certificates) => {
  const skills = [];
  certificates.forEach((cert) => {
    if (cert.skills) {
      skills.push(...cert.skills);
    }
  });
  return [...new Set(skills)]; // Remove duplicates
};

// Get skill frequency count
export const getSkillFrequency = (skills) => {
  const frequency = {};
  skills.forEach((skill) => {
    frequency[skill] = (frequency[skill] || 0) + 1;
  });
  return Object.entries(frequency)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);
};
