export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const truncateText = (text, length = 100) => {
  return text && text.length > length ? text.substring(0, length) + '...' : text;
};

export const calculateMatchPercentage = (studentSkills, opportunitySkills) => {
  if (!opportunitySkills || opportunitySkills.length === 0) return 0;

  const matches = opportunitySkills.filter((skill) =>
    studentSkills.some((s) => s.toLowerCase() === skill.toLowerCase())
  ).length;

  return Math.round((matches / opportunitySkills.length) * 100);
};
