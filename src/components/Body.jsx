import React, { useState } from 'react';
import MenuItemCard from './menu/MenuItemCard';
import categories from './Data/Categories';
import '../styles/body/body.css';
import '../styles/body/buyForm.css';
import '../styles/body/cart.css';


const Body = ({ cart: propCart, selectedCategory }) => {
  const [cart, setCart] = useState(propCart || []);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isCartMinimized, setCartMinimized] = useState(false);

  // Función para calcular la suma total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = categories.flatMap(category => category.items).find(itemData => itemData.id === item.id);
      return total + menuItem.price * item.quantity;
    }, 0).toFixed(2);
  };

  // Función para manejar la adición o actualización de elementos al carrito
  const handleAddToCart = (itemId) => {
    const existingItem = cart.find((item) => item.id === itemId);
  
    if (existingItem) {
      // Incrementa la cantidad
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem = {
        id: itemId,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  
    // Agregar la clase de animación al elemento del producto
    const productElement = document.getElementById(`product-${itemId}`);
    productElement.classList.add("added-to-cart");
  
    // Eliminar la clase de animación después de un tiempo
    setTimeout(() => {
      productElement.classList.remove("added-to-cart");
    }, 1000); // Ajusta el tiempo según tus preferencias
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
  // Lógica para procesar la compra si es necesario
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
  
  const handleToggleCart = () => {
    // Cambia el estado para alternar entre minimizar y maximizar el carrito
    setCartMinimized(!isCartMinimized);
  };

  return (
    <div className={`body-container ${showCheckoutForm || showConfirmationModal ? 'modal-open' : ''}`} >
      {categories
        .filter((category) => !selectedCategory || category.title === selectedCategory)
        .map((category) => (
          <div key={category.title}>
            <h1>{category.title}</h1>
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

          <div className={`cart-mini-window ${isCartMinimized ? 'minimized' : ''}`}>
            <button className="button-toggle-cart" onClick={handleToggleCart} >
              <i class="fas fa-cart-shopping"></i>
            </button>
            <div className="cart-container">
              <h2>Shopping Cart</h2>
              <button className="button-buy" onClick={handleToggleCheckoutForm} disabled={cart.length === 0}>Buy</button>
              <p>Total: ${calculateTotal()}</p>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    {item.quantity} x {categories.flatMap(category => category.items).find(itemData => itemData.id === item.id).name}
                    <button className="button-more" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="button-more" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

                   {/* Overlay para oscurecer el fondo */}
      <div className={`overlay ${showCheckoutForm || showConfirmationModal ? 'show' : ''}`} />

       {/* Mostrar el formulario de compra si showCheckoutForm es verdadero */}
    {showCheckoutForm && (
      <div className="modal-form animate__animated animate__backInDown">
        <div className="modal-contenido">
          <span className="cerrar-form" onClick={handleToggleCheckoutForm}>&times;</span>
          <h2>How do you want to pay?</h2>
          {/* Agrega tus campos de formulario aquí */}
          <form>
            <label>
            Payment Method: 
            <select name="paymentMethod">
              <option value="cash">Cash <i class="fa fa-money-bill-1"></i></option>
              <option value="card">Card <i class="fa fa-credit-card"></i></option>
              <i class="fa-regular fa-credit-card"></i> 
            </select>
          </label>

            <label>
            Delivery Method:
            <select name="deliveryMethod">
              <option value="inStore">Dine In <i class="fa-solid fa-store"></i></option>
              <option value="takeaway">Take away <i class="fa-solid fa-motorcycle"></i></option>
            </select>
          </label>

          <p>Total: ${calculateTotal()}</p>
            <button type="button" onClick={handleCheckout}>Pay</button>
          </form>
        </div>
      </div>
    )}


        {showConfirmationModal && (
       <div className="confirmation-modal show animate__animated animate__bounceIn">
       <div className="confirmation-content">
         <span className="cerrar-form" onClick={() => setShowConfirmationModal(false)}>&times;</span>
          <div className="confirmation-icon">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h2>Order Confirmed Successfully!</h2>
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default Body;