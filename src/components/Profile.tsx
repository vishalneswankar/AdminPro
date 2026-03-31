import React, { useState, useRef } from 'react';
import { Card, Row, Col, Form, Button, Badge } from 'react-bootstrap';

export default function Profile() {
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/admin/120/120');
  const [isDragging, setIsDragging] = useState(false);
  const [role, setRole] = useState('Admin');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 fw-bold text-dark">User Profile</h2>
      
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm rounded-4 text-center">
            <Card.Body className="p-4">
              <div 
                className="position-relative d-inline-block mb-3"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className={`rounded-circle border border-4 ${isDragging ? 'border-primary' : 'border-white'} shadow overflow-hidden position-relative`}
                  style={{ width: '120px', height: '120px', transition: 'all 0.3s ease' }}
                >
                  <img 
                    src={avatar} 
                    alt="Profile" 
                    className="w-100 h-100 object-fit-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 hover-opacity-100"
                    style={{ transition: 'opacity 0.3s ease' }}
                  >
                    <i className="fas fa-camera text-white fs-4"></i>
                  </div>
                </div>
                <span className="position-absolute bottom-0 end-0 p-2 bg-success border border-light rounded-circle" style={{ zIndex: 2 }}></span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="d-none" 
                />
              </div>
              <h4 className="fw-bold mb-1">Admin User</h4>
              <p className="text-muted mb-3">
                <Badge bg={role === 'Admin' ? 'danger' : role === 'Editor' ? 'info' : 'primary'} className="me-2">
                  {role}
                </Badge>
                Senior Digital Strategist
              </p>
              
              <div className="d-flex justify-content-center gap-2 mb-4">
                <Button variant="primary" size="sm" className="rounded-pill px-3" onClick={triggerFileInput}>
                  <i className="fas fa-upload me-2"></i>Upload Photo
                </Button>
                <Button variant="outline-secondary" size="sm" className="rounded-pill px-3">Message</Button>
              </div>
              
              <div className="d-flex justify-content-between text-center border-top pt-3">
                <div>
                  <h5 className="fw-bold mb-0">142</h5>
                  <small className="text-muted">Campaigns</small>
                </div>
                <div>
                  <h5 className="fw-bold mb-0">12k</h5>
                  <small className="text-muted">Followers</small>
                </div>
                <div>
                  <h5 className="fw-bold mb-0">4.9</h5>
                  <small className="text-muted">Rating</small>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm rounded-4 mt-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Skills</h5>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="primary" className="fw-normal px-2 py-1">SEO Optimization</Badge>
                <Badge bg="info" className="fw-normal px-2 py-1">Content Strategy</Badge>
                <Badge bg="success" className="fw-normal px-2 py-1">Google Ads</Badge>
                <Badge bg="warning" text="dark" className="fw-normal px-2 py-1">Social Media</Badge>
                <Badge bg="danger" className="fw-normal px-2 py-1">Analytics</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">Edit Profile Details</h5>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold">First Name</Form.Label>
                      <Form.Control type="text" defaultValue="Admin" className="bg-light border-0" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold">Last Name</Form.Label>
                      <Form.Control type="text" defaultValue="User" className="bg-light border-0" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold">Email Address</Form.Label>
                      <Form.Control type="email" defaultValue="admin@mediapro.agency" className="bg-light border-0" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold">Phone Number</Form.Label>
                      <Form.Control type="text" defaultValue="+1 (555) 123-4567" className="bg-light border-0" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold">System Role</Form.Label>
                      <Form.Select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-light border-0"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="User">User</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label className="text-muted small fw-bold">Bio</Form.Label>
                  <Form.Control as="textarea" rows={4} defaultValue="Digital marketing expert with over 10 years of experience in driving growth for enterprise clients through data-driven campaigns and innovative content strategies." className="bg-light border-0" />
                </Form.Group>
                
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="light" className="px-4">Cancel</Button>
                  <Button variant="primary" className="px-4">Save Changes</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
