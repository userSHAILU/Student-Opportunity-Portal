export const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'Civil', 'Mechanical'];

export const ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
  TP: 'tp',
};

export const OPPORTUNITY_TYPES = [
  'internship',
  'hackathon',
  'project',
  'course',
  'workshop',
];

export const SKILLS = [
  'Web Development',
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'MongoDB',
  'AI/ML',
  'Data Science',
  'Java',
  'C++',
  'Android Development',
  'iOS Development',
  'Cloud Computing',
  'DevOps',
  'UI/UX Design',
  'Graphic Design',
  'Digital Marketing',
];

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getColorByPercentage = (percentage) => {
  if (percentage >= 80) return '#10b981'; // green
  if (percentage >= 60) return '#3b82f6'; // blue
  if (percentage >= 40) return '#f59e0b'; // amber
  return '#ef4444'; // red
};
