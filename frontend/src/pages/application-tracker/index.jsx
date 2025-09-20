import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HelpDeskWidget from '../../components/ui/HelpDeskWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KanbanBoard from './components/KanbanBoard';
import CalendarView from './components/CalendarView';
import AnalyticsView from './components/AnalyticsView';
import SearchAndFilters from './components/SearchAndFilters';
import ApplicationDetailsModal from './components/ApplicationDetailsModal';

const ApplicationTracker = () => {
  const [activeView, setActiveView] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sortBy: 'date_desc',
    dateRange: 'all'
  });

  // Mock applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Google",
      position: "Software Engineering Intern",
      status: "interview_scheduled",
      priority: "high",
      appliedDate: "2024-01-15",
      deadline: "2024-02-15",
      interviewDate: "2024-01-25",
      followUpDate: "2024-01-30",
      location: "Mountain View, CA",
      salaryRange: "$6,000 - $8,000/month",
      description: `Join Google's engineering team as a Software Engineering Intern.\n\nResponsibilities:\n• Develop and maintain web applications\n• Collaborate with cross-functional teams\n• Participate in code reviews and technical discussions\n\nRequirements:\n• Currently pursuing Computer Science degree\n• Strong programming skills in Python, Java, or C++\n• Experience with web technologies`,
      notes: [
        {
          author: "You",
          date: "2024-01-16",
          content: "Applied through university career portal. Received confirmation email."
        },
        {
          author: "You", 
          date: "2024-01-20",
          content: "HR reached out for phone screening. Scheduled for next week."
        }
      ],
      documents: [
        { name: "Resume_Google.pdf", size: "245 KB" },
        { name: "Cover_Letter.pdf", size: "128 KB" }
      ]
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Management Intern",
      status: "under_review",
      priority: "high",
      appliedDate: "2024-01-12",
      deadline: "2024-02-10",
      location: "Redmond, WA",
      salaryRange: "$5,500 - $7,500/month",
      description: `Microsoft is seeking a Product Management Intern to join our Office 365 team.\n\nYou will work on:\n• Product strategy and roadmap planning\n• User research and data analysis\n• Cross-team collaboration\n• Feature specification and requirements gathering`,
      notes: [
        {
          author: "You",
          date: "2024-01-13",
          content: "Submitted application with portfolio. Waiting for response."
        }
      ],
      documents: [
        { name: "Resume_Microsoft.pdf", size: "251 KB" },
        { name: "Portfolio.pdf", size: "2.1 MB" }
      ]
    },
    {
      id: 3,
      company: "Apple",
      position: "iOS Development Intern",
      status: "applied",
      priority: "medium",
      appliedDate: "2024-01-18",
      deadline: "2024-03-01",
      location: "Cupertino, CA",
      salaryRange: "$6,500 - $8,500/month",
      description: `Join Apple's iOS development team and work on cutting-edge mobile applications.\n\nWhat you'll do:\n• Develop iOS applications using Swift\n• Work with design teams on UI/UX\n• Optimize app performance\n• Participate in app store submission process`,
      notes: [],
      documents: [
        { name: "Resume_Apple.pdf", size: "248 KB" }
      ]
    },
    {
      id: 4,
      company: "Meta",
      position: "Data Science Intern",
      status: "offer_received",
      priority: "high",
      appliedDate: "2024-01-05",
      deadline: "2024-01-20",
      interviewDate: "2024-01-15",
      location: "Menlo Park, CA",
      salaryRange: "$7,000 - $9,000/month",
      description: `Work with Meta's data science team to analyze user behavior and product metrics.\n\nResponsibilities:\n• Analyze large datasets using Python and SQL\n• Build predictive models\n• Create data visualizations\n• Present findings to stakeholders`,
      notes: [
        {
          author: "You",
          date: "2024-01-06",
          content: "Quick response from recruiter. Phone screen scheduled."
        },
        {
          author: "You",
          date: "2024-01-16",
          content: "Great interview! Received offer letter today."
        }
      ],
      documents: [
        { name: "Resume_Meta.pdf", size: "252 KB" },
        { name: "Data_Science_Portfolio.pdf", size: "3.2 MB" },
        { name: "Offer_Letter.pdf", size: "156 KB" }
      ]
    },
    {
      id: 5,
      company: "Amazon",
      position: "Software Development Intern",
      status: "rejected",
      priority: "medium",
      appliedDate: "2024-01-08",
      deadline: "2024-01-25",
      location: "Seattle, WA",
      salaryRange: "$5,800 - $7,200/month",
      description: `Amazon Web Services is looking for a Software Development Intern.\n\nYou will:\n• Develop cloud-based solutions\n• Work with distributed systems\n• Participate in on-call rotations\n• Contribute to open-source projects`,
      notes: [
        {
          author: "You",
          date: "2024-01-09",
          content: "Applied through Amazon\'s career portal."
        },
        {
          author: "You",
          date: "2024-01-22",
          content: "Received rejection email. Will apply again next cycle."
        }
      ],
      documents: [
        { name: "Resume_Amazon.pdf", size: "247 KB" }
      ]
    },
    {
      id: 6,
      company: "Netflix",
      position: "UI/UX Design Intern",
      status: "interview_scheduled",
      priority: "medium",
      appliedDate: "2024-01-20",
      deadline: "2024-02-28",
      interviewDate: "2024-01-28",
      location: "Los Gatos, CA",
      salaryRange: "$5,000 - $6,500/month",
      description: `Join Netflix's design team to create engaging user experiences.\n\nWhat you'll work on:\n• User interface design for streaming platform\n• User research and testing\n• Design system maintenance\n• Prototyping and wireframing`,
      notes: [
        {
          author: "You",
          date: "2024-01-21",
          content: "Portfolio review went well. Design challenge scheduled."
        }
      ],
      documents: [
        { name: "Resume_Netflix.pdf", size: "243 KB" },
        { name: "Design_Portfolio.pdf", size: "4.5 MB" }
      ]
    }
  ]);

  // Filter and search applications
  const filteredApplications = useMemo(() => {
    let filtered = applications;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(app =>
        app?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        app?.position?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(app => app?.status === filters?.status);
    }

    // Apply priority filter
    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(app => app?.priority === filters?.priority);
    }

    // Apply date range filter
    if (filters?.dateRange !== 'all') {
      const cutoffDate = new Date();
      cutoffDate?.setDate(cutoffDate?.getDate() - parseInt(filters?.dateRange));
      filtered = filtered?.filter(app => new Date(app.appliedDate) >= cutoffDate);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'date_asc':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'date_desc':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'company_asc':
          return a?.company?.localeCompare(b?.company);
        case 'company_desc':
          return b?.company?.localeCompare(a?.company);
        case 'priority_desc':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, searchQuery, filters]);

  const views = [
    { id: 'kanban', label: 'Kanban Board', icon: 'Columns' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleStatusUpdate = (applicationId, newStatus) => {
    setApplications(prev =>
      prev?.map(app =>
        app?.id === applicationId
          ? { ...app, status: newStatus }
          : app
      )
    );
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleUpdateApplication = (updatedApplication) => {
    setApplications(prev =>
      prev?.map(app =>
        app?.id === updatedApplication?.id
          ? updatedApplication
          : app
      )
    );
  };

  const handleDeleteApplication = (applicationId) => {
    setApplications(prev => prev?.filter(app => app?.id !== applicationId));
    setIsModalOpen(false);
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Performing ${action} on applications:`, selectedIds);
    // Implement bulk actions here
  };

  const handleAddEvent = () => {
    console.log('Add new event');
    // Implement add event functionality
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    // Implement event click handling
  };

  // Set page title
  useEffect(() => {
    document.title = 'Application Tracker - InternshipHub';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Application Tracker
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage your internship applications across multiple companies
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {applications?.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Applications
                </p>
              </div>
              
              <Button
                variant="primary"
                iconName="Plus"
                iconPosition="left"
                onClick={() => window.location.href = '/internship-recommendations'}
              >
                Add Application
              </Button>
            </div>
          </div>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex bg-muted rounded-lg p-1 w-fit">
            {views?.map((view) => (
              <button
                key={view?.id}
                onClick={() => setActiveView(view?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === view?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={view?.icon} size={16} />
                <span>{view?.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onBulkAction={handleBulkAction}
            selectedApplications={selectedApplications}
            totalApplications={filteredApplications?.length}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6 min-h-[600px]"
        >
          {activeView === 'kanban' && (
            <KanbanBoard
              applications={filteredApplications}
              onStatusUpdate={handleStatusUpdate}
              onViewDetails={handleViewDetails}
            />
          )}

          {activeView === 'calendar' && (
            <CalendarView
              applications={filteredApplications}
              onAddEvent={handleAddEvent}
              onEventClick={handleEventClick}
            />
          )}

          {activeView === 'analytics' && (
            <AnalyticsView
              applications={filteredApplications}
            />
          )}
        </motion.div>

        {/* Empty State */}
        {filteredApplications?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No applications found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || Object.values(filters)?.some(f => f !== 'all')
                ? 'Try adjusting your search or filters' :'Start by applying to internships from our recommendations'
              }
            </p>
            <Button
              variant="primary"
              iconName="Search"
              iconPosition="left"
              onClick={() => window.location.href = '/internship-recommendations'}
            >
              Find Internships
            </Button>
          </motion.div>
        )}
      </main>
      {/* Application Details Modal */}
      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateApplication}
        onDelete={handleDeleteApplication}
      />
      <HelpDeskWidget />
    </div>
  );
};

export default ApplicationTracker;