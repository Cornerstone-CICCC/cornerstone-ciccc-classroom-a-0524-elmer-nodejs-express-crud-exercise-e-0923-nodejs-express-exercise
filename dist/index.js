"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
let products = [];
app.get('/products', (req, res) => {
    res.status(200).json(products);
});
app.post('/products', (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    const newProduct = {
        id: products.length + 1, // Simple ID generation
        product_name,
        product_description,
        product_price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404).send('Product not found');
    }
});
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Product not found');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
