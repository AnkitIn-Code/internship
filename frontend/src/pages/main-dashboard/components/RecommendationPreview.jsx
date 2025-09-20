import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecommendationPreview = ({ recommendations, onViewAll }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Recommended for You
          </h2>
          <p className="text-muted-foreground text-sm">
            AI-powered internship matches based on your profile
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.slice(0, 3)?.map((internship) => (
          <div
            key={internship?._id || internship?.id}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={internship?.companyLogo || '/assets/images/download.png'}
                alt={internship?.company || internship?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {internship?.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {(internship?.company || '—')} • {internship?.location}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{internship?.duration || '—'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{internship?.stipend || ''}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                (typeof internship?.matchScore === 'number' ? internship?.matchScore >= 9 : internship?.matchPercentage >= 90)
                  ? 'bg-green-100 text-green-700'
                  : (typeof internship?.matchScore === 'number' ? internship?.matchScore >= 7.5 : internship?.matchPercentage >= 75)
                  ? 'bg-blue-100 text-blue-700' :'bg-yellow-100 text-yellow-700'
              }`}>
                {typeof internship?.matchScore === 'number' ? `${Math.min(100, Math.round(internship?.matchScore * 10))}% match` : `${internship?.matchPercentage}% match`}
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      {recommendations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No recommendations yet
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Complete your profile to get personalized internship recommendations
          </p>
          <Button variant="outline" size="sm" iconName="User" iconPosition="left">
            Complete Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendationPreview;