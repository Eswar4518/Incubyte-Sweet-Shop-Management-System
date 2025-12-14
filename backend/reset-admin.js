const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    
    const adminEmail = 'admin@sweetshop.com';
    
    // Delete existing admin if exists
    await User.deleteOne({ email: adminEmail });
    console.log('🗑️ Removed existing admin user');
    
    // Create new admin with correct credentials
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      username: 'admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('👤 Username:', admin.username);
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👑 Role:', admin.role);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
}

resetAdmin();