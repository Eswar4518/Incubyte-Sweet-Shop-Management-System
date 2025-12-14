const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sweetshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
});

const Sweet = mongoose.model('Sweet', sweetSchema);

const sweets = [
  {
    name: "Gulab Jamun",
    price: 120,
    quantity: 25,
    description: "Soft, spongy milk dumplings soaked in rose-flavored sugar syrup",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format"
  },
  {
    name: "Rasgulla",
    price: 100,
    quantity: 30,
    description: "Spongy cottage cheese balls in light sugar syrup",
    category: "Bengali",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop&auto=format"
  },
  {
    name: "Jalebi",
    price: 80,
    quantity: 20,
    description: "Crispy spiral-shaped sweet soaked in sugar syrup",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&auto=format"
  },
  {
    name: "Kaju Katli",
    price: 300,
    quantity: 15,
    description: "Diamond-shaped cashew fudge with silver leaf",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1587736797834-7b1b6e5c4b5e?w=400&h=300&fit=crop&auto=format"
  },
  {
    name: "Laddu",
    price: 60,
    quantity: 40,
    description: "Round sweet balls made from flour, ghee and sugar",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format"
  },
  {
    name: "Barfi",
    price: 150,
    quantity: 18,
    description: "Dense milk-based sweet in square pieces",
    category: "Milk-based",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&auto=format"
  }
];

async function addSweets() {
  try {
    await Sweet.deleteMany({});
    console.log('Cleared existing sweets');
    
    const result = await Sweet.insertMany(sweets);
    console.log(`Added ${result.length} sweets with images!`);
    
    result.forEach(sweet => {
      console.log(`- ${sweet.name}: ${sweet.image}`);
    });
  } catch (error) {
    console.error('Error adding sweets:', error);
  } finally {
    mongoose.connection.close();
  }
}

addSweets();