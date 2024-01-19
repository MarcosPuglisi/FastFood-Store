import React from "react";
import '../styles/header.css';

const Header = ({ setSelectedCategory }) => {

  const handleCategoryClick = (categoryTitle) => {
    console.log(`Clic en la categoría: ${categoryTitle}`);
    setSelectedCategory(categoryTitle);
  };

  return (
    <div className="header-container">
      <div className="logo">Logo</div>
      <nav className="nav">
        <button className="nav-button" onClick={() => handleCategoryClick("Menu Express")}>
          Menu Express
        </button>
        <button className="nav-button" onClick={() => handleCategoryClick("First")}>
          First
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
    </div>
  );
};

export default Header;