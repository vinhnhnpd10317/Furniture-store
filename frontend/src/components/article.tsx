import React, { useEffect, useState } from 'react';
import { getArticles, type Article } from '../api/ArticleApi'; // ✅ import đúng interface
import { Card, Row, Col } from 'react-bootstrap';

const NewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]); // ✅ kiểu đúng

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">TIN TỨC NỘI THẤT</h2>
      <Row>
        {articles.map((item) => {
          const date = new Date(item.ngay_dang);
          return (
            <Col md={4} key={item.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={item.hinh_anh} />
                <Card.Body>
                  <div className="d-flex mb-2">
                    <div className="text-danger fw-bold fs-4 me-2">{date.getDate()}</div>
                    <div className="text-muted">
                      {date.toLocaleString('vi-VN', { month: 'short' })}
                    </div>
                  </div>
                  <Card.Title className="fw-bold fs-6">{item.tieu_de}</Card.Title>
                  <Card.Text className="text-secondary" style={{ fontSize: '14px' }}>
                    {item.noi_dung?.slice(0, 100)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">PREMIUM SEVEN{item.tac_gia_id}</small>
                    <a href="#" className="text-decoration-none">XEM THÊM →</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default NewsSection;
