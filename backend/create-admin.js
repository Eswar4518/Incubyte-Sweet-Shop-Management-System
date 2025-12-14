const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    
    const adminEmail = 'Eswar@sweetshop.com';
    const adminPassword = 'admin123';
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const admin = new User({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();