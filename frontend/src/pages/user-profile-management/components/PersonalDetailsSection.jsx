import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalDetailsSection = ({ profile, onUpdate, isEditing, onToggleEdit }) => {
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    dateOfBirth: profile?.dateOfBirth || '',
    location: profile?.location || '',
    linkedinUrl: profile?.linkedinUrl || '',
    githubUrl: profile?.githubUrl || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData?.linkedinUrl && !formData?.linkedinUrl?.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }

    if (formData?.githubUrl && !formData?.githubUrl?.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate('personalDetails', formData);
      onToggleEdit();
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile?.fullName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      dateOfBirth: profile?.dateOfBirth || '',
      location: profile?.location || '',
      linkedinUrl: profile?.linkedinUrl || '',
      githubUrl: profile?.githubUrl || ''
    });
    setErrors({});
    onToggleEdit();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
            <p className="text-sm text-muted-foreground">Update your basic information</p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleEdit}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          disabled={!isEditing}
          required
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          disabled={!isEditing}
          required
          placeholder="Enter your email"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          disabled={!isEditing}
          required
          placeholder="+1 (555) 123-4567"
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
          placeholder="Select your birth date"
        />

        <Input
          label="Location"
          type="text"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          disabled={!isEditing}
          placeholder="City, State, Country"
        />

        <Input
          label="LinkedIn Profile"
          type="url"
          value={formData?.linkedinUrl}
          onChange={(e) => handleInputChange('linkedinUrl', e?.target?.value)}
          error={errors?.linkedinUrl}
          disabled={!isEditing}
          placeholder="https://linkedin.com/in/yourprofile"
        />

        <div className="md:col-span-2">
          <Input
            label="GitHub Profile"
            type="url"
            value={formData?.githubUrl}
            onChange={(e) => handleInputChange('githubUrl', e?.target?.value)}
            error={errors?.githubUrl}
            disabled={!isEditing}
            placeholder="https://github.com/yourusername"
          />
        </div>
      </div>
      {isEditing && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Profile Visibility</p>
              <p>Your personal details will be visible to potential employers when you apply for internships. Make sure all information is accurate and professional.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsSection;