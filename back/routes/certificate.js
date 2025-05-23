const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Architect = require('../models/architect');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/certificates');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload Certificate
router.post('/projects/:id/upload/certificate/:type/email/:email', upload.single('file'), async (req, res) => {
  const { id, type, email } = req.params;
  const file = req.file;

  if (!file) return res.status(400).send('No file uploaded');
  if (type !== 'certificateOccupancy' && type !== 'certificateConformity') {
    return res.status(400).json({ message: 'Invalid certificate type' });
  }

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(404).send('Architect not found');

    const project = architect.manageProjects.id(id);
    if (!project) return res.status(404).send('Project not found');

    project.certificates[type] = true;
    project.certificates.certificateFile = file.filename;

    const otherType = type === 'certificateOccupancy' ? 'certificateConformity' : 'certificateOccupancy';
    project.certificates[otherType] = false;

    await architect.save();
    res.status(200).json({ message: 'Certificate uploaded successfully', certificate: project.certificates });
  } catch (error) {
    console.error('Error saving certificate:', error);
    res.status(500).json({ message: 'Error saving certificate', error });
  }
});

// Delete Certificate
router.delete('/projects/:id/delete/certificate/:type/email/:email', async (req, res) => {
  const { id, type, email } = req.params;

  if (type !== 'certificateOccupancy' && type !== 'certificateConformity') {
    return res.status(400).json({ message: 'Invalid certificate type' });
  }

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(404).json({ message: 'Architect not found' });

    const project = architect.manageProjects.id(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const filePath = path.join('uploads', 'certificates', project.certificates.certificateFile);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    project.certificates[type] = false;
    project.certificates.certificateFile = ''; 

    await architect.save();
    res.status(200).json({ message: `${type} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate', error });
  }
});

// Download Certificate
router.get('/projects/:id/download/certificate/email/:email', async (req, res) => {
  const { id, email } = req.params;

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(404).json({ message: 'Architect not found' });

    const project = architect.manageProjects.id(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const filePath = path.join('uploads', 'certificates', project.certificates.certificateFile);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error downloading certificate', error });
  }
});

module.exports = router;
