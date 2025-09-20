import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HelpDeskWidget from '../../components/ui/HelpDeskWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PersonalDetailsSection from './components/PersonalDetailsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import PreferencesSection from './components/PreferencesSection';
import ResumeSection from './components/ResumeSection';
import ProfileCompletionCard from './components/ProfileCompletionCard';
import PrivacySettingsSection from './components/PrivacySettingsSection';

const UserProfileManagement = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [editingSections, setEditingSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock user profile data
  const mockProfile = {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1999-05-15",
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    githubUrl: "https://github.com/johndoe",
    techSkills: ["React", "JavaScript", "Python", "SQL", "Git", "Node.js"],
    softSkills: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management"],
    education: {
      institution: "University of California, Berkeley",
      degree: "bachelor",
      major: "Computer Science",
      graduationYear: "2024",
      cgpa: "8.5",
      maxCgpa: "10",
      coursework: ["Data Structures", "Algorithms", "Web Development", "Database Systems", "Machine Learning"]
    },
    preferences: {
      sectors: ["technology", "startups", "finance"],
      locations: ["san-francisco", "new-york", "remote"],
      workType: "hybrid",
      duration: "3-6",
      salary: "2000-3000"
    },
    resume: {
      current: {
        id: 1,
        name: 'Resume_John_Doe_2024.pdf',
        uploadDate: '2024-01-15',
        size: '245 KB',
        status: 'current',
        extractedSkills: ['React', 'JavaScript', 'Python', 'SQL', 'Git']
      }
    },
    privacy: {
      profileVisibility: true,
      showEmail: false,
      showPhone: false,
      allowRecommendations: true,
      shareWithPartners: false,
      marketingEmails: true,
      applicationNotifications: true,
      weeklyDigest: true
    }
  };

  useEffect(() => {
    // Simulate loading profile data
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfile(mockProfile);
        setLastUpdated(new Date()?.toISOString());
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSectionUpdate = (section, data) => {
    setProfile(prev => ({
      ...prev,
      [section]: data
    }));
    setLastUpdated(new Date()?.toISOString());
    
    // Show success message
    const sectionNames = {
      personalDetails: 'Personal Details',
      skills: 'Skills',
      education: 'Education',
      preferences: 'Preferences',
      resume: 'Resume',
      privacy: 'Privacy Settings'
    };
    
    // Simulate API call to save changes
    console.log(`${sectionNames?.[section]} updated successfully`);
  };

  const toggleSectionEdit = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSectionEdit = (section) => {
    const sectionMap = {
      personal: 'personalDetails',
      skills: 'skills',
      education: 'education',
      preferences: 'preferences',
      resume: 'resume',
      privacy: 'privacy'
    };
    
    const mappedSection = sectionMap?.[section] || section;
    toggleSectionEdit(mappedSection);
    
    // Scroll to section
    const element = document.getElementById(`section-${mappedSection}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-32"></div>
                      <div className="h-3 bg-muted rounded w-48"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-12 bg-muted rounded"></div>
                    <div className="h-12 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile Management</h1>
              <p className="text-muted-foreground">
                Keep your profile updated for better internship recommendations
              </p>
              {lastUpdated && (
                <p className="text-sm text-muted-foreground mt-1">
                  Last updated: {new Date(lastUpdated)?.toLocaleString()}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/internship-recommendations')}
                iconName="Search"
                iconPosition="left"
              >
                View Recommendations
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/main-dashboard')}
                iconName="LayoutDashboard"
                iconPosition="left"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personal Details Section */}
            <div id="section-personalDetails">
              <PersonalDetailsSection
                profile={profile}
                onUpdate={handleSectionUpdate}
                isEditing={editingSections?.personalDetails}
                onToggleEdit={() => toggleSectionEdit('personalDetails')}
              />
            </div>

            {/* Skills Section */}
            <div id="section-skills">
              <SkillsSection
                profile={profile}
                onUpdate={handleSectionUpdate}
                isEditing={editingSections?.skills}
                onToggleEdit={() => toggleSectionEdit('skills')}
              />
            </div>

            {/* Education Section */}
            <div id="section-education">
              <EducationSection
                profile={profile}
                onUpdate={handleSectionUpdate}
                isEditing={editingSections?.education}
                onToggleEdit={() => toggleSectionEdit('education')}
              />
            </div>

            {/* Preferences Section */}
            <div id="section-preferences">
              <PreferencesSection
                profile={profile}
                onUpdate={handleSectionUpdate}
                isEditing={editingSections?.preferences}
                onToggleEdit={() => toggleSectionEdit('preferences')}
              />
            </div>

            {/* Resume Section */}
            <div id="section-resume">
              <ResumeSection
                profile={profile}
                onUpdate={handleSectionUpdate}
              />
            </div>

            {/* Privacy Settings Section */}
            <div id="section-privacy">
              <PrivacySettingsSection
                profile={profile}
                onUpdate={handleSectionUpdate}
                isEditing={editingSections?.privacy}
                onToggleEdit={() => toggleSectionEdit('privacy')}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Completion Card */}
              <ProfileCompletionCard
                profile={profile}
                onSectionEdit={handleSectionEdit}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/application-tracker')}
                    iconName="ClipboardList"
                    iconPosition="left"
                  >
                    Track Applications
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/internship-recommendations')}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Find Internships
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => window.print()}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export Profile
                  </Button>
                </div>
              </div>

              {/* Profile Tips */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Lightbulb" size={20} className="text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Profile Tips</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5" />
                    <p>Keep your skills updated to match current industry trends</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5" />
                    <p>Upload a recent resume for better AI matching</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5" />
                    <p>Set specific preferences to get targeted recommendations</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5" />
                    <p>Review privacy settings to control data sharing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HelpDeskWidget />
    </div>
  );
};

export default UserProfileManagement;