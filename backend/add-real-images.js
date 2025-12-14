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
    description: "Soft milk dumplings in sugar syrup",
    category: "Traditional",
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    name: "Rasgulla",
    price: 100,
    quantity: 30,
    description: "Spongy cottage cheese balls",
    category: "Bengali",
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    name: "Jalebi",
    price: 80,
    quantity: 20,
    description: "Crispy spiral sweet",
    category: "Traditional",
    image: "https://picsum.photos/400/300?random=3"
  },
  {
    name: "Kaju Katli",
    price: 300,
    quantity: 15,
    description: "Diamond cashew fudge",
    category: "Premium",
    image: "https://picsum.photos/400/300?random=4"
  },
  {
    name: "Laddu",
    price: 60,
    quantity: 40,
    description: "Round sweet balls",
    category: "Traditional",
    image: "https://picsum.photos/400/300?random=5"
  },
  {
    name: "Barfi",
    price: 150,
    quantity: 18,
    description: "Dense milk squares",
    category: "Milk-based",
    image: "https://picsum.photos/400/300?random=6"
  }
];

async function addSweets() {
  try {
    await Sweet.deleteMany({});
    const result = await Sweet.insertMany(sweets);
    console.log(`Added ${result.length} sweets with real images!`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

addSweets();