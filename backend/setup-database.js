const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

// Sweet Schema
const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Sweet = mongoose.model('Sweet', sweetSchema);

const sampleSweets = [
  { name: "Dark Chocolate Truffle", category: "Chocolate", price: 25.99, quantity: 50, description: "Rich dark chocolate truffle with cocoa powder coating" },
  { name: "Strawberry Cheesecake", category: "Cake", price: 45.50, quantity: 20, description: "Creamy cheesecake with fresh strawberry topping" },
  { name: "Rainbow Gummy Bears", category: "Candy", price: 12.99, quantity: 100, description: "Colorful fruit-flavored gummy bears" },
  { name: "Chocolate Chip Cookies", category: "Cookie", price: 18.75, quantity: 75, description: "Freshly baked cookies with premium chocolate chips" },
  { name: "Vanilla Ice Cream Sundae", category: "Ice Cream", price: 32.00, quantity: 30, description: "Premium vanilla ice cream with toppings" },
  { name: "French Macarons", category: "Pastry", price: 28.50, quantity: 40, description: "Delicate almond macarons in assorted flavors" },
  { name: "Milk Chocolate Bar", category: "Chocolate", price: 15.99, quantity: 80, description: "Smooth and creamy milk chocolate bar" },
  { name: "Red Velvet Cupcake", category: "Cake", price: 22.00, quantity: 35, description: "Moist red velvet cupcake with cream cheese frosting" },
  { name: "Sour Patch Kids", category: "Candy", price: 8.99, quantity: 120, description: "Sour then sweet chewy candy" },
  { name: "Chocolate Croissant", category: "Pastry", price: 19.25, quantity: 25, description: "Buttery croissant filled with rich chocolate" },
  { name: "Mint Chocolate Chip Ice Cream", category: "Ice Cream", price: 29.99, quantity: 40, description: "Refreshing mint ice cream with chocolate chips" },
  { name: "Oatmeal Raisin Cookies", category: "Cookie", price: 16.50, quantity: 60, description: "Wholesome oatmeal cookies with plump raisins" },
  { name: "White Chocolate Mousse", category: "Chocolate", price: 35.00, quantity: 15, description: "Light and airy white chocolate mousse dessert" },
  { name: "Lemon Tart", category: "Pastry", price: 24.75, quantity: 30, description: "Tangy lemon curd in a buttery pastry shell" },
  { name: "Cotton Candy", category: "Candy", price: 6.99, quantity: 90, description: "Fluffy spun sugar in pink and blue colors" }
];

async function setupDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    console.log('🔗 Connected to MongoDB');
    
    // Create admin user
    const adminEmail = 'Eswar@sweetshop.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'Eswar',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('👑 Admin user created');
    } else {
      console.log('👑 Admin user already exists');
      // Update existing admin with username if missing
      if (!existingAdmin.username) {
        await User.findByIdAndUpdate(existingAdmin._id, { username: 'Eswar' });
        console.log('👑 Admin username updated');
      }
    }
    
    // Add sample sweets
    await Sweet.deleteMany({});
    await Sweet.insertMany(sampleSweets);
    console.log('🍭 Added 15 sample sweets');
    
    // Update existing users without usernames
    const usersWithoutUsername = await User.find({ username: { $exists: false } });
    for (const user of usersWithoutUsername) {
      const username = user.email.split('@')[0];
      await User.findByIdAndUpdate(user._id, { username: username });
    }
    if (usersWithoutUsername.length > 0) {
      console.log(`🔄 Updated ${usersWithoutUsername.length} users with usernames`);
    }
    
    console.log('\n✅ Database setup complete!');
    console.log('👤 Admin Username: Eswar');
    console.log('📧 Admin Email: Eswar@sweetshop.com');
    console.log('🔑 Admin Password: admin123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    mongoose.disconnect();
  }
}

setupDatabase();