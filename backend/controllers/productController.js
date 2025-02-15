const ProductModel = require('../models/productModel');

class ProductController {
    static createProduct(req, res) {
        const { name, description, price, image_url } = req.body;
        ProductModel.createProduct(name, description, price, image_url, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create product' });
            }
            res.status(201).json({ message: 'Product created successfully', product_id: result.insertId });
        });
    }

    static getAllProducts(req, res) {
        ProductModel.getAllProducts((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch products' });
            }
            res.status(200).json(results);
        });
    }

    static getProductById(req, res) {
        const product_id = req.params.id;
        ProductModel.getProductById(product_id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch product' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(results[0]);
        });
    }

    static updateProduct(req, res) {
        const product_id = req.params.id;
        const { name, description, price, image_url } = req.body;
        ProductModel.updateProduct(product_id, name, description, price, image_url, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update product' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        });
    }

    static deleteProduct(req, res) {
        const product_id = req.params.id;
        ProductModel.deleteProduct(product_id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete product' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        });
    }
}

module.exports = ProductController;