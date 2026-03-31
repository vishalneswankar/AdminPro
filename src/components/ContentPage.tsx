import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

interface ContentPageProps {
  type: 'blogs' | 'videos' | 'graphics';
}

export default function ContentPage({ type }: ContentPageProps) {
  const contentData = {
    blogs: [
      { id: 1, title: '10 SEO Trends for 2026', client: 'TechCorp', author: 'Sarah J.', status: 'Published', date: 'Oct 12', views: '12.4K' },
      { id: 2, title: 'Why Email Marketing Still Works', client: 'HealthPlus', author: 'Mike T.', status: 'In Review', date: 'Oct 15', views: '-' },
      { id: 3, title: 'Social Media ROI Explained', client: 'StyleInc', author: 'Sarah J.', status: 'Draft', date: 'Oct 18', views: '-' },
      { id: 4, title: 'The Ultimate Guide to PPC', client: 'TechCorp', author: 'Alex M.', status: 'Published', date: 'Sep 28', views: '45.2K' },
    ],
    videos: [
      { id: 1, title: 'Product Launch Teaser', client: 'StyleInc', duration: '0:45', status: 'Final', date: 'Oct 10', views: '105K' },
      { id: 2, title: 'Customer Testimonial', client: 'HealthPlus', duration: '2:30', status: 'Editing', date: 'Oct 16', views: '-' },
      { id: 3, title: 'Webinar Recording: SEO Basics', client: 'TechCorp', duration: '45:00', status: 'Published', date: 'Oct 05', views: '3.2K' },
    ],
    graphics: [
      { id: 1, title: 'Q3 Performance Infographic', client: 'TechCorp', format: 'PNG', status: 'Approved', date: 'Oct 14' },
      { id: 2, title: 'Instagram Carousel - Tips', client: 'StyleInc', format: 'PSD', status: 'In Progress', date: 'Oct 16' },
      { id: 3, title: 'Facebook Ad Creatives', client: 'HealthPlus', format: 'Figma', status: 'Review', date: 'Oct 17' },
      { id: 4, title: 'Website Hero Banners', client: 'TechCorp', format: 'JPG', status: 'Approved', date: 'Oct 10' },
    ]
  };

  const data = contentData[type];

  const titleMap = {
    blogs: 'Blog Posts & Articles',
    videos: 'Video Content',
    graphics: 'Graphic Assets'
  };

  const iconMap = {
    blogs: 'fas fa-file-alt text-primary',
    videos: 'fas fa-video text-danger',
    graphics: 'fas fa-paint-brush text-info'
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'Published':
      case 'Final':
      case 'Approved': return <Badge bg="success">{s}</Badge>;
      case 'In Review':
      case 'Review': return <Badge bg="warning" text="dark">{s}</Badge>;
      case 'Draft':
      case 'Editing':
      case 'In Progress': return <Badge bg="secondary">{s}</Badge>;
      default: return <Badge bg="primary">{s}</Badge>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">{titleMap[type]}</h2>
        <Button variant="primary" className="rounded-pill px-4 shadow-sm">
          <i className="fas fa-plus me-2"></i> Add Content
        </Button>
      </div>

      <Row className="g-4">
        {data.map((item: any) => (
          <Col md={6} lg={4} key={item.id}>
            <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                <i className={`${iconMap[type]} fa-4x opacity-25`}></i>
              </div>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="light" text="dark" className="rounded-pill">{item.client}</Badge>
                  {getStatusBadge(item.status)}
                </div>
                <h5 className="fw-bold mb-3 mt-3">{item.title}</h5>
                
                <div className="d-flex justify-content-between text-muted small border-top pt-3 mt-auto">
                  <span><i className="far fa-calendar me-1"></i> {item.date}</span>
                  {item.views && <span><i className="far fa-eye me-1"></i> {item.views}</span>}
                  {item.author && <span><i className="far fa-user me-1"></i> {item.author}</span>}
                  {item.duration && <span><i className="far fa-clock me-1"></i> {item.duration}</span>}
                  {item.format && <span><i className="far fa-file me-1"></i> {item.format}</span>}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
