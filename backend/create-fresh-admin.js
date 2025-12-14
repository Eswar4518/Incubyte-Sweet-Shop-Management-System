const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createFreshAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    
    // Clear all users
    await mongoose.connection.db.collection('users').deleteMany({});
    console.log('🗑️ Cleared all existing users');
    
    // Create fresh admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const result = await mongoose.connection.db.collection('users').insertOne({
      username: 'Eswar',
      email: 'eswar@sweetshop.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Fresh admin created!');
    console.log('👤 Username: Eswar');
    console.log('📧 Email: eswar@sweetshop.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: admin');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

createFreshAdmin();