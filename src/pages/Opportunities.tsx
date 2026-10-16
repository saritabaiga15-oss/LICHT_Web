import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  X, 
  FileText,
  ArrowRight,
  Info
} from 'lucide-react';
import { SAMPLE_VACANCIES, Vacancy } from '../data/mockData';
import { VacancyCard } from '../components/recruitment/VacancyCard';
import './Opportunities.css';

export const Opportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  // Filter logic
  const filteredVacancies = useMemo(() => {
    return SAMPLE_VACANCIES.filter(item => {
      const matchesSearch = 
        searchTerm.trim() === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector = 
        selectedSector === 'All' || item.sector === selectedSector;

      const matchesType = 
        selectedType === 'All' || item.type === selectedType;

      const matchesLocation = 
        selectedLocation === 'All' || item.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesSector && matchesType && matchesLocation;
    });
  }, [searchTerm, selectedSector, selectedType, selectedLocation]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSector('All');
    setSelectedType('All');
    setSelectedLocation('All');
  };

  return (
    <div className="opportunities-page">
      {/* Opportunities Hero */}
      <section className="opportunities-hero">
        <div className="container text-center max-w-800">
          <div className="figma-hero-eyebrow center-eyebrow">
            <span className="figma-gold-dash" />
            <span>OPPORTUNITIES</span>
          </div>
          <h1 className="opportunities-hero-title">
            Current Vacancies & <br />
            <span className="hero-text-gold">Career Opportunities</span>
          </h1>
          <p className="opportunities-hero-lead">
            Explore active openings across residential care homes, healthcare units, and corporate partners throughout the UK.
          </p>
        </div>
      </section>

      {/* Demo Notice Banner */}
      <div className="demo-advisory-band">
        <div className="container advisory-content">
          <Info size={16} className="gold-icon" />
          <span>
            <strong>Representative Demonstration Board:</strong> Published roles below illustrate active vacancy types supported by LICHT. Candidates can express interest directly or submit their CV for immediate consideration across active client instructions.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <section className="section section-dark opportunities-board-section">
        <div className="container">
          <div className="filter-controls-box">
            <div className="search-input-group">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by job title, skill, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="board-search-input"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={() => setSearchTerm('')} 
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filter-dropdowns-row">
              <div className="filter-select-wrap">
                <label htmlFor="filter-sector">Sector:</label>
                <select
                  id="filter-sector"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Sectors</option>
                  <option value="Care Homes">Care Homes</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              <div className="filter-select-wrap">
                <label htmlFor="filter-type">Employment Type:</label>
                <select
                  id="filter-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              <div className="filter-select-wrap">
                <label htmlFor="filter-location">Region:</label>
                <select
                  id="filter-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Regions</option>
                  <option value="London">London & South East</option>
                  <option value="Birmingham">Birmingham / West Midlands</option>
                  <option value="Manchester">Manchester / North West</option>
                  <option value="Leeds">Leeds / Yorkshire</option>
                </select>
              </div>

              {(searchTerm || selectedSector !== 'All' || selectedType !== 'All' || selectedLocation !== 'All') && (
                <button type="button" onClick={clearFilters} className="btn-reset-filters">
                  <X size={14} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-summary-row">
            <span className="results-count">
              Showing <strong>{filteredVacancies.length}</strong> matching vacancies
            </span>
            <Link to="/submit-cv" className="speculative-link">
              <span>Don't see a match? Submit CV speculatively</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Vacancies Grid */}
          {filteredVacancies.length > 0 ? (
            <div className="vacancies-grid">
              {filteredVacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </div>
          ) : (
            <div className="vacancies-empty-card">
              <div className="empty-icon-box">
                <Search size={36} className="gold-icon" />
              </div>
              <h3>No Vacancies Found Matching Your Filter</h3>
              <p>
                There are currently no published opportunities matching your search criteria. Please adjust your filters or submit your CV for consideration for suitable upcoming client vacancies.
              </p>
              <div className="empty-actions">
                <button type="button" onClick={clearFilters} className="btn btn-secondary">
                  <span>Clear All Filters</span>
                </button>
                <Link to="/submit-cv" className="btn btn-primary">
                  <FileText size={16} />
                  <span>Submit Your CV Directly</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CV CTA Banner */}
      <section className="section section-soft text-center">
        <div className="container max-w-800">
          <h2>Looking for Tailored Career Support?</h2>
          <div className="gold-line center-gold-line" />
          <p className="lead-paragraph">
            Our consultants frequently place candidates directly with care homes and corporate organisations prior to public role advertisement.
          </p>
          <div className="closing-btn-group">
            <Link to="/submit-cv" className="btn btn-primary">
              <FileText size={16} />
              <span>Submit Your CV for Future Roles</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <span>Speak with a Consultant</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
