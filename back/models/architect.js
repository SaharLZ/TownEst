const mongoose = require('mongoose');
const { Schema } = mongoose;

// Project Schema
const ProjectSchema = new Schema({
  name: { type: String, required: true },
  projectFor: {type: String, },
  location :{type: String},
  type: { 
    type: String, 
  
    required: true 
  },
  openingDate: { type: Date,},  
  closingDate: { type: Date, },
  details: {
    nf_surelevation: { type: Number, default: 0 }, 
    RDCexist: { type: Number,default: 0 },  
    numberOfFloors: { type: Number, default: 0 }, 
    basement: { type: Number, default: 0 },  
  },
  files: {
    Demand: { type: String, default: '' }, 
    ArchitecturalPlan: { type: String, default: '' }, 
    ConstructionPlan: { type: String, default: '' }, 
    Contract: { type: String, default: '' }, 
  },
  certificates: {
    certificateOccupancy: { type: Boolean, default: false },  
    certificateConformity: { type: Boolean, default: false },  
    certificateFile: { type: String, default: '' },
  },
  visits: [
    {
      name: { type: String, required: true },  // Visit name
      photo: { type: String, default: '' },  // Visit photo URL
      openingDate: { type: Date, required: true },
      pdf: { type: String, default: '' },  
      observation: { type: String, default: '' },  // Visit observation
    }
  ],
});

// Event Schema
const EventSchema = new Schema({
  eventName: { type: String, required: true },  
  startTime: { type: Date, required: true },  
  endTime: { type: Date, required: true }, 
  location: { type: String, required: true },  
});

// Architect Schema
const ArchitectSchema = new Schema({
  fullName: { type: String, },  
  dateOfRegistration: { type: Date, default: Date.now },  
  country: { type: String, default: '' },  
  city: { type: String, default: '' },  
  email: { type: String, required: true, unique: true },  
  phone: { type: String, unique: true, sparse: true }, 
  password: { type: String, required: true },  
  whatsapp: { type: String, default: '' },  
  facebook: { type: String, default: '' },  
  instagram: { type: String, default: '' },  
  linkedin: { type: String, default: '' },  
  telegram: { type: String, default: '' },  
  
  manageProjects: [ProjectSchema],  
  
  events: [EventSchema],
});

module.exports = mongoose.model('Architect', ArchitectSchema);
