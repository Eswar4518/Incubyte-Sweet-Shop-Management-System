const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function updateExistingUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    
    // Find users without username
    const usersWithoutUsername = await User.find({ username: { $exists: false } });
    
    for (const user of usersWithoutUsername) {
      // Extract username from email (part before @)
      const username = user.email.split('@')[0];
      
      // Update user with username
      await User.findByIdAndUpdate(user._id, { username: username });
      console.log(`Updated user ${user.email} with username: ${username}`);
    }
    
    console.log(`✅ Updated ${usersWithoutUsername.length} users with usernames`);
    
  } catch (error) {
    console.error('❌ Error updating users:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateExistingUsers();