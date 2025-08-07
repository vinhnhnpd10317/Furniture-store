import express from 'express';
import cors from 'cors';
import ProductRoutes from './Routes/Product.js';
import CategorytRoutes from './Routes/Category.js';
import ArticleRoutes from './Routes/Article.js';
import cartRoutes from './Routes/cart.js';
import CustomerRoutes from './Routes/Customer.js';
import OrderRoutes from './Routes/Order.js';
import FavoriteRoutes from './Routes/Favorite.js';
import CommentRoutes from './Routes/Comment.js';
import CheckOutRoutes from './Routes/CheckOut.js';
import OrderDetailRoutes from './Routes/OrderDetail.js';
import StatisticRouter from './Routes/Statistic.js';
import StatisticProduct from './Routes/StatisticProduct.js';

import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthGoogleRoutes from './Routes/googleAuth.js';

import path from 'path';
import multer from 'multer';
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

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '30882727216-41dktfa6qf444sndjsik5ruk78utbima.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Gửi profile user
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use('/comments', CommentRoutes);
app.use('/categorys', CategorytRoutes);
app.use('/articles', ArticleRoutes);
app.use('/cart', cartRoutes);
app.use('/customer', CustomerRoutes);
app.use('/orders', OrderRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/favorites', FavoriteRoutes);
app.use('/checkout', CheckOutRoutes);
app.use('/orderdetails', OrderDetailRoutes);
app.use('/statistic', StatisticRouter);
app.use('/statisticproduct', StatisticProduct);

// Sử dụng middleware upload cho route /products
// Cập nhật middleware cho nhiều ảnh
app.use('/products', upload.fields([
    { name: 'hinh_anh_dai_dien', maxCount: 1 },
    { name: 'ds_hinh_anh', maxCount: 10 }
]), ProductRoutes);

app.use('/categorys', CategorytRoutes); 

app.use('/auth', AuthGoogleRoutes);

// Khởi động server
app.listen(3001, () => {
    console.log('Backend đang chạy ở http://localhost:3001');
});