const express = require('express');
const mongoose = require('mongoose');
const Architect = require('../models/architect');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${req.params.id}_${file.fieldname}${path.extname(file.originalname)}`);
    }
  })
});

// Get project by ID
router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const email = req.query.email; 
  
  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(404).send('Architect not found');

    const project = architect.manageProjects.id(id);
    if (!project) return res.status(404).send('Project not found');

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/projects/:id/upload/:fileType/email/:email', upload.single('file'), async (req, res) => {
  const { id, fileType, email } = req.params;

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(401).send('Architect not found');

    const project = architect.manageProjects.id(id);
    if (!project) return res.status(402).send('Project not found');

    project.files[fileType] = req.file.filename; 
    await architect.save();

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete file
router.delete('/projects/:id/delete/:fileType/email/:email', async (req, res) => {
  const { id, fileType,email } = req.params;
  

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(401).send('Architect not found');

    const project = architect.manageProjects.id(id);
    if (!project) return res.status(402).send('Project not found');

    if (project.files[fileType]) {
      fs.unlinkSync(path.join('uploads', project.files[fileType])); 
      project.files[fileType] = '';
      await architect.save();
    }

    res.status(200).send('File deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download file
router.get('/projects/:id/download/:fileType/email/:email', (req, res) => {
  const { id, fileType ,email} = req.params;
 

  Architect.findOne({ email })
    .then(architect => {
      if (!architect) return res.status(401).send('Architect not found');

      const project = architect.manageProjects.id(id);
      if (!project) return res.status(402).send('Project not found');

      const filePath = path.join('uploads', project.files[fileType]);
      res.download(filePath);
    })
    .catch(error => res.status(500).json({ message: error.message }));
});



router.post('/project', async (req, res) => {
  const { email, projectName,projectFor, type, RDCexist, basement, nf_surelevation, numberOfFloors, location } = req.body;

  console.log('Incoming project data:', req.body); 

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(404).send('Architect not found');

    if (!projectName || !type) return res.status(400).json({ message: 'Required fields missing' });

    const newProject = {
      name: projectName,
      projectFor,
      type,
    /*   status, */
      location,
      details: {
        nf_surelevation,
        RDCexist,
        numberOfFloors,
        basement
      },
      files: {}, 
      certificates: {},  
      visits: []  
    };

    architect.manageProjects.push(newProject);
    await architect.save();

    res.status(201).json(architect.manageProjects);
  } catch (error) {
    console.error('Error adding project:', error); 
    res.status(500).json({ message: error.message });
  }
});


router.get('/projects', async (req, res) => {
  const { email } = req.query; 

  try {
    const architect = await Architect.findOne({ email });
    if (!architect) return res.status(404).send('Architect not found');

    res.json(architect.manageProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/projects/:id', async (req, res) => {
  const { email } = req.query; // Architect email from query
  const { id } = req.params;   // Project ID from URL parameters

  try {
    // Find the architect by email
    const architect = await Architect.findOne({ email });
    if (!architect) {
      return res.status(404).json({ message: 'Architect not found' });
    }

    // Find the project by ID within the architect's manageProjects array
    const project = architect.manageProjects.id(id); // Mongoose's `id` method to find a subdocument
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a project for an architect
router.put('/architects/:architectId/projects/:projectId', async (req, res) => {
  const { architectId, projectId } = req.params;
  const updatedProject = req.body;

  try {
    const architect = await Architect.findById(architectId);
    if (!architect) return res.status(404).send('Architect not found');

    const project = architect.manageProjects.id(projectId);
    if (!project) return res.status(404).send('Project not found');

    Object.assign(project, updatedProject);
    await architect.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a project from an architect
router.delete('/architects/:architectId/projects/:projectId', async (req, res) => {
  const { architectId, projectId } = req.params;

  try {
    const architect = await Architect.findById(architectId);
    if (!architect) return res.status(404).send('Architect not found');

    const project = architect.manageProjects.id(projectId);
    if (!project) return res.status(404).send('Project not found');

    project.remove();
    await architect.save();

    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
