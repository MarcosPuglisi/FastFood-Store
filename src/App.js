import React, { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="App">
      <div>
        <Header setSelectedCategory={setSelectedCategory} />
      </div>
      <div>
        <Body selectedCategory={selectedCategory} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;