import React from 'react';
import { motion } from 'motion/react';
import { Card, Row, Col, Accordion } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ticketData = [
  { name: 'Mon', tickets: 12 },
  { name: 'Tue', tickets: 19 },
  { name: 'Wed', tickets: 15 },
  { name: 'Thu', tickets: 22 },
  { name: 'Fri', tickets: 30 },
  { name: 'Sat', tickets: 10 },
  { name: 'Sun', tickets: 8 },
];

export default function Help() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-gray-800">Help Center</h2>
        <button className="btn btn-primary gradient-btn border-0 shadow-sm">
          <i className="fas fa-envelope me-2"></i> Contact Support
        </button>
      </div>

      <Row className="mb-4">
        <Col lg={12}>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-sm glass-card">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  Support Tickets Resolved (This Week)
                </Card.Title>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ticketData}>
                      <defs>
                        <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="tickets" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTickets)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 shadow-sm glass-card">
          <Card.Body>
            <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
              Frequently Asked Questions
            </Card.Title>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0" className="bg-transparent border-bottom">
                <Accordion.Header>How do I reset my password?</Accordion.Header>
                <Accordion.Body className="text-muted">
                  To reset your password, go to the Settings page, navigate to the Security tab, and click on "Change Password". You will receive an email with instructions to create a new password.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="bg-transparent border-bottom">
                <Accordion.Header>Can I export my analytics data?</Accordion.Header>
                <Accordion.Body className="text-muted">
                  Yes, you can export your analytics data by clicking the "Export Report" button located at the top right corner of the Analytics and Orders pages. Supported formats include CSV and PDF.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="bg-transparent border-bottom">
                <Accordion.Header>How do I add a new user?</Accordion.Header>
                <Accordion.Body className="text-muted">
                  Navigate to the Users page and click the "Add User" button. Fill in the required details such as Name, Email, and Role, then click "Save". The new user will receive an invitation email.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="bg-transparent">
                <Accordion.Header>Is there a dark mode available?</Accordion.Header>
                <Accordion.Body className="text-muted">
                  Yes, dark mode is currently in Beta. You can enable it by going to the Settings page and toggling the "Enable Dark Mode (Beta)" switch under General Preferences.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.div>
  );
}
