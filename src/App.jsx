import React from "react";
import Header, { CartProvider } from "./components/header";
import Center from "./components/center";
import Footer from "./components/footer";
function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Center />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
