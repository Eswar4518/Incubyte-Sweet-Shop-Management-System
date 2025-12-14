const mongoose = require('mongoose');
require('dotenv').config();

const sweetSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  description: String,
  image: String
}, { timestamps: true });

const Sweet = mongoose.model('Sweet', sweetSchema);

const sampleSweets = [
  {
    name: "Gulab Jamun",
    category: "Indian Sweet",
    price: 12.99,
    quantity: 25,
    description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
    image: "/images/gulab-jamun.jpg"
  },
  {
    name: "Rasgulla",
    category: "Indian Sweet",
    price: 10.99,
    quantity: 30,
    description: "Spongy cottage cheese balls in sugar syrup",
    image: "/images/rasgulla.jpg"
  },
  {
    name: "Jalebi",
    category: "Indian Sweet",
    price: 8.99,
    quantity: 35,
    description: "Crispy spiral-shaped sweet soaked in saffron syrup",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Jalebi-India.jpg"
  },
  {
    name: "Laddu",
    category: "Indian Sweet",
    price: 15.99,
    quantity: 20,
    description: "Traditional round sweets made with gram flour and ghee",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Boondi_ladoo.jpg"
  },
  {
    name: "Barfi",
    category: "Indian Sweet",
    price: 18.99,
    quantity: 18,
    description: "Rich milk-based sweet garnished with pistachios",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Kaju_Katli_Barfi.jpg"
  },
  {
    name: "Kaju Katli",
    category: "Indian Sweet",
    price: 24.99,
    quantity: 15,
    description: "Diamond-shaped cashew fudge with silver leaf",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Kaju_Katli_%28Indian_sweet%29.jpg"
  },
  {
    name: "Rasmalai",
    category: "Indian Sweet",
    price: 16.99,
    quantity: 22,
    description: "Soft cottage cheese patties in cardamom-flavored milk",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/42/Rasmalai_%28Homemade%29.jpg"
  },
  {
    name: "Sandesh",
    category: "Indian Sweet",
    price: 13.99,
    quantity: 28,
    description: "Bengali sweet made from fresh cottage cheese",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Bengali_Sandesh.jpg"
  },
  {
    name: "Mysore Pak",
    category: "Indian Sweet",
    price: 19.99,
    quantity: 16,
    description: "Rich ghee-based sweet from Karnataka",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Mysore_pak_sweet.jpg"
  },
  {
    name: "Soan Papdi",
    category: "Indian Sweet",
    price: 11.99,
    quantity: 32,
    description: "Flaky, crispy sweet with cardamom flavor",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Soan_papdi_sweets.jpg"
  },
  {
    name: "Chocolate Cake",
    category: "Cake",
    price: 25.99,
    quantity: 15,
    description: "Rich chocolate cake with vanilla frosting",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Chocolate_cake_with_chocolate_frosting.jpg"
  },
  {
    name: "Strawberry Cupcake",
    category: "Cupcake",
    price: 4.99,
    quantity: 30,
    description: "Fresh strawberry cupcake with cream cheese frosting",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Strawberry_cupcake.JPG"
  },
  {
    name: "Rainbow Lollipop",
    category: "Candy",
    price: 2.50,
    quantity: 50,
    description: "Colorful swirl lollipop with fruity flavors",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Rainbow_Lollipop.jpg"
  },
  {
    name: "Vanilla Ice Cream",
    category: "Ice Cream",
    price: 6.99,
    quantity: 20,
    description: "Creamy vanilla ice cream made with real vanilla beans",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Vanilla_ice_cream_cone.jpg"
  },
  {
    name: "Chocolate Chip Cookies",
    category: "Cookie",
    price: 8.99,
    quantity: 25,
    description: "Freshly baked chocolate chip cookies (pack of 6)",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Chocolate_chip_cookies.jpg"
  },
  {
    name: "Gummy Bears",
    category: "Candy",
    price: 3.99,
    quantity: 40,
    description: "Assorted fruit-flavored gummy bears",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gummy_bears_%28Haribo%29.jpg"
  },
  {
    name: "Kulfi",
    category: "Indian Sweet",
    price: 7.99,
    quantity: 24,
    description: "Traditional Indian ice cream with cardamom and pistachios",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Malai_Kulfi.JPG"
  },
  {
    name: "Badusha",
    category: "Indian Sweet",
    price: 14.99,
    quantity: 26,
    description: "Soft milk-based sweet flavored with cardamom",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Milk_Peda.jpg"
  },
  {
    name: "Halwa",
    category: "Indian Sweet",
    price: 17.99,
    quantity: 19,
    description: "Rich semolina pudding with nuts and raisins",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Suji_halwa.jpg"
  },
  {
    name: "Kheer",
    category: "Indian Sweet",
    price: 9.99,
    quantity: 21,
    description: "Creamy rice pudding with cardamom and almonds",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Kheer.jpg"
  }
];

async function addSampleSweets() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop');
    console.log('Connected to MongoDB');

    await Sweet.deleteMany({});
    console.log('Cleared existing sweets');

    const result = await Sweet.insertMany(sampleSweets);
    console.log(`Added ${result.length} sample sweets`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSampleSweets();