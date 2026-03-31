import React, { useState } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, isCollapsed }: { isOpen: boolean, isCollapsed: boolean }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    campaigns: location.pathname.includes('/campaigns'),
    social: location.pathname.includes('/social'),
    seo: location.pathname.includes('/seo'),
    content: location.pathname.includes('/content'),
    clients: location.pathname.includes('/clients'),
  });

  const toggleMenu = (menu: string) => {
    if (isCollapsed) return; // Don't toggle if sidebar is collapsed
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const sidebarWidth = isCollapsed ? '80px' : '260px';

  return (
    <div 
      className={`agency-header-sidebar border-end-0 sidebar d-flex flex-column ${isOpen ? 'show position-absolute z-3 h-100 shadow-lg' : 'd-none d-md-flex'}`} 
      style={{ width: isOpen ? '260px' : sidebarWidth, transition: 'width 0.3s ease', minHeight: '100%', overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div className="pt-4 pb-5 flex-grow-1">
        <h6 className={`sidebar-heading d-flex justify-content-between align-items-center px-3 mt-2 mb-2 text-uppercase ${isCollapsed && !isOpen ? 'justify-content-center' : ''}`} style={{ fontSize: '0.75rem', letterSpacing: '0.05rem', fontWeight: 700 }}>
          {(!isCollapsed || isOpen) ? <span>Main Menu</span> : <i className="fas fa-ellipsis-h"></i>}
        </h6>
        
        <Nav className="flex-column mb-4">
          <Nav.Item>
            <NavLink to="/" end className={({ isActive }) => `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active rounded mx-2' : ''} ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} title="Dashboard">
              <i className={`fas fa-home fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && <span>Dashboard</span>}
            </NavLink>
          </Nav.Item>

          {/* Campaigns Dropdown */}
          <Nav.Item className="mt-1">
            <div 
              className={`nav-link px-3 py-2 d-flex align-items-center cursor-pointer ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} 
              onClick={() => toggleMenu('campaigns')}
              style={{ cursor: 'pointer' }}
              title="Campaigns"
            >
              <i className={`fas fa-bullseye fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && (
                <>
                  <span className="flex-grow-1">Campaigns</span>
                  <i className={`fas fa-chevron-${openMenus.campaigns ? 'up' : 'down'} fa-xs`}></i>
                </>
              )}
            </div>
            <Collapse in={openMenus.campaigns && (!isCollapsed || isOpen)}>
              <div className="agency-submenu rounded mx-2 mt-1 py-1">
                <NavLink to="/campaigns/active" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Active Campaigns</NavLink>
                <NavLink to="/campaigns/drafts" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Drafts</NavLink>
                <NavLink to="/campaigns/archived" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Archived</NavLink>
              </div>
            </Collapse>
          </Nav.Item>

          {/* Social Media Dropdown */}
          <Nav.Item className="mt-1">
            <div 
              className={`nav-link px-3 py-2 d-flex align-items-center cursor-pointer ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} 
              onClick={() => toggleMenu('social')}
              style={{ cursor: 'pointer' }}
              title="Social Media"
            >
              <i className={`fas fa-share-alt fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && (
                <>
                  <span className="flex-grow-1">Social Media</span>
                  <i className={`fas fa-chevron-${openMenus.social ? 'up' : 'down'} fa-xs`}></i>
                </>
              )}
            </div>
            <Collapse in={openMenus.social && (!isCollapsed || isOpen)}>
              <div className="agency-submenu rounded mx-2 mt-1 py-1">
                <NavLink to="/social/facebook" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}><i className="fab fa-facebook fa-fw me-2"></i>Facebook</NavLink>
                <NavLink to="/social/instagram" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}><i className="fab fa-instagram fa-fw me-2"></i>Instagram</NavLink>
                <NavLink to="/social/twitter" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}><i className="fab fa-twitter fa-fw me-2"></i>Twitter</NavLink>
                <NavLink to="/social/linkedin" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}><i className="fab fa-linkedin fa-fw me-2"></i>LinkedIn</NavLink>
              </div>
            </Collapse>
          </Nav.Item>

          {/* SEO Dropdown */}
          <Nav.Item className="mt-1">
            <div 
              className={`nav-link px-3 py-2 d-flex align-items-center cursor-pointer ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} 
              onClick={() => toggleMenu('seo')}
              style={{ cursor: 'pointer' }}
              title="SEO Tools"
            >
              <i className={`fas fa-search-dollar fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && (
                <>
                  <span className="flex-grow-1">SEO Tools</span>
                  <i className={`fas fa-chevron-${openMenus.seo ? 'up' : 'down'} fa-xs`}></i>
                </>
              )}
            </div>
            <Collapse in={openMenus.seo && (!isCollapsed || isOpen)}>
              <div className="agency-submenu rounded mx-2 mt-1 py-1">
                <NavLink to="/seo/keywords" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Keywords</NavLink>
                <NavLink to="/seo/backlinks" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Backlinks</NavLink>
                <NavLink to="/seo/audits" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Site Audits</NavLink>
              </div>
            </Collapse>
          </Nav.Item>

          {/* Content Dropdown */}
          <Nav.Item className="mt-1">
            <div 
              className={`nav-link px-3 py-2 d-flex align-items-center cursor-pointer ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} 
              onClick={() => toggleMenu('content')}
              style={{ cursor: 'pointer' }}
              title="Content"
            >
              <i className={`fas fa-pen-nib fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && (
                <>
                  <span className="flex-grow-1">Content</span>
                  <i className={`fas fa-chevron-${openMenus.content ? 'up' : 'down'} fa-xs`}></i>
                </>
              )}
            </div>
            <Collapse in={openMenus.content && (!isCollapsed || isOpen)}>
              <div className="agency-submenu rounded mx-2 mt-1 py-1">
                <NavLink to="/content/blogs" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Blog Posts</NavLink>
                <NavLink to="/content/videos" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Videos</NavLink>
                <NavLink to="/content/graphics" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Graphics</NavLink>
              </div>
            </Collapse>
          </Nav.Item>

          {/* Clients Dropdown */}
          <Nav.Item className="mt-1">
            <div 
              className={`nav-link px-3 py-2 d-flex align-items-center cursor-pointer ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} 
              onClick={() => toggleMenu('clients')}
              style={{ cursor: 'pointer' }}
              title="Clients"
            >
              <i className={`fas fa-handshake fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && (
                <>
                  <span className="flex-grow-1">Clients</span>
                  <i className={`fas fa-chevron-${openMenus.clients ? 'up' : 'down'} fa-xs`}></i>
                </>
              )}
            </div>
            <Collapse in={openMenus.clients && (!isCollapsed || isOpen)}>
              <div className="agency-submenu rounded mx-2 mt-1 py-1">
                <NavLink to="/clients/active" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Active Clients</NavLink>
                <NavLink to="/clients/leads" className={({ isActive }) => `nav-link py-1 px-4 small ${isActive ? 'active fw-bold' : ''}`}>Leads</NavLink>
              </div>
            </Collapse>
          </Nav.Item>

          {/* Legacy Links */}
          <Nav.Item>
            <NavLink to="/analytics" className={({ isActive }) => `nav-link px-3 py-2 d-flex align-items-center mt-1 ${isActive ? 'active rounded mx-2' : ''} ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} title="Analytics">
              <i className={`fas fa-chart-bar fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && <span>Analytics</span>}
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/users" className={({ isActive }) => `nav-link px-3 py-2 d-flex align-items-center mt-1 ${isActive ? 'active rounded mx-2' : ''} ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} title="Team">
              <i className={`fas fa-users fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && <span>Team</span>}
            </NavLink>
          </Nav.Item>
        </Nav>

        <h6 className={`sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-2 text-uppercase ${isCollapsed && !isOpen ? 'justify-content-center' : ''}`} style={{ fontSize: '0.75rem', letterSpacing: '0.05rem', fontWeight: 700 }}>
          {(!isCollapsed || isOpen) ? <span>Preferences</span> : <i className="fas fa-ellipsis-h"></i>}
        </h6>
        <Nav className="flex-column mb-2">
          <Nav.Item>
            <NavLink to="/settings" className={({ isActive }) => `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active rounded mx-2' : ''} ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} title="Settings">
              <i className={`fas fa-cog fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && <span>Settings</span>}
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/help" className={({ isActive }) => `nav-link px-3 py-2 d-flex align-items-center mt-1 ${isActive ? 'active rounded mx-2' : ''} ${isCollapsed && !isOpen ? 'justify-content-center mx-2' : ''}`} title="Help Center">
              <i className={`fas fa-question-circle fa-fw ${(!isCollapsed || isOpen) ? 'me-3' : ''}`}></i>
              {(!isCollapsed || isOpen) && <span>Help Center</span>}
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
