import React, { useState } from 'react';
import './styles/AuthForm.css';

const AuthForm = () => {
    const [formType, setFormType] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = name === 'password' ? value : value.replace(/[^a-zA-Z0-9@.]/g, '');
        setFormData(prevData => ({
            ...prevData,
            [name]: sanitizedValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('FormData:', formData);
    
        const action = formType === 'login' ? 'login' : 'register';
    
        fetch('http://localhost:5000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                password: formData.password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response Data:", data);
    
            if (data.message) {
                alert(data.message);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                if (data.user.role === "admin") {
                    window.location.href = '/admin-dashboard';
                } else {
                    window.location.href = '/';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        });
    };    

    return (
        <div className="container-fluid auth-container bg-dark p-5">
            <h2 className="text-center fw-bold text-light">{formType === 'login' ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="p-4 text-light">
                {formType === 'register' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                className="form-control"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </>
                )}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                {formType === 'register' && (
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-success w-100">
                    {formType === 'login' ? 'Login' : 'Register'}
                </button>
                <button
                    className="btn btn-warning text-dark mt-3"
                    onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
                >
                    Switch to {formType === 'login' ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;