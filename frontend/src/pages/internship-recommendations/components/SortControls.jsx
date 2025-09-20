import React from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, sortOrder, onSortChange, onRefresh, isRefreshing }) => {
  const sortOptions = [
    { value: 'match', label: 'Match Percentage' },
    { value: 'deadline', label: 'Application Deadline' },
    { value: 'stipend', label: 'Stipend Amount' },
    { value: 'rating', label: 'Company Rating' },
    { value: 'posted', label: 'Recently Posted' }
  ];

  const handleSortByChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  const getSortOrderIcon = () => {
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getSortOrderLabel = () => {
    const labels = {
      match: sortOrder === 'desc' ? 'Highest First' : 'Lowest First',
      deadline: sortOrder === 'asc' ? 'Earliest First' : 'Latest First',
      stipend: sortOrder === 'desc' ? 'Highest First' : 'Lowest First',
      rating: sortOrder === 'desc' ? 'Highest First' : 'Lowest First',
      posted: sortOrder === 'desc' ? 'Newest First' : 'Oldest First'
    };
    return labels?.[sortBy] || '';
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="flex-1 sm:flex-none min-w-0 sm:min-w-48">
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={handleSortByChange}
          />
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleSortOrderToggle}
          iconName={getSortOrderIcon()}
          iconPosition="left"
          className="shrink-0"
        >
          <span className="hidden sm:inline">{getSortOrderLabel()}</span>
          <span className="sm:hidden">
            {sortOrder === 'asc' ? 'Low-High' : 'High-Low'}
          </span>
        </Button>
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          iconName={isRefreshing ? 'Loader2' : 'RefreshCw'}
          iconPosition="left"
          className={isRefreshing ? 'animate-spin' : ''}
        >
          <span className="hidden sm:inline">
            {isRefreshing ? 'Refreshing...' : 'Refresh Results'}
          </span>
          <span className="sm:hidden">
            {isRefreshing ? 'Refreshing' : 'Refresh'}
          </span>
        </Button>

        <div className="text-sm text-muted-foreground whitespace-nowrap">
          Updated 2 min ago
        </div>
      </div>
    </div>
  );
};

export default SortControls;