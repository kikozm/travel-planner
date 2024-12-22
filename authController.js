const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // בדיקת קיום משתמש קודם
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // יצירת המשתמש
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    // השוואת סיסמה
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // ניתן להחזיר JWT או מזהה סשן
    return res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
