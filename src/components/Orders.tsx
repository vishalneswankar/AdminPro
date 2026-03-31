import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, Row, Col, Table, Badge, Modal, Form, Button } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line } from 'recharts';

const orderVolumeData = [
  { name: 'Mon', orders: 120 },
  { name: 'Tue', orders: 150 },
  { name: 'Wed', orders: 180 },
  { name: 'Thu', orders: 140 },
  { name: 'Fri', orders: 210 },
  { name: 'Sat', orders: 250 },
  { name: 'Sun', orders: 190 },
];

const revenueData = [
  { name: 'Week 1', revenue: 4000, target: 3500 },
  { name: 'Week 2', revenue: 3000, target: 3500 },
  { name: 'Week 3', revenue: 5000, target: 4000 },
  { name: 'Week 4', revenue: 6500, target: 5000 },
];

const initialOrders = [
  { id: '#ORD-001', customer: 'Alice Smith', date: '2023-10-25', amount: '$120.50', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Bob Johnson', date: '2023-10-26', amount: '$45.00', status: 'Processing' },
  { id: '#ORD-003', customer: 'Charlie Brown', date: '2023-10-26', amount: '$299.99', status: 'Shipped' },
  { id: '#ORD-004', customer: 'Diana Prince', date: '2023-10-27', amount: '$89.00', status: 'Pending' },
  { id: '#ORD-005', customer: 'Evan Wright', date: '2023-10-27', amount: '$15.25', status: 'Delivered' },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: 'Pending'
  });

  const handleClose = () => {
    setShowModal(false);
    setEditingOrder(null);
    setFormData({ customer: '', amount: '', status: 'Pending' });
  };

  const handleShow = (order: any = null) => {
    if (order) {
      setEditingOrder(order);
      setFormData({
        customer: order.customer,
        amount: order.amount.replace('$', ''),
        status: order.status
      });
    } else {
      setEditingOrder(null);
      setFormData({ customer: '', amount: '', status: 'Pending' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const formattedAmount = formData.amount.startsWith('$') ? formData.amount : `$${formData.amount}`;
    
    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...formData, amount: formattedAmount } : o));
    } else {
      const newOrder = {
        id: `#ORD-${String(orders.length + 1).padStart(3, '0')}`,
        ...formData,
        amount: formattedAmount,
        date: new Date().toISOString().split('T')[0]
      };
      setOrders([...orders, newOrder]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-gray-800">Order Management</h2>
        <div>
          <button className="btn btn-info text-white gradient-btn border-0 shadow-sm me-2">
            <i className="fas fa-download me-2"></i> Export Report
          </button>
          <button className="btn btn-primary gradient-btn border-0 shadow-sm" onClick={() => handleShow()}>
            <i className="fas fa-plus me-2"></i> Add Order
          </button>
        </div>
      </div>

      <Row className="mb-4">
        <Col lg={6} className="mb-4 mb-lg-0">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  Daily Order Volume
                </Card.Title>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={orderVolumeData}>
                      <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0dcaf0" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0dcaf0" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="orders" stroke="#0dcaf0" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col lg={6}>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  Revenue vs Target
                </Card.Title>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#20c997" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#20c997" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="revenue" fill="url(#colorRev)" radius={[4, 4, 0, 0]} barSize={40} />
                      <Line type="monotone" dataKey="target" stroke="#ffc107" strokeWidth={3} dot={{ r: 6, fill: '#ffc107', strokeWidth: 2, stroke: '#fff' }} />
                    </ComposedChart>
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
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 py-3 ps-4 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Order ID</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Customer</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Date</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Amount</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Status</th>
                    <th className="border-0 py-3 pe-4 text-end text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="ps-4 py-3 fw-bold text-primary">{order.id}</td>
                      <td className="py-3 fw-medium text-dark">{order.customer}</td>
                      <td className="py-3 text-muted">{order.date}</td>
                      <td className="py-3 fw-bold">{order.amount}</td>
                      <td className="py-3">
                        <Badge 
                          bg={
                            order.status === 'Delivered' ? 'success' : 
                            order.status === 'Shipped' ? 'info' : 
                            order.status === 'Processing' ? 'primary' : 'warning'
                          } 
                          className="px-2 py-1 rounded-pill"
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="pe-4 py-3 text-end">
                        <button className="btn btn-sm btn-light text-primary me-2 rounded-circle" style={{ width: '32px', height: '32px' }} onClick={() => handleShow(order)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-light text-danger rounded-circle" style={{ width: '32px', height: '32px' }} onClick={() => handleDelete(order.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">{editingOrder ? 'Edit Order' : 'Add New Order'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter customer name" 
                value={formData.customer}
                onChange={(e) => setFormData({...formData, customer: e.target.value})}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount ($)</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingOrder ? 'Save Changes' : 'Add Order'}
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}
