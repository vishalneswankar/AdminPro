import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function Topbar({ toggleSidebar, toggleSidebarCollapse, onLogout, toggleTheme, theme }: { toggleSidebar: () => void, toggleSidebarCollapse: () => void, onLogout: () => void, toggleTheme: () => void, theme: string }) {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNotification(!showNotification);
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className="shadow-sm py-2 z-index-master agency-header-sidebar" style={{ zIndex: 1040 }}>
        <Container fluid>
          <Button variant="outline-light" className="d-md-none me-2 border-0" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </Button>
          <Button variant="outline-light" className="d-none d-md-block me-3 border-0" onClick={toggleSidebarCollapse}>
            <i className="fas fa-bars"></i>
          </Button>
          
          <Navbar.Brand as={Link} to="/" className="fw-bold text-white d-flex align-items-center">
            <Logo width={36} height={36} className="me-2" />
            <span className="d-none d-sm-inline" style={{ background: 'linear-gradient(90deg, #fff, #e0e0e0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.5px' }}>MediaPro Agency</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex ms-auto my-2 my-lg-0" style={{ maxWidth: '400px', width: '100%' }}>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted"><i className="fas fa-search"></i></span>
                <FormControl
                  type="search"
                  placeholder="Search campaigns, clients..."
                  className="border-start-0 bg-white shadow-none"
                  aria-label="Search"
                />
              </div>
            </Form>
            
            <Nav className="ms-3 align-items-center flex-row justify-content-end">
              <Button variant="outline-light" onClick={toggleTheme} className="me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
              </Button>

              <Nav.Link href="#notifications" onClick={handleNotificationClick} className="position-relative me-3 text-white">
                <i className="fas fa-bell fs-5"></i>
                <span className="position-absolute top-25 start-75 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>
              </Nav.Link>
              
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="d-flex align-items-center border-0 shadow-none p-0 text-white">
                  <img 
                    src="https://picsum.photos/seed/admin/32/32" 
                    alt="Profile" 
                    className="rounded-circle me-2 border border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                  <span className="fw-medium d-none d-sm-inline">Admin User</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow border-0 mt-2">
                  <Dropdown.Item onClick={() => navigate('/profile')}><i className="fas fa-user fa-sm fa-fw me-2 text-muted"></i> Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/settings')}><i className="fas fa-cogs fa-sm fa-fw me-2 text-muted"></i> Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout} className="text-danger"><i className="fas fa-sign-out-alt fa-sm fa-fw me-2"></i> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050, position: 'fixed', top: '60px', right: '10px' }}>
        <Toast show={showNotification} onClose={() => setShowNotification(false)} delay={5000} autohide className="shadow-lg border-0 rounded-3">
          <Toast.Header className="bg-primary text-white border-0 rounded-top-3">
            <i className="fas fa-chart-line me-2"></i>
            <strong className="me-auto">Data Alert</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="bg-white rounded-bottom-3">
            <h6 className="fw-bold mb-1">Campaign Performance Spike</h6>
            <p className="mb-0 text-muted small">The "Summer Sale" campaign has seen a 45% increase in conversions in the last hour.</p>
            <div className="mt-2 text-end">
              <Button variant="outline-primary" size="sm" onClick={() => { setShowNotification(false); navigate('/analytics'); }}>View Analytics</Button>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
