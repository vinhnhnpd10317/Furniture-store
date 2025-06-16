import express from 'express';
import cors from 'cors';
import ProductRoutes from './Routes/Product.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/products', ProductRoutes);

// Khởi động server
app.listen(3001, () => {
    console.log('Backend đang chạy ở http://localhost:3001');
});
