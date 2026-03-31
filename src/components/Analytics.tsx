import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Bar, Line, Legend } from 'recharts';

const trafficData = [
  { name: 'Jan', organic: 4000, paid: 2400, social: 2400 },
  { name: 'Feb', organic: 3000, paid: 1398, social: 2210 },
  { name: 'Mar', organic: 2000, paid: 9800, social: 2290 },
  { name: 'Apr', organic: 2780, paid: 3908, social: 2000 },
  { name: 'May', organic: 1890, paid: 4800, social: 2181 },
  { name: 'Jun', organic: 2390, paid: 3800, social: 2500 },
  { name: 'Jul', organic: 3490, paid: 4300, social: 2100 },
];

const demographicsData = [
  { subject: 'Technology', A: 120, B: 110, fullMark: 150 },
  { subject: 'Design', A: 98, B: 130, fullMark: 150 },
  { subject: 'Marketing', A: 86, B: 130, fullMark: 150 },
  { subject: 'Sales', A: 99, B: 100, fullMark: 150 },
  { subject: 'Support', A: 85, B: 90, fullMark: 150 },
  { subject: 'Development', A: 65, B: 85, fullMark: 150 },
];

const salesData = [
  { name: 'Q1', sales: 590, target: 800, profit: 1400 },
  { name: 'Q2', sales: 868, target: 967, profit: 1506 },
  { name: 'Q3', sales: 1397, target: 1098, profit: 989 },
  { name: 'Q4', sales: 1480, target: 1200, profit: 1228 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function Analytics() {
  return (
    <motion.div className="pb-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
        <div>
          <h1 className="h3 fw-bold text-dark mb-0">Analytics Overview</h1>
          <p className="text-muted small mb-0 mt-1">Detailed performance metrics and insights</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0 mt-3 mt-md-0">
          <button type="button" className="btn btn-sm btn-outline-primary d-flex align-items-center rounded-pill px-3 shadow-sm">
            <i className="fas fa-download me-2"></i>
            Download Report
          </button>
        </div>
      </motion.div>

      <Row className="g-4 mb-4">
        <Col xs={12} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title fw-bold mb-0 text-dark">Traffic Sources</h5>
                <Badge bg="primary" className="bg-opacity-10 text-primary px-3 py-2 rounded-pill">Year 2023</Badge>
              </div>
              <div style={{ height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d' }} dx={-10} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area type="monotone" dataKey="organic" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorOrganic)" />
                    <Area type="monotone" dataKey="paid" stroke="#82ca9d" strokeWidth={3} fillOpacity={1} fill="url(#colorPaid)" />
                    <Area type="monotone" dataKey="social" stroke="#ffc658" strokeWidth={3} fillOpacity={1} fill="url(#colorSocial)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              <h5 className="card-title fw-bold mb-4 text-dark">Audience Demographics</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={demographicsData}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#495057', fontSize: 12, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#adb5bd' }} />
                    <Radar name="Segment A" dataKey="A" stroke="#ff4b2b" strokeWidth={2} fill="#ff416c" fillOpacity={0.4} />
                    <Radar name="Segment B" dataKey="B" stroke="#00b09b" strokeWidth={2} fill="#96c93d" fillOpacity={0.4} />
                    <Legend iconType="circle" />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              <h5 className="card-title fw-bold mb-4 text-dark">Sales vs Target</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={salesData} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                    <CartesianGrid stroke="#f5f5f5" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                    <Legend iconType="circle" />
                    <Bar dataKey="sales" barSize={30} fill="#4158D0" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="target" stroke="#C850C0" strokeWidth={3} dot={{ r: 6, fill: '#FFCC70', strokeWidth: 2, stroke: '#fff' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
}
