import React from 'react';
import { motion } from 'motion/react';

export default function Logo({ width = 40, height = 40, className = '' }: { width?: number | string, height?: number | string, className?: string }) {
  return (
    <motion.div 
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width, height }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3366" />
            <stop offset="100%" stopColor="#FF9933" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00C9FF" />
            <stop offset="100%" stopColor="#92FE9D" />
          </linearGradient>
          <linearGradient id="logoGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F00FF" />
            <stop offset="100%" stopColor="#E100FF" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Left Wing of M */}
        <motion.path 
          d="M15 85 L35 15 L50 45 L15 85Z" 
          fill="url(#logoGrad1)"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Right Wing of M */}
        <motion.path 
          d="M85 85 L65 15 L50 45 L85 85Z" 
          fill="url(#logoGrad2)"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
        
        {/* Center Diamond / Play Button Background */}
        <motion.path 
          d="M50 25 L70 55 L50 85 L30 55 Z" 
          fill="url(#logoGrad3)"
          filter="url(#logoGlow)"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.4 }}
        />
        
        {/* Inner cutout for play icon */}
        <motion.path 
          d="M45 45 L58 55 L45 65 Z" 
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />
      </svg>
    </motion.div>
  );
}
