import express, { Request, Response } from 'express'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

let products:{
  id: number;
  product_name: string;
  product_description: string;
  product_price: number 
}[] =[];

app.get('/products', (req: Request, res: Response) => {
  res.status(200).json(products);
});

app.post('/products', (req: Request, res: Response) => {
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

app.get('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});