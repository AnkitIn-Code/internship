import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Search',
      title: 'Discover Opportunities',
      description: 'Find internships tailored to your skills and interests from top companies worldwide.'
    },
    {
      icon: 'ClipboardList',
      title: 'Track Applications',
      description: 'Keep track of all your applications in one place with status updates and reminders.'
    },
    {
      icon: 'BarChart',
      title: 'Analytics & Insights',
      description: 'Get insights into your application performance and improve your success rate.'
    },
    {
      icon: 'Users',
      title: 'Community Support',
      description: 'Connect with fellow students and get advice from experienced professionals.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-elevation-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                InternGuide AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/user-login')}
              >
                Login
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/user-registration')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Find Your Dream
              <span className="text-primary block">Internship</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover thousands of internship opportunities, track your applications, 
              and land the perfect role to kickstart your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/user-registration')}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/user-login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to find and secure your ideal internship.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border border-border hover:shadow-elevation-2 transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already found their dream internships through our platform.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/user-registration')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Create Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                InternGuide AI
              </span>
            </div>
            <p className="text-muted-foreground">
              © 2024 InternGuide AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
