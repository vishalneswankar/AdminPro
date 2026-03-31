import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge, Spinner, Modal, Form, Button } from 'react-bootstrap';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const userGrowthData = [
  { name: 'Mon', users: 400 },
  { name: 'Tue', users: 300 },
  { name: 'Wed', users: 550 },
  { name: 'Thu', users: 450 },
  { name: 'Fri', users: 700 },
  { name: 'Sat', users: 800 },
  { name: 'Sun', users: 950 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user'
  });

  useEffect(() => {
    // Fetch dummy data from API
    fetch('https://dummyjson.com/users?limit=5')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', role: 'user' });
  };

  const handleShow = (user: any) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role || 'user'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    }
    handleClose();
  };

  return (
    <motion.div className="pb-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
        <h1 className="h3 fw-bold text-dark mb-0">Dashboard Overview</h1>
        <div className="btn-toolbar mb-2 mb-md-0 mt-3 mt-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary rounded-start-pill px-3">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary rounded-end-pill px-3">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-primary d-flex align-items-center rounded-pill px-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
            <i className="fas fa-calendar-alt me-2"></i>
            This Week
          </button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <Row className="g-4 mb-4">
        <Col sm={6} xl={3} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative">
            <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }}></div>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', fontWeight: 600 }}>Total Revenue</h6>
                  <h3 className="mb-0 fw-bold text-dark">$54,230</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-dollar-sign text-primary fs-5"></i>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Badge bg="success" className="me-2 fw-normal rounded-pill bg-opacity-10 text-success"><i className="fas fa-arrow-up me-1"></i> 12.5%</Badge>
                <span className="text-muted small">vs last month</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} xl={3} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative">
            <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)' }}></div>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', fontWeight: 600 }}>Active Users</h6>
                  <h3 className="mb-0 fw-bold text-dark">8,549</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-users text-success fs-5"></i>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Badge bg="success" className="me-2 fw-normal rounded-pill bg-opacity-10 text-success"><i className="fas fa-arrow-up me-1"></i> 5.2%</Badge>
                <span className="text-muted small">vs last month</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} xl={3} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative">
            <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)' }}></div>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', fontWeight: 600 }}>New Orders</h6>
                  <h3 className="mb-0 fw-bold text-dark">1,423</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-shopping-bag text-warning fs-5"></i>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Badge bg="danger" className="me-2 fw-normal rounded-pill bg-opacity-10 text-danger"><i className="fas fa-arrow-down me-1"></i> 2.1%</Badge>
                <span className="text-muted small">vs last month</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} xl={3} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative">
            <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)' }}></div>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', fontWeight: 600 }}>Conversion Rate</h6>
                  <h3 className="mb-0 fw-bold text-dark">4.83%</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-chart-pie text-info fs-5"></i>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Badge bg="success" className="me-2 fw-normal rounded-pill bg-opacity-10 text-success"><i className="fas fa-arrow-up me-1"></i> 1.2%</Badge>
                <span className="text-muted small">vs last month</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row className="g-4 mb-4">
        <Col lg={8} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4">
            <Card.Body className="p-4">
              <h5 className="card-title fw-bold mb-4 text-dark">Revenue Overview</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#43e97b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#43e97b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} dx={-10} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4facfe" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="profit" name="Profit" stroke="#43e97b" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4">
            <Card.Body className="p-4">
              <h5 className="card-title fw-bold mb-4 text-dark">User Growth</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fa709a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#fee140" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#f8f9fa' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                    />
                    <Bar dataKey="users" name="New Users" fill="url(#colorUsers)" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table Row */}
      <Row as={motion.div} variants={itemVariants}>
        <Col xs={12}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Body className="p-0">
              <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-white">
                <h5 className="card-title fw-bold mb-0 text-dark">Recent Customers (API)</h5>
                <button className="btn btn-sm btn-light text-primary fw-medium rounded-pill px-3">View All</button>
              </div>
              <div className="table-responsive">
                <Table hover className="mb-0 align-middle">
                  <thead className="table-light text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <tr>
                      <th className="ps-4 py-3 border-0">Customer</th>
                      <th className="py-3 border-0">Contact</th>
                      <th className="py-3 border-0">Company</th>
                      <th className="py-3 border-0">Role</th>
                      <th className="pe-4 py-3 border-0 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5">
                          <Spinner animation="border" variant="primary" />
                          <p className="text-muted mt-2 mb-0">Loading data from API...</p>
                        </td>
                      </tr>
                    ) : users.length > 0 ? (
                      users.map((user, idx) => (
                        <motion.tr 
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <img 
                                src={user.image} 
                                alt={user.firstName} 
                                className="rounded-circle me-3 bg-light shadow-sm"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <div className="fw-bold text-dark">{user.firstName} {user.lastName}</div>
                                <div className="text-muted small" style={{ fontSize: '0.8rem' }}>@{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-dark fw-medium" style={{ fontSize: '0.9rem' }}>{user.email}</div>
                            <div className="text-muted small" style={{ fontSize: '0.8rem' }}>{user.phone}</div>
                          </td>
                          <td className="text-muted" style={{ fontSize: '0.9rem' }}>
                            {user.company?.name || 'N/A'}
                          </td>
                          <td>
                            <Badge bg={user.role === 'admin' ? 'danger' : 'primary'} 
                                   className="bg-opacity-10 text-dark fw-medium px-3 py-2 rounded-pill border-0 text-capitalize">
                              {user.role || 'User'}
                            </Badge>
                          </td>
                          <td className="pe-4 text-end">
                            <button className="btn btn-sm btn-light text-primary me-2 rounded-circle shadow-sm" style={{ width: '32px', height: '32px', padding: 0 }} onClick={() => handleShow(user)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-light text-muted rounded-circle shadow-sm" style={{ width: '32px', height: '32px', padding: 0 }}>
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-muted">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}
