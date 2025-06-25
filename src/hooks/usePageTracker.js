// src/hooks/usePageTracker.js
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Generate or reuse a sessionId for the session
let sessionId = sessionStorage.getItem('sessionId');
if (!sessionId) {
  sessionId = Math.random().toString(36).substr(2, 16) + Date.now();
  sessionStorage.setItem('sessionId', sessionId);
}

const usePageTracker = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) return;
    console.log('Sending activity:', { page: path, timeSpent, sessionId });
    const logActivity = (path, timeSpent) => {
      navigator.sendBeacon('https://visitor-traker.onrender.com/api/activity/log', JSON.stringify({ page: path, timeSpent, sessionId }));
    };

    const now = Date.now();
    const timeSpent = Math.round((now - startTimeRef.current) / 1000);
    logActivity(prevPathRef.current, timeSpent);

    startTimeRef.current = now;
    prevPathRef.current = location.pathname;
  }, [location, sessionId]);

  useEffect(() => {
    const handleUnload = () => {
      if (location.pathname.startsWith('/admin')) return;
      const now = Date.now();
      const timeSpent = Math.round((now - startTimeRef.current) / 1000);
      console.log('Sending activity (unload):', { page: prevPathRef.current, timeSpent, sessionId });
      navigator.sendBeacon('https://visitor-traker.onrender.com/api/activity/log', JSON.stringify({ page: prevPathRef.current, timeSpent, sessionId }));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [location, sessionId]);
};

export default usePageTracker;
