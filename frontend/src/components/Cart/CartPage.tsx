import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <button onClick={clearCart} className="text-red-600 hover:text-red-800">
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {items.map(item => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4 flex-1">
                  <img 
                    src={item.name.toLowerCase().includes('rasgulla') ? 'https://madhurasrecipe.com/wp-content/uploads/2023/10/Rasgulla-1.jpg' : item.name.toLowerCase().includes('gulab jamun') ? 'https://almondhouse.com/cdn/shop/files/1_IMG_9491_1e1968b7-b144-49ba-a4ed-2659e95a3bcb.jpg?v=1703680462&width=800' : item.name.toLowerCase().includes('laddu') ? 'https://vismaifood.com/storage/app/uploads/public/40c/1e6/695/thumb__700_0_0_0_auto.jpg' : (item.name.toLowerCase().includes('burfi') || item.name.toLowerCase().includes('barfi')) ? 'https://myheartbeets.com/wp-content/uploads/2020/11/pressure-cooker-milk-burfi.jpg' : item.name.toLowerCase().includes('kaju katli') ? 'https://static.toiimg.com/thumb/55048826.cms?width=1200&height=900' : item.name.toLowerCase().includes('rasmalai') ? 'https://www.spiceupthecurry.com/wp-content/uploads/2020/08/rasmalai-recipe-1.jpg' : item.name.toLowerCase().includes('sandesh') ? 'https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Sandesh-1300x867.jpg?v=1619103410' : item.name.toLowerCase().includes('mysore pak') ? 'https://indiasweethouse.in/cdn/shop/files/BadamMysorePak_eec04e7e-ba9b-41bd-90c1-e07dfeabef14.png?v=1724998308&width=990' : item.name.toLowerCase().includes('soan papdi') ? 'https://bombaysweets.in/cdn/shop/products/soanpapdi_new.png?v=1694672810&width=823' : item.name.toLowerCase().includes('chocolate cake') ? 'https://butternutbakeryblog.com/wp-content/uploads/2023/04/chocolate-cake-1024x1536.jpg' : item.name.toLowerCase().includes('strawberry cupcake') ? 'https://preppykitchen.com/wp-content/uploads/2022/07/Strawberry-Cupcakes-Feature.jpg' : item.name.toLowerCase().includes('rainbow lollipop') ? 'https://138398283.cdn6.editmysite.com/uploads/1/3/8/3/138398283/LWJF2R5U2Y2RHIQN4A5T7NYH.jpeg?width=2560&optimize=medium' : item.name.toLowerCase().includes('vanilla ice cream') ? 'https://www.allrecipes.com/thmb/bTcUVF3wiDRXkY0HQvQgpStGMlY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-8314-Vanilla-Ice-Cream-gw-ddmfs-beauty-4x3-b0f065ec1e7346abb82f4b3d2ad9907b.jpg' : item.name.toLowerCase().includes('chocolate chip cookies') ? 'https://butternutbakeryblog.com/wp-content/uploads/2023/10/pumpkin-chocolate-chip-cookies-1024x1536.jpg' : item.name.toLowerCase().includes('gummy bears') ? 'https://5.imimg.com/data5/SELLER/Default/2024/2/390208333/SF/WL/RH/132634672/gummy-bears-candy-1000x1000.png' : item.name.toLowerCase().includes('kulfi') ? 'https://www.sharmispassions.com/wp-content/uploads/2020/12/26786689323_0853a6524e_o.jpg' : item.name.toLowerCase().includes('peda') ? 'https://www.cookclickndevour.com/wp-content/uploads/2016/09/badusha-recipe-a.jpg' : item.name.toLowerCase().includes('halwa') ? 'https://www.sharmispassions.com/wp-content/uploads/2015/10/atta-halwa2.jpg' : item.name.toLowerCase().includes('kheer') ? 'https://i0.wp.com/onewholesomemeal.com/wp-content/uploads/2019/02/GUr-Waali-Kheer_Insta2.jpg?w=864&ssl=1' : 'https://sinfullyspicy.com/wp-content/uploads/2014/10/1-4.jpg'} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id!, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-semibold w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <textarea 
                    placeholder="Enter your complete address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg">
                Continue Shopping
              </Link>
              <Link to="/checkout" className="bg-purple-600 text-white px-6 py-3 rounded-lg">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;