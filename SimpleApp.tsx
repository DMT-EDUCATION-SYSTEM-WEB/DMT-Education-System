import React, { useEffect } from 'react';
import { useOptimizedAnimation, useOptimizedHover } from './hooks/useOptimizedAnimation';
import { OptimizedCard, AnimatedSection } from './components/common/OptimizedCard';
import './styles/optimized-animations.css';

// SVG Icons cho thay thế emoji - Phiên bản đầy màu sắc và sinh động hơn
const Icons = {
  Target: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF8E53" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="white" stroke="url(#targetGradient)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" fill="white" stroke="url(#targetGradient)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" fill="white" stroke="url(#targetGradient)" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="url(#targetGradient)" />
    </svg>
  ),
  Bulb: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M9 2.5a6.5 6.5 0 0 1 5.27 10.47l.06.03s.34 1 .34 1.5v1a2 2 0 0 1-1 1.73V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.77A2 2 0 0 1 5 16v-1c0-.5.34-1.5.34-1.5l.06-.03A6.5 6.5 0 0 1 9 2.5z" 
        fill="url(#bulbGradient)" filter="url(#bulbGlow)" />
      <path d="M9.5 21h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z" fill="#E67E22" />
      <path d="M8.5 18h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" fill="#E67E22" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="#FFD700" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
        </filter>
      </defs>
      <path d="M12 2L9.2 8.6 2 9.2l5.5 5.3-1.3 7.5 5.8-3 5.8 3-1.3-7.5 5.5-5.3-7.2-.6z" 
        fill="url(#starGradient)" stroke="#E67E22" strokeWidth="0.5" filter="url(#starGlow)" />
    </svg>
  ),
  Trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient id="trophyBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CD7F32" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
      </defs>
      <path d="M6 4v3.2c0 1 0 2 .4 2.9.5 1 1.3 1.7 2.2 2.2.5.3 1.1.4 1.7.5.7 0 1.4-.2 2-.5 1-.5 1.8-1.2 2.3-2.2.4-.9.4-1.9.4-2.9V4H6z" 
        fill="url(#trophyGradient)" stroke="#E67E22" strokeWidth="0.5" />
      <path d="M14 4h5c.6 0 1 .4 1 1s-.4 1-1 1h-1c-.7 0-1 .3-1 1v1c0 1.7-1.3 3-3 3" 
        fill="none" stroke="#E67E22" strokeWidth="0.5" />
      <path d="M10 4H5c-.6 0-1 .4-1 1s.4 1 1 1h1c.7 0 1 .3 1 1v1c0 1.7 1.3 3 3 3" 
        fill="none" stroke="#E67E22" strokeWidth="0.5" />
      <path d="M9 13v5h6v-5" fill="none" stroke="#E67E22" strokeWidth="0.5" />
      <path d="M8 18h8v2c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-2z" 
        fill="url(#trophyBase)" stroke="#E67E22" strokeWidth="0.5" />
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="bookGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3498DB" />
          <stop offset="100%" stopColor="#8E44AD" />
        </linearGradient>
        <linearGradient id="bookGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2980B9" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
        <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      <path d="M4 6v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-12c-1.1 0-2 .9-2 2z" 
        fill="url(#bookGradient1)" />
      <path d="M4 6v14c0 1.1.9 2 2 2h12V4h-12c-1.1 0-2 .9-2 2z" 
        fill="url(#bookGradient2)" />
      <path d="M6 4h10v16h-10z" fill="url(#pageGradient)" />
      <path d="M8 8h6M8 12h6M8 16h4" stroke="#3498DB" strokeWidth="0.5" strokeLinecap="round" />
    </svg>
  ),
  Graduation: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="gradCapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3498DB" />
          <stop offset="100%" stopColor="#2980B9" />
        </linearGradient>
        <linearGradient id="gradTasselGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1C40F" />
          <stop offset="100%" stopColor="#F39C12" />
        </linearGradient>
      </defs>
      <path d="M12 4L3 9l9 5 7.6-4.2c.6.4.9 1 .9 1.7v3c-.5.2-1 .8-1 1.5s.4 1.3 1 1.5V20h1v-2.5c.5-.2 1-.8 1-1.5s-.4-1.3-1-1.5v-3c0-1.2-.7-2.3-1.7-2.9L21 8l-9-4z" 
        fill="url(#gradCapGradient)" />
      <path d="M9 13v5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-5l-3 1.7L9 13z" 
        fill="url(#gradTasselGradient)" />
    </svg>
  ),
  Teacher: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="teacherHeadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB6C1" />
          <stop offset="100%" stopColor="#FF69B4" />
        </linearGradient>
        <linearGradient id="teacherBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4682B4" />
          <stop offset="100%" stopColor="#1E90FF" />
        </linearGradient>
        <linearGradient id="teacherBookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#A52A2A" />
        </linearGradient>
        <linearGradient id="teacherGlassesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#333333" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="7" r="4" fill="url(#teacherHeadGradient)" />
      <rect x="6" y="11" width="12" height="10" rx="2" fill="url(#teacherBodyGradient)" />
      <rect x="5" y="16" width="6" height="8" rx="1" fill="url(#teacherBookGradient)" />
      <path d="M9 7h6M8 6h1M15 6h1" stroke="url(#teacherGlassesGradient)" strokeWidth="0.75" />
    </svg>
  ),
  News: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="newsGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
        <linearGradient id="newsGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECECEC" />
          <stop offset="100%" stopColor="#CCCCCC" />
        </linearGradient>
        <linearGradient id="newsHeaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3498DB" />
          <stop offset="100%" stopColor="#2980B9" />
        </linearGradient>
      </defs>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="url(#newsGradient1)" />
      <path d="M19 5H5v3h14V5z" fill="url(#newsHeaderGradient)" />
      <path d="M7 10h8v2H7zM7 14h10v1H7zM7 17h10v1H7zM17 10h2v2h-2z" fill="url(#newsGradient2)" />
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27AE60" />
          <stop offset="100%" stopColor="#2ECC71" />
        </linearGradient>
        <filter id="phoneGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="#27AE60" floodOpacity="0.5" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
        </filter>
      </defs>
      <path d="M19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"
        fill="url(#phoneGradient)" filter="url(#phoneGlow)" />
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#C0392B" />
        </linearGradient>
        <filter id="locationShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#C0392B" floodOpacity="0.5" />
        </filter>
      </defs>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="url(#locationGradient)" filter="url(#locationShadow)" />
    </svg>
  ),
  Email: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>
        <linearGradient id="emailPaperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>
        <filter id="emailShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#FF9800" floodOpacity="0.5" />
        </filter>
      </defs>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
        fill="url(#emailGradient)" filter="url(#emailShadow)" />
      <path d="M20 4H4c-.5 0-.9.2-1.3.5l8.6 8.6c.7.7 1.7.7 2.4 0l8.6-8.6c-.4-.3-.8-.5-1.3-.5z"
        fill="url(#emailPaperGradient)" />
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B59B6" />
          <stop offset="100%" stopColor="#8E44AD" />
        </linearGradient>
        <linearGradient id="calendarTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8E44AD" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
      </defs>
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        fill="url(#calendarGradient)" />
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v3h18V5c0-1.1-.9-2-2-2z"
        fill="url(#calendarTopGradient)" />
      <path d="M7 12h2v2H7zM11 12h2v2h-2zM15 12h2v2h-2zM7 16h2v2H7zM11 16h2v2h-2zM15 16h2v2h-2z"
        fill="white" />
    </svg>
  ),
  Gift: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="giftBoxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="100%" stopColor="#D81B60" />
        </linearGradient>
        <linearGradient id="giftTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F06292" />
          <stop offset="100%" stopColor="#EC407A" />
        </linearGradient>
        <linearGradient id="giftRibbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>
      <path d="M20 6h-2c.55-.55 1-1.22 1-2 0-1.66-1.34-3-3-3-1.23 0-2.29.75-2.75 1.82-.44-1.05-1.5-1.82-2.75-1.82-1.66 0-3 1.34-3 3 0 .78.45 1.45 1 2H5C3.9 6 3 6.9 3 8v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
        fill="url(#giftBoxGradient)" />
      <path d="M20 6h-2c.55-.55 1-1.22 1-2 0-1.66-1.34-3-3-3-1.23 0-2.29.75-2.75 1.82-.44-1.05-1.5-1.82-2.75-1.82-1.66 0-3 1.34-3 3 0 .78.45 1.45 1 2H5C3.9 6 3 6.9 3 8v3h18V8c0-1.1-.9-2-2-2z"
        fill="url(#giftTopGradient)" />
      <path d="M3 8h18v3H3zM11 5v15M13 5v15"
        fill="none" stroke="url(#giftRibbonGradient)" strokeWidth="2" />
    </svg>
  ),
  Rocket: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="rocketBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5252" />
          <stop offset="100%" stopColor="#FF1744" />
        </linearGradient>
        <linearGradient id="rocketWindowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#90CAF9" />
          <stop offset="100%" stopColor="#42A5F5" />
        </linearGradient>
        <linearGradient id="rocketFireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>
        <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5z"
        fill="url(#rocketBodyGradient)" />
      <circle cx="12" cy="9" r="2" fill="url(#rocketWindowGradient)" />
      <path d="M12 14.5c-5 0-6 4-6 4h12s-1-4-6-4zM15 15v2M12 15v3M9 15v2"
        fill="none" stroke="#E0E0E0" strokeWidth="1" />
      <path d="M11 19l1 3 1-3M8 19s-1 2 0 3M16 19s1 2 0 3"
        fill="url(#rocketFireGradient)" filter="url(#fireGlow)" />
    </svg>
  ),
  Celebration: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="celebrationGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>
        <linearGradient id="celebrationGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F44336" />
          <stop offset="100%" stopColor="#E91E63" />
        </linearGradient>
        <linearGradient id="celebrationGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="100%" stopColor="#03A9F4" />
        </linearGradient>
        <linearGradient id="celebrationGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#8BC34A" />
        </linearGradient>
        <filter id="celebrationGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M7 11.5l4.5-7.5 1.5 2-3.5 5.5z" fill="url(#celebrationGradient1)" filter="url(#celebrationGlow)" />
      <path d="M14 3l-2 6 7-2-5-4z" fill="url(#celebrationGradient2)" filter="url(#celebrationGlow)" />
      <path d="M6 16l7-3-3 8-4-5z" fill="url(#celebrationGradient3)" filter="url(#celebrationGlow)" />
      <path d="M19 12l-6-1 4 6 2-5z" fill="url(#celebrationGradient4)" filter="url(#celebrationGlow)" />
      <circle cx="12" cy="12" r="1" fill="#FFEB3B" />
      <circle cx="7" cy="5" r="0.5" fill="#FFEB3B" />
      <circle cx="17" cy="7" r="0.5" fill="#FFEB3B" />
      <circle cx="19" cy="16" r="0.5" fill="#FFEB3B" />
      <circle cx="5" cy="17" r="0.5" fill="#FFEB3B" />
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="checkCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#64DD17" />
        </linearGradient>
        <filter id="checkCircleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="none" stroke="url(#checkCircleGradient)" strokeWidth="2" />
      <path 
        d="M9 12l2 2 4-4" 
        fill="none" 
        stroke="url(#checkCircleGradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#checkCircleGlow)"
      />
      <circle cx="12" cy="12" r="6" fill="url(#checkCircleGradient)" fillOpacity="0.2" />
    </svg>
  ),
  Announcement: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="micGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9C27B0" />
          <stop offset="100%" stopColor="#673AB7" />
        </linearGradient>
        <linearGradient id="micGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3F51B5" />
          <stop offset="100%" stopColor="#2196F3" />
        </linearGradient>
        <filter id="micGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="#9C27B0" floodOpacity="0.3" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
        </filter>
        <filter id="micShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Microphone stand */}
      <path d="M9 18h6v2H9z" fill="url(#micGradient1)" />
      <path d="M12 22L12 15" fill="none" stroke="url(#micGradient1)" strokeWidth="2" strokeLinecap="round" />
      {/* Microphone body */}
      <path d="M12 1c-2.21 0-4 1.79-4 4v6c0 2.21 1.79 4 4 4s4-1.79 4-4V5c0-2.21-1.79-4-4-4z" 
        fill="url(#micGradient2)" filter="url(#micGlow)" />
      {/* Sound waves */}
      <path d="M7 9v2c0 2.76 2.24 5 5 5s5-2.24 5-5V9" 
        fill="none" stroke="url(#micGradient1)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1,1" />
      <path d="M5 9v2c0 3.87 3.13 7 7 7s7-3.13 7-7V9" 
        fill="none" stroke="url(#micGradient1)" strokeWidth="1" strokeLinecap="round" strokeDasharray="1,2" />
      {/* Microphone details */}
      <path d="M10 5c0-1.1 0.9-2 2-2s2 0.9 2 2" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
    </svg>
  ),
  Bank: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="bankGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>
        <linearGradient id="bankGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#90CAF9" />
          <stop offset="100%" stopColor="#42A5F5" />
        </linearGradient>
        <linearGradient id="bankGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#BBDEFB" />
        </linearGradient>
        <filter id="bankShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Building base */}
      <rect x="2" y="17" width="20" height="3" fill="url(#bankGradient1)" filter="url(#bankShadow)" />
      {/* Building top */}
      <path d="M12 3L2 9h20L12 3z" fill="url(#bankGradient2)" filter="url(#bankShadow)" />
      {/* Columns */}
      <rect x="4" y="9" width="2" height="8" fill="url(#bankGradient3)" rx="0.5" />
      <rect x="8" y="9" width="2" height="8" fill="url(#bankGradient3)" rx="0.5" />
      <rect x="12" y="9" width="2" height="8" fill="url(#bankGradient3)" rx="0.5" />
      <rect x="16" y="9" width="2" height="8" fill="url(#bankGradient3)" rx="0.5" />
      {/* Building foundation */}
      <rect x="3" y="20" width="18" height="2" fill="url(#bankGradient1)" />
      {/* Decorative elements */}
      <circle cx="12" cy="6" r="0.8" fill="#E3F2FD" />
      <rect x="11.5" y="3" width="1" height="2" fill="#E3F2FD" />
    </svg>
  ),
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="facebookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1877f2" />
          <stop offset="100%" stopColor="#42a5f5" />
        </linearGradient>
      </defs>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
        fill="url(#facebookGradient)" />
    </svg>
  ),
  YouTube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="youtubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
        fill="url(#youtubeGradient)" />
    </svg>
  ),
  TikTok: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="tiktokGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0050" />
          <stop offset="50%" stopColor="#00f2ea" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" 
        fill="url(#tiktokGradient)" />
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="mapPinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
        fill="url(#mapPinGradient)" />
    </svg>
  ),
  ContactPhone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="contactPhoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" 
        fill="url(#contactPhoneGradient)" />
    </svg>
  ),
  ContactEmail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="contactEmailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" 
        fill="url(#contactEmailGradient)" />
    </svg>
  )
};

