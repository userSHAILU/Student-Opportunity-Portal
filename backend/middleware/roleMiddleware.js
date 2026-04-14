export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({
        message: `Access denied. Only ${roles.join(', ')} can access this.`,
      });
    }
    next();
  };
};
