import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, Row, Col, Table, Badge, Modal, Form, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Sports', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const initialProducts = [
  { id: 1, name: 'Wireless Earbuds', category: 'Electronics', price: '$99', stock: 45, status: 'In Stock' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: '$199', stock: 12, status: 'Low Stock' },
  { id: 3, name: 'Running Shoes', category: 'Clothing', price: '$89', stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Coffee Maker', category: 'Home', price: '$49', stock: 150, status: 'In Stock' },
  { id: 5, name: 'Yoga Mat', category: 'Sports', price: '$29', stock: 85, status: 'In Stock' },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: 0,
    status: 'In Stock'
  });

  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', category: 'Electronics', price: '', stock: 0, status: 'In Stock' });
  };

  const handleShow = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.replace('$', ''),
        stock: product.stock,
        status: product.status
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: 'Electronics', price: '', stock: 0, status: 'In Stock' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const formattedPrice = formData.price.startsWith('$') ? formData.price : `$${formData.price}`;
    const newStatus = Number(formData.stock) === 0 ? 'Out of Stock' : Number(formData.stock) < 20 ? 'Low Stock' : 'In Stock';
    
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, price: formattedPrice, status: newStatus } : p));
    } else {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
        price: formattedPrice,
        status: newStatus
      };
      setProducts([...products, newProduct]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-gray-800">Products Inventory</h2>
        <button className="btn btn-primary gradient-btn border-0 shadow-sm" onClick={() => handleShow()}>
          <i className="fas fa-plus me-2"></i> Add Product
        </button>
      </div>

      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="border-0 shadow-sm glass-card h-100">
              <Card.Body>
                <Card.Title className="text-muted text-uppercase mb-4" style={{ fontSize: '0.85rem', letterSpacing: '0.05rem' }}>
                  Monthly Sales Performance
                </Card.Title>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="sales" fill="url(#colorSales)" radius={[4, 4, 0, 0]} />
                    </BarChart>
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
                  Sales by Category
                </Card.Title>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    </PieChart>
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
                    <th className="border-0 py-3 ps-4 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Product Name</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Category</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Price</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Stock</th>
                    <th className="border-0 py-3 text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Status</th>
                    <th className="border-0 py-3 pe-4 text-end text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="ps-4 py-3 fw-medium text-dark">{product.name}</td>
                      <td className="py-3 text-muted">{product.category}</td>
                      <td className="py-3 fw-bold">{product.price}</td>
                      <td className="py-3">{product.stock}</td>
                      <td className="py-3">
                        <Badge bg={product.status === 'In Stock' ? 'success' : product.status === 'Low Stock' ? 'warning' : 'danger'} className="px-2 py-1 rounded-pill">
                          {product.status}
                        </Badge>
                      </td>
                      <td className="pe-4 py-3 text-end">
                        <button className="btn btn-sm btn-light text-primary me-2 rounded-circle" style={{ width: '32px', height: '32px' }} onClick={() => handleShow(product)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-light text-danger rounded-circle" style={{ width: '32px', height: '32px' }} onClick={() => handleDelete(product.id)}>
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
          <Modal.Title className="fw-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter product name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home">Home</option>
                    <option value="Sports">Sports</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="0" 
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingProduct ? 'Save Changes' : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}
