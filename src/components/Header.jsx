import React, { useState } from "react";
import '../styles/header.css';

const Header = ({ cart }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCartListVisible, setIsCartListVisible] = useState(false);

  const showCart = () => {
    setIsCartVisible(true);
  };

  const hideCart = () => {
    setIsCartVisible(false);
    setIsCartListVisible(false);
  };

  const showCartList = () => {
    setIsCartListVisible(true);
  };

  const handleCategoryClick = (categoryTitle) => {
    // Lógica para manejar el clic en la categoría
    console.log(`Clic en la categoría: ${categoryTitle}`);
  };
  
  

  return (
    <div className="header-container">
      <div className="logo">Logo</div>
      <nav className="nav">
        <button className="nav-button" onClick={() => handleCategoryClick("Menu Express")}>
          Menu Express
        </button>
        <button className="nav-button" onClick={() => handleCategoryClick("Entrada")}>
          Entrada
        </button>
        <button className="nav-button" onClick={() => handleCategoryClick("Menu")}>
          Menu
        </button>
        <button className="nav-button" onClick={() => handleCategoryClick("Drinks")}>
          Drinks
        </button>
        <button className="nav-button" onClick={() => handleCategoryClick("Dolce")}>
          Dolce
        </button>
      </nav>
      <div className="cart" onMouseEnter={showCart} onMouseLeave={hideCart} onClick={showCartList}>
        Carrito
        {isCartVisible && (
          <div className="cart-content">
            {isCartListVisible && (
              <ul>
                {cart.map(item => (
                  <li key={item.id}>{item.quantity} x {item.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;