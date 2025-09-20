import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HelpDeskWidget from '../../components/ui/HelpDeskWidget';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import InternshipCard from './components/InternshipCard';
import InternshipDetailsModal from './components/InternshipDetailsModal';
import BulkActions from './components/BulkActions';
import ComparisonModal from './components/ComparisonModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InternshipRecommendations = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    sectors: [],
    locations: [],
    duration: '',
    stipendRange: '',
    skills: [],
    remoteOnly: false,
    immediateStart: false
  });
  const [sortBy, setSortBy] = useState('match');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedInternships, setSelectedInternships] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [internships, setInternships] = useState([]);

  // Mock internship data
  const mockInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: {
        name: "TechCorp Solutions",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
        rating: 4.5,
        reviewCount: 234,
        size: "500-1000",
        industry: "Technology",
        description: "TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprises worldwide. We focus on creating cutting-edge applications that transform businesses."
      },
      location: "Bangalore",
      duration: "3-6 months",
      stipend: 25000,
      applicationDeadline: "2025-10-15",
      matchPercentage: 92,
      requiredSkills: ["React", "JavaScript", "HTML/CSS", "Git", "REST APIs"],
      qualifications: [
        "Currently pursuing or recently completed degree in Computer Science or related field",
        "Strong foundation in JavaScript and modern web technologies",
        "Experience with React.js framework",
        "Understanding of responsive design principles",
        "Good problem-solving and communication skills"
      ],
      description: `Join our dynamic frontend development team and work on exciting projects that impact millions of users worldwide.\n\nAs a Frontend Developer Intern, you'll collaborate with experienced developers to build responsive, user-friendly web applications using modern technologies like React, TypeScript, and CSS frameworks.\n\nYou'll gain hands-on experience in agile development methodologies, code reviews, and best practices in frontend development.`,
      aiReasoning: "Perfect match based on your React and JavaScript skills. Your portfolio projects demonstrate strong frontend capabilities, and this role aligns with your career goals in web development.",
      benefits: ["Flexible working hours", "Mentorship program", "Learning stipend", "Team outings"],
      postedDaysAgo: 2,
      isSaved: false
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: {
        name: "DataInsights Analytics",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center",
        rating: 4.2,
        reviewCount: 156,
        size: "100-500",
        industry: "Analytics",
        description: "DataInsights Analytics helps businesses make data-driven decisions through advanced analytics and machine learning solutions."
      },
      location: "Mumbai",
      duration: "6 months",
      stipend: 30000,
      applicationDeadline: "2025-10-20",
      matchPercentage: 85,
      requiredSkills: ["Python", "SQL", "Machine Learning", "Pandas", "Matplotlib"],
      qualifications: [
        "Background in Statistics, Mathematics, Computer Science, or related field",
        "Proficiency in Python programming language",
        "Experience with data manipulation libraries (Pandas, NumPy)",
        "Basic understanding of machine learning concepts",
        "Strong analytical and problem-solving skills"
      ],
      description: `Work with our data science team to extract insights from large datasets and build predictive models.\n\nYou'll be involved in the complete data science pipeline - from data collection and cleaning to model development and deployment.\n\nThis internship offers exposure to real-world business problems and the opportunity to work with cutting-edge tools and technologies in the data science ecosystem.`,
      aiReasoning: "Strong match due to your Python skills and coursework in statistics. Your academic projects in data analysis make you a great fit for this role.",
      benefits: ["Remote work options", "Conference attendance", "Certification support", "Performance bonus"],
      postedDaysAgo: 1,
      isSaved: true
    },
    {
      id: 3,
      title: "Mobile App Development Intern",
      company: {
        name: "AppVenture Studios",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
        rating: 4.7,
        reviewCount: 89,
        size: "50-100",
        industry: "Mobile Technology",
        description: "AppVenture Studios creates innovative mobile applications that solve real-world problems and enhance user experiences."
      },
      location: "Hyderabad",
      duration: "4 months",
      stipend: 22000,
      applicationDeadline: "2025-10-25",
      matchPercentage: 78,
      requiredSkills: ["React Native", "JavaScript", "Mobile UI/UX", "Firebase", "Git"],
      qualifications: [
        "Knowledge of mobile app development frameworks",
        "Experience with React Native or Flutter",
        "Understanding of mobile UI/UX principles",
        "Familiarity with version control systems",
        "Passion for mobile technology and user experience"
      ],
      description: `Join our mobile development team to create innovative apps that reach thousands of users.\n\nYou'll work on both iOS and Android platforms using React Native, contributing to feature development, bug fixes, and performance optimization.\n\nThis role offers excellent exposure to the complete mobile app development lifecycle, from concept to app store deployment.`,
      aiReasoning: "Good match based on your JavaScript knowledge and interest in mobile development. Your React experience will translate well to React Native.",
      benefits: ["Device allowance", "App store credits", "Flexible hours", "Team lunch"],
      postedDaysAgo: 3,
      isSaved: false
    },
    {
      id: 4,
      title: "UI/UX Design Intern",
      company: {
        name: "DesignCraft Agency",
        logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop&crop=center",
        rating: 4.4,
        reviewCount: 67,
        size: "20-50",
        industry: "Design",
        description: "DesignCraft Agency specializes in creating beautiful, user-centered digital experiences for brands across various industries."
      },
      location: "Pune",
      duration: "3 months",
      stipend: 18000,
      applicationDeadline: "2025-11-01",
      matchPercentage: 71,
      requiredSkills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
      qualifications: [
        "Portfolio demonstrating UI/UX design skills",
        "Proficiency in design tools like Figma or Adobe XD",
        "Understanding of user-centered design principles",
        "Basic knowledge of HTML/CSS is a plus",
        "Strong visual communication skills"
      ],
      description: `Work alongside our design team to create compelling user experiences for web and mobile applications.\n\nYou'll be involved in user research, wireframing, prototyping, and visual design while learning industry best practices.\n\nThis internship provides hands-on experience with real client projects and exposure to the complete design process.`,
      aiReasoning: "Moderate match based on your design coursework and creative portfolio. Your attention to detail and visual skills align with this role.",
      benefits: ["Design software licenses", "Portfolio review sessions", "Client interaction", "Creative workshops"],
      postedDaysAgo: 5,
      isSaved: false
    },
    {
      id: 5,
      title: "Backend Developer Intern",
      company: {
        name: "CloudTech Systems",
        logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center",
        rating: 4.6,
        reviewCount: 198,
        size: "200-500",
        industry: "Cloud Computing",
        description: "CloudTech Systems provides scalable cloud infrastructure solutions and backend services for modern applications."
      },
      location: "Chennai",
      duration: "6 months",
      stipend: 28000,
      applicationDeadline: "2025-10-30",
      matchPercentage: 88,
      requiredSkills: ["Node.js", "Express.js", "MongoDB", "AWS", "Docker"],
      qualifications: [
        "Strong programming skills in JavaScript or Python",
        "Experience with server-side development",
        "Understanding of databases and API design",
        "Familiarity with cloud platforms (AWS/Azure/GCP)",
        "Knowledge of containerization technologies"
      ],
      description: `Join our backend development team to build robust, scalable server-side applications and APIs.\n\nYou'll work with modern technologies like Node.js, Express, and cloud services to create high-performance backend systems.\n\nThis role offers excellent exposure to microservices architecture, database design, and cloud deployment strategies.`,
      aiReasoning: "Excellent match given your Node.js experience and cloud computing coursework. Your API development projects demonstrate relevant skills for this position.",
      benefits: ["Cloud certification support", "Tech conference tickets", "Flexible remote work", "Health insurance"],
      postedDaysAgo: 4,
      isSaved: false
    }
  ];

  useEffect(() => {
    setInternships(mockInternships);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to internships
    applyFiltersAndSort(newFilters, sortBy, sortOrder);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    applyFiltersAndSort(filters, newSortBy, newSortOrder);
  };

  const applyFiltersAndSort = (currentFilters, currentSortBy, currentSortOrder) => {
    let filteredInternships = [...mockInternships];

    // Apply filters
    if (currentFilters?.sectors?.length > 0) {
      filteredInternships = filteredInternships?.filter(internship =>
        currentFilters?.sectors?.some(sector => 
          internship?.company?.industry?.toLowerCase()?.includes(sector?.toLowerCase())
        )
      );
    }

    if (currentFilters?.locations?.length > 0) {
      filteredInternships = filteredInternships?.filter(internship =>
        currentFilters?.locations?.includes(internship?.location?.toLowerCase())
      );
    }

    if (currentFilters?.duration) {
      filteredInternships = filteredInternships?.filter(internship => {
        const duration = internship?.duration?.toLowerCase();
        switch (currentFilters?.duration) {
          case '1-3': return duration?.includes('1') || duration?.includes('2') || duration?.includes('3');
          case '3-6': return duration?.includes('3') || duration?.includes('4') || duration?.includes('5') || duration?.includes('6');
          case '6-12': return duration?.includes('6') || duration?.includes('12');
          case '12+': return duration?.includes('12');
          default: return true;
        }
      });
    }

    if (currentFilters?.stipendRange) {
      filteredInternships = filteredInternships?.filter(internship => {
        const stipend = internship?.stipend;
        switch (currentFilters?.stipendRange) {
          case '0-10000': return stipend >= 0 && stipend <= 10000;
          case '10000-25000': return stipend > 10000 && stipend <= 25000;
          case '25000-50000': return stipend > 25000 && stipend <= 50000;
          case '50000+': return stipend > 50000;
          default: return true;
        }
      });
    }

    if (currentFilters?.skills?.length > 0) {
      filteredInternships = filteredInternships?.filter(internship =>
        currentFilters?.skills?.some(skill =>
          internship?.requiredSkills?.some(reqSkill =>
            reqSkill?.toLowerCase()?.includes(skill?.toLowerCase())
          )
        )
      );
    }

    if (currentFilters?.remoteOnly) {
      filteredInternships = filteredInternships?.filter(internship =>
        internship?.location?.toLowerCase()?.includes('remote')
      );
    }

    // Apply sorting
    filteredInternships?.sort((a, b) => {
      let aValue, bValue;
      
      switch (currentSortBy) {
        case 'match':
          aValue = a?.matchPercentage;
          bValue = b?.matchPercentage;
          break;
        case 'deadline':
          aValue = new Date(a.applicationDeadline);
          bValue = new Date(b.applicationDeadline);
          break;
        case 'stipend':
          aValue = a?.stipend;
          bValue = b?.stipend;
          break;
        case 'rating':
          aValue = a?.company?.rating;
          bValue = b?.company?.rating;
          break;
        case 'posted':
          aValue = a?.postedDaysAgo;
          bValue = b?.postedDaysAgo;
          break;
        default:
          return 0;
      }

      if (currentSortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setInternships(filteredInternships);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    applyFiltersAndSort(filters, sortBy, sortOrder);
    setIsRefreshing(false);
  };

  const handleApply = async (internshipId) => {
    // Simulate application process
    console.log('Applying to internship:', internshipId);
    // Navigate to application tracker or external application
    navigate('/application-tracker');
  };

  const handleSave = async (internshipId, isSaved) => {
    setInternships(prev => prev?.map(internship =>
      internship?.id === internshipId
        ? { ...internship, isSaved }
        : internship
    ));
  };

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setIsDetailsModalOpen(true);
  };

  const handleInternshipSelect = (internshipId) => {
    setSelectedInternships(prev => {
      if (prev?.includes(internshipId)) {
        return prev?.filter(id => id !== internshipId);
      } else {
        return [...prev, internshipId];
      }
    });
  };

  const handleBulkSave = async (internshipIds) => {
    setInternships(prev => prev?.map(internship =>
      internshipIds?.includes(internship?.id)
        ? { ...internship, isSaved: true }
        : internship
    ));
    setSelectedInternships([]);
  };

  const handleBulkCompare = (internshipIds) => {
    const selectedInternshipData = internships?.filter(internship =>
      internshipIds?.includes(internship?.id)
    );
    setSelectedInternship(selectedInternshipData);
    setIsComparisonModalOpen(true);
  };

  const handleClearSelection = () => {
    setSelectedInternships([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <button
              onClick={() => navigate('/main-dashboard')}
              className="hover:text-foreground transition-colors duration-200"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Internship Recommendations</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Recommended for You
              </h1>
              <p className="text-muted-foreground">
                AI-powered internship matches based on your profile and preferences
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span>Powered by AI</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/user-profile-management')}
                iconName="Settings"
                iconPosition="left"
              >
                Update Preferences
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80 shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterPanelOpen}
              onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {internships?.length} internship{internships?.length !== 1 ? 's' : ''} 
                {Object.values(filters)?.some(value => 
                  Array.isArray(value) ? value?.length > 0 : value
                ) && ' (filtered)'}
              </div>
              
              {selectedInternships?.length > 0 && (
                <div className="text-sm text-primary">
                  {selectedInternships?.length} selected for comparison
                </div>
              )}
            </div>

            {/* Internship Cards */}
            {internships?.length > 0 ? (
              <div className="space-y-6">
                {internships?.map((internship) => (
                  <div key={internship?.id} className="relative">
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedInternships?.includes(internship?.id)}
                        onChange={() => handleInternshipSelect(internship?.id)}
                        className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
                      />
                    </div>
                    
                    <div className="pl-10">
                      <InternshipCard
                        internship={internship}
                        onApply={handleApply}
                        onSave={handleSave}
                        onViewDetails={handleViewDetails}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No internships found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleFiltersChange({
                    sectors: [],
                    locations: [],
                    duration: '',
                    stipendRange: '',
                    skills: [],
                    remoteOnly: false,
                    immediateStart: false
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modals and Widgets */}
      <InternshipDetailsModal
        internship={selectedInternship}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedInternship(null);
        }}
        onApply={handleApply}
        onSave={handleSave}
      />
      <ComparisonModal
        internships={Array.isArray(selectedInternship) ? selectedInternship : []}
        isOpen={isComparisonModalOpen}
        onClose={() => {
          setIsComparisonModalOpen(false);
          setSelectedInternship(null);
        }}
        onApply={handleApply}
      />
      <BulkActions
        selectedInternships={selectedInternships}
        onBulkSave={handleBulkSave}
        onBulkCompare={handleBulkCompare}
        onClearSelection={handleClearSelection}
      />
      <HelpDeskWidget />
    </div>
  );
};

export default InternshipRecommendations;