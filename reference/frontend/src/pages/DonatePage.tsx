import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import { useState } from 'react';

function DonatePage() {
  const navigate = useNavigate();
  const { projectName, projectId } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  if (!projectName || !projectId) {
    return <div>Project not found.</div>;
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectId: Number(projectId),
      projectName: projectName || 'Unknown Project',
      donationAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2>Donate to {projectName}</h2>
      </div>

      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
        />
        <button onClick={handleAddToCart} className="btn btn-success">
          Add to Cart
        </button>
      </div>

      <div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/projects')}
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default DonatePage;
