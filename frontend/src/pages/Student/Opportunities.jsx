import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getApprovedOpportunitiesAPI, bookmarkOpportunityAPI, likeOpportunityAPI } from '../../utils/api';
import OpportunityCard from '../../components/student/OpportunityCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Opportunities = () => {
  const { data: opportunities, loading, error } = useFetch('/opportunities/approved');
  const [filter, setFilter] = useState('all');

  if (loading) return <LoadingSpinner />;

  const filtered =
    filter === 'all'
      ? opportunities
      : opportunities?.filter((opp) => opp.opportunityType === filter);

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>🎯 Opportunities For You</h1>

      <div className="card" style={{ marginBottom: '24px', padding: '12px' }}>
        <div className="flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'internship', 'hackathon', 'project', 'course', 'workshop'].map((type) => (
            <button
              key={type}
              className={`btn ${filter === type ? 'btn--primary' : 'btn--outlne'}`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="card">
          <p className="text--muted">Error loading opportunities</p>
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <div className="card">
          <p className="text--muted">No opportunities found</p>
        </div>
      ) : (
        <div className="grid grid--2">
          {filtered.map((opp) => (
            <OpportunityCard
              key={opp._id}
              opportunity={opp}
              onBookmark={bookmarkOpportunityAPI}
              onLike={likeOpportunityAPI}
              matchPercentage={opp.matchPercentage || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;