const App = () => {
  const heroRef = useOptimizedAnimation({ animationClass: 'fade-in-up', delay: 100 });
  const aboutRef = useOptimizedAnimation({ animationClass: 'fade-in-up', delay: 200 });
  const coursesRef = useOptimizedAnimation({ animationClass: 'fade-in-up', delay: 300 });

  // Remove AOS initialization for better performance
  useEffect(() => {
    // Removed AOS.init() for performance optimization
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 50%, #f3e8ff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo-dmt.png" 
              alt="DMT Education Logo" 
              className="hover-scale"
              style={{
                height: '50px',
                width: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div style={{ marginLeft: '12px' }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                lineHeight: '1.2'
              }}>
                DMT Education
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Vững nguồn tri thức, tiếp bước tương lai
              </div>
            </div>
          </div>
          
          <nav style={{ display: 'flex', gap: '30px' }}>
            <a href="#home" className="fade-in-up stagger-1" style={{
              color: '#dc2626',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '15px',
              padding: '8px 0',
              borderBottom: '2px solid #dc2626',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderBottom = '2px solid #dc2626';
              // Reset other nav items
              const navLinks = e.currentTarget.parentElement?.querySelectorAll('a');
              navLinks?.forEach(link => {
                if (link !== e.currentTarget) {
                  link.style.color = '#374151';
                  link.style.borderBottom = 'none';
                  link.style.fontWeight = '500';
                }
              });
              e.currentTarget.style.fontWeight = '600';
            }}>
              Trang chủ
            </a>
            <a href="#about" className="fade-in-up stagger-2" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
            onClick={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderBottom = '2px solid #dc2626';
              // Reset other nav items
              const navLinks = e.currentTarget.parentElement?.querySelectorAll('a');
              navLinks?.forEach(link => {
                if (link !== e.currentTarget) {
                  link.style.color = '#374151';
                  link.style.borderBottom = 'none';
                  link.style.fontWeight = '500';
                }
              });
              e.currentTarget.style.fontWeight = '600';
            }}>
              Giới thiệu
            </a>
            <a href="#courses" className="fade-in-up stagger-3" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
            onClick={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderBottom = '2px solid #dc2626';
              // Reset other nav items
              const navLinks = e.currentTarget.parentElement?.querySelectorAll('a');
              navLinks?.forEach(link => {
                if (link !== e.currentTarget) {
                  link.style.color = '#374151';
                  link.style.borderBottom = 'none';
                  link.style.fontWeight = '500';
                }
              });
              e.currentTarget.style.fontWeight = '600';
            }}>
              Khóa học
            </a>
            <a href="#teachers" className="fade-in-up stagger-4" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
            onClick={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderBottom = '2px solid #dc2626';
              // Reset other nav items
              const navLinks = e.currentTarget.parentElement?.querySelectorAll('a');
              navLinks?.forEach(link => {
                if (link !== e.currentTarget) {
                  link.style.color = '#374151';
                  link.style.borderBottom = 'none';
                  link.style.fontWeight = '500';
                }
              });
              e.currentTarget.style.fontWeight = '600';
            }}>
              Giảng viên
            </a>
            <a href="#schedule" className="fade-in-up stagger-5" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
            onClick={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderBottom = '2px solid #dc2626';
              // Reset other nav items
              const navLinks = e.currentTarget.parentElement?.querySelectorAll('a');
              navLinks?.forEach(link => {
                if (link !== e.currentTarget) {
                  link.style.color = '#374151';
                  link.style.borderBottom = 'none';
                  link.style.fontWeight = '500';
                }
              });
              e.currentTarget.style.fontWeight = '600';
            }}>
              Lịch khai giảng
            </a>
            <a href="#news" className="fade-in-up stagger-6" style={{
              color: '#374151',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              padding: '8px 0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
            onClick={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderBottom = '2px solid #dc2626';
              // Reset other nav items
              const navLinks = e.currentTarget.parentElement?.querySelectorAll('a');
              navLinks?.forEach(link => {
                if (link !== e.currentTarget) {
                  link.style.color = '#374151';
                  link.style.borderBottom = 'none';
                  link.style.fontWeight = '500';
                }
              });
              e.currentTarget.style.fontWeight = '600';
            }}>
              Thông báo
            </a>
          </nav>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="hover-scale" style={{
              background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}>
              Đăng ký học
            </button>
            <button className="hover-scale" style={{
              border: '2px solid #dc2626',
              color: '#dc2626',
              padding: '8px 18px',
              borderRadius: '25px',
              background: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Tư vấn
            </button>
          </div>
        </div>
      </header>

      {/* Announcement Banner */}
      <div className="fade-in-up" style={{
        background: 'linear-gradient(90deg, #fecaca, #fde68a)',
        padding: '12px 0',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
        color: '#92400e'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '18px' }}><Icons.Celebration /></span>
          <span>
            <strong>KHUYẾN MÃI ĐẶC BIỆT:</strong> Giảm 30% học phí cho 50 học sinh đầu tiên đăng ký khóa học mới!
          </span>
          <button className="hover-scale" style={{
            background: '#dc2626',
            color: 'white',
            padding: '6px 16px',
            borderRadius: '15px',
            border: 'none',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Đăng ký ngay
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" style={{
        padding: '60px 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <h1 className="fade-in-up" style={{
              fontSize: '52px',
              fontWeight: '800',
              color: '#111827',
              lineHeight: '1.1',
              marginBottom: '25px'
            }}>
              Phát triển{' '}
              <span style={{
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Tư duy Logic
              </span>
              {' '}& Sáng tạo
            </h1>
            
            <p className="fade-in-up stagger-2" style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '35px',
              lineHeight: '1.7'
            }}>
              Phương pháp giáo dục tiên tiến, giúp học sinh phát triển tư duy logic, 
              sáng tạo và kỹ năng giải quyết vấn đề một cách hiệu quả với công nghệ hiện đại.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '35px'
            }}>
              <OptimizedCard hoverEffect="lift" className="fade-in-left stagger-1" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(220, 38, 38, 0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>
                    Phương pháp cá nhân hóa
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Học theo tốc độ riêng
                  </div>
                </div>
              </OptimizedCard>
              
              <OptimizedCard hoverEffect="lift" className="fade-in-right stagger-2" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(220, 38, 38, 0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5c0-1.66 4-3 9-3s9 1.34 9 3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>
                    Công nghệ AI hỗ trợ
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Học thông minh hiệu quả
                  </div>
                </div>
              </OptimizedCard>
              
              <OptimizedCard hoverEffect="lift" className="fade-in-left stagger-3" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(220, 38, 38, 0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>
                    Lớp học nhỏ
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Tối đa 12 học sinh/lớp
                  </div>
                </div>
              </OptimizedCard>
              
              <OptimizedCard hoverEffect="lift" className="fade-in-right stagger-4" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(220, 38, 38, 0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>
                    Cam kết kết quả
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Hoàn tiền nếu không đạt
                  </div>
                </div>
              </OptimizedCard>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="hover-scale fade-in-up" style={{
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '30px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)'
              }}>
                Bắt đầu học ngay
              </button>
              <button className="hover-scale fade-in-up stagger-1" style={{
                border: '2px solid #dc2626',
                color: '#dc2626',
                padding: '13px 28px',
                borderRadius: '30px',
                background: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Tư vấn miễn phí
              </button>
            </div>
          </div>
          
          {/* Hero Right Side - Stats & Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            {/* Statistics */}
            <div style={{
              gridColumn: '1 / -1',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <Icons.Trophy /> Thành tích nổi bật
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#dc2626',
                    marginBottom: '5px'
                  }}>
                    5,000+
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Học sinh tốt nghiệp
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#f43f5e',
                    marginBottom: '5px'
                  }}>
                    98%
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Tỷ lệ đỗ đại học
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#f97316',
                    marginBottom: '5px'
                  }}>
                    150+
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Giải thưởng học thuật
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#10b981',
                    marginBottom: '5px'
                  }}>
                    15+
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Năm kinh nghiệm
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature Cards */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              transform: 'rotate(2deg)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#fecaca',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px'
              }}>
                <Icons.Book />
              </div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Học Online & Offline
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                Linh hoạt thời gian và địa điểm học tập
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              transform: 'rotate(-2deg)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#fde68a',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px'
              }}>
                <Icons.Graduation />
              </div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Phát triển IQ & EQ
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                Kích thích tiềm năng học tập toàn diện
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '80px 1rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '20px'
            }}>
              Về DMT Education
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Được thành lập từ năm 2009, DMT Education là học viện đào tạo tư duy và sáng tạo 
              hàng đầu Việt Nam với phương pháp giáo dục tiên tiến.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px'
          }}>
            <div 
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="800"
              style={{
                background: 'linear-gradient(135deg, #fef2f2, #fce7f3)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '1px solid rgba(220, 38, 38, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '10px'
              }}>
                Tầm nhìn
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Trở thành học viện giáo dục hàng đầu khu vực Đông Nam Á về đào tạo tư duy
              </p>
            </div>

            <div 
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="800"
              style={{
                background: 'linear-gradient(135deg, #fef2f2, #fce7f3)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '1px solid rgba(244, 63, 94, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(244, 63, 94, 0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5c0-1.66 4-3 9-3s9 1.34 9 3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '10px'
              }}>
                Sứ mệnh
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Phát triển tiềm năng học sinh thông qua phương pháp giáo dục sáng tạo
              </p>
            </div>

            <div 
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="800"
              style={{
                background: 'linear-gradient(135deg, #fef2f2, #fce7f3)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '1px solid rgba(249, 115, 22, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '10px'
              }}>
                Giá trị
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Tận tâm, sáng tạo, chính trực và cam kết chất lượng giáo dục
              </p>
            </div>

            <div 
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="800"
              style={{
                background: 'linear-gradient(135deg, #fef2f2, #fce7f3)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.98 18.78 15.05 20 17 20v-5.34"/>
                  <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C11.02 18.78 8.95 20 7 20v-5.34"/>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '10px'
              }}>
                Thành tựu
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                15 năm hoạt động với hơn 5000 học sinh tốt nghiệp xuất sắc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" style={{
        padding: '80px 1rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '20px'
            }}>
              Khóa học nổi bật
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Các chương trình đào tạo chất lượng cao được thiết kế đặc biệt cho từng độ tuổi và trình độ
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {/* IELTS Junior */}
            <div 
              data-aos="fade-up"
              data-aos-delay="100"
              style={{
                background: 'linear-gradient(135deg, #fff0f2 0%, #fef0f2 100%)',
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(236, 72, 153, 0.2)',
                boxShadow: '0 10px 30px rgba(236, 72, 153, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#ec4899',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Mới +
              </div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="white"/>
                  <circle cx="6" cy="6" r="2" fill="white" opacity="0.7"/>
                  <circle cx="18" cy="18" r="2" fill="white" opacity="0.7"/>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                IELTS Junior
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Khóa học tiếng Anh cơ bản dành cho trẻ em từ 8-12 tuổi, xây dựng nền tảng vững chắc
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#ec4899',
                  fontWeight: '600'
                }}>
                  8-12 tuổi
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#ec4899'
                }}>
                  2.5M VNĐ
                </span>
              </div>
            </div>

            {/* IELTS Cấp tốc */}
            <div 
              data-aos="fade-up"
              data-aos-delay="200"
              style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #f0fdf5 100%)',
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.1)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12L12 3L21 12M5 10V20H19V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M9 20V14H15V20" stroke="white" strokeWidth="2" fill="white"/>
                  <circle cx="18" cy="6" r="3" fill="white" opacity="0.8"/>
                  <path d="M16.5 6L17.5 7L19.5 5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                IELTS Cấp tốc
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Khóa học tập trung, giúp bạn đạt band điểm mong muốn trong thời gian ngắn nhất
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#22c55e',
                  fontWeight: '600'
                }}>
                  3 tháng
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#22c55e'
                }}>
                  4.8M VNĐ
                </span>
              </div>
            </div>

            {/* IELTS Cơ bản */}
            <div 
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(245, 158, 11, 0.3)',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.1)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
                  <path d="M8 7H16M8 12H16M8 17H13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="18" cy="6" r="2" fill="white"/>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                IELTS Cơ bản
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Khóa học dành cho người mới bắt đầu, từ A1 đến B2, xây dựng nền tảng vững chắc
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#f59e0b',
                  fontWeight: '600'
                }}>
                  6 tháng
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f59e0b'
                }}>
                  3.5M VNĐ
                </span>
              </div>
            </div>

            {/* IELTS Nâng cao */}
            <div 
              data-aos="fade-up"
              data-aos-delay="400"
              style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10M22 10L18 14L16 12L12 16L8 12L4 16M22 10V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="18" cy="8" r="1.5" fill="white"/>
                  <circle cx="6" cy="8" r="1.5" fill="white"/>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                IELTS Nâng cao
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Khóa học chuyên sâu cho học viên có nền tảng, hướng đến band 7.0+
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#3b82f6',
                  fontWeight: '600'
                }}>
                  4 tháng
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#3b82f6'
                }}>
                  5.2M VNĐ
                </span>
              </div>
            </div>

            {/* SAT / GMAT / GRE */}
            <div 
              data-aos="fade-up"
              data-aos-delay="500"
              style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(168, 85, 247, 0.2)',
                boxShadow: '0 10px 30px rgba(168, 85, 247, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.1)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #a855f7, #c084fc)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M15 14L17 16L21 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="5" cy="6" r="1" fill="white"/>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                SAT / GMAT / GRE
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Các khóa luyện thi chuẩn hóa quốc tế cho du học Mỹ và châu Âu
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#a855f7',
                  fontWeight: '600'
                }}>
                  5 tháng
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#a855f7'
                }}>
                  6.5M VNĐ
                </span>
              </div>
            </div>

            {/* TOEIC / Phát âm */}
            <div 
              data-aos="fade-up"
              data-aos-delay="600"
              style={{
                background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                borderRadius: '24px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(20, 184, 166, 0.2)',
                boxShadow: '0 10px 30px rgba(20, 184, 166, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(20, 184, 166, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(20, 184, 166, 0.1)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #14b8a6, #5eead4)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C7.03 1 3 5.03 3 10C3 15 12 23 12 23S21 15 21 10C21 5.03 16.97 1 12 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
                  <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="white"/>
                  <path d="M8 15C8 15 10 17 12 17S16 15 16 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                TOEIC / Phát âm
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Khóa học TOEIC và luyện phát âm chuẩn cho môi trường công việc
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#14b8a6',
                  fontWeight: '600'
                }}>
                  3 tháng
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#14b8a6'
                }}>
                  3.8M VNĐ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section with Horizontal Scrolling */}
      <section id="teachers" style={{
        padding: '80px 1rem',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }} data-aos="fade-up">
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '20px'
            }}>
              Đội ngũ giảng viên
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto 10px',
              lineHeight: '1.6'
            }}>
              DMT bao gồm 30 giáo viên
            </p>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Là những giáo viên giỏi kiến thức và giỏi truyền đạt. Rất tận tâm với học viên và luôn khát khao trở nên cố gắng trên con đường giảng dạy.
            </p>
          </div>
          
          {/* Teachers Horizontal Scroll Container */}
          <div 
            className="teachers-scroll-container"
            style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: '#dc2626 #f1f1f1',
              paddingBottom: '20px',
            }}
          >
            {/* Teacher Cards Container */}
            <div 
              className="teachers-cards-container"
              style={{
                display: 'flex',
                gap: '20px',
                minWidth: 'min-content',
                padding: '10px 5px'
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Teacher Card 1 */}
              <div 
                className="teacher-card"
                style={{
                  background: '#FFF0F0',
                  borderRadius: '16px',
                  padding: '15px',
                  width: '260px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '230px',
                  height: '260px',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=face&auto=format&q=80"
                    alt="Trần Anh Khoa"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>9.0 IELTS Overall</span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Trần Anh <span style={{ color: '#111827' }}>Khoa</span>
                  <span style={{ color: '#dc2626', fontSize: '20px' }}></span>
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Speaking & Writing Coach</p>
              </div>

              {/* Teacher Card 2 */}
              <div 
                className="teacher-card"
                style={{
                  background: '#F0F7FF',
                  borderRadius: '16px',
                  padding: '15px',
                  width: '260px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '230px',
                  height: '260px',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=300&fit=crop&crop=face&auto=format&q=80"
                    alt="Nguyễn Thị Mai"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>8.5 IELTS Overall</span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Nguyễn Thị <span style={{ color: '#111827' }}>Mai</span>
                  <span style={{ color: '#dc2626', fontSize: '20px' }}></span>
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Reading & Listening Expert</p>
              </div>

              {/* Teacher Card 3 */}
              <div 
                className="teacher-card"
                style={{
                  background: '#F0FFF4',
                  borderRadius: '16px',
                  padding: '15px',
                  width: '260px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '230px',
                  height: '260px',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=300&fit=crop&crop=face&auto=format&q=80"
                    alt="Phạm Minh Tuấn"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>8.0 IELTS Overall</span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Phạm Minh <span style={{ color: '#111827' }}>Tuấn</span>
                  <span style={{ color: '#dc2626', fontSize: '20px' }}></span>
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Grammar & Vocabulary Specialist</p>
              </div>

              {/* Teacher Card 4 */}
              <div 
                className="teacher-card"
                style={{
                  background: '#FFF5E6',
                  borderRadius: '16px',
                  padding: '15px',
                  width: '260px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '230px',
                  height: '260px',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=300&fit=crop&crop=face&auto=format&q=80"
                    alt="Lê Thanh Hà"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>8.5 IELTS Overall</span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Lê Thanh <span style={{ color: '#111827' }}>Hà</span>
                  <span style={{ color: '#dc2626', fontSize: '20px' }}></span>
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Academic Writing Coach</p>
              </div>

              {/* Teacher Card 5 */}
              <div 
                className="teacher-card"
                style={{
                  background: '#F9F0FF',
                  borderRadius: '16px',
                  padding: '15px',
                  width: '260px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '230px',
                  height: '260px',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=300&fit=crop&crop=face&auto=format&q=80"
                    alt="Trương Minh Hằng"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>8.0 IELTS Overall</span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Trương Minh <span style={{ color: '#111827' }}>Hằng</span>
                  <span style={{ color: '#dc2626', fontSize: '20px' }}></span>
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Pronunciation Expert</p>
              </div>
              
              {/* Teacher Card 6 */}
              <div 
                className="teacher-card"
                style={{
                  background: '#E6FBFF',
                  borderRadius: '16px',
                  padding: '15px',
                  width: '260px',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '230px',
                  height: '260px',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=300&fit=crop&crop=face&auto=format&q=80"
                    alt="Đỗ Văn Nam"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>9.0 IELTS Overall</span>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginTop: '15px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  Đỗ Văn <span style={{ color: '#111827' }}>Nam</span>
                  <span style={{ color: '#dc2626', fontSize: '20px' }}></span>
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Business English Specialist</p>
              </div>
            </div>
          </div>
          
          {/* Controls for scrolling */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            gap: '15px'
          }}>
            <button 
              id="scrollLeftBtn" 
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                const container = document.querySelector('.teachers-scroll-container') as HTMLElement;
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              id="scrollRightBtn" 
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                const container = document.querySelector('.teachers-scroll-container') as HTMLElement;
                if (container) {
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Achievements & Reviews Section */}
      <section id="achievements" style={{
        padding: '80px 1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorations */}
        <div className="float-animation" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(220, 38, 38, 0.1), rgba(244, 63, 94, 0.1))',
          borderRadius: '50%'
        }}></div>
        <div className="float-animation" style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
          borderRadius: '50%',
          animationDelay: '2s',
          animationDirection: 'reverse'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #111827, #374151)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px'
            }}>
              Thành tựu & Chứng chỉ
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              DMT Education tự hào với những thành tích xuất sắc của học sinh trong các kỳ thi quan trọng
            </p>
          </div>

          {/* Certificates */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '60px'
          }}>
            <div 
              data-aos="zoom-in"
              data-aos-delay="100"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(220, 38, 38, 0.2)',
                boxShadow: '0 15px 35px rgba(220, 38, 38, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(220, 38, 38, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #dc2626, #f43f5e)'
              }}></div>
              <div style={{
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#dc2626',
                marginBottom: '8px'
              }}>
                IELTS
              </h3>
              <p style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '5px'
              }}>
                8.0+
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Điểm trung bình
              </p>
            </div>

            <div 
              data-aos="zoom-in"
              data-aos-delay="200"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef7ed 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(249, 115, 22, 0.2)',
                boxShadow: '0 15px 35px rgba(249, 115, 22, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(249, 115, 22, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #f97316, #fb923c)'
              }}></div>
              <div style={{
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#f97316',
                marginBottom: '8px'
              }}>
                THPT QG
              </h3>
              <p style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '5px'
              }}>
                9.2+
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Điểm trung bình
              </p>
            </div>

            <div 
              data-aos="zoom-in"
              data-aos-delay="300"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 15px 35px rgba(59, 130, 246, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)'
              }}></div>
              <div style={{
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#3b82f6',
                marginBottom: '8px'
              }}>
                TS 10
              </h3>
              <p style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '5px'
              }}>
                95%
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Tỷ lệ đỗ
              </p>
            </div>

            <div 
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                border: '2px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 15px 35px rgba(34, 197, 94, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)'
              }}></div>
              <div style={{
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#22c55e',
                marginBottom: '8px'
              }}>
                VSAT
              </h3>
              <p style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '5px'
              }}>
                1400+
              </p>
              <p style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Điểm trung bình
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div 
            data-aos="fade-up"
            data-aos-delay="200"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px'
            }}
          >
            <div 
              data-aos="flip-left"
              data-aos-delay="300"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                borderRadius: '24px',
                padding: '30px',
                border: '2px solid rgba(220, 38, 38, 0.1)',
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) rotate(2deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '30px',
                height: '30px',
                background: 'linear-gradient(45deg, #dc2626, #f43f5e)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'white'
              }}>
                ❤️
              </div>
              <div style={{
                display: 'flex',
                marginBottom: '15px'
              }}>
                {'⭐⭐⭐⭐⭐'.split('').map((star, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '18px' }}>{star}</span>
                ))}
              </div>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Con tôi học tại DMT Education được 2 năm, điểm số cải thiện rõ rệt. 
                Phương pháp giảng dạy rất hay và thầy cô tận tâm."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '12px',
                  overflow: 'hidden',
                  border: '3px solid #dc2626',
                  boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format&q=80"
                    alt="Chị Lan Anh"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#111827',
                    fontSize: '16px'
                  }}>
                    Chị Lan Anh
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#dc2626',
                    fontWeight: '500'
                  }}>
                    Phụ huynh học sinh lớp 10
                  </div>
                </div>
              </div>
            </div>

            <div 
              data-aos="flip-left"
              data-aos-delay="400"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
                borderRadius: '24px',
                padding: '30px',
                border: '2px solid rgba(59, 130, 246, 0.1)',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) rotate(-2deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '30px',
                height: '30px',
                background: 'linear-gradient(45deg, #3b82f6, #60a5fa)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'white'
              }}>
                🎯
              </div>
              <div style={{
                display: 'flex',
                marginBottom: '15px'
              }}>
                {'⭐⭐⭐⭐⭐'.split('').map((star, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '18px' }}>{star}</span>
                ))}
              </div>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Sau 6 tháng học IELTS tại DMT, em đã đạt được band 7.5. 
                Cảm ơn thầy cô đã giúp em đạt được ước mơ du học."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '12px',
                  overflow: 'hidden',
                  border: '3px solid #3b82f6',
                  boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1539571696520-66b8d6aefabe?w=80&h=80&fit=crop&crop=face&auto=format&q=80"
                    alt="Minh Đức"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#111827',
                    fontSize: '16px'
                  }}>
                    Minh Đức
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#3b82f6',
                    fontWeight: '500'
                  }}>
                    Học sinh lớp 12
                  </div>
                </div>
              </div>
            </div>

            <div 
              data-aos="flip-left"
              data-aos-delay="500"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
                borderRadius: '24px',
                padding: '30px',
                border: '2px solid rgba(34, 197, 94, 0.1)',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) rotate(2deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '30px',
                height: '30px',
                background: 'linear-gradient(45deg, #22c55e, #4ade80)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'white'
              }}>
                🏆
              </div>
              <div style={{
                display: 'flex',
                marginBottom: '15px'
              }}>
                {'⭐⭐⭐⭐⭐'.split('').map((star, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '18px' }}>{star}</span>
                ))}
              </div>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "Trung tâm có môi trường học tập tuyệt vời. Con em từ chỗ sợ toán 
                giờ đã yêu thích và đạt điểm cao trong các kỳ thi."
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '12px',
                  overflow: 'hidden',
                  border: '3px solid #22c55e',
                  boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format&q=80"
                    alt="Bà Hương"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#111827',
                    fontSize: '16px'
                  }}>
                    Bà Hương
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#22c55e',
                    fontWeight: '500'
                  }}>
                    Phụ huynh học sinh lớp 9
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Blog Section */}
      <section id="news" style={{
        padding: '80px 1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '10%',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(245, 158, 11, 0.1))',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '90px',
          height: '90px',
          background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #111827, #374151)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px'
            }}>
              Tin tức & Sự kiện
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Cập nhật những tin tức mới nhất về giáo dục và các sự kiện tại DMT Education
            </p>
          </div>

          {/* News & Events */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            marginBottom: '60px'
          }}>
            <div 
              data-aos="fade-up"
              data-aos-delay="100"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.1)',
                border: '2px solid rgba(220, 38, 38, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(220, 38, 38, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.1)';
              }}
            >
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  HOT
                </div>
                🎉
              </div>
              <div style={{ padding: '25px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #fecaca, #fbbf24)',
                  color: '#dc2626',
                  fontSize: '11px',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '15px'
                }}>
                  SỰ KIỆN
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  Lễ Khai giảng khóa học mới 2024
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  Chào mừng hơn 500 học sinh mới gia nhập đại gia đình DMT Education trong năm học 2024.
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  📅 15/01/2024
                </div>
              </div>
            </div>

            <div 
              data-aos="fade-up"
              data-aos-delay="200"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef7ed 100%)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(249, 115, 22, 0.1)',
                border: '2px solid rgba(249, 115, 22, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(249, 115, 22, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(249, 115, 22, 0.1)';
              }}
            >
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  NEW
                </div>
                🏆
              </div>
              <div style={{ padding: '25px' }}>
                <div style={{
                  background: '#fce7f3',
                  color: '#f43f5e',
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '15px'
                }}>
                  THÀNH TÍCH
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  100% học sinh đỗ kỳ thi THPT QG
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  Toàn bộ học sinh lớp 12 của DMT Education đều đạt kết quả xuất sắc trong kỳ thi THPT Quốc gia.
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  fontWeight: '500'
                }}>
                20/07/2023
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #f97316, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
                color: 'white'
              }}>
                📚
              </div>
              <div style={{ padding: '25px' }}>
                <div style={{
                  background: '#fed7aa',
                  color: '#f97316',
                  fontSize: '11px',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '15px'
                }}>
                  CHƯƠNG TRÌNH
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  Ra mắt khóa học AI cho thiếu nhi
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  Chương trình giáo dục AI tiên tiến dành cho học sinh từ 8-15 tuổi, phát triển tư duy logic và sáng tạo.
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  fontWeight: '500'
                }}>
                  <Icons.Calendar /> 01/03/2024
                </div>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div style={{
            background: 'linear-gradient(135deg, #fff1f2, #fef3c7)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            border: '1px solid rgba(220, 38, 38, 0.1)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '20px'
            }}>
              Thông báo quan trọng
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              textAlign: 'left'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <h4 style={{
                  fontWeight: '600',
                  color: '#dc2626',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <Icons.Celebration /> Thông báo nghỉ lễ Tết Nguyên Đán 2024
                </h4>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}>
                  Trung tâm nghỉ từ ngày 08/02 - 17/02/2024. Các lớp học sẽ được bù vào tuần sau kỳ nghỉ.
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <h4 style={{
                  fontWeight: '600',
                  color: '#f43f5e',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <Icons.News /> Thông báo thi cuối kỳ học kỳ I
                </h4>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}>
                  Lịch thi cuối kỳ I từ 25/12 - 30/12/2023. Học sinh vui lòng xem chi tiết lịch thi tại website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule & Sponsors Section */}
      <section id="schedule" style={{
        padding: '80px 1rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Class Schedule */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '20px'
              }}>
                Lịch khai giảng
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Thời khóa biểu các khóa học tại các cơ sở DMT Education
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px'
            }}>
              {/* Cơ sở Gò Vấp */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#dc2626',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    fontSize: '20px',
                    color: 'white'
                  }}>
                    <Icons.Bank />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: '4px'
                    }}>
                      Cơ sở Gò Vấp
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280'
                    }}>
                      Cơ sở chính - Chung cư K26, Dương Quảng Hàm, Q. Gò Vấp
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#dc2626',
                    marginBottom: '10px'
                  }}>
                    Khóa học sắp khai giảng:
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      background: '#fef2f2',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Toán tư duy lớp 6-7:</strong> Khai giảng 15/09/2025
                    </div>
                    <div style={{
                      background: '#fef2f2',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>IELTS Foundation:</strong> Khai giảng 22/09/2025
                    </div>
                    <div style={{
                      background: '#fef2f2',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Lập trình AI cho trẻ em:</strong> Khai giảng 29/09/2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Cơ sở Quận 12 */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#f43f5e',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    fontSize: '20px',
                    color: 'white'
                  }}>
                    <Icons.Location />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: '4px'
                    }}>
                      Cơ sở Quận 12
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280'
                    }}>
                      Chi nhánh - 71/31 Song Hành, P. Tân Hưng Thuận, Q. 12
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#f43f5e',
                    marginBottom: '10px'
                  }}>
                    Khóa học sắp khai giảng:
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      background: '#fce7f3',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Tiếng Anh giao tiếp:</strong> Khai giảng 18/09/2025
                    </div>
                    <div style={{
                      background: '#fce7f3',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Toán nâng cao lớp 8-9:</strong> Khai giảng 25/09/2025
                    </div>
                    <div style={{
                      background: '#fce7f3',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Luyện thi THPT QG:</strong> Khai giảng 02/10/2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Cơ sở Quận 3 */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    fontSize: '20px',
                    color: 'white'
                  }}>
                    <Icons.Location />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: '4px'
                    }}>
                      Cơ sở Quận 3
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280'
                    }}>
                      Chi nhánh - 384/26 Nam Kỳ Khởi Nghĩa, P. 8, Q. 3
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#3b82f6',
                    marginBottom: '10px'
                  }}>
                    Khóa học sắp khai giảng:
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      background: '#eff6ff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Tiếng Anh IELTS:</strong> Khai giảng 20/09/2025
                    </div>
                    <div style={{
                      background: '#eff6ff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Luyện thi đại học:</strong> Khai giảng 27/09/2025
                    </div>
                    <div style={{
                      background: '#eff6ff',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px'
                    }}>
                      <strong>Toán Olympic:</strong> Khai giảng 04/10/2025
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promotions */}
          <div style={{ marginBottom: '80px' }} data-aos="fade-up" data-aos-delay="300">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #111827, #374151)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '20px'
              }}>
                Ưu đãi đặc biệt
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#64748b',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Những chương trình khuyến mãi hấp dẫn dành cho học sinh mới
              </p>
            </div>

            <div 
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                borderRadius: '32px',
                padding: '50px 40px',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(102, 126, 234, 0.3)'
              }}
            >
              {/* Floating decorations */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '8%',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite reverse'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '15%',
                width: '50px',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                animation: 'float 7s ease-in-out infinite'
              }}></div>

              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                <Icons.Celebration />
              </div>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '15px',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}>
                GIẢM 30% HỌC PHÍ
              </h3>
              <p style={{
                fontSize: '18px',
                marginBottom: '25px',
                opacity: 0.9,
                lineHeight: '1.6'
              }}>
                Chương trình ưu đãi đặc biệt cho 100 học sinh đầu tiên đăng ký khóa học trong tháng 9/2025
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px'
              }}>
                <div 
                  data-aos="fade-up"
                  data-aos-delay="500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '20px 15px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '5px'
                  }}>
                    <Icons.CheckCircle /> Miễn phí
                  </div>
                  <div style={{
                    fontSize: '12px',
                    opacity: 0.9
                  }}>
                    Tài liệu học tập
                  </div>
                </div>
                <div 
                  data-aos="fade-up"
                  data-aos-delay="600"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '20px 15px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '5px'
                  }}>
                    <Icons.CheckCircle /> Tặng
                  </div>
                  <div style={{
                    fontSize: '12px',
                    opacity: 0.9
                  }}>
                    2 buổi học thử
                  </div>
                </div>
                <div 
                  data-aos="fade-up"
                  data-aos-delay="700"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '20px 15px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '5px'
                  }}>
                    <Icons.CheckCircle /> Bảo hành
                  </div>
                  <div style={{
                    fontSize: '12px',
                    opacity: 0.9
                  }}>
                    Kết quả học tập
                  </div>
                </div>
              </div>

              <button 
                data-aos="bounce"
                data-aos-delay="800"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#667eea',
                  padding: '15px 40px',
                  borderRadius: '25px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3)';
                }}
              >
                <Icons.Rocket /> Đăng ký ngay để nhận ưu đãi
              </button>
              
              <p style={{
                fontSize: '13px',
                marginTop: '15px',
                opacity: 0.8
              }}>
                Chương trình có hiệu lực đến hết ngày 30/09/2025
              </p>
            </div>
          </div>

          {/* Sponsors */}
          <div data-aos="fade-up" data-aos-delay="400">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #111827, #374151)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '15px'
              }}>
                Đối tác và nhà tài trợ
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                DMT Education tự hào được đồng hành cùng các đối tác uy tín
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '30px'
            }}>
              <div 
                data-aos="zoom-in"
                data-aos-delay="500"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  boxShadow: '0 15px 35px rgba(30, 64, 175, 0.1)',
                  border: '2px solid rgba(30, 64, 175, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(30, 64, 175, 0.1)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '24px',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(30, 64, 175, 0.3)'
                }}>
                  <Icons.Bank />
                </div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  Ngân hàng Vietcombank
                </h4>
              </div>

              <div 
                data-aos="zoom-in"
                data-aos-delay="600"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  boxShadow: '0 15px 35px rgba(5, 150, 105, 0.1)',
                  border: '2px solid rgba(5, 150, 105, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(5, 150, 105, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(5, 150, 105, 0.1)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '24px',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
                }}>
                  <Icons.Bank />
                </div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  Đại học Quốc gia TP.HCM
                </h4>
              </div>

              <div 
                data-aos="zoom-in"
                data-aos-delay="700"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #faf5ff 100%)',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  boxShadow: '0 15px 35px rgba(124, 58, 237, 0.1)',
                  border: '2px solid rgba(124, 58, 237, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(124, 58, 237, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.1)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '24px',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
                }}>
                  <Icons.Teacher />
                </div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  Microsoft Education
                </h4>
              </div>

              <div 
                data-aos="zoom-in"
                data-aos-delay="800"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  boxShadow: '0 15px 35px rgba(220, 38, 38, 0.1)',
                  border: '2px solid rgba(220, 38, 38, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(220, 38, 38, 0.1)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '24px',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
                }}>
                  <Icons.Graduation />
                </div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  British Council
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '60px 1rem 40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Logo và thông tin chung */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img 
                  src="/logo-dmt.png" 
                  alt="DMT Education Logo" 
                  className="hover-scale"
                  style={{
                    height: '50px',
                    width: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 2)',
                    borderRadius: '8px',
                    padding: '8px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <div style={{ marginLeft: '12px' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    lineHeight: '1.2'
                  }}>
                    DMT Education
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontWeight: '500'
                  }}>
                    Vững nguồn tri thức, tiếp bước tương lai
                  </div>
                </div>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.ContactPhone />
                  <span>077 230 5566</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.ContactEmail />
                  <span>example@dmteducation.vn</span>
                </div>
              </p>
              
              {/* Mạng xã hội */}
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#ffffff'
                }}>
                  Theo dõi chúng tôi
                </h4>
                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <a 
                    href="https://facebook.com/dmteducation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(24, 119, 242, 0.1)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1877f2';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(24, 119, 242, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icons.Facebook />
                  </a>
                  <a 
                    href="https://youtube.com/@dmteducation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff0000';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icons.YouTube />
                  </a>
                  <a 
                    href="https://tiktok.com/@dmteducation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(255, 0, 80, 0.1)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff0050';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 0, 80, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icons.TikTok />
                  </a>
                </div>
              </div>
            </div>

            {/* Cơ sở 1 */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icons.MapPin />
                Cơ sở Gò Vấp
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <div style={{ lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>Địa chỉ:</strong><br />
                  Chung cư K26, Dương Quảng Hàm, Phường 7, Quận Gò Vấp<br />
                  TP. Hồ Chí Minh
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '8px'
                }}>
                  <strong>Giờ làm việc:</strong><br />
                  T2-T6: 7:00 - 21:00<br />
                  T7-CN: 8:00 - 20:00
                </div>
              </div>
            </div>

            {/* Cơ sở 2*/}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icons.MapPin />
                Cơ sở Quận 12
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <div style={{ lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>Địa chỉ:</strong><br />
                  71/31 Song Hành, Phường Tân Hưng Thuận, Quận 12<br />
                  TP. Hồ Chí Minh
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '8px'
                }}>
                  <strong>Giờ làm việc:</strong><br />
                  T2-T6: 7:00 - 21:00<br />
                  T7-CN: 8:00 - 20:00
                </div>
              </div>
            </div>

            {/* Cơ sở 3 */}
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icons.MapPin />
                Cơ sở Quận 3
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <div style={{ lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>Địa chỉ:</strong><br />
                  384/26 Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3<br />
                  TP. Hồ Chí Minh
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '8px'
                }}>
                  <strong>Giờ làm việc:</strong><br />
                  T2-T6: 7:00 - 21:00<br />
                  T7-CN: 8:00 - 20:00
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '14px',
              margin: 0
            }}>
              © 2025 DMT Education. Bảo lưu mọi quyền.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              fontSize: '14px'
            }}>
              <a href="#" style={{
                color: '#9ca3af',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Chính sách bảo mật
              </a>
              <a href="#" style={{
                color: '#9ca3af',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Điều khoản sử dụng
              </a>
              <a href="#" style={{
                color: '#9ca3af',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
