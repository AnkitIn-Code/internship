import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ deadlines, onViewCalendar }) => {
  const [currentDate] = useState(new Date());
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(new Date(date));
  };

  const getDaysUntil = (date) => {
    const targetDate = new Date(date);
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil) => {
    if (daysUntil <= 1) return 'text-red-600 bg-red-50 border-red-200';
    if (daysUntil <= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (daysUntil <= 7) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const sortedDeadlines = deadlines?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Upcoming Deadlines
          </h2>
          <p className="text-muted-foreground text-sm">
            Stay on top of your application timeline
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewCalendar}
          iconName="Calendar"
          iconPosition="left"
        >
          View Calendar
        </Button>
      </div>
      <div className="space-y-3">
        {sortedDeadlines?.map((deadline) => {
          const daysUntil = getDaysUntil(deadline?.date);
          const urgencyColor = getUrgencyColor(daysUntil);
          
          return (
            <div
              key={deadline?.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${urgencyColor}`}>
                  <Icon 
                    name={deadline?.type === 'application' ? 'FileText' : 'Calendar'} 
                    size={16} 
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">
                    {deadline?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {deadline?.company} • {formatDate(deadline?.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColor}`}>
                  {daysUntil === 0 ? 'Today' : 
                   daysUntil === 1 ? 'Tomorrow' : 
                   daysUntil < 0 ? 'Overdue' :
                   `${daysUntil} days`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {sortedDeadlines?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No upcoming deadlines
          </h3>
          <p className="text-muted-foreground text-sm">
            Your deadlines will appear here once you start applying
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;