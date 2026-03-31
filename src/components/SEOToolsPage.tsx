import React from 'react';
import { Card, Table, Badge, Button, ProgressBar, Row, Col } from 'react-bootstrap';

interface SEOToolsPageProps {
  tool: 'keywords' | 'backlinks' | 'audits';
}

export default function SEOToolsPage({ tool }: SEOToolsPageProps) {
  const renderKeywords = () => (
    <>
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 bg-primary text-white">
            <Card.Body className="p-4">
              <h6 className="opacity-75 mb-2">Total Tracked Keywords</h6>
              <h2 className="fw-bold mb-0">1,245</h2>
              <div className="mt-2 small"><i className="fas fa-arrow-up me-1"></i> +45 this week</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 bg-success text-white">
            <Card.Body className="p-4">
              <h6 className="opacity-75 mb-2">Keywords in Top 3</h6>
              <h2 className="fw-bold mb-0">142</h2>
              <div className="mt-2 small"><i className="fas fa-arrow-up me-1"></i> +12 this week</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 bg-info text-white">
            <Card.Body className="p-4">
              <h6 className="opacity-75 mb-2">Avg. Position</h6>
              <h2 className="fw-bold mb-0">14.5</h2>
              <div className="mt-2 small"><i className="fas fa-arrow-up me-1"></i> +1.2 this week</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 ps-4">Keyword</th>
                <th className="border-0 py-3">Client</th>
                <th className="border-0 py-3">Volume</th>
                <th className="border-0 py-3">Position</th>
                <th className="border-0 py-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kw: 'digital marketing agency', client: 'TechCorp', vol: '12,000', pos: 2, change: '+1' },
                { kw: 'best seo services', client: 'HealthPlus', vol: '8,500', pos: 5, change: '+3' },
                { kw: 'social media management', client: 'StyleInc', vol: '22,000', pos: 12, change: '-2' },
                { kw: 'content marketing strategy', client: 'TechCorp', vol: '5,400', pos: 1, change: '0' },
              ].map((item, i) => (
                <tr key={i}>
                  <td className="ps-4 py-3 fw-semibold">{item.kw}</td>
                  <td>{item.client}</td>
                  <td>{item.vol}</td>
                  <td><Badge bg={item.pos <= 3 ? 'success' : item.pos <= 10 ? 'primary' : 'secondary'} className="rounded-pill px-3">{item.pos}</Badge></td>
                  <td className={item.change.startsWith('+') ? 'text-success' : item.change.startsWith('-') ? 'text-danger' : 'text-muted'}>
                    {item.change !== '0' ? <i className={`fas fa-arrow-${item.change.startsWith('+') ? 'up' : 'down'} me-1`}></i> : ''}
                    {item.change === '0' ? '-' : item.change.replace(/[+-]/, '')}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );

  const renderBacklinks = () => (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-5 text-center">
        <i className="fas fa-link fa-4x text-primary mb-4 opacity-50"></i>
        <h3 className="fw-bold mb-3">Backlink Analysis Tool</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          Monitor your clients' backlink profiles, discover new link-building opportunities, and track lost links in real-time.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <input type="text" className="form-control" placeholder="Enter domain to analyze..." style={{ maxWidth: '400px' }} />
          <Button variant="primary" className="px-4 rounded-3">Analyze</Button>
        </div>
      </Card.Body>
    </Card>
  );

  const renderAudits = () => (
    <Row className="g-4">
      {[
        { site: 'techcorp.com', score: 92, issues: 12, date: 'Today' },
        { site: 'healthplus.org', score: 78, issues: 45, date: 'Yesterday' },
        { site: 'styleinc.net', score: 85, issues: 23, date: '3 days ago' },
      ].map((audit, i) => (
        <Col md={4} key={i}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">{audit.site}</h5>
                <Badge bg="light" text="dark">{audit.date}</Badge>
              </div>
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e9ecef" strokeWidth="12" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke={audit.score >= 90 ? '#198754' : audit.score >= 80 ? '#0d6efd' : '#ffc107'} strokeWidth="12" strokeDasharray={`${(audit.score / 100) * 339.292} 339.292`} transform="rotate(-90 60 60)" />
                  </svg>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <h2 className="fw-bold mb-0">{audit.score}</h2>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <span className="text-danger fw-semibold"><i className="fas fa-exclamation-circle me-1"></i> {audit.issues} Issues</span>
                <Button variant="outline-primary" size="sm" className="rounded-pill px-3">View Report</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const titleMap = {
    keywords: 'Keyword Tracking',
    backlinks: 'Backlink Analysis',
    audits: 'Site Audits'
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">{titleMap[tool]}</h2>
        {tool === 'keywords' && (
          <Button variant="primary" className="rounded-pill px-4 shadow-sm">
            <i className="fas fa-plus me-2"></i> Add Keywords
          </Button>
        )}
        {tool === 'audits' && (
          <Button variant="primary" className="rounded-pill px-4 shadow-sm">
            <i className="fas fa-play me-2"></i> Run New Audit
          </Button>
        )}
      </div>
      
      {tool === 'keywords' && renderKeywords()}
      {tool === 'backlinks' && renderBacklinks()}
      {tool === 'audits' && renderAudits()}
    </div>
  );
}
