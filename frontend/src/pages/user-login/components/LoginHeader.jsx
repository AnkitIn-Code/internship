import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
          <Icon name="Briefcase" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-lg">
          Sign in to your InternshipHub account
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Access your personalized internship recommendations and track your applications
      </p>
    </div>
  );
};

export default LoginHeader;