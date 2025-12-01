import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  Filter,
  Search,
  Grid3x3,
  List,
  X,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Heart,
  Zap,
  Trophy,
  Target
} from 'lucide-react';
import { classesApi, Class } from '../services/classes';
import { campusesApi, Campus } from '../services/campuses';

const SchedulePage: React.FC = () => {
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [campusData, setCampusData] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch classes and campuses from API
  useEffect(() => {
    fetchClasses();
    fetchCampuses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await classesApi.getAll({ 
        page: 1, 
        limit: 100,
        status: 'active'
      });
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      // Set empty array on error
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCampuses = async () => {
    try {
      const response = await campusesApi.getAll();
      if (response.success) {
        setCampusData(response.data);
      }
    } catch (error) {
      console.error('Error fetching campuses:', error);
    }
  };

  // Campus list for filter - dynamic from API or fallback
  const campuses = [
    { id: 'all', name: 'Tất cả cơ sở', color: '#374151' },
    ...campusData.map(campus => ({
      id: campus.code,
      name: campus.name,
      color: campus.color
    }))
  ];

  // Fallback campuses if API fails
  const defaultCampuses = [
    { id: 'all', name: 'Tất cả cơ sở', color: '#374151' },
    { id: 'govap', name: 'Gò Vấp', color: '#dc2626' },
    { id: 'quan12', name: 'Quận 12', color: '#3b82f6' },
    { id: 'quan3', name: 'Quận 3', color: '#7c3aed' },
  ];

  const displayCampuses = campuses.length > 1 ? campuses : defaultCampuses;

  // Filter classes by campus and search
  const filteredClasses = classes.filter(cls => {
    // Match by campus code in classroom field
    const matchesCampus = selectedCampus === 'all' || 
      cls.classroom?.toLowerCase().includes(selectedCampus.toLowerCase()) ||
      // Also check if classroom matches campus name
      (campusData.find(c => c.code === selectedCampus)?.name && 
       cls.classroom?.toLowerCase().includes(campusData.find(c => c.code === selectedCampus)!.name.toLowerCase()));
    const matchesSearch = cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCampus && matchesSearch;
  });

  // Get campus color from data or default
  const getCampusColor = (classroom?: string) => {
    if (!classroom) return '#374151';
    
    // Try to find campus from API data
    for (const campus of campusData) {
      if (classroom.toLowerCase().includes(campus.name.toLowerCase()) ||
          classroom.toLowerCase().includes(campus.code.toLowerCase())) {
        return campus.color;
      }
    }
    
    // Fallback colors
    if (classroom.includes('Gò Vấp')) return '#dc2626';
    if (classroom.includes('Quận 12')) return '#3b82f6';
    if (classroom.includes('Quận 3')) return '#7c3aed';
    return '#374151';
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  return (
    <>
      <SEOHead 
        title="DMT Education - Lịch khai giảng"
        description="Lịch khai giảng các khóa học tại DMT Education"
        keywords="DMT Education, lịch khai giảng, thời khóa biểu, lịch học"
      />
      
      <Layout>
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          padding: '48px 20px',
          background: 'linear-gradient(135deg, #dc2626 0%, #f43f5e 50%, #ec4899 100%)',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '384px',
              height: '384px',
              background: 'white',
              borderRadius: '50%',
              filter: 'blur(96px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '384px',
              height: '384px',
              background: 'white',
              borderRadius: '50%',
              filter: 'blur(96px)'
            }} />
          </div>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                borderRadius: '9999px',
                marginBottom: '16px'
              }}>
                <Calendar size={16} style={{ marginRight: '6px' }} />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{filteredClasses.length}+ lớp học</span>
              </div>
              
              <h1 style={{
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                Lịch học & Khai giảng
              </h1>
              <p style={{
                fontSize: '16px',
                opacity: 0.9,
                maxWidth: '640px',
                margin: '0 auto 24px',
                lineHeight: '1.6'
              }}>
                Xem lịch khai giảng và thời khóa biểu các khóa học tại tất cả cơ sở
              </p>

              {/* Search bar */}
              <div style={{
                maxWidth: '768px',
                margin: '0 auto'
              }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm lớp học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 48px 12px 48px',
                      background: 'white',
                      borderRadius: '12px',
                      color: '#111827',
                      outline: 'none',
                      border: 'none',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  />
                  <Search 
                    size={20} 
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                        padding: '4px'
                      }}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 1rem' }}>
          {/* Filters & Controls */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '30px',
            border: '1px solid #e5e7eb'
          }}>
            {/* Top row: Search + View toggle */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '25px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {/* Search */}
              <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  placeholder="Tìm kiếm lớp học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 45px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9ca3af',
                      padding: '5px'
                    }}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div style={{
                display: 'flex',
                gap: '10px',
                background: '#f9fafb',
                padding: '6px',
                borderRadius: '12px'
              }}>
                <button
                  onClick={() => setView('month')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: view === 'month' ? 'white' : 'transparent',
                    color: view === 'month' ? '#111827' : '#6b7280',
                    fontWeight: view === 'month' ? '600' : '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: view === 'month' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Grid3x3 size={16} /> Tháng
                </button>
                <button
                  onClick={() => setView('list')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: view === 'list' ? 'white' : 'transparent',
                    color: view === 'list' ? '#111827' : '#6b7280',
                    fontWeight: view === 'list' ? '600' : '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: view === 'list' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <List size={16} /> Danh sách
                </button>
              </div>
            </div>

            {/* Campus filters */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {displayCampuses.map(campus => (
                <button
                  key={campus.id}
                  onClick={() => setSelectedCampus(campus.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: selectedCampus === campus.id ? `2px solid ${campus.color}` : '2px solid #e5e7eb',
                    background: selectedCampus === campus.id ? `${campus.color}15` : 'white',
                    color: selectedCampus === campus.id ? campus.color : '#6b7280',
                    fontWeight: selectedCampus === campus.id ? '600' : '500',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: campus.color
                  }}></div>
                  {campus.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar/List View */}
          {view === 'month' ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              {/* Calendar Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '2px solid #f0f0f0'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: 0
                }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentDate(newDate);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <ChevronLeft size={20} color="#374151" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#374151',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Hôm nay
                  </button>
                  
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentDate(newDate);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <ChevronRight size={20} color="#374151" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '10px'
              }}>
                {/* Day headers */}
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                  <div key={day} style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#6b7280',
                    padding: '15px 0',
                    background: '#f9fafb',
                    borderRadius: '10px'
                  }}>
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ minHeight: '100px' }}></div>
                ))}
                
                {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                  const day = i + 1;
                  const isToday = new Date().getDate() === day && 
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear();
                  
                  return (
                    <div
                      key={day}
                      style={{
                        minHeight: '100px',
                        padding: '10px',
                        borderRadius: '8px',
                        background: isToday ? '#01AAD3' : '#f9fafb',
                        border: isToday ? 'none' : '1px solid #e5e7eb',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (!isToday) {
                          e.currentTarget.style.background = '#f3f4f6';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isToday) {
                          e.currentTarget.style.background = '#f9fafb';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <div style={{
                        fontWeight: '700',
                        fontSize: '16px',
                        color: isToday ? 'white' : '#111827',
                        marginBottom: '8px'
                      }}>
                        {day}
                      </div>
                      
                      {/* Sample events for demo */}
                      {(day === 15 || day === 20 || day === 25) && (
                        <div style={{
                          background: isToday ? 'rgba(255,255,255,0.2)' : 'white',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: isToday ? 'white' : '#374151',
                          marginBottom: '4px',
                          borderLeft: `3px solid ${getCampusColor(filteredClasses[0]?.classroom)}`,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          Khai giảng
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // List View
            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              {loading ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#6b7280'
                }}>
                  Đang tải...
                </div>
              ) : filteredClasses.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#6b7280'
                }}>
                  Không tìm thấy lớp học nào
                </div>
              ) : (
                filteredClasses.map((cls) => (
                  <div
                    key={cls.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '24px',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.10)';
                      e.currentTarget.style.borderColor = getCampusColor(cls.classroom);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                      {/* Left: Icon & Status */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${getCampusColor(cls.classroom)}, ${getCampusColor(cls.classroom)}dd)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: '800',
                        flexShrink: 0,
                        boxShadow: `0 8px 25px ${getCampusColor(cls.classroom)}40`
                      }}>
                        <BookOpen size={36} />
                      </div>

                      {/* Middle: Info */}
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          background: `${getCampusColor(cls.classroom)}15`,
                          color: getCampusColor(cls.classroom),
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '12px'
                        }}>
                          {cls.code}
                        </div>
                        
                        <h3 style={{
                          fontSize: '22px',
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: '15px'
                        }}>
                          {cls.name}
                        </h3>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '15px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280' }}>
                            <MapPin size={18} color={getCampusColor(cls.classroom)} />
                            <span style={{ fontSize: '14px' }}>{cls.classroom}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280' }}>
                            <Clock size={18} color={getCampusColor(cls.classroom)} />
                            <span style={{ fontSize: '14px' }}>{cls.schedule_time}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280' }}>
                            <Calendar size={18} color={getCampusColor(cls.classroom)} />
                            <span style={{ fontSize: '14px' }}>{cls.schedule_days}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b7280' }}>
                            <Users size={18} color={getCampusColor(cls.classroom)} />
                            <span style={{ fontSize: '14px' }}>
                              {cls.current_students}/{cls.capacity} học viên
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Action & Stats */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'flex-end'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          whiteSpace: 'nowrap'
                        }}>
                          <TrendingUp size={14} />
                          Khai giảng {cls.start_date}
                        </div>

                        <button
                          style={{
                            padding: '12px 24px',
                            borderRadius: '10px',
                            border: 'none',
                            background: `linear-gradient(135deg, ${getCampusColor(cls.classroom)}, ${getCampusColor(cls.classroom)}dd)`,
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: `0 4px 15px ${getCampusColor(cls.classroom)}40`,
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = `0 6px 20px ${getCampusColor(cls.classroom)}60`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = `0 4px 15px ${getCampusColor(cls.classroom)}40`;
                          }}
                        >
                          Đăng ký ngay
                        </button>

                        {/* Progress bar */}
                        <div style={{ width: '150px' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '6px',
                            fontSize: '12px',
                            color: '#6b7280'
                          }}>
                            <span>Đã đăng ký</span>
                            <span style={{ fontWeight: '600' }}>
                              {Math.round((cls.current_students / cls.capacity) * 100)}%
                            </span>
                          </div>
                          <div style={{
                            height: '6px',
                            background: '#e5e7eb',
                            borderRadius: '10px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${(cls.current_students / cls.capacity) * 100}%`,
                              background: `linear-gradient(90deg, ${getCampusColor(cls.classroom)}, ${getCampusColor(cls.classroom)}dd)`,
                              transition: 'width 0.3s'
                            }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* CTA Section */}
          {/* CTA Section */}
          <div style={{
            marginTop: '40px',
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '48px 32px',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <Award size={40} style={{ marginBottom: '20px', color: '#3b82f6' }} />
            
            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '12px',
              color: '#111827'
            }}>
              Chưa tìm được lớp phù hợp?
            </h3>
            
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px',
              lineHeight: '1.6'
            }}>
              Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn tìm khóa học phù hợp nhất với nhu cầu và thời gian của bạn
            </p>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                style={{
                  padding: '14px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#01AAD3',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#018AB0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#01AAD3';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Gọi tư vấn miễn phí
              </button>
              
              <button
                style={{
                  padding: '14px 28px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  background: 'white',
                  color: '#374151',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.color = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Nhận tư vấn qua email
              </button>
            </div>
          </div>
        </div>
        </div>
      </Layout>
    </>
  );
};

export default SchedulePage;
