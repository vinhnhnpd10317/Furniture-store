    import express from 'express';
    import cors from 'cors';
    import ProductRoutes from './Routes/Product.js';
    import CategorytRoutes from './Routes/Category.js';
    import ArticleRoutes from './Routes/Article.js';
    import cartRoutes from './Routes/cart.js';
    import CustomerRoutes from './Routes/Customer.js';
    import multer from 'multer';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();

    // Cấu hình Multer
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../frontend/public/img/imgproduct'));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({ storage: storage });

    app.use(cors());
    app.use(express.json());
    app.use('/categorys', CategorytRoutes);
    app.use('/articles', ArticleRoutes);
    app.use('/cart', cartRoutes);
    app.use('/customer', CustomerRoutes);

    // Sử dụng middleware upload cho route /products
    // Cập nhật middleware cho nhiều ảnh
    app.use('/products', upload.fields([
        { name: 'hinh_anh_dai_dien', maxCount: 1 },
        { name: 'ds_hinh_anh', maxCount: 10 }
    ]), ProductRoutes);


    app.use('/categorys', CategorytRoutes); 

    // Khởi động server
    app.listen(3001, () => {
        console.log('Backend đang chạy ở http://localhost:3001');
    });