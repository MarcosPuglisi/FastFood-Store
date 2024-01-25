import React, { useState } from 'react';
import MenuItemCard from './menu/MenuItemCard';
import '../styles/body/body.css';
import categories from './Data/Categories';

const Body = ({ cart: propCart, selectedCategory }) => {
  const [cart, setCart] = useState(propCart || []);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Función para calcular la suma total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = categories.flatMap(category => category.items).find(itemData => itemData.id === item.id);
      return total + menuItem.price * item.quantity;
    }, 0).toFixed(2);
  };

  // Función para manejar la adición o actualización de elementos al carrito
  const handleAddToCart = (itemId) => {
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      // Incrementa la cantidad
      setCart(cart.map(item => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      const newItem = {
        id: itemId,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  // Función para manejar la actualización de la cantidad de un elemento en el carrito
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      // Si la nueva cantidad es mayor que 0, actualiza la cantidad
      setCart(cart.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    } else {
      // Si la nueva cantidad es 0 o menos, elimina el artículo del carrito
      setCart(cart.filter(item => item.id !== itemId));
    }
  };

  // Función para manejar la visualización del formulario de compra
  const handleToggleCheckoutForm = () => {
    setShowCheckoutForm(!showCheckoutForm);
  };

  // Función para manejar la compra
  const handleCheckout = () => {
    // Agrega lógica aquí para procesar la compra si es necesario
    // ...
    // Luego, cierra el formulario
    handleToggleCheckoutForm();
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
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.id, newQuantity)}
                />
              ))}
            </div>
          </div>
        ))}

      <div className="cart-mini-window">
        <div className="cart-container">
          <h2>Carrito de Compras</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.quantity} x {categories.flatMap(category => category.items).find(itemData => itemData.id === item.id).name}
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal()}</p>
          <button onClick={handleToggleCheckoutForm}>Comprar</button>
        </div>
      </div>

      {/* Mostrar el formulario de compra si showCheckoutForm es verdadero */}
      {showCheckoutForm && (
        <div className="checkout-form">
          <h2>Completa el formulario de compra</h2>
          {/* Agrega tus campos de formulario aquí */}
          <form>
            {/* Campos del formulario (nombre, dirección, teléfono, etc.) */}
            {/* ... */}
            <button type="button" onClick={handleCheckout}>Realizar Compra</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Body;