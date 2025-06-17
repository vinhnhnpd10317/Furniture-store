// db.js
import mysql from 'mysql';

const db = mysql.createConnection({
    host: '127.0.0.1',  // ✅ dùng IPv4 để tránh lỗi ECONNREFUSED
    user: 'root',
    password: '',
    database: 'datn_g7',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ Lỗi kết nối:', err);
    } else {
        console.log('✅ Kết nối MySQL thành công!');
    }
});

export default db;
