const express = require('express');
const Internship = require('../models/Internship');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Calculate match score between candidate and internship
function calculateMatchScore(candidateProfile, internship) {
  let score = 0;

  // Sector match (weight: 3)
  if (internship.sector.toLowerCase() === candidateProfile.sector.toLowerCase()) {
    score += 3;
  }

  // Location match (weight: 2)
  if (internship.location.toLowerCase() === candidateProfile.location.toLowerCase()) {
    score += 2;
  }

  // Skills match (weight: 1 per matching skill)
  const candidateSkills = candidateProfile.skills.map(skill => skill.toLowerCase());
  const internshipSkills = internship.skills.map(skill => skill.toLowerCase());
  
  const matchedSkills = candidateSkills.filter(skill => 
    internshipSkills.some(internshipSkill => internshipSkill.includes(skill))
  );
  
  score += matchedSkills.length;

  return score;
}

// Get Recommendations for Authenticated User
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userProfile = req.user.profile;

    // Check if user has profile data
    if (!userProfile || !userProfile.skills || userProfile.skills.length === 0) {
      return res.status(400).json({ 
        message: 'Please complete your profile first to get recommendations',
        recommendations: []
      });
    }

    // Get all internships
    const internships = await Internship.find();

    if (internships.length === 0) {
      return res.json({
        message: 'No internships available currently',
        recommendations: []
      });
    }

    // Calculate scores and sort
    const recommendations = internships
      .map(internship => ({
        ...internship.toObject(),
        matchScore: calculateMatchScore(userProfile, internship)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5 recommendations

    res.json({
      message: 'Recommendations generated successfully',
      recommendations,
      userProfile: {
        education: userProfile.education,
        skills: userProfile.skills,
        sector: userProfile.sector,
        location: userProfile.location
      }
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: 'Server error generating recommendations' });
  }
});

// Get Recommendations with Custom Profile (for testing)
router.post('/', async (req, res) => {
  try {
    const { education, skills, sector, location } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ 
        message: 'Please provide skills array to get recommendations' 
      });
    }

    const candidateProfile = {
      education: education || '',
      skills: skills || [],
      sector: sector || '',
      location: location || ''
    };

    // Get all internships
    const internships = await Internship.find();

    if (internships.length === 0) {
      return res.json({
        message: 'No internships available currently',
        recommendations: []
      });
    }

    // Calculate scores and sort
    const recommendations = internships
      .map(internship => ({
        ...internship.toObject(),
        matchScore: calculateMatchScore(candidateProfile, internship)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5 recommendations

    res.json({
      message: 'Recommendations generated successfully',
      recommendations,
      candidateProfile
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: 'Server error generating recommendations' });
  }
});

module.exports = router;
