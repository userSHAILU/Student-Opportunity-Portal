export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validateCertificate = (certificate) => {
  if (!certificate.title || certificate.title.trim() === '') {
    return { valid: false, message: 'Title is required' };
  }
  if (!certificate.organization || certificate.organization.trim() === '') {
    return { valid: false, message: 'Organization is required' };
  }
  if (!certificate.date) {
    return { valid: false, message: 'Date is required' };
  }
  if (!certificate.skills || certificate.skills.length === 0) {
    return { valid: false, message: 'At least one skill is required' };
  }
  return { valid: true };
};

export const validateOpportunity = (opportunity) => {
  if (!opportunity.title || opportunity.title.trim() === '') {
    return { valid: false, message: 'Title is required' };
  }
  if (!opportunity.skills || opportunity.skills.length === 0) {
    return { valid: false, message: 'At least one skill is required' };
  }
  return { valid: true };
};
