const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); 
const projectRoutes = require('./routes/project'); 
const certRoutes = require('./routes/certificate'); 
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api', authRoutes);
app.use('/pr', projectRoutes);
app.use('/cr', certRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
