import React from 'react';
import { Card } from 'react-bootstrap';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 fw-bold text-dark">{title}</h2>
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-5 text-center text-muted">
          <i className="fas fa-tools fa-3x mb-3 text-primary opacity-50"></i>
          <h4>{title} Module</h4>
          <p>This section is currently under development. Check back later for updates.</p>
        </Card.Body>
      </Card>
    </div>
  );
}
