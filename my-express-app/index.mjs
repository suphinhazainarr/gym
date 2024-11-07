import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';  // Corrected import

const app = express();
app.use(cors());  // CORS middleware should be applied here
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/gym')
  .then(() => console.log('MongoDB connected to gym database'))
  .catch((error) => console.error('MongoDB connection error:', error));


// Assuming you have a User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  password: String,
}));



// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, phone, gender, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, phone, gender, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);  // Added log
    res.status(500).json({ message: 'Error registering user' });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Start server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
