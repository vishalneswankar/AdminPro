import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

interface SocialMediaPageProps {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
}

export default function SocialMediaPage({ platform }: SocialMediaPageProps) {
  const platformData = {
    facebook: {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      color: '#1877F2',
      followers: '124.5K',
      engagement: '4.2%',
      posts: 1420,
      recentPosts: [
        { id: 1, content: 'Check out our latest case study on digital transformation...', likes: 342, comments: 45, date: '2 hours ago' },
        { id: 2, content: 'Join us for a live webinar this Friday at 2 PM EST.', likes: 156, comments: 12, date: '1 day ago' },
      ]
    },
    instagram: {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      color: '#E4405F',
      followers: '89.2K',
      engagement: '6.8%',
      posts: 845,
      recentPosts: [
        { id: 1, content: 'Behind the scenes at the agency today! 📸✨', likes: 1205, comments: 89, date: '5 hours ago' },
        { id: 2, content: 'New branding project launch for @HealthPlus.', likes: 890, comments: 34, date: '2 days ago' },
      ]
    },
    twitter: {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      color: '#1DA1F2',
      followers: '45.8K',
      engagement: '2.1%',
      posts: 5600,
      recentPosts: [
        { id: 1, content: 'SEO is not dead. It just evolved. Here is a thread on the latest algorithm update 🧵👇', likes: 450, comments: 120, date: '1 hour ago' },
        { id: 2, content: 'What is your favorite marketing tool stack? Let us know!', likes: 230, comments: 85, date: '1 day ago' },
      ]
    },
    linkedin: {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      color: '#0A66C2',
      followers: '32.1K',
      engagement: '5.5%',
      posts: 420,
      recentPosts: [
        { id: 1, content: 'We are thrilled to announce our partnership with TechCorp to drive their B2B growth.', likes: 560, comments: 42, date: '3 hours ago' },
        { id: 2, content: 'Hiring: Senior Performance Marketing Manager. Apply within.', likes: 340, comments: 15, date: '3 days ago' },
      ]
    }
  };

  const data = platformData[platform];

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark d-flex align-items-center">
          <i className={`${data.icon} me-3`} style={{ color: data.color }}></i>
          {data.name} Management
        </h2>
        <Button variant="primary" className="rounded-pill px-4 shadow-sm" style={{ backgroundColor: data.color, borderColor: data.color }}>
          <i className="fas fa-pen me-2"></i> Create Post
        </Button>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px', backgroundColor: `${data.color}20`, color: data.color }}>
                <i className="fas fa-users fa-2x"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Followers</h6>
                <h3 className="fw-bold mb-0">{data.followers}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px', backgroundColor: `${data.color}20`, color: data.color }}>
                <i className="fas fa-chart-line fa-2x"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">Avg. Engagement</h6>
                <h3 className="fw-bold mb-0">{data.engagement}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 d-flex align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px', backgroundColor: `${data.color}20`, color: data.color }}>
                <i className="fas fa-images fa-2x"></i>
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Posts</h6>
                <h3 className="fw-bold mb-0">{data.posts}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="fw-bold mb-3">Recent Posts</h4>
      <Row className="g-4">
        {data.recentPosts.map(post => (
          <Col md={6} key={post.id}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between mb-3">
                  <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">
                    <i className="far fa-clock me-1"></i> {post.date}
                  </Badge>
                  <Button variant="link" className="text-muted p-0"><i className="fas fa-ellipsis-h"></i></Button>
                </div>
                <p className="mb-4" style={{ fontSize: '1.1rem' }}>{post.content}</p>
                <div className="d-flex text-muted border-top pt-3">
                  <div className="me-4 d-flex align-items-center">
                    <i className="far fa-heart me-2 text-danger"></i> {post.likes}
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="far fa-comment me-2 text-primary"></i> {post.comments}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
