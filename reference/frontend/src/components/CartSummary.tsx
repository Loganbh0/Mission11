import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (total, item) => total + item.donationAmount,
    0
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px 15px',
        background: '#f8f9fa',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
