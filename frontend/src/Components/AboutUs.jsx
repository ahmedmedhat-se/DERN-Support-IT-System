import React from 'react';
import data from './Data/DernSupport.json';

const AboutUs = () => {
    const { company, services } = data;

    return (
        <div className="container-fluid about-container p-5">
            <h2 className='text-center fw-bold fs-3 mb-3'>About Dern-Support</h2>
            <section className="about-section">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src="https://t4.ftcdn.net/jpg/02/70/00/57/360_F_270005769_k9nENNRBjtDZJV1LOClnlh1NVy3mdQfD.jpg"
                            alt="Berimbolo Security"
                            className="img-fluid rounded mb-4"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="text-center fw-bold mb-4">{company.name}</h2>
                        <div className="about-description fs-5 mb-4">
                            <p>{company.description}</p>
                        </div>

                        <div className="services-section mb-4">
                            <h4 className="mb-3 fw-bold text-center">Our Services:</h4>
                            <ul>
                                <li className='fs-5'><strong>{services['software-service'].name}</strong></li>
                                <li className='fs-5'><strong>{services['repair-service'].name}</strong></li>
                                <li className='fs-5'><strong>{services['onsite-service'].name}</strong></li>
                                <li className='fs-5'><strong>{services['data-service'].name}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="text-center fw-bold mb-4">Contacts</h2>
                        <div className="about-description mb-4">
                            <p className='fs-5'>{company.contact.description}</p>
                        </div>

                        <div className="contact-section">
                            <h4 className="text-center fw-bold mb-3">Find Us:</h4>
                            <p className='fs-5'><strong>Phone:</strong> {company.contact.phone}</p>
                            <p className='fs-5'><strong>Another Phone:</strong> {company.contact['another-phone']}</p>
                            <p className='fs-5'><strong>Email:</strong> <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a></p>
                            <p className='fs-5'><strong>Address:</strong> {company.contact.address}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193870.199264919!2d-74.11808619772702!3d40.78306012028756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599c2f3848a9%3A0x2f2e14cd7eb021e7!2sNew%20York%20City%2C%20New%20York!5e0!3m2!1sen!2sus!4v1688062023323!5m2!1sen!2sus"
                            width="100%"
                            height="400"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                            title="New York City Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;