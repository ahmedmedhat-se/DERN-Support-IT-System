import React, { useEffect, useState } from 'react';
import "./styles/admin-dashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingTechnicians, setLoadingTechnicians] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        fetchUsers();
        fetchTechnicians();
        fetchProducts();
    }, []);

    const fetchUsers = () => {
        fetch('http://localhost:5000/api/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoadingUsers(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoadingUsers(false);
            });
    };

    const fetchTechnicians = () => {
        fetch('http://localhost:5000/api/technicians', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTechnicians(data);
                setLoadingTechnicians(false);
            })
            .catch(error => {
                console.error('Error fetching technicians:', error);
                setLoadingTechnicians(false);
            });
    };

    const fetchProducts = () => {
        fetch('http://localhost:5000/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoadingProducts(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoadingProducts(false);
            });
    };

    const deleteUser = (id) => {
        fetch(`http://localhost:5000/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin',
            },
        })
            .then(() => fetchUsers())
            .catch(error => console.error('Error deleting user:', error));
    };

    const deleteTechnician = (id) => {
        fetch(`http://localhost:5000/api/technicians/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => fetchTechnicians())
            .catch(error => console.error('Error deleting technician:', error));
    };

    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => fetchProducts())
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="container-fluid admin-dashboard">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Admin Dashboard</h2>
                <h3 className="mt-4">Users</h3>
                {loadingUsers ? (
                    <div className="text-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                <h3 className="mt-4">Technicians</h3>
                {loadingTechnicians ? (
                    <div className="text-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Skillset</th>
                                    <th>Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technicians.length > 0 ? (
                                    technicians.map(technician => (
                                        <tr key={technician.technician_id}>
                                            <td>{technician.technician_id}</td>
                                            <td>{technician.name}</td>
                                            <td>{technician.email}</td>
                                            <td>{technician.phone}</td>
                                            <td>{technician.skillset}</td>
                                            <td>{technician.availability ? 'Available' : 'Unavailable'}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteTechnician(technician.technician_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No technicians found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                <h3 className="mt-4">Products</h3>
                {loadingProducts ? (
                    <div className="text-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <tr key={product.product_id}>
                                            <td>{product.product_id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.product_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;