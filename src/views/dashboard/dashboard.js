import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import './dashboard.css';

// Icons
import { 
  FiUser, FiMail, FiPhone, FiHome, FiGlobe, FiBriefcase, 
  FiChevronLeft, FiChevronRight, FiUsers, FiMapPin, FiLayers,
 FiNavigation, FiMap
} from 'react-icons/fi';

// Map components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
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

  const totalUsers = users.length;
  const totalCompanies = new Set(users.map(u => u.company?.name)).size;
  const totalCities = new Set(users.map(u => u.address?.city)).size;

  const pins = users.map(u => ({
    ...u,
    lat: parseFloat(u.address?.geo?.lat) || 0,
    lng: parseFloat(u.address?.geo?.lng) || 0,
  }));

  const handlePinClick = (user) => {
    const index = users.findIndex(u => u.id === user.id);
    setUserIndex(index);
    setSelectedUser(user);
  };

  useEffect(() => {
    if (selectedUser && mapRef.current && markerRefs.current[selectedUser.id]) {
      const { lat, lng } = pins.find(p => p.id === selectedUser.id) || {};
      if (lat && lng) {
        mapRef.current.setView([lat, lng], mapRef.current.getZoom(), { animate: true });
        markerRefs.current[selectedUser.id].openPopup();
      }
    }
  }, [selectedUser, pins]);

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
        <div className="dashboard-header">
          <h1> Dashboard</h1>
          <p className="dashboard-subtitle">User Analytics and Information</p>
        </div>
        
        <div className="dashboard-cards-grid">
          {/* Analytics Card Row */}
          <div>
            <div className="analytics-cards-row">
              <div className="analytics-metric-card">
                <div className="metric-label-row">
                  <FiUsers className="metric-icon" />
                  <span className="metric-label">Users</span>
                </div>
                <div className="metric-value">{totalUsers}</div>
                <div className="metric-desc">Total Number of Users</div>
              </div>
              <div className="analytics-metric-card">
                <div className="metric-label-row">
                  <FiBriefcase className="metric-icon" />
                  <span className="metric-label">Companies</span>
                </div>
                <div className="metric-value">{totalCompanies}</div>
                <div className="metric-desc">Unique Companies</div>
              </div>
              <div className="analytics-metric-card">
                <div className="metric-label-row">
                  <FiMapPin className="metric-icon" />
                  <span className="metric-label">Cities</span>
                </div>
                <div className="metric-value">{totalCities}</div>
                <div className="metric-desc">Unique Cities</div>
              </div>
            </div>
          </div>

          {/* Map & Details Card */}
          <div className="dashboard-card map-details-card">
            <section className="map-details-section">
              <div className="dashboard-card-header">
                <h2><FiMap className="section-icon" /> User Locations</h2>
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
                          <div className="map-popup">
                            <FiUser className="popup-icon" />
                            <strong>{user.name}</strong>
                            <div className="popup-company">
                              <FiBriefcase className="popup-icon" />
                              {user.company?.name}
                            </div>
                            <div className="popup-location">
                              <FiMapPin className="popup-icon" />
                              {user.address?.city}
                            </div>
                          </div>
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
                    <span><FiUser className="nav-icon" /> User Details</span>
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
                        <div className="user-avatar">
                          <FiUser className="avatar-icon" />
                        </div>
                        <div className="user-info">
                          <h3>{selectedUser.name}</h3>
                          <div className="user-company">
                            <FiBriefcase className="company-icon" />
                            {selectedUser.company?.name}
                            {selectedUser.company?.bs && (
                              <span className="company-tag">{selectedUser.company.bs}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="details-grid">
                        <div className="detail-item">
                          <FiUser className="icon" />
                          <span className="label">Username:</span>
                          <span className="value">{selectedUser.username}</span>
                        </div>
                        <div className="detail-item">
                          <FiMail className="icon" />
                          <span className="label">Email:</span>
                          <a href={`mailto:${selectedUser.email}`} className="value">
                            {selectedUser.email}
                          </a>
                        </div>
                        <div className="detail-item">
                          <FiPhone className="icon" />
                          <span className="label">Phone:</span>
                          <a href={`tel:${selectedUser.phone}`} className="value">
                            {selectedUser.phone}
                          </a>
                        </div>
                        <div className="detail-item">
                          <FiHome className="icon" />
                          <span className="label">Address:</span>
                          <div className="value address-value">
                            <div>{selectedUser.address?.street}</div>
                            <div>
                              {selectedUser.address?.city}, {selectedUser.address?.zipcode}
                            </div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FiGlobe className="icon" />
                          <span className="label">Website:</span>
                          <a 
                            href={`https://${selectedUser.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="value website-link"
                          >
                            {selectedUser.website}
                            {getFavicon(selectedUser.website) && (
                              <img 
                                src={getFavicon(selectedUser.website)} 
                                alt="favicon" 
                                className="favicon" 
                              />
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-user-selected">
                      <FiNavigation className="no-user-icon" />
                      <p>Click a pin to view user details</p>
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