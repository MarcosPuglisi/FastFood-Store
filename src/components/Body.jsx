import React, { useState } from 'react';
import MenuItemCard from './menu/MenuItemCard';
import '../styles/body/body.css';

const Body = ({ cart: propCart, onAddToCart }) => {
  const [cart, setCart] = useState(propCart || []);

  const addToCart = (itemId) => {
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: itemId, quantity: 1 }]);
    }
  };
  
  // Función para calcular la suma total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = categories.flatMap(category => category.items).find(itemData => itemData.id === item.id);
      return total + menuItem.price * item.quantity;
    }, 0).toFixed(2);
  };


  const categories = [
    {
    title: 'Menu Express',
    items: [
        { id: 13, name: 'Friendly', description: 'Pizza sticks, Margarita, Cola and IceCream', price: 8.00, image: 'friendly.jpg' },
        { id: 14, name: 'Office', description: 'Fries, Burger, Water and Coffe', price: 7.00, image: 'office.jpg' },
        { id: 15, name: 'Funny', description: 'Empanadas, HotDog, Beer and IceCream', price: 9.00, image: 'funny.jpg' },
        ],
    },
    {
    title: 'First',
    items: [
        { id: 1, name: 'Potato Frie', description: 'Crunch fries', price: 0.99, image: 'papas-fritas.jpg' },
        { id: 2, name: 'Empanadas', description: 'Eggplant and cheesse', price: 1.99, image: 'empanadas.jpg' },
        { id: 3, name: 'Pizza sticks', description: 'Vegan Pizza sticks', price: 1.99, image: 'bastones-pizza.jpg' },
      ],
    },
    {
    title: 'Menu',
    items: [
        { id: 4, name: 'Pizza', description: 'Margarita', price: 2.99, image: 'pizza.jpg' },
        { id: 5, name: 'Hotdog', description: 'Vergetarian hotdog', price: 2.99, image: 'hotdog.jpg' },
        { id: 6, name: 'Burger', description: 'Vegan Burger', price: 3.99, image: 'burger.jpg' },
        ],
    },
    {
    title: 'Drinks',
    items: [
        { id: 7, name: 'Soda', description: 'Cola', price: 1.99, image: 'cola.jpg' },
        { id: 8, name: 'Beer', description: 'Corona', price: 2.99, image: 'corona.jpg' },
        { id: 9, name: 'Water', description: 'Mineral Water', price: 0.99, image: 'water.jpg' },
        ],
    },
    {
    title: 'Dolce',
    items: [
        { id: 10, name: 'IceCream', description: 'Chocolate or Stromburry', price: 0.99, image: 'icecream.jpg' },
        { id: 11, name: 'Coffe', description: 'Expresso', price: 0.99, image: 'coffe.jpg' },
        { id: 12, name: 'Corneto', description: 'Corneto con pistachio', price: 0.99, image: 'corneto.jpg' },
        ],
    },
    
        
    // Agrega más categorías aquí (Menú, Bebidas, Postre, etc.)
  ];

  return (
    <div className="body-container">
      {categories.map((category) => (
        <div key={category.title}>
          <h2>{category.title}</h2>
          <div className="menu-items-container">
            {category.items.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}

      <div className="cart-mini-window">
        <div className="cart-container">
          <h2>Carrito de Compras</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>{item.quantity} x {categories.flatMap(category => category.items).find(itemData => itemData.id === item.id).name}</li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
};

export default Body;