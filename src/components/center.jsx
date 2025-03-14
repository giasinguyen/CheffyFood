import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/center.css";
import { Clock, Star, BookmarkPlus, ChevronDown, Filter, Search, X, ArrowUpDown, ChevronRight, ShoppingBag, Check } from "lucide-react";
import { useCart } from "./header"; 
function Center() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cookingTime, setCookingTime] = useState(30);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://67d14e7c825945773eb3cb72.mockapi.io/Food")
      .then((response) => {
        const processedData = response.data.map((item) => ({
          ...item,
          rating: item.rating || Math.floor(Math.random() * 5) + 1,
          time: item.time || Math.floor(Math.random() * 30) + 10,
          price: item.price || (Math.floor(Math.random() * 10) + 5).toFixed(2),
        }));
        setData(processedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (recipe) => {
    const item = {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      price: parseFloat(recipe.price)
    };
    
    addToCart(item);
    
    setNotification({
      item: recipe.name,
      timestamp: Date.now()
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(item => item !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(item => item !== filter));
  };

  const cookingTypes = [
    "Pan-fried",
    "Grilled",
    "Sautéed",
    "Steamed",
    "Stir-fried",
    "Roasted",
    "Baked",
    "Stewed",
  ];

  const filteredRecipes = searchTerm 
    ? data.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : data;

  return (
    <div className="max-w-8xl mx-auto p-4 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for recipes..."
                className="pl-10 pr-4 py-3 rounded-lg w-full border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          
            <button 
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-5 py-3 rounded-lg font-medium w-full sm:w-auto justify-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilters.length > 0 && (
                <span className="inline-flex items-center justify-center bg-pink-500 text-white rounded-full w-5 h-5 text-xs font-bold">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <div className="relative ml-auto w-full sm:w-48">
              <select
                className="appearance-none w-full bg-gray-100 border border-gray-200 
                text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
              >
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Rating (Low to High)</option>
                <option>Rating (High to Low)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map(filter => (
                <div key={filter} className="inline-flex items-center gap-1 bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm">
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="focus:outline-none">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              <button onClick={() => setActiveFilters([])} className="text-gray-500 hover:text-gray-700 text-sm ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className={`w-full md:w-1/5 transition-all duration-300 ${filterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    <Filter className="inline mr-2 h-5 w-5" />
                    FILTERS
                  </h2>
                  <button 
                    className="md:hidden text-gray-400 hover:text-gray-600"
                    onClick={() => setFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="filter-section">
                    <h3 className="filter-title flex justify-between cursor-pointer">
                      <span>Cooking Type</span>
                      <ChevronRight className="w-4 h-4 transform rotate-90" />
                    </h3>
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {cookingTypes.map((type) => (
                        <label key={type} className="filter-checkbox-label">
                          <input 
                            type="checkbox" 
                            className="filter-checkbox"
                            checked={activeFilters.includes(type)}
                            onChange={() => toggleFilter(type)}
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3 className="filter-title flex justify-between cursor-pointer">
                      <span>Cooking Time</span>
                      <ChevronRight className="w-4 h-4 transform rotate-90" />
                    </h3>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>10 min</span>
                        <span className="font-medium text-pink-600">{cookingTime} min</span>
                        <span>60 min</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(parseInt(e.target.value))}
                        className="range-slider"
                      />
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3 className="filter-title flex justify-between cursor-pointer">
                      <span>Rating</span>
                      <ChevronRight className="w-4 h-4 transform rotate-90" />
                    </h3>
                    <div className="space-y-2 mt-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="filter-checkbox-label justify-between">
                          <div className="flex">{renderStars(rating)}</div>
                          <input 
                            type="checkbox" 
                            className="filter-checkbox ml-2" 
                            checked={activeFilters.includes(`${rating} Stars`)}
                            onChange={() => toggleFilter(`${rating} Stars`)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full py-3 px-5 bg-gradient-to-r from-pink-500 to-rose-500 
                    text-white font-medium rounded-lg transition hover:scale-[1.02] active:scale-[0.98]
                    hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="w-full md:w-4/5">
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Salad Recipes
                <span className="ml-2 text-lg font-medium text-gray-500">
                  ({filteredRecipes.length})
                </span>
              </h2>
              <p className="text-gray-500">Find the perfect salad recipe for your next meal or special occasion</p>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl shadow-sm flex justify-center items-center h-64">
                <div className="spinner"></div>
                <span className="ml-3 text-gray-600">Loading recipes...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    key={recipe.id}
                  >
                    <div 
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => handleAddToCart(recipe)}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 recipe-rating">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                          <span>{recipe.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full text-pink-600 text-sm font-medium">
                          <span>${recipe.price}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 text-white">
                          <span className="text-sm font-medium">Click to add to cart</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                        {recipe.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{recipe.time} min</span>
                        </div>
                        
                        <button 
                          className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300
                            ${isInCart(recipe.id) 
                              ? 'bg-green-100 text-green-600' 
                              : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'}`
                          }
                          onClick={() => handleAddToCart(recipe)}
                          title={isInCart(recipe.id) ? "Added to cart" : "Add to cart"}
                        >
                          {isInCart(recipe.id) ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <ShoppingBag className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center space-x-2 z-50">
          <div className="bg-green-500 rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
          <span>Added <strong>{notification.item}</strong> to cart</span>
        </div>
      )}
    </div>
  );
}

export default Center;