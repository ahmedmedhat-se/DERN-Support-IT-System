import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import plansData from "./Data/Installations.json";

const Installations = () => {
  const userId = localStorage.getItem('userId');
  const userCartKey = `cart_${userId}`;
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem(userCartKey)) || []);

  const addToCart = (plan) => {
    const updatedCart = [...cartItems, plan];
    setCartItems(updatedCart);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
  };

  return (
    <div className="container-fluid p-5 installations">
      <h2 className="text-center mb-4 fw-bold">Our Installation Plans</h2>
      <div className="row">
        {plansData.map((plan, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card bg-dark h-100 border-0">
              <div className="card-body">
                <h3 className="card-title text-center text-light fw-bold">{plan.title}</h3>
                <p className="card-text text-light text-center fs-3">{plan.description}</p>
                <ul className="list-unstyled">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2 fs-5 text-light">
                      <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer bg-transparent text-center">
                <h4 className="text-light">{plan.title} - {plan.price}</h4>
                <button className="btn btn-warning text-dark" onClick={() => addToCart(plan)}>Choose Plan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Installations;