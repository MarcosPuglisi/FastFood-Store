import React, { useState } from 'react';
import MenuItemCard from './menu/MenuItemCard';
import categories from './Data/Categories';
import '../styles/body/body.css';
import '../styles/body/buyForm.css';


const Body = ({ cart: propCart, selectedCategory }) => {
  const [cart, setCart] = useState(propCart || []);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
    console.log('haciendo click')
    setShowCheckoutForm(!showCheckoutForm);
  };

  // Función para manejar la compra
  const handleCheckout = () => {
    // Agrega lógica aquí para procesar la compra si es necesario
  // Luego, muestra el modal de confirmación
  setShowConfirmationModal(true);

  // Finalmente, cierra el formulario
  handleToggleCheckoutForm();

      // Luego, muestra el modal de confirmación
      setShowConfirmationModal(true);
  
      // Finalmente, cierra el formulario
      handleToggleCheckoutForm();
    
      // Recargar la página después de 5 segundos
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
          {/* Modifica el botón "Buy" para mostrar el formulario en el modal */}
        <button onClick={handleToggleCheckoutForm}>Buy</button>
      </div>
    </div>

       {/* Mostrar el formulario de compra si showCheckoutForm es verdadero */}
    {showCheckoutForm && (
      <div className="modal-form">
        <div className="modal-contenido">
          <span className="cerrar-form" onClick={handleToggleCheckoutForm}>&times;</span>
          <h2>How you want to pay?</h2>
          {/* Agrega tus campos de formulario aquí */}
          <form>
            {/* Opciones de pago */}
            <label>
            Payment Method:
            <select name="paymentMethod">
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </label>

          {/* Opciones de entrega */}
            <label>
            Delivery Method:
            <select name="deliveryMethod">
              <option value="inStore">Dine In</option>
              <option value="delivery">Delivery</option>
            </select>
          </label>

          {/* Importe Final */}
          <p>Total: ${calculateTotal()}</p>
            <button type="button" onClick={handleCheckout}>Pay</button>
          </form>
        </div>
      </div>
    )}
        {showConfirmationModal && (
      <div className="confirmation-modal">
        <div className="confirmation-content">
          <span className="cerrar-form" onClick={() => setShowConfirmationModal(false)}>&times;</span>
          <h2>Compra Confirmada</h2>
          <p>¡Gracias por tu compra!</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default Body;