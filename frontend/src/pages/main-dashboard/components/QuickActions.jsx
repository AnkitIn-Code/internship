import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onNavigate }) => {
  const actions = [
    {
      id: 'discover',
      title: 'Discover Internships',
      description: 'Find new opportunities',
      icon: 'Search',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      route: '/internship-recommendations'
    },
    {
      id: 'track',
      title: 'Track Applications',
      description: 'Monitor your progress',
      icon: 'ClipboardList',
      color: 'bg-green-50 text-green-600 border-green-200',
      route: '/application-tracker'
    },
    {
      id: 'profile',
      title: 'Update Profile',
      description: 'Improve recommendations',
      icon: 'User',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      route: '/user-profile-management'
    },
    {
      id: 'feedback',
      title: 'Give Feedback',
      description: 'Help us improve',
      icon: 'MessageSquare',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      route: '/feedback'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Quick Actions
        </h2>
        <p className="text-muted-foreground text-sm">
          Navigate to key features quickly
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onNavigate(action?.route)}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 text-left group"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action?.color} group-hover:scale-105 transition-transform duration-200`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm mb-1">
                {action?.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;