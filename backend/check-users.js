const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    
    const users = await User.find({});
    console.log('📊 All users in database:');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. Username: ${user.username || 'N/A'}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Has Password: ${user.password ? 'Yes' : 'No'}`);
      console.log('---');
    });
    
    console.log(`Total users: ${users.length}`);
    
  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    mongoose.disconnect();
  }
}

checkUsers();