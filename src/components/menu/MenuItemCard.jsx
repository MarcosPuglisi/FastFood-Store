import React from 'react';
import '../../styles/body/MenuItemCard.css';

const MenuItemCard = ({ item, onAddToCart, onUpdateQuantity }) => {
  const { id, name, description, price, image } = item;

  const handleAddToCart = () => {
    // Llama a la función onAddToCart solo si está definida
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <div id={`product-${item.id}`} className="menu-item-card">
      <img className="menu-item-image" src={image} alt={name} />
      <div className="menu-item-details">
        <h3 className="menu-item-title">{name}</h3>
        <p className="menu-item-description">{description}</p>
        <p className="menu-item-price">${price.toFixed(2)}</p>
        <button className="add-to-cart-button" onClick={() => handleAddToCart(item.id)} >
          Add +
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
