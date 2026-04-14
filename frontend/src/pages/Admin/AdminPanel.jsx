import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getPendingOpportunitiesAPI, approveOpportunityAPI, rejectOpportunityAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Check, X } from 'lucide-react';

const AdminPanel = () => {
  const { data: opportunities, loading, error } = useFetch('/opportunities/pending');
  const [rejectionReason, setRejectionReason] = useState({});

  const handleApprove = async (id) => {
    try {
      await approveOpportunityAPI(id);
      window.location.reload();
    } catch (error) {
      alert('Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectOpportunityAPI(id, rejectionReason[id] || '');
      window.location.reload();
    } catch (error) {
      alert('Failed to reject');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="card">
        <h1 style={{ marginBottom: '16px' }}>✅ All Caught Up!</h1>
        <p className="text--muted">No pending opportunities to moderate.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>⚙️ Admin Moderation Panel</h1>

      <div className="grid grid--1">
        {opportunities.map((opp) => (
          <div key={opp._id} className="card">
            <div className="card__header">
              <h3>{opp.title}</h3>
              <span className="badge badge--warning">Pending Review</span>
            </div>

            <div className="card__body">
              <p>{opp.description}</p>
              <p style={{ marginTop: '12px' }}>
                <strong>Skills:</strong> {opp.skills?.join(', ')}
              </p>
              <p>
                <strong>Posted by:</strong> {opp.postedBy?.name}
              </p>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <textarea
                  className="form-group__textarea"
                  placeholder="Add rejection reason (optional)"
                  value={rejectionReason[opp._id] || ''}
                  onChange={(e) =>
                    setRejectionReason((prev) => ({
                      ...prev,
                      [opp._id]: e.target.value,
                    }))
                  }
                  style={{ marginBottom: '12px' }}
                />

                <div className="flex" style={{ gap: '12px' }}>
                  <button
                    className="btn btn--success"
                    onClick={() => handleApprove(opp._id)}
                    style={{ flex: 1 }}
                  >
                    <Check size={18} />
                    Approve
                  </button>
                  <button
                    className="btn btn--danger"
                    onClick={() => handleReject(opp._id)}
                    style={{ flex: 1 }}
                  >
                    <X size={18} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
