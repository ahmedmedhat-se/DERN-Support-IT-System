const db = require('../config/db');

class ProductModel {
    static createProduct(name, description, price, image_url, callback) {
        const query = `
            INSERT INTO products (name, description, price, image_url)
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [name, description, price, image_url], callback);
    }

    static getAllProducts(callback) {
        const query = `SELECT * FROM products`;
        db.query(query, callback);
    }

    static getProductById(product_id, callback) {
        const query = `SELECT * FROM products WHERE product_id = ?`;
        db.query(query, [product_id], callback);
    }

    static updateProduct(product_id, name, description, price, image_url, callback) {
        const query = `
            UPDATE products
            SET name = ?, description = ?, price = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
            WHERE product_id = ?
        `;
        db.query(query, [name, description, price, image_url, product_id], callback);
    }

    static deleteProduct(product_id, callback) {
        const query = `DELETE FROM products WHERE product_id = ?`;
        db.query(query, [product_id], callback);
    }
}

module.exports = ProductModel;