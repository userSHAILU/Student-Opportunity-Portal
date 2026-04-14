import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { deleteCertificateAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/constants';
import { Trash2 } from 'lucide-react';

const MyCertificates = () => {
  const { data: certificates, loading, error } = useFetch('/certificates/my');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificateAPI(id);
        window.location.reload();
      } catch (error) {
        alert('Failed to delete certificate');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="card">
        <p className="text--muted">Error loading certificates</p>
      </div>
    );
  }

  if (!certificates || certificates.length === 0) {
    return (
      <div className="card">
        <h2 style={{ marginBottom: '16px' }}>📜 My Certificates</h2>
        <p className="text--muted">No certificates uploaded yet.</p>
        <a href="/student/certificate-upload" className="btn btn--primary" style={{ marginTop: '16px' }}>
          Upload Certificate
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>📜 My Certificates</h1>

      <div className="grid grid--2">
        {certificates.map((cert) => (
          <div key={cert._id} className="card">
            <div className="card__header">
              <h3>{cert.title}</h3>
              <button
                onClick={() => handleDelete(cert._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--danger)',
                }}
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="card__body">
              <p>
                <strong>Organization:</strong> {cert.organization}
              </p>
              {cert.date && (
                <p>
                  <strong>Date:</strong> {formatDate(cert.date)}
                </p>
              )}
              {cert.description && (
                <p>
                  <strong>Description:</strong> {cert.description}
                </p>
              )}

              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <p style={{ marginBottom: '8px' }}>
                  <strong>Skills:</strong>
                </p>
                <div className="flex" style={{ flexWrap: 'wrap', gap: '8px' }}>
                  {cert.skills?.map((skill) => (
                    <span key={skill} className="badge badge--primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
