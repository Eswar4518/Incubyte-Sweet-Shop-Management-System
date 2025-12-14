const mongoose = require('mongoose');
require('dotenv').config();

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

const Sweet = mongoose.model('Sweet', sweetSchema);

const sampleSweets = [
  {
    name: "Dark Chocolate Truffle",
    category: "Chocolate",
    price: 25.99,
    quantity: 50,
    description: "Rich dark chocolate truffle with cocoa powder coating"
  },
  {
    name: "Strawberry Cheesecake",
    category: "Cake",
    price: 45.50,
    quantity: 20,
    description: "Creamy cheesecake with fresh strawberry topping"
  },
  {
    name: "Rainbow Gummy Bears",
    category: "Candy",
    price: 12.99,
    quantity: 100,
    description: "Colorful fruit-flavored gummy bears in assorted flavors"
  },
  {
    name: "Chocolate Chip Cookies",
    category: "Cookie",
    price: 18.75,
    quantity: 75,
    description: "Freshly baked cookies with premium chocolate chips"
  },
  {
    name: "Vanilla Ice Cream Sundae",
    category: "Ice Cream",
    price: 32.00,
    quantity: 30,
    description: "Premium vanilla ice cream with chocolate sauce and cherry"
  },
  {
    name: "French Macarons",
    category: "Pastry",
    price: 28.50,
    quantity: 40,
    description: "Delicate almond macarons in assorted flavors"
  },
  {
    name: "Milk Chocolate Bar",
    category: "Chocolate",
    price: 15.99,
    quantity: 80,
    description: "Smooth and creamy milk chocolate bar"
  },
  {
    name: "Red Velvet Cupcake",
    category: "Cake",
    price: 22.00,
    quantity: 35,
    description: "Moist red velvet cupcake with cream cheese frosting"
  },
  {
    name: "Sour Patch Kids",
    category: "Candy",
    price: 8.99,
    quantity: 120,
    description: "Sour then sweet chewy candy in fun shapes"
  },
  {
    name: "Chocolate Croissant",
    category: "Pastry",
    price: 19.25,
    quantity: 25,
    description: "Buttery croissant filled with rich chocolate"
  },
  {
    name: "Mint Chocolate Chip Ice Cream",
    category: "Ice Cream",
    price: 29.99,
    quantity: 40,
    description: "Refreshing mint ice cream with chocolate chips"
  },
  {
    name: "Oatmeal Raisin Cookies",
    category: "Cookie",
    price: 16.50,
    quantity: 60,
    description: "Wholesome oatmeal cookies with plump raisins"
  },
  {
    name: "White Chocolate Mousse",
    category: "Chocolate",
    price: 35.00,
    quantity: 15,
    description: "Light and airy white chocolate mousse dessert"
  },
  {
    name: "Lemon Tart",
    category: "Pastry",
    price: 24.75,
    quantity: 30,
    description: "Tangy lemon curd in a buttery pastry shell"
  },
  {
    name: "Cotton Candy",
    category: "Candy",
    price: 6.99,
    quantity: 90,
    description: "Fluffy spun sugar in pink and blue colors"
  }
];

async function addSampleSweets() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    
    // Clear existing sweets
    await Sweet.deleteMany({});
    console.log('🗑️ Cleared existing sweets');
    
    // Add sample sweets
    await Sweet.insertMany(sampleSweets);
    console.log('✅ Added 15 sample sweets successfully!');
    
    const count = await Sweet.countDocuments();
    console.log(`📊 Total sweets in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error adding sweets:', error);
  } finally {
    mongoose.disconnect();
  }
}

addSampleSweets();