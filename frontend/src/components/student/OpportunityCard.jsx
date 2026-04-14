import React from 'react';
import { Star, Heart, Bookmark } from 'lucide-react';
import { formatDate } from '../../utils/constants';

const OpportunityCard = ({
  opportunity,
  onBookmark,
  onLike,
  matchPercentage,
  showActions = true,
}) => {
  const isBookmarked = opportunity.bookmarkedBy?.includes(localStorage.getItem('userId'));
  const isLiked = opportunity.likes?.includes(localStorage.getItem('userId'));

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h3>{opportunity.title}</h3>
          <div className="flex-center" style={{ gap: '12px', marginTop: '8px' }}>
            <span className="badge badge--primary">{opportunity.opportunityType}</span>
            {matchPercentage !== undefined && (
              <span
                className="badge"
                style={{
                  background: matchPercentage >= 70 ? '#dcfce7' : '#fef08a',
                  color: matchPercentage >= 70 ? '#166534' : '#92400e',
                }}
              >
                {matchPercentage}% Match
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card__body">
        <p>{opportunity.description}</p>

        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>Skills:</strong> {opportunity.skills?.join(', ')}
          </p>
          {opportunity.deadline && (
            <p style={{ marginBottom: '8px' }}>
              <strong>Deadline:</strong> {formatDate(opportunity.deadline)}
            </p>
          )}
          {opportunity.link && (
            <p>
              <a
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: '500' }}
              >
                View Details →
              </a>
            </p>
          )}
        </div>

        {showActions && (
          <div className="flex" style={{ gap: '8px', marginTop: '16px' }}>
            <button
              className="btn btn--outlne"
              onClick={() => onBookmark?.(opportunity._id)}
              style={{ flex: 1 }}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              className="btn btn--outlne"
              onClick={() => onLike?.(opportunity._id)}
              style={{ flex: 1 }}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              {opportunity.likes?.length || 0}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard;
