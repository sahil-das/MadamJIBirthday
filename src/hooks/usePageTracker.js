// src/hooks/usePageTracker.js
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const api_url = 'https://visitor-traker.onrender.com/api/activity/log';
//const api_url = 'http://localhost:5000/api/activity/log'; // Change to your actual API URL
// Generate or reuse a sessionId for the session
function getSessionId() {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substr(2, 16) + Date.now();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

const usePageTracker = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const prevPathRef = useRef(location.pathname);
  const sessionId = getSessionId();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) return;
    const logActivity = (path, timeSpent) => {
      console.log('Sending activity:', { page: path, timeSpent, sessionId });
      navigator.sendBeacon(
        api_url,
        new Blob([
          JSON.stringify({ page: path, timeSpent, sessionId })
        ], { type: 'application/json' })
      );
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
      navigator.sendBeacon(
        api_url,
        new Blob([
          JSON.stringify({ page: prevPathRef.current, timeSpent, sessionId })
        ], { type: 'application/json' })
      );
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [location, sessionId]);
};

export default usePageTracker;
