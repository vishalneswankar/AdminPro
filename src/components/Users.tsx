import React, { useState } from 'react';
import { Row, Col, Card, Table, Badge, Form, InputGroup, Modal, Button } from 'react-bootstrap';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const roleData = [
  { name: 'Admin', value: 15, color: '#FF6B6B' },
  { name: 'Editor', value: 35, color: '#4ECDC4' },
  { name: 'User', value: 150, color: '#45B7D1' },
  { name: 'Guest', value: 50, color: '#96CEB4' },
];

const activityData = [
  { name: 'Mon', active: 120 },
  { name: 'Tue', active: 150 },
  { name: 'Wed', active: 180 },
  { name: 'Thu', active: 190 },
  { name: 'Fri', active: 210 },
  { name: 'Sat', active: 160 },
  { name: 'Sun', active: 140 },
];

const initialUsers = [
  { id: 1, name: 'Emma Thompson', email: 'emma.t@example.com', role: 'Admin', status: 'Active', lastLogin: '2 mins ago', avatar: 'https://picsum.photos/seed/emma/40/40' },
  { id: 2, name: 'James Wilson', email: 'james.w@example.com', role: 'Editor', status: 'Offline', lastLogin: '1 hour ago', avatar: 'https://picsum.photos/seed/james/40/40' },
  { id: 3, name: 'Sophia Chen', email: 'sophia.c@example.com', role: 'User', status: 'Active', lastLogin: 'Just now', avatar: 'https://picsum.photos/seed/sophia/40/40' },
  { id: 4, name: 'Lucas Silva', email: 'lucas.s@example.com', role: 'User', status: 'Inactive', lastLogin: '2 days ago', avatar: 'https://picsum.photos/seed/lucas/40/40' },
  { id: 5, name: 'Mia Patel', email: 'mia.p@example.com', role: 'Editor', status: 'Active', lastLogin: '5 mins ago', avatar: 'https://picsum.photos/seed/mia/40/40' },
  { id: 6, name: 'Noah Kim', email: 'noah.k@example.com', role: 'Guest', status: 'Offline', lastLogin: '1 week ago', avatar: 'https://picsum.photos/seed/noah/40/40' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  });

  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'User', status: 'Active' });
  };

  const handleShow = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'User', status: 'Active' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        lastLogin: 'Just now',
        avatar: `https://picsum.photos/seed/${formData.name.split(' ')[0]}/40/40`
      };
      setUsers([...users, newUser]);
    }
    handleClose();
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      setUsers(users.filter(u => u.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="pb-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
        <h1 className="h3 fw-bold text-dark mb-0">User Management</h1>
        <div className="d-flex gap-3 align-items-center mt-3 mt-md-0">
          <InputGroup style={{ maxWidth: '300px' }}>
            <InputGroup.Text className="bg-white border-end-0 text-muted rounded-start-pill ps-3">
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name or email..."
              className="bg-white border-start-0 rounded-end-pill shadow-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <button className="btn btn-primary shadow-sm rounded-pill px-4 text-nowrap" onClick={() => handleShow()}>
            <i className="fas fa-plus me-2"></i> Add User
          </button>
        </div>
      </motion.div>

      <Row className="g-4 mb-4">
        <Col lg={4} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              <h5 className="card-title fw-bold mb-4 text-dark">User Roles</h5>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8} as={motion.div} variants={itemVariants}>
          <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              <h5 className="card-title fw-bold mb-4 text-dark">Weekly Active Users</h5>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                    <Bar dataKey="active" name="Active Users" fill="url(#colorActive)" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-0">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center p-4 border-bottom bg-white">
              <h5 className="card-title fw-bold mb-0 text-dark">All Users</h5>
            </div>
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead className="table-light text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <tr>
                    <th className="ps-4 py-3 border-0">User</th>
                    <th className="py-3 border-0">Role</th>
                    <th className="py-3 border-0">Status</th>
                    <th className="py-3 border-0">Last Login</th>
                    <th className="pe-4 py-3 border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <img src={user.avatar} alt={user.name} className="rounded-circle me-3 shadow-sm" width="40" height="40" referrerPolicy="no-referrer" />
                          <div>
                            <div className="fw-bold text-dark">{user.name}</div>
                            <div className="text-muted small">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg={
                          user.role === 'Admin' ? 'danger' : 
                          user.role === 'Editor' ? 'info' : 
                          user.role === 'Guest' ? 'secondary' : 'primary'
                        } className="bg-opacity-10 text-dark fw-medium px-3 py-2 rounded-pill border-0">
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className={`rounded-circle me-2 bg-${user.status === 'Active' ? 'success' : user.status === 'Offline' ? 'warning' : 'danger'}`} style={{ width: '8px', height: '8px' }}></div>
                          <span className="text-muted small fw-medium">{user.status}</span>
                        </div>
                      </td>
                      <td className="text-muted small">{user.lastLogin}</td>
                      <td className="pe-4 text-end">
                        <button className="btn btn-sm btn-light text-primary me-2 rounded-circle shadow-sm" style={{ width: '32px', height: '32px', padding: 0 }} onClick={() => handleShow(user)}>
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className="btn btn-sm btn-light text-danger rounded-circle shadow-sm" style={{ width: '32px', height: '32px', padding: 0 }} onClick={() => handleDeleteClick(user.id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-5 text-muted">
                        <i className="fas fa-search fa-2x mb-3 text-light"></i>
                        <p className="mb-0">No users found matching "{searchTerm}"</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">{editingUser ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter full name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="User">User</option>
                    <option value="Guest">Guest</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Offline">Offline</option>
                    <option value="Inactive">Inactive</option>
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
            {editingUser ? 'Save Changes' : 'Add User'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered size="sm">
        <Modal.Body className="text-center p-4">
          <div className="mb-3">
            <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <i className="fas fa-exclamation-triangle fs-3"></i>
            </div>
          </div>
          <h5 className="fw-bold mb-2">Delete User?</h5>
          <p className="text-muted small mb-4">Are you sure you want to delete this user? This action cannot be undone.</p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="light" onClick={cancelDelete} className="px-4">
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} className="px-4">
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}
