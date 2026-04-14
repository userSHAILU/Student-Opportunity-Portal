import Notification from '../models/Notification.js';

export const createNotification = async (userId, title, message, type, relatedId = null) => {
  try {
    const notification = new Notification({
      userId,
      title,
      message,
      type,
      relatedId,
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export const getUnreadNotifications = async (userId) => {
  try {
    return await Notification.find({ userId, read: false })
      .sort({ createdAt: -1 })
      .limit(10);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};
