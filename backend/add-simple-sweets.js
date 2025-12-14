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
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f59e0b'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23d97706'/%3E%3Ctext x='200' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EGulab Jamun%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Rasgulla",
    price: 100,
    quantity: 30,
    description: "Spongy cottage cheese balls",
    category: "Bengali",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23fbbf24'/%3E%3Ccircle cx='200' cy='150' r='70' fill='%23f59e0b'/%3E%3Ctext x='200' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3ERasgulla%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Jalebi",
    price: 80,
    quantity: 20,
    description: "Crispy spiral sweet",
    category: "Traditional",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f97316'/%3E%3Cpath d='M150 100 Q200 50 250 100 Q200 150 150 200 Q100 150 150 100' fill='%23ea580c'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EJalebi%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Kaju Katli",
    price: 300,
    quantity: 15,
    description: "Diamond cashew fudge",
    category: "Premium",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23c2410c'/%3E%3Cpolygon points='200,80 260,150 200,220 140,150' fill='%23a16207'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='white' font-size='20' font-family='Arial'%3EKaju Katli%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Laddu",
    price: 60,
    quantity: 40,
    description: "Round sweet balls",
    category: "Traditional",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23eab308'/%3E%3Ccircle cx='200' cy='150' r='75' fill='%23ca8a04'/%3E%3Ctext x='200' y='160' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3ELaddu%3C/text%3E%3C/svg%3E"
  },
  {
    name: "Barfi",
    price: 150,
    quantity: 18,
    description: "Dense milk squares",
    category: "Milk-based",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Crect x='150' y='100' width='100' height='100' fill='%23d1d5db'/%3E%3Ctext x='200' y='250' text-anchor='middle' fill='%23374151' font-size='24' font-family='Arial'%3EBarfi%3C/text%3E%3C/svg%3E"
  }
];

async function addSweets() {
  try {
    await Sweet.deleteMany({});
    const result = await Sweet.insertMany(sweets);
    console.log(`Added ${result.length} sweets with SVG images!`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

addSweets();