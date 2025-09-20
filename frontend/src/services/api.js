// Use Vite env variables (import.meta.env) with VITE_ prefix
const API_BASE_URL = (import.meta.env?.VITE_API_URL) || 'http://localhost:5000/api';

// Get AI API key from environment or user settings
const getAIApiKey = () => {
  return localStorage.getItem('aiApiKey') || import.meta.env?.VITE_AI_API_KEY;
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    // Backend uses /api/auth/signup
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
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
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },
};

// Internship API calls with AI recommendations
export const internshipAPI = {
  getRecommendations: async () => {
    const token = localStorage.getItem('authToken');
    // Backend provides GET /api/recommendations for authenticated user
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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

  // No apply endpoint in backend currently
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
