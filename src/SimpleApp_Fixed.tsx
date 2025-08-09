import React, { useEffect } from 'react';
import { FadeIn, SlideUp, SlideInLeft, SlideInRight, Pulse, Bounce, HoverScale, HoverElevate, ScaleIn } from './animations';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" 
        fill="url(#starGradient)" filter="url(#starGlow)" />
    </svg>
  ),
  Trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <filter id="trophyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="#FFD700" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
        </filter>
      </defs>
      <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9C7.9 2 7 2.9 7 4v2H4c-1.1 0-2 .9-2 2v3c0 3.39 2.61 6 6 6h.5c.5 1.5 1.55 2.73 2.93 3.36.56.24 1.17.36 1.8.36.63 0 1.24-.12 1.8-.36 1.38-.63 2.43-1.86 2.93-3.36H18c3.39 0 6-2.61 6-6V8c0-1.1-.9-2-2-2zm-13 2v-2h2v2h-2zm10 7c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" 
        fill="url(#trophyGradient)" filter="url(#trophyGlow)" />
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5252" />
          <stop offset="100%" stopColor="#FF1493" />
        </linearGradient>
      </defs>
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.95 0-4.05.4-5.5 1.5v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" 
        fill="url(#bookGradient)" />
    </svg>
  ),
  Graduation: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="gradGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" 
        fill="url(#gradGradient)" />
    </svg>
  ),
  Teacher: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="teacherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      <path d="M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c.35.61.54 1.3.54 2h10v11h-9v2h9zM15 7v2H9v3H7V7H5V5h2V2h2v3h6z" 
        fill="url(#teacherGradient)" />
      <circle cx="9" cy="17" r="5" fill="url(#teacherGradient)" />
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" 
        fill="url(#calendarGradient)" />
    </svg>
  ),
  Celebration: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="celebrationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
      <path d="M2,22l14-5l-9,-9l-5,14Zm7.35,-15.35l-2.82,-2.83l1.41,-1.41l2.83,2.82l-1.42,1.42Zm8.49,3.48l2.83,-2.82l1.41,1.41l-2.82,2.83l-1.42,-1.42Zm-5.66,-5.66l0,-4l2,0l0,4l-2,0Zm10.61,10.61l4,0l0,2l-4,0l0,-2Zm-18.83,2.83l-2.83,-2.83l1.41,-1.41l2.83,2.82l-1.41,1.42Z" 
        fill="url(#celebrationGradient)" />
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
        fill="url(#checkGradient)" />
    </svg>
  ),
  News: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="newsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4V6h4v12z" 
        fill="url(#newsGradient)" />
    </svg>
  ),
  Bank: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="bankGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" 
        fill="url(#bankGradient)" />
    </svg>
  ),
  Rocket: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      <path d="M13.13 22.19L11.5 18.36c-1.15.51-2.43.8-3.77.8-1.71 0-3.31-.47-4.68-1.29L5.13 22 2 21.29l1.14-3.69-.33.09c-.94.25-1.76.26-2.43.04l1.45-4.7C2.25 12.38 2 11.2 2 10c0-2.93 1.58-5.5 4-6.92L10.93 16l2.2-6.12L15.89 16l1.14-3.65L19.67 16l1.4-4.53c2.42 1.42 4 4 4 6.92 0 1.2-.25 2.38-.68 3.95l1.45 4.7c-.67.21-1.49.2-2.43-.04l-.33-.09 1.14 3.69-3.13.71 2.08-4.12C20.69 18.68 19.09 19.15 17.38 19.15c-1.34 0-2.62-.29-3.77-.8l-1.63 3.84 1.15 3.73-3.13-.71 3.13-3.01z" 
        fill="url(#rocketGradient)" />
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z" 
        fill="url(#phoneGradient)" />
    </svg>
  ),
  Email: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" 
        fill="url(#emailGradient)" />
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" 
        fill="url(#locationGradient)" />
    </svg>
  ),
  Gift: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z" 
        fill="url(#giftGradient)" />
    </svg>
  ),
  Announcement: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="announceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM11 5h2v6h-2zm0 8h2v2h-2z" 
        fill="url(#announceGradient)" />
    </svg>
  )
};

const SimpleApp_Fixed = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false
    });
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
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/favicon.ico"
              alt="DMT Education Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              DMT Education
            </h1>
          </div>
          
          <nav>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              gap: '1.5rem',
              margin: 0,
              padding: 0
            }}>
              <li>
                <a href="#home" style={{
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#about" style={{
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#teachers" style={{
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Giảng viên
                </a>
              </li>
              <li>
                <a href="#achievements" style={{
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Thành tựu
                </a>
              </li>
              <li>
                <a href="#contact" style={{
                  color: '#111827',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>
          
          <button style={{
            background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.5)'
          }}>
            Đăng ký ngay
          </button>
        </div>
      </header>
      
      {/* Main content sections would go here */}
      
      {/* Footer */}
      <footer style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '48px 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                DMT Education
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                Đồng hành cùng học sinh trên con đường phát triển tư duy và sáng tạo.
                Chúng tôi cam kết mang đến một môi trường học tập hiện đại và hiệu quả.
              </p>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <a href="#" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  F
                </a>
                <a href="#" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  Y
                </a>
                <a href="#" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  I
                </a>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                Liên kết nhanh
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
              }}>
                <li style={{
                  marginBottom: '10px'
                }}>
                  <a href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Về chúng tôi
                  </a>
                </li>
                <li style={{
                  marginBottom: '10px'
                }}>
                  <a href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Khóa học
                  </a>
                </li>
                <li style={{
                  marginBottom: '10px'
                }}>
                  <a href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Lịch học
                  </a>
                </li>
                <li style={{
                  marginBottom: '10px'
                }}>
                  <a href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                Thông tin liên hệ
              </h3>
              <p style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <span style={{
                  marginRight: '10px',
                  color: '#dc2626'
                }}>
                  <Icons.Location />
                </span>
                123 Đường ABC, Quận 1, TP. Hồ Chí Minh
              </p>
              <p style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <span style={{
                  marginRight: '10px',
                  color: '#dc2626'
                }}>
                  <Icons.Phone />
                </span>
                (028) 1234-5678
              </p>
              <p style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <span style={{
                  marginRight: '10px',
                  color: '#dc2626'
                }}>
                  <Icons.Email />
                </span>
                info@dmteducation.vn
              </p>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '32px',
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              © 2024 DMT Education. Bảo lưu mọi quyền.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleApp_Fixed;
