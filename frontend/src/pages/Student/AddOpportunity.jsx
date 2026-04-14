import React, { useState } from 'react';
import { createOpportunityAPI } from '../../utils/api';
import { OPPORTUNITY_TYPES, SKILLS } from '../../utils/constants';
import Notification from '../../components/common/Notification';

const AddOpportunity = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [],
    deadline: '',
    opportunityType: 'internship',
    link: '',
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

    if (formData.skills.length === 0) {
      setNotification({ type: 'error', message: 'Select at least one skill' });
      return;
    }

    try {
      setLoading(true);
      await createOpportunityAPI(formData);
      setNotification({ type: 'success', message: 'Opportunity posted! Awaiting approval.' });
      setTimeout(() => {
        window.location.href = '/student/opportunities';
      }, 2000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Failed to post opportunity',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '700px' }}>
      <h1 style={{ marginBottom: '24px' }}>📝 Share an Opportunity</h1>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-group__label">Opportunity Title *</label>
          <input
            type="text"
            className="form-group__input"
            placeholder="e.g., React Developer Internship"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Description</label>
          <textarea
            className="form-group__textarea"
            placeholder="Describe the opportunity..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Opportunity Type *</label>
          <select
            className="form-group__select"
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
          >
            {OPPORTUNITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-group__label">Deadline</label>
          <input
            type="date"
            className="form-group__input"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Link (optional)</label>
          <input
            type="url"
            className="form-group__input"
            placeholder="https://..."
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-group__label">Required Skills *</label>
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
          {loading ? 'Posting...' : '🚀 Post Opportunity'}
        </button>
      </form>
    </div>
  );
};

export default AddOpportunity;
