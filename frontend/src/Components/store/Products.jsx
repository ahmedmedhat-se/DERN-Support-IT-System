import { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";

function Products() {
    const { products } = useContext(ProductContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    
    const userId = localStorage.getItem("userId");
    const userCartKey = `cart_${userId}`;
    
    const validProducts = products.filter(product => product?.name && product?.description);
    const filteredProducts = validProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const productsPerPage = 4;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const addToCart = (product) => {
        if (!userId) {
            alert("Please log in first!");
            return;
        }

        const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
        cart.push(product);
        localStorage.setItem(userCartKey, JSON.stringify(cart));
    };

    return (
        <div className="container text-light products-container p-5 mt-5">
            <h3 className="mt-4 text-dark">Products</h3>

            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control w-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="row">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div className="col-md-3 mb-5" key={product.product_id}>
                            <div className="card p-3 h-100">
                                <div className="card-header">
                                    <img src={product.image_url} alt={product.name} className="card-img-top" height={200} width={300} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-name">{product.name}</h5>
                                    <p className="text-center">{product.description}</p>
                                    <p>Price: {product.price}<span className="dollar">$</span></p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary w-100" onClick={() => addToCart(product)}>
                                        <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No products found.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination d-flex justify-content-center mt-4">
                    <button className="btn btn-secondary mx-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index} 
                            className={`btn mx-1 ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`} 
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button className="btn btn-secondary mx-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;