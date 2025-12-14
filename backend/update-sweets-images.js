const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sweetshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Sweet schema
const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
});

const Sweet = mongoose.model('Sweet', sweetSchema);

// Image URLs from reliable sources
const imageUrls = [
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587736797834-7b1b6e5c4b5e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587736797834-7b1b6e5c4b5e?w=400&h=300&fit=crop',
];

async function updateSweetsWithImages() {
  try {
    const sweets = await Sweet.find({});
    console.log(`Found ${sweets.length} sweets to update`);

    for (let i = 0; i < sweets.length; i++) {
      const sweet = sweets[i];
      const imageUrl = imageUrls[i % imageUrls.length];
      
      await Sweet.findByIdAndUpdate(sweet._id, { 
        image: imageUrl 
      });
      
      console.log(`Updated ${sweet.name} with image: ${imageUrl}`);
    }

    console.log('All sweets updated with images!');
  } catch (error) {
    console.error('Error updating sweets:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateSweetsWithImages();