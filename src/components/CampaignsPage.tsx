import React from 'react';
import { Card, Table, Badge, Button, ProgressBar } from 'react-bootstrap';

interface CampaignsPageProps {
  status: 'active' | 'drafts' | 'archived';
}

export default function CampaignsPage({ status }: CampaignsPageProps) {
  const allCampaigns = [
    { id: 1, name: 'Summer Sale Boost', client: 'TechCorp', budget: 5000, spent: 3200, roi: '+12%', status: 'active', progress: 64 },
    { id: 2, name: 'Brand Awareness Q3', client: 'HealthPlus', budget: 12000, spent: 11500, roi: '+8%', status: 'active', progress: 95 },
    { id: 3, name: 'New Product Launch', client: 'StyleInc', budget: 8000, spent: 1200, roi: '+2%', status: 'active', progress: 15 },
    { id: 4, name: 'Holiday Special', client: 'TechCorp', budget: 15000, spent: 0, roi: '-', status: 'drafts', progress: 0 },
    { id: 5, name: 'Email Newsletter Revamp', client: 'LocalBiz', budget: 2000, spent: 0, roi: '-', status: 'drafts', progress: 0 },
    { id: 6, name: 'Spring Clearance', client: 'StyleInc', budget: 4000, spent: 4000, roi: '+24%', status: 'archived', progress: 100 },
    { id: 7, name: 'B2B Lead Gen', client: 'Enterprise LLC', budget: 20000, spent: 20000, roi: '+18%', status: 'archived', progress: 100 },
  ];

  const filteredCampaigns = allCampaigns.filter(c => c.status === status);

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'active': return <Badge bg="success">Active</Badge>;
      case 'drafts': return <Badge bg="warning" text="dark">Draft</Badge>;
      case 'archived': return <Badge bg="secondary">Archived</Badge>;
      default: return <Badge bg="primary">{s}</Badge>;
    }
  };

  const titleMap = {
    active: 'Active Campaigns',
    drafts: 'Draft Campaigns',
    archived: 'Archived Campaigns'
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">{titleMap[status]}</h2>
        <Button variant="primary" className="rounded-pill px-4 shadow-sm">
          <i className="fas fa-plus me-2"></i> New Campaign
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 ps-4">Campaign Name</th>
                <th className="border-0 py-3">Client</th>
                <th className="border-0 py-3">Budget / Spent</th>
                <th className="border-0 py-3">Progress</th>
                <th className="border-0 py-3">ROI</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5 text-muted">
                    No {status} campaigns found.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td className="ps-4 py-3 fw-semibold">{campaign.name}</td>
                    <td>{campaign.client}</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span>${campaign.budget.toLocaleString()}</span>
                        <small className="text-muted">${campaign.spent.toLocaleString()} spent</small>
                      </div>
                    </td>
                    <td style={{ width: '20%' }}>
                      <ProgressBar 
                        now={campaign.progress} 
                        variant={campaign.progress > 90 ? 'success' : 'primary'} 
                        style={{ height: '6px' }} 
                      />
                      <small className="text-muted mt-1 d-block">{campaign.progress}%</small>
                    </td>
                    <td className={campaign.roi.startsWith('+') ? 'text-success fw-bold' : ''}>
                      {campaign.roi}
                    </td>
                    <td>{getStatusBadge(campaign.status)}</td>
                    <td className="text-end pe-4">
                      <Button variant="light" size="sm" className="me-2 rounded-circle">
                        <i className="fas fa-edit text-primary"></i>
                      </Button>
                      <Button variant="light" size="sm" className="rounded-circle">
                        <i className="fas fa-ellipsis-v text-muted"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
