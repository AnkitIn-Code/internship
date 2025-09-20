import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HelpDeskWidget from '../../components/ui/HelpDeskWidget';
import WelcomeSection from './components/WelcomeSection';
import MetricCard from './components/MetricCard';
import RecommendationPreview from './components/RecommendationPreview';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    profileCompletion: 75,
    email: "alex.johnson@email.com"
  });

  // Mock application statistics
  const applicationStats = [
    {
      title: "Applications Submitted",
      value: "12",
      icon: "FileText",
      color: "blue",
      trend: { type: "up", value: "+3 this week" }
    },
    {
      title: "In Progress",
      value: "8",
      icon: "Clock",
      color: "yellow",
      trend: { type: "up", value: "+2 this week" }
    },
    {
      title: "Interviews Scheduled",
      value: "3",
      icon: "Calendar",
      color: "purple",
      trend: { type: "up", value: "+1 this week" }
    },
    {
      title: "Offers Received",
      value: "1",
      icon: "CheckCircle",
      color: "green",
      trend: { type: "up", value: "New!" }
    }
  ];

  // Mock recommended internships
  const mockRecommendations = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      duration: "3 months",
      stipend: "$2,500/month",
      matchPercentage: 95,
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataFlow Solutions",
      location: "New York, NY",
      duration: "4 months",
      stipend: "$3,000/month",
      matchPercentage: 88,
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Frontend Developer Intern",
      company: "WebDesign Pro",
      location: "Austin, TX",
      duration: "3 months",
      stipend: "$2,200/month",
      matchPercentage: 82,
      companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center"
    }
  ];

  // Mock upcoming deadlines
  const mockDeadlines = [
    {
      id: 1,
      title: "Application Deadline",
      company: "Google",
      date: "2025-01-22",
      type: "application"
    },
    {
      id: 2,
      title: "Interview Round 1",
      company: "Microsoft",
      date: "2025-01-25",
      type: "interview"
    },
    {
      id: 3,
      title: "Technical Assessment",
      company: "Amazon",
      date: "2025-01-28",
      type: "application"
    },
    {
      id: 4,
      title: "Final Interview",
      company: "Apple",
      date: "2025-02-02",
      type: "interview"
    },
    {
      id: 5,
      title: "Application Deadline",
      company: "Netflix",
      date: "2025-02-05",
      type: "application"
    }
  ];

  // Mock recent activities
  const mockActivities = [
    {
      id: 1,
      type: "offer",
      message: "Congratulations! You received an offer from TechCorp Inc.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: "interview",
      message: "Interview scheduled with DataFlow Solutions for January 25th",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 3,
      type: "application",
      message: "Application submitted to WebDesign Pro",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      type: "profile",
      message: "Profile updated with new skills and certifications",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      type: "application",
      message: "Application submitted to Amazon Web Services",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  const handleCompleteProfile = () => {
    navigate('/user-profile-management');
  };

  const handleViewAllRecommendations = () => {
    navigate('/internship-recommendations');
  };

  const handleViewCalendar = () => {
    navigate('/application-tracker');
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleMetricClick = (metric) => {
    navigate('/application-tracker');
  };

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-login');
      return;
    }

    // Load user data from localStorage or API
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <WelcomeSection
          userName={userData?.name}
          profileCompletion={userData?.profileCompletion}
          onCompleteProfile={handleCompleteProfile}
        />

        {/* Application Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {applicationStats?.map((stat, index) => (
            <MetricCard
              key={index}
              title={stat?.title}
              value={stat?.value}
              icon={stat?.icon}
              color={stat?.color}
              trend={stat?.trend}
              onClick={() => handleMetricClick(stat)}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Recommendations and Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            <RecommendationPreview
              recommendations={mockRecommendations}
              onViewAll={handleViewAllRecommendations}
            />
            
            <QuickActions onNavigate={handleNavigate} />
          </div>

          {/* Right Column - Deadlines and Activity */}
          <div className="space-y-8">
            <UpcomingDeadlines
              deadlines={mockDeadlines}
              onViewCalendar={handleViewCalendar}
            />
            
            <ActivityFeed activities={mockActivities} />
          </div>
        </div>

        {/* Mobile-specific sections */}
        <div className="lg:hidden space-y-6">
          {/* Mobile swipeable recommendations preview */}
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {mockRecommendations?.map((internship) => (
                <div
                  key={internship?.id}
                  className="flex-shrink-0 w-72 bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={internship?.companyLogo}
                        alt={internship?.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground text-sm">
                        {internship?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {internship?.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {internship?.location}
                    </span>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {internship?.matchPercentage}% match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <HelpDeskWidget />
    </div>
  );
};

export default MainDashboard;