import React, { createContext, useState, useContext, useEffect } from "react";
import dataMenu from "../data/dataMenu.json";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import { ShoppingCart, X, Plus, Minus, Menu } from "lucide-react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price || 9.99) * item.quantity,
    0
  );

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems, cartCount, removeFromCart, updateQuantity, cartTotal } =
    useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src={logo} alt="Cheffy Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-pink-600">
                Cheffy
              </span>
            </div>
          </div>

          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {Object.keys(dataMenu).map((key, index) => (
              <a
                href={dataMenu[key]}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50 transition-colors"
                key={index}
              >
                {key}
              </a>
            ))}
          </nav>

          <div className="flex md:hidden">
            <button
              className="p-2 rounded-md text-gray-500 hover:text-pink-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:block mr-4">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-48 lg:w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="relative mr-4">
              <button
                className="p-2 rounded-full text-gray-600 hover:text-pink-600 hover:bg-gray-100 relative"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Shopping Cart</h3>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setCartOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        Your cart is empty
                      </p>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex py-4 border-b border-gray-100 last:border-0"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className="line-clamp-1">{item.name}</h3>
                                <p className="ml-4">
                                  ${(item.price || 9.99).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center border rounded">
                                <button
                                  className="p-1 text-gray-600 hover:text-pink-600"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                  className="p-1 text-gray-600 hover:text-pink-600"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <button
                                type="button"
                                className="font-medium text-pink-600 hover:text-pink-800"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between mb-4 font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                      </div>
                      <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="hidden sm:block py-2 px-4 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg text-sm font-medium transition-colors mr-4">
              My Recipe Box
            </button>
            <img
              src={avatar}
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <nav className="space-y-2">
            {Object.keys(dataMenu).map((key, index) => (
              <a
                key={index}
                href={dataMenu[key]}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
              >
                {key}
              </a>
            ))}
          </nav>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
