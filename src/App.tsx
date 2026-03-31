import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Users from './components/Users';
import Analytics from './components/Analytics';
import Products from './components/Products';
import Orders from './components/Orders';
import Settings from './components/Settings';
import Help from './components/Help';
import Profile from './components/Profile';
import PlaceholderPage from './components/PlaceholderPage';
import CampaignsPage from './components/CampaignsPage';
import SocialMediaPage from './components/SocialMediaPage';
import SEOToolsPage from './components/SEOToolsPage';
import ContentPage from './components/ContentPage';
import ClientsPage from './components/ClientsPage';
import PageLoader from './components/PageLoader';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('auth') === 'true';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="d-flex flex-column vh-100 overflow-hidden bg-light app-container">
        <Topbar 
          toggleSidebar={toggleSidebar} 
          toggleSidebarCollapse={toggleSidebarCollapse}
          onLogout={handleLogout} 
          toggleTheme={toggleTheme} 
          theme={theme} 
        />
        <div className="d-flex flex-grow-1 overflow-hidden">
          <Sidebar isOpen={sidebarOpen} isCollapsed={sidebarCollapsed} />
          <main className="flex-grow-1 px-md-4 py-4 overflow-auto h-100 main-content d-flex flex-column position-relative" style={{ transition: 'all 0.3s' }}>
            <PageLoader />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Digital Media Agency Routes */}
                <Route path="/campaigns/active" element={<CampaignsPage status="active" />} />
                <Route path="/campaigns/drafts" element={<CampaignsPage status="drafts" />} />
                <Route path="/campaigns/archived" element={<CampaignsPage status="archived" />} />
                
                <Route path="/social/facebook" element={<SocialMediaPage platform="facebook" />} />
                <Route path="/social/instagram" element={<SocialMediaPage platform="instagram" />} />
                <Route path="/social/twitter" element={<SocialMediaPage platform="twitter" />} />
                <Route path="/social/linkedin" element={<SocialMediaPage platform="linkedin" />} />
                
                <Route path="/seo/keywords" element={<SEOToolsPage tool="keywords" />} />
                <Route path="/seo/backlinks" element={<SEOToolsPage tool="backlinks" />} />
                <Route path="/seo/audits" element={<SEOToolsPage tool="audits" />} />
                
                <Route path="/content/blogs" element={<ContentPage type="blogs" />} />
                <Route path="/content/videos" element={<ContentPage type="videos" />} />
                <Route path="/content/graphics" element={<ContentPage type="graphics" />} />
                
                <Route path="/clients/active" element={<ClientsPage status="active" />} />
                <Route path="/clients/leads" element={<ClientsPage status="leads" />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            
            {/* Footer */}
            <footer className="text-center pt-4 pb-2 mt-auto text-muted border-top mt-4" style={{ fontSize: '0.875rem' }}>
              &copy; 2026 MediaPro Agency. Designed and developed by Vishal Neswankar
            </footer>
          </main>
        </div>
      </div>
    </Router>
  );
}
