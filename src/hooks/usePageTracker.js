// src/hooks/usePageTracker.js
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracker = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) return;
    const logActivity = (path, timeSpent) => {
      console.log('Sending activity:', { page: path, timeSpent });
      navigator.sendBeacon('https://visitor-traker.onrender.com/api/activity/log', JSON.stringify({ page: path, timeSpent }));
    };

    const now = Date.now();
    const timeSpent = Math.round((now - startTimeRef.current) / 1000);
    logActivity(prevPathRef.current, timeSpent);

    startTimeRef.current = now;
    prevPathRef.current = location.pathname;
  }, [location]);

  useEffect(() => {
    const handleUnload = () => {
      if (location.pathname.startsWith('/admin')) return;
      const now = Date.now();
      const timeSpent = Math.round((now - startTimeRef.current) / 1000);
      console.log('Sending activity (unload):', { page: prevPathRef.current, timeSpent });
      navigator.sendBeacon('https://visitor-traker.onrender.com/api/activity/log', JSON.stringify({ page: prevPathRef.current, timeSpent }));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [location]);
};

export default usePageTracker;
