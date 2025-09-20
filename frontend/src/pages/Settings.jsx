import React, { useState, useEffect } from 'react';
import { settingsAPI } from '../services/api';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';

const Settings = () => {
  const [aiApiKey, setAiApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existingKey = settingsAPI.getAIApiKey();
    if (existingKey) {
      setAiApiKey(existingKey);
    }
  }, []);

  const handleSaveApiKey = async () => {
    if (!aiApiKey.trim()) return;
    
    try {
      setLoading(true);
      await settingsAPI.saveAIApiKey(aiApiKey);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving AI API key:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your preferences and API settings
          </p>
        </div>

        {/* AI Configuration */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Bot" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              AI Recommendations
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                AI API Key
              </label>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={aiApiKey}
                  onChange={(e) => setAiApiKey(e.target.value)}
                  placeholder="Enter your AI API key for personalized recommendations"
                  className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Button
                  onClick={handleSaveApiKey}
                  disabled={!aiApiKey.trim() || loading}
                  iconName={saved ? "Check" : "Save"}
                >
                  {loading ? 'Saving...' : saved ? 'Saved!' : 'Save'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                This key will be used to generate personalized internship recommendations based on your skills.
                We support OpenAI GPT, Claude, and other AI providers.
              </p>
            </div>
          </div>
        </div>

        {/* Other Settings */}
        <div className="bg-card rounded-lg border border-border p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            General Settings
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <h3 className="font-medium text-foreground">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new internship opportunities
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <h3 className="font-medium text-foreground">Privacy Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your data and privacy preferences
                </p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
