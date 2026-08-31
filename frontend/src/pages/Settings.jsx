import React, { useState } from 'react';
import { Save, User, Bell, Lock, Globe, Video, Mic } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [videoQuality, setVideoQuality] = useState('high');
  const [saveRecordings, setSaveRecordings] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="settings-container fade-in">
      {/* Header */}
      <div className="settings-header">
        <div className="settings-header-content">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Configure your SpeakBetter AI experience</p>
        </div>
      </div>
      
      {/* Settings Form */}
      <div className="settings-panel">
        <div className="settings-content">
          {/* Tabs */}
          <div className="settings-tabs">
            <button 
              className={`settings-tab ${activeTab === 'general' ? 'settings-tab-active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`settings-tab ${activeTab === 'account' ? 'settings-tab-active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button 
              className={`settings-tab ${activeTab === 'privacy' ? 'settings-tab-active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              Privacy
            </button>
            <button 
              className={`settings-tab ${activeTab === 'notifications' ? 'settings-tab-active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
          </div>
          
          <div className="settings-sections">
            {/* Account Section */}
            <SettingsSection 
              title="Account Settings" 
              icon={<User className="settings-icon" />}
            >
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Username</label>
                </div>
                <div className="settings-field-input">
                  <input
                    type="text"
                    className="input-field"
                    defaultValue="johndoe"
                  />
                </div>
              </div>
              
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Email</label>
                </div>
                <div className="settings-field-input">
                  <input
                    type="email"
                    className="input-field"
                    defaultValue="john.doe@example.com"
                  />
                </div>
              </div>
              
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Profile Picture</label>
                </div>
                <div className="settings-field-input profile-picture-field">
                  <div className="profile-avatar"></div>
                  <button className="secondary-button">
                    Change
                  </button>
                </div>
              </div>
            </SettingsSection>
            
            {/* Notification Settings */}
            <SettingsSection 
              title="Notification Settings" 
              icon={<Bell className="settings-icon" />}
            >
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Email Notifications</label>
                </div>
                <div className="settings-field-input">
                  <Toggle
                    enabled={notifications}
                    setEnabled={setNotifications}
                    label="Receive email updates about your progress"
                  />
                </div>
              </div>
              
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Push Notifications</label>
                </div>
                <div className="settings-field-input">
                  <Toggle
                    enabled={notifications}
                    setEnabled={setNotifications}
                    label="Receive push notifications on your device"
                  />
                </div>
              </div>
            </SettingsSection>
            
            {/* Application Settings */}
            <SettingsSection 
              title="Application Settings" 
              icon={<Globe className="settings-icon" />}
            >
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Language</label>
                </div>
                <div className="settings-field-input">
                  <select
                    className="select-field"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="english">English (US)</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                  </select>
                </div>
              </div>
              
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Dark Mode</label>
                </div>
                <div className="settings-field-input">
                  <Toggle
                    enabled={darkMode}
                    setEnabled={setDarkMode}
                    label="Use dark theme"
                  />
                </div>
              </div>
            </SettingsSection>
            
            {/* Recording Settings */}
            <SettingsSection 
              title="Recording Settings" 
              icon={<Video className="settings-icon" />}
            >
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Video Quality</label>
                </div>
                <div className="settings-field-input">
                  <select
                    className="select-field"
                    value={videoQuality}
                    onChange={(e) => setVideoQuality(e.target.value)}
                  >
                    <option value="high">High (720p)</option>
                    <option value="medium">Medium (480p)</option>
                    <option value="low">Low (360p)</option>
                  </select>
                </div>
              </div>
              
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Save Recordings</label>
                </div>
                <div className="settings-field-input">
                  <Toggle
                    enabled={saveRecordings}
                    setEnabled={setSaveRecordings}
                    label="Keep recordings in your account history"
                  />
                </div>
              </div>
            </SettingsSection>
            
            {/* Privacy Settings */}
            <SettingsSection 
              title="Privacy Settings" 
              icon={<Lock className="settings-icon" />}
            >
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Data Collection</label>
                </div>
                <div className="settings-field-input">
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input type="checkbox" id="analytics" className="checkbox-input" defaultChecked />
                      <label htmlFor="analytics" className="checkbox-label">Share anonymized analytics data</label>
                    </div>
                    <div className="checkbox-item">
                      <input type="checkbox" id="improvement" className="checkbox-input" defaultChecked />
                      <label htmlFor="improvement" className="checkbox-label">Help improve AI model with my recordings</label>
                    </div>
                    <p className="help-text">
                      We never share your personal information or identifiable content with third parties.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="settings-field">
                <div className="settings-field-label">
                  <label>Data Deletion</label>
                </div>
                <div className="settings-field-input">
                  <button className="danger-button">
                    Delete All My Data
                  </button>
                  <p className="help-text">
                    This action will permanently delete all your recordings and analysis data.
                  </p>
                </div>
              </div>
            </SettingsSection>
          </div>
          
          <div className="settings-footer">
            <button className="primary-button">
              <Save className="button-icon" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SettingsSection = ({ title, icon, children }) => (
  <div className="settings-section">
    <h2 className="section-title">
      {icon && <span className="section-icon">{icon}</span>}
      {title}
    </h2>
    <div className="section-content">
      {children}
    </div>
  </div>
);

const Toggle = ({ enabled, setEnabled, label }) => (
  <div className="toggle-container">
    <button
      type="button"
      className={`toggle-button ${enabled ? 'toggle-active' : 'toggle-inactive'}`}
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        className={`toggle-handle ${enabled ? 'toggle-handle-active' : 'toggle-handle-inactive'}`}
      />
    </button>
    <span className="toggle-label">{label}</span>
  </div>
);

export default Settings;