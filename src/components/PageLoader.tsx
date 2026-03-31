import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function PageLoader() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // 400ms loading time for smooth transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bs-body-bg)',
            zIndex: 1050,
          }}
        >
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem', borderWidth: '0.25em' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
