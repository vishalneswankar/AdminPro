import React from 'react';
import { motion } from 'motion/react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const systemHealthData = [
  { time: '00:00', cpu: 30, memory: 45 },
  { time: '04:00', cpu: 25, memory: 40 },
  { time: '08:00', cpu: 60, memory: 70 },
  { time: '12:00', cpu: 85, memory: 80 },
  { time: '16:00', cpu: 65, memory: 75 },
  { time: '20:00', cpu: 40, memory: 55 },
];

const storageData = [
  { name: 'Images', uv: 31.47, pv: 2400, fill: '#8884d8' },
  { name: 'Documents', uv: 26.69, pv: 4567, fill: '#83a6ed' },
  { name: 'Videos', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
  { name: 'Other', uv: 8.22, pv: 9800, fill: '#82ca9d' },
  { name: 'Free Space', uv: 17.93, pv: 3908, fill: '#eee' },
];

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-gray-800">System Settings</h2>
        <button className="btn btn-success text-white gradient-btn border-0 shadow-sm">
          <i className="fas fa-save me-2"></i> Save Changes
        </button>
      </div>

      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  System Health (CPU & Memory)
                </Card.Title>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemHealthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="cpu" stroke="#ff7300" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="memory" stroke="#387908" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col lg={4}>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  Storage Usage
                </Card.Title>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={10} data={storageData}>
                      <RadialBar
                        background
                        dataKey="uv"
                        cornerRadius={5}
                      />
                      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, fontSize: '12px' }} />
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  General Preferences
                </Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control type="text" defaultValue="Admin Dashboard Pro" className="bg-light border-0" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Support Email</Form.Label>
                    <Form.Control type="email" defaultValue="support@example.com" className="bg-light border-0" />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Timezone</Form.Label>
                    <Form.Select className="bg-light border-0">
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                      <option>EST (Eastern Standard Time)</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Check 
                    type="switch"
                    id="maintenance-mode"
                    label="Enable Maintenance Mode"
                    className="mb-3 custom-switch"
                  />
                  <Form.Check 
                    type="switch"
                    id="dark-mode"
                    label="Enable Dark Mode (Beta)"
                    className="mb-3 custom-switch"
                  />
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  Notifications & Alerts
                </Card.Title>
                <Form>
                  <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-1">Email Notifications</h6>
                      <small className="text-muted">Receive daily summary emails</small>
                    </div>
                    <Form.Check type="switch" id="email-notif" defaultChecked />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-1">Push Notifications</h6>
                      <small className="text-muted">Get alerts on your device</small>
                    </div>
                    <Form.Check type="switch" id="push-notif" defaultChecked />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-1">Weekly Reports</h6>
                      <small className="text-muted">Detailed analytics report</small>
                    </div>
                    <Form.Check type="switch" id="weekly-report" />
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-1">Security Alerts</h6>
                      <small className="text-muted">Unusual login activities</small>
                    </div>
                    <Form.Check type="switch" id="security-alert" defaultChecked />
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}
