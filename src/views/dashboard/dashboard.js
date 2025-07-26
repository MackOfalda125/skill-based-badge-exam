import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import './dashboard.css';

// --- BEGIN: Analytics, Map, and User Details Section Imports ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiUser, FiMail, FiPhone, FiHome, FiGlobe, FiBriefcase, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// --- END: Analytics, Map, and User Details Section Imports ---

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // --- BEGIN: Analytics, Map, and User Details Section State ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const mapRef = useRef(null);
  const markerRefs = useRef({});
  // --- END: Analytics, Map, and User Details Section State ---

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // --- BEGIN: Analytics, Map, and User Details Section Logic ---
  // Fetch users
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
        if (data.length > 0) setSelectedUser(data[0]);
      })
      .catch(() => setLoading(false));
  }, []);

  // Analytics data
  const totalUsers = users.length;
  const totalCompanies = new Set(users.map(u => u.company?.name)).size;
  const totalCities = new Set(users.map(u => u.address?.city)).size;

  // Prepare map pins
  const pins = users.map(u => ({
    ...u,
    lat: parseFloat(u.address?.geo?.lat) || 0,
    lng: parseFloat(u.address?.geo?.lng) || 0,
  }));

  // Handle pin click
  const handlePinClick = (user) => {
    const index = users.findIndex(u => u.id === user.id);
    setUserIndex(index);
    setSelectedUser(user);
  };

  // Center map when user changes
  useEffect(() => {
    if (selectedUser && mapRef.current && markerRefs.current[selectedUser.id]) {
      const { lat, lng } = pins.find(p => p.id === selectedUser.id) || {};
      if (lat && lng) {
        mapRef.current.setView([lat, lng], mapRef.current.getZoom(), { animate: true });
        markerRefs.current[selectedUser.id].openPopup();
      }
    }
  }, [selectedUser, pins]);

  // Get website favicon
  const getFavicon = (website) => {
    if (!website) return null;
    try {
      const url = website.startsWith('http') ? website : `https://${website}`;
      const { hostname } = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${hostname}`;
    } catch {
      return null;
    }
  };
  // --- END: Analytics, Map, and User Details Section Logic ---

  // Keep your original layout and hamburger/sidebar logic
  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} />
      
      <div className="hamburger-container">
        <button className="hamburger" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="main">
        <div className="dashboard-cards-grid">
          {/* --- Analytics Card Row --- */}
          <div className="dashboard-card analytics-card-row">
            <div className="analytics-cards-row">
              <div className="analytics-metric-card">
                <div className="metric-label-row">
                  <span className="metric-label">Audience</span>
                  <span className="metric-badge">New</span>
                </div>
                <div className="metric-value">{totalUsers}</div>
                <div className="metric-desc">Total Users</div>
              </div>
              <div className="analytics-metric-card">
                <div className="metric-label-row">
                  <span className="metric-label">Companies</span>
                </div>
                <div className="metric-value">{totalCompanies}</div>
                <div className="metric-desc">Unique Companies</div>
              </div>
              <div className="analytics-metric-card">
                <div className="metric-label-row">
                  <span className="metric-label">Cities</span>
                </div>
                <div className="metric-value">{totalCities}</div>
                <div className="metric-desc">Unique Cities</div>
              </div>
            </div>
          </div>

          {/* --- Map & Details Card --- */}
          <div className="dashboard-card map-details-card">
            <section className="map-details-section">
              <div className="dashboard-card-header">
                <h2>User Map</h2>
              </div>
              <div className="map-details-grid">
                <div className="map-container">
                  <MapContainer
                    center={[20, 0]}
                    zoom={2}
                    scrollWheelZoom={true}
                    className="map"
                    ref={mapRef}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    {pins.map(user => (
                      <Marker
                        key={user.id}
                        position={[user.lat, user.lng]}
                        eventHandlers={{
                          click: () => handlePinClick(user),
                        }}
                        ref={el => markerRefs.current[user.id] = el}
                      >
                        <Popup>
                          <strong>{user.name}</strong><br />
                          {user.address?.city}<br />
                          {user.company?.name}
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
                <div className="details-card">
                  <div className="details-nav">
                    <button 
                      onClick={() => {
                        const newIndex = Math.max(0, userIndex - 1);
                        setUserIndex(newIndex);
                        setSelectedUser(users[newIndex]);
                      }}
                      disabled={userIndex <= 0}
                    >
                      <FiChevronLeft />
                    </button>
                    <span>User Details</span>
                    <button 
                      onClick={() => {
                        const newIndex = Math.min(users.length - 1, userIndex + 1);
                        setUserIndex(newIndex);
                        setSelectedUser(users[newIndex]);
                      }}
                      disabled={userIndex >= users.length - 1}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                  {selectedUser ? (
                    <div className="details-content">
                      <div className="user-header">
                        <FiUser className="icon" />
                        <h3>{selectedUser.name}</h3>
                      </div>
                      <div className="details-grid">
                        <div className="detail-item">
                          <FiUser className="icon" />
                          <span className="label">Username:</span>
                          <span>{selectedUser.username}</span>
                        </div>
                        <div className="detail-item">
                          <FiMail className="icon" />
                          <span className="label">Email:</span>
                          <span>{selectedUser.email}</span>
                        </div>
                        <div className="detail-item">
                          <FiPhone className="icon" />
                          <span className="label">Phone:</span>
                          <span>{selectedUser.phone}</span>
                        </div>
                        <div className="detail-item">
                          <FiBriefcase className="icon" />
                          <span className="label">Company:</span>
                          <span>{selectedUser.company?.name}</span>
                        </div>
                        <div className="detail-item">
                          <FiHome className="icon" />
                          <span className="label">Address:</span>
                          <span>
                            {selectedUser.address?.street}, {selectedUser.address?.city}
                          </span>
                        </div>
                        <div className="detail-item">
                          <FiGlobe className="icon" />
                          <span className="label">Website:</span>
                          <a 
                            href={`https://${selectedUser.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {selectedUser.website}
                          </a>
                          {getFavicon(selectedUser.website) && (
                            <img 
                              src={getFavicon(selectedUser.website)} 
                              alt="favicon" 
                              className="favicon"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-user-selected">
                      Click a pin to view user details
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
