import React, { useState } from 'react';
import MenuItemCard from './menu/MenuItemCard';
import '../styles/body/body.css';
import categories from './Data/Categories';

const Body = ({ cart: propCart, onAddToCart, selectedCategory }) => {
  const [cart, setCart] = useState(propCart || []);

  // Función para calcular la suma total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = categories.flatMap(category => category.items).find(itemData => itemData.id === item.id);
      return total + menuItem.price * item.quantity;
    }, 0).toFixed(2);
  };

  // Función para manejar la adición de elementos al carrito
  const handleAddToCart = (itemId) => {
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      // Si el artículo ya está en el carrito, incrementa la cantidad
      setCart(cart.map(item => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      // Si el artículo no está en el carrito, agrégalo con cantidad 1
      const newItem = {
        id: itemId,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  return (
    <div className="body-container">
      {categories
        .filter((category) => !selectedCategory || category.title === selectedCategory)
        .map((category) => (
          <div key={category.title}>
            <h2>{category.title}</h2>
            <div className="menu-items-container">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
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
