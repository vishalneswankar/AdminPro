import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'motion/react';
import Logo from './Logo';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials. Please use admin / admin');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 gradient-bg">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5} xl={4}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <Card className="glass-card shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center mb-3">
                    <Logo width={80} height={80} />
                  </div>
                  <h3 className="fw-bold text-dark">MediaPro Agency</h3>
                  <p className="text-muted">Sign in to your admin account</p>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Alert variant="danger" className="py-2 text-center border-0 bg-danger bg-opacity-10 text-danger rounded-3">{error}</Alert>
                  </motion.div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="small fw-medium text-muted">Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="py-2 bg-light border-0 shadow-none rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <div className="d-flex justify-content-between">
                      <Form.Label className="small fw-medium text-muted">Password</Form.Label>
                      <a href="#forgot" className="small text-decoration-none text-primary">Forgot password?</a>
                    </div>
                    <Form.Control 
                      type="password" 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="py-2 bg-light border-0 shadow-none rounded-3"
                    />
                  </Form.Group>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="primary" type="submit" className="w-100 py-2 fw-bold mb-3 rounded-3 border-0" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                      Sign In
                    </Button>
                  </motion.div>
                  
                  <div className="text-center p-3 bg-light bg-opacity-50 rounded-3 border border-dashed">
                    <p className="small text-muted mb-1">Demo Credentials:</p>
                    <p className="small fw-bold mb-0 text-dark">Username: admin | Password: admin</p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
