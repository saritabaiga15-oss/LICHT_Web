import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  SlidersHorizontal, 
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { SAMPLE_VACANCIES, Vacancy } from '../data/mockData';
import './Opportunities.css';

export const Opportunities: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevant');

  const handleSectorChange = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedSectors([]);
    setSelectedTypes([]);
    setKeyword('');
    setLocationSearch('');
  };

  const filteredVacancies = useMemo(() => {
    return SAMPLE_VACANCIES.filter((v: Vacancy) => {
      // Keyword filter
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const matchesTitle = v.title.toLowerCase().includes(query);
        const matchesSummary = v.summary.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary) return false;
      }

      // Location filter
      if (locationSearch.trim()) {
        const locQuery = locationSearch.toLowerCase();
        if (!v.location.toLowerCase().includes(locQuery)) return false;
      }

      // Sector filter
      if (selectedSectors.length > 0) {
        if (!selectedSectors.includes(v.sector)) return false;
      }

      // Type filter
      if (selectedTypes.length > 0) {
        const matchesContract = selectedTypes.includes(v.contract);
        const matchesPattern = selectedTypes.includes(v.workingPattern);
        if (!matchesContract && !matchesPattern) return false;
      }

      return true;
    });
  }, [keyword, locationSearch, selectedSectors, selectedTypes]);

  return (
    <div className="opportunities-page">
      {/* 1. Header & Hero */}
      <section className="opportunities-hero">
        <div className="container">
          <nav className="figma-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="figma-breadcrumb-separator">/</span>
            <Link to="/candidates">Candidates</Link>
            <span className="figma-breadcrumb-separator">/</span>
            <span>Find a job</span>
          </nav>

          <div className="figma-eyebrow">Candidates / Find a job</div>
          <h1 className="opportunities-hero__title">
            Find work that feels right.
          </h1>
          <p className="opportunities-hero__subtitle">
            Explore opportunities in care, healthcare, supported living and business support. Your next chapter starts with you.
          </p>

          {/* Search Bar */}
          <div className="opp-search-bar">
            <div className="opp-search-group">
              <label htmlFor="opp-keyword" className="opp-search-label">Job title or keyword</label>
              <input 
                type="text" 
                id="opp-keyword"
                placeholder="e.g. Care assistant"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="opp-search-input"
              />
            </div>

            <div className="opp-search-group">
              <label htmlFor="opp-location" className="opp-search-label">Location</label>
              <input 
                type="text" 
                id="opp-location"
                placeholder="Town, city or postcode"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="opp-search-input"
              />
            </div>

            <button type="button" className="btn-pill-green opp-search-btn">
              Search jobs
            </button>
          </div>

          {/* Illustrative Notice Banner */}
          <div className="opp-notice-banner">
            <Info size={18} className="opp-notice-icon" />
            <div>
              <strong className="opp-notice-title">Illustrative opportunities</strong>
              <p className="opp-notice-text">
                These example roles demonstrate the candidate experience; they are not live vacancies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main 2-Column: Filters Sidebar + Results Grid */}
      <section className="opp-main-section">
        <div className="container opp-main-grid">
          {/* Left Column: Filter Sidebar */}
          <aside className="opp-filter-sidebar" aria-label="Job filters">
            <div className="filter-header">
              <h3 className="filter-title">Filter opportunities</h3>
              <SlidersHorizontal size={18} color="#475467" />
            </div>

            {/* Sector Filters */}
            <div className="filter-group">
              <h4 className="filter-group-title">Sector</h4>
              <div className="filter-checkbox-list">
                {['Care homes', 'Healthcare', 'Supported living', 'Corporate'].map((sector) => (
                  <label key={sector} className="filter-checkbox-item">
                    <input 
                      type="checkbox"
                      checked={selectedSectors.includes(sector)}
                      onChange={() => handleSectorChange(sector)}
                    />
                    <span>{sector}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type Filters */}
            <div className="filter-group">
              <h4 className="filter-group-title">Job type</h4>
              <div className="filter-checkbox-list">
                {['Temporary', 'Permanent', 'Full time', 'Part time'].map((type) => (
                  <label key={type} className="filter-checkbox-item">
                    <input 
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={clearFilters}
              className="clear-filters-btn"
            >
              Clear all filters <span className="arrow-up-right">↗</span>
            </button>
          </aside>

          {/* Right Column: Roles List */}
          <main className="opp-results-col">
            <div className="opp-results-header">
              <span className="opp-results-count">
                {filteredVacancies.length} example {filteredVacancies.length === 1 ? 'opportunity' : 'opportunities'}
              </span>

              <div className="opp-sort-wrap">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="opp-sort-select"
                >
                  <option value="relevant">Most relevant</option>
                  <option value="recent">Most recent</option>
                </select>
                <ChevronDown size={14} className="sort-chevron" />
              </div>
            </div>

            {/* Job Cards */}
            <div className="opp-cards-list">
              {filteredVacancies.length === 0 ? (
                <div className="no-vacancies-box">
                  <p>No matching opportunities found for your criteria.</p>
                  <button type="button" onClick={clearFilters} className="btn-pill-outline" style={{ marginTop: '12px' }}>
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredVacancies.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-card__top">
                      <span className="job-badge">{job.sector}</span>
                      <span className="job-ref">{job.id}</span>
                    </div>

                    <h3 className="job-card__title">{job.title}</h3>

                    <div className="job-card__meta">
                      <span className="job-meta-item">
                        <MapPin size={15} className="job-meta-icon" />
                        {job.location}
                      </span>
                      <span className="job-meta-item">
                        <Briefcase size={15} className="job-meta-icon" />
                        {job.contract}
                      </span>
                      <span className="job-meta-item">
                        <Clock size={15} className="job-meta-icon" />
                        {job.workingPattern}
                      </span>
                    </div>

                    <p className="job-card__desc">{job.summary}</p>

                    <div className="job-card__footer">
                      <span className="job-card__pay">{job.pay}</span>
                      <Link to={`/opportunities/${job.id}`} className="job-card__link">
                        View role <span className="arrow-up-right">↗</span>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="opp-pagination">
              <button type="button" className="pagination-btn pagination-btn--nav" aria-label="Previous page" disabled>
                <ChevronLeft size={16} />
              </button>
              <button type="button" className="pagination-btn pagination-btn--active">
                1
              </button>
              <button type="button" className="pagination-btn pagination-btn--nav" aria-label="Next page" disabled>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Not Seeing Your Next Role Callout */}
            <div className="not-seeing-role-card">
              <h3 className="not-seeing-title">Not seeing your next role?</h3>
              <p className="not-seeing-desc">
                Send us your CV and tell us what you're looking for.
              </p>
              <Link to="/submit-cv" className="btn-pill-white not-seeing-btn">
                Register your interest <span className="arrow-up-right">↗</span>
              </Link>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};
