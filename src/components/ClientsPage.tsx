import React from 'react';
import { Card, Table, Badge, Button, Dropdown } from 'react-bootstrap';

interface ClientsPageProps {
  status: 'active' | 'leads';
}

export default function ClientsPage({ status }: ClientsPageProps) {
  const allClients = [
    { id: 1, name: 'TechCorp Solutions', industry: 'Software', contact: 'john@techcorp.com', mrr: 12500, status: 'active', health: 'Good' },
    { id: 2, name: 'HealthPlus Medical', industry: 'Healthcare', contact: 'sarah@healthplus.org', mrr: 8400, status: 'active', health: 'Excellent' },
    { id: 3, name: 'StyleInc Fashion', industry: 'Retail', contact: 'mike@styleinc.net', mrr: 5200, status: 'active', health: 'At Risk' },
    { id: 4, name: 'LocalBiz Cafe', industry: 'Food & Bev', contact: 'owner@localbiz.com', mrr: 1500, status: 'active', health: 'Good' },
    { id: 5, name: 'Enterprise LLC', industry: 'Corporate', contact: 'vp@enterprise.com', mrr: 0, status: 'leads', probability: '80%' },
    { id: 6, name: 'NextGen Startup', industry: 'Tech', contact: 'founder@nextgen.io', mrr: 0, status: 'leads', probability: '45%' },
    { id: 7, name: 'City Real Estate', industry: 'Real Estate', contact: 'broker@cityre.com', mrr: 0, status: 'leads', probability: '20%' },
  ];

  const filteredClients = allClients.filter(c => c.status === status);

  const titleMap = {
    active: 'Active Clients',
    leads: 'Client Leads Pipeline'
  };

  const getHealthBadge = (health?: string) => {
    switch (health) {
      case 'Excellent': return <Badge bg="success" className="rounded-pill px-3">Excellent</Badge>;
      case 'Good': return <Badge bg="primary" className="rounded-pill px-3">Good</Badge>;
      case 'At Risk': return <Badge bg="danger" className="rounded-pill px-3">At Risk</Badge>;
      default: return null;
    }
  };

  const getProbabilityBadge = (prob?: string) => {
    if (!prob) return null;
    const val = parseInt(prob);
    if (val >= 70) return <Badge bg="success" className="rounded-pill px-3">{prob}</Badge>;
    if (val >= 40) return <Badge bg="warning" text="dark" className="rounded-pill px-3">{prob}</Badge>;
    return <Badge bg="secondary" className="rounded-pill px-3">{prob}</Badge>;
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">{titleMap[status]}</h2>
        <Button variant="primary" className="rounded-pill px-4 shadow-sm">
          <i className="fas fa-plus me-2"></i> {status === 'active' ? 'Add Client' : 'Add Lead'}
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 ps-4">Company Name</th>
                <th className="border-0 py-3">Industry</th>
                <th className="border-0 py-3">Primary Contact</th>
                {status === 'active' ? (
                  <>
                    <th className="border-0 py-3">MRR</th>
                    <th className="border-0 py-3">Account Health</th>
                  </>
                ) : (
                  <>
                    <th className="border-0 py-3">Est. Value</th>
                    <th className="border-0 py-3">Close Probability</th>
                  </>
                )}
                <th className="border-0 py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3 text-primary fw-bold" style={{ width: '40px', height: '40px' }}>
                        {client.name.charAt(0)}
                      </div>
                      <span className="fw-semibold">{client.name}</span>
                    </div>
                  </td>
                  <td>{client.industry}</td>
                  <td><a href={`mailto:${client.contact}`} className="text-decoration-none">{client.contact}</a></td>
                  
                  {status === 'active' ? (
                    <>
                      <td className="fw-bold">${client.mrr.toLocaleString()}/mo</td>
                      <td>{getHealthBadge(client.health)}</td>
                    </>
                  ) : (
                    <>
                      <td className="fw-bold text-muted">TBD</td>
                      <td>{getProbabilityBadge(client.probability)}</td>
                    </>
                  )}
                  
                  <td className="text-end pe-4">
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="light" size="sm" className="rounded-circle btn-icon" style={{ width: '32px', height: '32px', padding: 0 }}>
                        <i className="fas fa-ellipsis-v"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="shadow border-0 rounded-3">
                        <Dropdown.Item href="#/action-1"><i className="fas fa-eye me-2 text-muted"></i> View Details</Dropdown.Item>
                        <Dropdown.Item href="#/action-2"><i className="fas fa-envelope me-2 text-muted"></i> Send Email</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3" className="text-danger"><i className="fas fa-trash me-2"></i> Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
