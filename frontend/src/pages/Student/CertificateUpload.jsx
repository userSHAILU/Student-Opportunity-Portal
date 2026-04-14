import React, { useState } from 'react';
import { uploadCertificateAPI } from '../../utils/api';
import { SKILLS } from '../../utils/constants';
import Notification from '../../components/common/Notification';

const CertificateUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    date: '',
    skills: [],
    description: '',
  });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setNotification({ type: 'error', message: 'Title is required' });
      return;
    }

    if (!formData.organization.trim()) {
      setNotification({ type: 'error', message: 'Organization is required' });
      return;
    }

    if (formData.skills.length === 0) {
      setNotification({ type: 'error', message: 'Select at least one skill' });
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('description', formData.description);
      formData.skills.forEach((skill, index) => {
        formDataToSend.append(`skills[${index}]`, skill);
      });

      await uploadCertificateAPI(formDataToSend);

      setNotification({ type: 'success', message: 'Certificate uploaded successfully!' });
      setFormData({
        title: '',
        organization: '',
        date: '',
        skills: [],
        description: '',
      });

      setTimeout(() => {
        window.location.href = '/student/certificates';
      }, 2000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Upload failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '700px' }}>
      <h1 style={{ marginBottom: '24px' }}>📜 Upload Certificate</h1>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-group__label">Certificate Title *</label>
          <input
            type="text"
            className="form-group__input"
            placeholder="e.g., React Advanced"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Organization *</label>
          <input
            type="text"
            className="form-group__input"
            placeholder="e.g., Udemy, Coursera"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Date Obtained</label>
          <input
            type="date"
            className="form-group__input"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Description</label>
          <textarea
            className="form-group__textarea"
            placeholder="Add details about your certificate..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Select Skills *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {SKILLS.map((skill) => (
              <label
                key={skill}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  border: formData.skills.includes(skill)
                    ? '2px solid var(--primary)'
                    : '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: formData.skills.includes(skill) ? '#eef2ff' : 'white',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                  style={{ cursor: 'pointer' }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn--primary btn--lg"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Uploading...' : '📤 Upload Certificate'}
        </button>
      </form>
    </div>
  );
};

export default CertificateUpload;
