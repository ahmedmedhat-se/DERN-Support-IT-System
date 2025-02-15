import React, { useEffect, useState } from 'react';
import './styles/user-dashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const userId = localStorage.getItem('userId');
    const userCartKey = `cart_${userId}`;

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
            fetchCartItems();
        }
    }, [userId]);

    const fetchUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}`);
            if (!response.ok) throw new Error('Failed to fetch user data');
            
            const data = await response.json();
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };

    const fetchCartItems = () => {
        const items = JSON.parse(localStorage.getItem(userCartKey)) || [];
        setCartItems(items);
    };

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    };

    return (
        <div className="container-fluid user-dashboard">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">User Dashboard</h2>

                {loading ? (
                    <div className="text-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>User Information</h4>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>

                        <div className="mt-4">
                            <h4>Cart Items</h4>
                            {cartItems.length > 0 ? (
                                <ul className="list-group">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            {item.name} - {item.price}
                                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items in the cart.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;