const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Skill = require('../models/Skill');

const router = express.Router();

function callPython(sector, location, tech) {
        return new Promise((resolve, reject) => {
        try {
            const scriptPath = path.resolve(__dirname, 'app.py');
                    const py = spawn('python', [scriptPath, sector || '', location || '', tech || ''], {
                        cwd: __dirname,
                    });
            let stdout = '';
            let stderr = '';

            py.stdout.on('data', (chunk) => {
                stdout += chunk.toString();
            });
            py.stderr.on('data', (err) => {
                stderr += err.toString();
            });
            py.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error(`Python exited with code ${code}: ${stderr}`));
                }
                try {
                    const parsed = JSON.parse(stdout || '[]');
                    resolve(parsed);
                } catch (e) {
                    reject(new Error(`Failed to parse Python output: ${e.message}. Raw: ${stdout}`));
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

// POST /api/recommendations
router.post('/', auth, async (req, res) => {
    let { sector = '', location = '', tech = '' } = req.body || {};
    try {
        // If any inputs missing, hydrate from DB for current user
        if (!sector || !location || !tech) {
            const user = await User.findById(req.user._id).select('profile');
            let skillsDoc = null;
            try { skillsDoc = await Skill.findOne({ user: req.user._id }); } catch {}

            if (!sector) sector = user?.profile?.sector || '';
            if (!location) location = user?.profile?.location || '';

            if (!tech) {
                const techArr = Array.isArray(skillsDoc?.techSkills) ? skillsDoc.techSkills
                  : (Array.isArray(user?.profile?.skills) ? user.profile.skills : []);
                tech = techArr.join(', ');
            }
        }

        const recommendations = await callPython(sector, location, tech);
        res.json({ message: 'Recommendations generated', recommendations });
    } catch (err) {
        console.error('Recommend error:', err);
        res.status(500).json({ error: 'Failed to get recommendations', details: err.message });
    }
});

module.exports = router;