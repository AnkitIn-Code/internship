const express = require('express');
const Internship = require('../models/Internship');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get All Internships
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json({
      internships,
      count: internships.length
    });

  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({ message: 'Server error fetching internships' });
  }
});

// Create Internship (Protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, sector, skills, location, description, company, duration } = req.body;

    if (!title || !sector || !skills || !location || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const internship = new Internship({
      title,
      sector,
      skills: Array.isArray(skills) ? skills : [skills],
      location,
      description,
      company: company || 'Company Name',
      duration: duration || '3 months'
    });

    await internship.save();

    res.status(201).json({
      message: 'Internship created successfully',
      internship
    });

  } catch (error) {
    console.error('Create internship error:', error);
    res.status(500).json({ message: 'Server error creating internship' });
  }
});

// Get Internship by ID
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json({ internship });

  } catch (error) {
    console.error('Get internship error:', error);
    res.status(500).json({ message: 'Server error fetching internship' });
  }
});

// Seed some sample internships (for testing)
router.post('/seed', async (req, res) => {
  try {
    const sampleInternships = [
      {
        title: 'Frontend Developer Intern',
        sector: 'Technology',
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        location: 'Mumbai',
        description: 'Work on modern web applications using React and JavaScript.',
        company: 'Tech Solutions Inc',
        duration: '3 months'
      },
      {
        title: 'Marketing Intern',
        sector: 'Marketing',
        skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
        location: 'Delhi',
        description: 'Assist in digital marketing campaigns and social media management.',
        company: 'Creative Marketing Agency',
        duration: '4 months'
      },
      {
        title: 'Data Science Intern',
        sector: 'Technology',
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
        location: 'Bangalore',
        description: 'Work on data analysis and machine learning projects.',
        company: 'DataTech Solutions',
        duration: '6 months'
      }
    ];

    await Internship.deleteMany({});
    const internships = await Internship.insertMany(sampleInternships);

    res.json({
      message: 'Sample internships created successfully',
      internships
    });

  } catch (error) {
    console.error('Seed internships error:', error);
    res.status(500).json({ message: 'Server error seeding internships' });
  }
});

module.exports = router;
