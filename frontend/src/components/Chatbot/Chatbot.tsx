import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { getAllSweets } from '../../api/sweetsApi';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your Sweet Shop assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [sweets, setSweets] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const data = await getAllSweets();
        setSweets(data);
      } catch (error) {
        console.error('Failed to fetch sweets:', error);
      }
    };
    fetchSweets();
  }, []);

  const getPageContext = (): string => {
    const path = location.pathname;
    if (path === '/') return 'homepage';
    if (path === '/admin') return 'admin panel';
    if (path === '/cart') return 'shopping cart';
    if (path === '/checkout') return 'checkout page';
    if (path === '/dashboard') return 'user dashboard';
    return 'website';
  };

  const getResponse = (input: string): string => {
    const key = input.toLowerCase();
    const currentPage = getPageContext();
    
    if (key.includes('hello') || key.includes('hi')) {
      const greeting = user ? `Hello ${user.username || user.email}! Welcome back to our Sweet Shop! 🍭` : "Hello! Welcome to our Sweet Shop! 🍭";
      return `${greeting}\nI can see you're on the ${currentPage}. How can I assist you?`;
    }
    
    if (key.includes('where am i') || key.includes('current page') || key.includes('page')) {
      return `You're currently on the ${currentPage}. ${user ? `Logged in as ${user.username || user.email}.` : 'Not logged in.'}`;
    }
    
    if (key.includes('user') || key.includes('account') || key.includes('profile')) {
      if (!user) return "You're not logged in. Click 'Login' to access your account.";
      return `Account Info:\n• Name: ${user.username || 'Not set'}\n• Email: ${user.email}\n• Role: ${user.role || 'Customer'}\n• Status: Active`;
    }
    
    if (key.includes('help')) {
      const contextHelp = currentPage === 'admin panel' ? '\n• Manage inventory\n• Add new sweets\n• View statistics' :
                         currentPage === 'shopping cart' ? '\n• Update quantities\n• Remove items\n• Proceed to checkout' :
                         currentPage === 'checkout page' ? '\n• Enter payment details\n• Confirm order' :
                         '\n• Browse sweets\n• Add items to cart\n• Search products';
      return `I can help you with:${contextHelp}\n• Login/Registration guide\n• Account management\n• General questions`;
    }
    
    if (key.includes('cart')) {
      const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      if (cartCount > 0) {
        const itemsList = items.map(item => `${item.name} (${item.quantity}x)`).join(', ');
        return `Cart Summary:\n• Items: ${cartCount}\n• Products: ${itemsList}\n• Total: ₹${cartTotal.toFixed(2)}`;
      }
      return "Your cart is empty. Browse our sweets and click 🛒 to add items!";
    }
    
    if (key.includes('sweets') || key.includes('products') || key.includes('inventory')) {
      if (sweets.length > 0) {
        const inStock = sweets.filter(s => s.quantity > 0).length;
        const outOfStock = sweets.filter(s => s.quantity <= 0).length;
        const categories = [...new Set(sweets.map(s => s.category))].join(', ');
        return `Inventory Status:\n• Total Products: ${sweets.length}\n• In Stock: ${inStock}\n• Out of Stock: ${outOfStock}\n• Categories: ${categories}`;
      }
      return "Loading product information...";
    }
    
    if (key.includes('price') || key.includes('cost')) {
      if (sweets.length > 0) {
        const prices = sweets.map(s => s.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
        return `Price Information:\n• Range: ₹${minPrice} - ₹${maxPrice}\n• Average: ₹${avgPrice}\n• Most Expensive: ${sweets.find(s => s.price === maxPrice)?.name}\n• Most Affordable: ${sweets.find(s => s.price === minPrice)?.name}`;
      }
      return "Loading price information...";
    }
    
    if (key.includes('register') || key.includes('signup') || key.includes('create account')) {
      if (isAuthenticated) return "You're already registered and logged in!";
      return "How to Register:\n• Click 'Register' in the top navigation\n• Fill in: Username, Email, Password\n• Confirm your password\n• Click 'Register' button\n• You'll be automatically logged in\n\nNote: Password must be at least 6 characters long.";
    }
    
    if (key.includes('login') || key.includes('signin') || key.includes('log in')) {
      if (isAuthenticated) return `You're logged in as ${user?.username || user?.email}!`;
      return "How to Login:\n• Click 'Login' in the top navigation\n• Enter your registered email\n• Enter your password\n• Click 'Login' button\n• You'll be redirected to homepage\n\nForgot your credentials? You'll need to register again.";
    }
    
    if (key.includes('admin')) {
      if (!isAuthenticated) return "You need to login first to access admin features.";
      return user?.role === 'admin' ? "You have admin access! Use the Admin Panel to manage inventory." : "You don't have admin privileges.";
    }
    
    // Check for specific sweet names
    const foundSweet = sweets.find(sweet => 
      sweet.name.toLowerCase().includes(key) || 
      key.includes(sweet.name.toLowerCase())
    );
    
    if (foundSweet) {
      const stockStatus = foundSweet.quantity <= 0 ? "❌ Out of stock" : 
                         foundSweet.quantity <= 5 ? "⚠️ Low stock" : "✅ In stock";
      const inCart = items.find(item => item._id === foundSweet._id);
      return `${foundSweet.name}:\n• Price: ₹${foundSweet.price}\n• Available: ${foundSweet.quantity} units\n• Status: ${stockStatus}\n• Category: ${foundSweet.category}${foundSweet.description ? `\n• Description: ${foundSweet.description}` : ''}${inCart ? `\n• In your cart: ${inCart.quantity}` : ''}`;
    }
    
    return `I'm your intelligent assistant! I can see you're on the ${currentPage}. Ask me about:\n• Your account & cart\n• Product information\n• How to login/register\n• Navigation help\n• Current page features`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false
    };

    const botMessage: Message = {
      id: Date.now() + 1,
      text: getResponse(input),
      isBot: true
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-500 z-50 text-white ${
          isOpen ? 'rotate-12 scale-110 bg-yellow-600 hover:bg-yellow-700' : 'rotate-0 scale-100 bg-amber-800 hover:bg-amber-900 animate-bounce'
        }`}
      >
        {isOpen ? '🍭' : '🧁'}
      </button>

      {isOpen && (
        <div className={`fixed bottom-20 right-6 w-80 h-96 rounded-lg shadow-xl border z-50 animate-bounce-in ${
          document.documentElement.classList.contains('dark') ? 'bg-gray-800 border-amber-600' : 'bg-white border-gray-300'
        }`}>
          <div className="bg-yellow-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Sweet Shop Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">✕</button>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs p-3 rounded-lg text-sm shadow-sm ${
                  msg.isBot 
                    ? (document.documentElement.classList.contains('dark') ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-100 text-gray-800 border border-gray-200')
                    : (document.documentElement.classList.contains('dark') ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white')
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none ${
                document.documentElement.classList.contains('dark') 
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-amber-500' 
                  : 'bg-white text-gray-800 border-gray-300 focus:border-purple-500'
              }`}
            />
            <button
              onClick={handleSend}
              className="bg-amber-800 hover:bg-amber-900 text-white px-3 py-2 rounded-lg transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;