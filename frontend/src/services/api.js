// Use Vite env variables (import.meta.env) with VITE_ prefix
const API_BASE_URL = (import.meta.env?.VITE_API_URL) || 'http://localhost:5000/api';

// Get AI API key from environment or user settings
const getAIApiKey = () => {
  return localStorage.getItem('aiApiKey') || import.meta.env?.VITE_AI_API_KEY;
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
};

// User API calls
export const userAPI = {
  getProfile: async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  addSkills: async (skills) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/user/skills`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    });
    return response.json();
  },
};

// Internship API calls with AI recommendations
export const internshipAPI = {
  getRecommendations: async (userSkills) => {
    const token = localStorage.getItem('authToken');
    const aiApiKey = getAIApiKey();
    
    const response = await fetch(`${API_BASE_URL}/internships/recommendations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        skills: userSkills,
        aiApiKey: aiApiKey 
      }),
    });
    return response.json();
  },

  getAllInternships: async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/internships`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  applyToInternship: async (internshipId, applicationData) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/internships/${internshipId}/apply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    return response.json();
  },
};

// Settings API for AI configuration
export const settingsAPI = {
  saveAIApiKey: async (apiKey) => {
    localStorage.setItem('aiApiKey', apiKey);
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/user/ai-settings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aiApiKey: apiKey }),
    });
    return response.json();
  },

  getAIApiKey: () => {
    return getAIApiKey();
  },
};
