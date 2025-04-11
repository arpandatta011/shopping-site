import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Header() {
  const { logout } = useAuth()
  const { cartItems } = useCart()
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="header">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">
          Cart ({cartItemCount})
        </Link>
        <button onClick={logout} className="nav-link logout">
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header