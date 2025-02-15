import React from 'react';
import services from './Data/Services.json';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, imageUrl }) => {
    return (
        <div className="col-md-6 col-lg-3 mb-2 services">
            <div className="card services-card bg-dark h-100 border-0">
                <img src={imageUrl} className="card-img-top" alt={title} height={200} />
                <div className="card-body">
                    <h5 className="card-title text-light fw-bold">{title}</h5>
                    <p className="card-text text-light">{description}</p>
                    <Link className='card-text text-dark fw-bold btn btn-warning' to="/about">Explore</Link>
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div className="container-fluid services">
            <section className="container py-5">
                <div className="row">
                    <h2 className="text-center mb-5 fw-bold text-dark">Our Services</h2>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            imageUrl={service.imageUrl}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Services;