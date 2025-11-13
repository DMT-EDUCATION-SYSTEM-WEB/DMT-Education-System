import React, { useState, useEffect } from 'react';
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
  Star,
  TrendingUp,
  Award
} from 'lucide-react';
import { classesApi, Class } from '../services/classes';

// Types
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  location?: string;
  teacher?: string;
  capacity?: number;
  enrolled?: number;
}

interface DayEvent {
  date: Date;
  events: CalendarEvent[];
}

const SchedulePage: React.FC = () => {
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch classes from API
  useEffect(() => {
    fetchClasses();
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
      // Use mock data on error
      setClasses(getMockClasses());
    } finally {
      setLoading(false);
    }
  };

  // Mock data
  const getMockClasses = (): Class[] => [
    {
      id: 1,
      course_id: 1,
      code: 'IELTS-GV-01',
      name: 'IELTS Intensive',
      teacher_id: 1,
      capacity: 15,
      current_students: 12,
      start_date: '2025-01-15',
      schedule_days: 'Thứ 2, 4, 6',
      schedule_time: '18:30-20:30',
      classroom: 'Gò Vấp',
      status: 'active',
      created_at: '2025-01-01'
    },
    {
      id: 2,
      course_id: 2,
      code: 'MATH-GV-01',
      name: 'Toán Tư duy',
      teacher_id: 2,
      capacity: 20,
      current_students: 18,
      start_date: '2025-01-15',
      schedule_days: 'Thứ 3, 5, 7',
      schedule_time: '17:00-19:00',
      classroom: 'Gò Vấp',
      status: 'active',
      created_at: '2025-01-01'
    },
    {
      id: 3,
      course_id: 3,
      code: 'CODE-TB-01',
      name: 'Lập trình Junior',
      teacher_id: 3,
      capacity: 12,
      current_students: 10,
      start_date: '2025-01-20',
      schedule_days: 'Thứ 3, 5',
      schedule_time: '19:00-21:00',
      classroom: 'Tân Bình',
      status: 'active',
      created_at: '2025-01-01'
    },
    {
      id: 4,
      course_id: 4,
      code: 'VIET-TB-01',
      name: 'Tiếng Việt nâng cao',
      teacher_id: 4,
      capacity: 18,
      current_students: 15,
      start_date: '2025-01-20',
      schedule_days: 'Thứ 2, 4, 6',
      schedule_time: '17:30-19:30',
      classroom: 'Tân Bình',
      status: 'active',
      created_at: '2025-01-01'
    },
    {
      id: 5,
      course_id: 5,
      code: 'SCI-TD-01',
      name: 'Khoa học tự nhiên',
      teacher_id: 5,
      capacity: 16,
      current_students: 14,
      start_date: '2025-01-25',
      schedule_days: 'Thứ 2, 4',
      schedule_time: '18:00-20:00',
      classroom: 'Thủ Đức',
      status: 'active',
      created_at: '2025-01-01'
    },
  ];

  // Campus data
  const campuses = [
    { id: 'all', name: 'Tất cả cơ sở', color: '#374151' },
    { id: 'govap', name: 'Gò Vấp', color: '#dc2626' },
    { id: 'tanbinh', name: 'Tân Bình', color: '#3b82f6' },
    { id: 'thuduc', name: 'Thủ Đức', color: '#10b981' },
  ];

  // Filter classes
  const filteredClasses = classes.filter(cls => {
    const matchesCampus = selectedCampus === 'all' || 
      cls.classroom?.toLowerCase().includes(selectedCampus.toLowerCase());
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCampus && matchesSearch;
  });

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

  const getCampusColor = (classroom?: string) => {
    if (classroom?.includes('Gò Vấp')) return '#dc2626';
    if (classroom?.includes('Tân Bình')) return '#3b82f6';
    if (classroom?.includes('Thủ Đức')) return '#10b981';
    return '#374151';
  };

  return (
    <>
      <SEOHead 
        title="DMT Education - Lịch khai giảng"
        description="Lịch khai giảng các khóa học tại DMT Education"
        keywords="DMT Education, lịch khai giảng, thời khóa biểu, lịch học"
      />
      
      <Layout>
        {/* Hero Section */}
        <div style={{
          background: '#ffffff',
          padding: '60px 1rem 40px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                background: '#f3f4f6',
                color: '#374151',
                padding: '8px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Calendar size={16} style={{ display: 'inline', marginRight: '8px', marginBottom: '-2px' }} />
                Lịch khai giảng 2025
              </div>
              
              <h1 style={{
                fontSize: '42px',
                fontWeight: '800',
                marginBottom: '16px',
                lineHeight: '1.2',
                color: '#111827'
              }}>
                Lịch học & Khai giảng
              </h1>
              
              <p style={{
                fontSize: '17px',
                color: '#6b7280',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: '1.6'
              }}>
                Xem lịch khai giảng và thời khóa biểu các khóa học tại tất cả cơ sở DMT Education
              </p>

              {/* Quick stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div style={{
                  background: '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '5px', color: '#111827' }}>
                    {filteredClasses.length}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Lớp học</div>
                </div>
                <div style={{
                  background: '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '5px', color: '#111827' }}>3</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Cơ sở</div>
                </div>
                <div style={{
                  background: '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '5px', color: '#111827' }}>15+</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Khóa học</div>
                </div>
                <div style={{
                  background: '#f9fafb',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '5px', color: '#111827' }}>98%</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Lấp đầy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 1rem', background: '#ffffff' }}>
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
              {campuses.map(campus => (
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
                        background: isToday ? '#3b82f6' : '#f9fafb',
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
                  background: '#3b82f6',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3b82f6';
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
      </Layout>
    </>
  );
};

export default SchedulePage;
