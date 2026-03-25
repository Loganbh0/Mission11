import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CartProvider } from './context/CartContext'
import BrowsePage from './pages/BrowsePage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="container py-5">
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
