import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TalentDiscovery } from './pages/TalentDiscovery';
import { Investment } from './pages/Investment';
import { FanEngagement } from './pages/FanEngagement';
import { Landing } from './pages/Landing';
import { mockUser } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');

  if (activeTab === 'landing') {
    return <Landing onEnterApp={() => setActiveTab('dashboard')} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'discovery':
        return <TalentDiscovery />;
      case 'investment':
        return <Investment />;
      case 'engagement':
        return <FanEngagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userBalance={mockUser.balances}>
      {renderActiveTab()}
    </Layout>
  );
}
