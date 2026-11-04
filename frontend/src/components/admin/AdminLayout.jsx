import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAdminStore from '../../store/useAdminStore';
import { useSocket } from '../../context/SocketContext';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const darkMode = useAdminStore(s => s.darkMode);
  const loadDashboard = useAdminStore(s => s.loadDashboard);
  const loading = useAdminStore(s => s.loading);
  const error = useAdminStore(s => s.error);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    if (!socket) return undefined;
    const refresh = () => loadDashboard();
    socket.on('connect', refresh);
    socket.on('admin:data:changed', refresh);
    return () => {
      socket.off('connect', refresh);
      socket.off('admin:data:changed', refresh);
    };
  }, [socket, loadDashboard]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? '#121010' : '#f5f3f0',
          fontFamily: 'Manrope, sans-serif',
        }}>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

        <main
          className={`transition-all duration-300 pb-20 lg:pb-8 min-h-screen ${
            collapsed ? 'lg:ml-[72px]' : 'lg:ml-[252px]'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-3 flex justify-end">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {isConnected ? 'Live sync connected' : 'Live sync reconnecting'}
              </span>
            </div>
            {error && !loading && (
              <div role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                Could not load live dashboard data: {error}
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
