import React, { useState } from 'react';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Phone,
  Mail,
  Search,
  Grid3x3,
  List,
  X,
  Star,
  CheckCircle,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Heart,
  Zap,
  Trophy,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { 
  scheduleData, 
  campusInfo, 
  subjectCategories,
  getClassesByCampusAndSubject,
  getCampusById,
  getEnrollmentPercentage,
  getEnrollmentStatus,
  type ScheduleClass
} from '../data/scheduleData';

const EnhancedSchedulePage: React.FC = () => {
  // State
  const [view, setView] = useState<'grid' | 'list' | 'campus'>('campus');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  // Filter classes
  const filteredClasses = getClassesByCampusAndSubject(selectedCampus, selectedSubject).filter(cls => {
    const searchLower = searchQuery.toLowerCase();
    return (
      cls.name.toLowerCase().includes(searchLower) ||
      cls.code.toLowerCase().includes(searchLower) ||
      cls.subject.toLowerCase().includes(searchLower) ||
      cls.teacher.toLowerCase().includes(searchLower)
    );
  });

  // Group classes by campus for campus view
  const classesByCampus = campusInfo.map(campus => ({
    ...campus,
    classes: filteredClasses.filter(cls => cls.campus === campus.id)
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Stats
  const stats = [
    { 
      icon: BookOpen, 
      label: 'Tổng số lớp', 
      value: scheduleData.length, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: Building2, 
      label: '3 Cơ sở', 
      value: campusInfo.length, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    { 
      icon: Users, 
      label: 'Học viên', 
      value: '1000+', 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    { 
      icon: Trophy, 
      label: 'Giáo viên', 
      value: '50+', 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <>
      <SEOHead 
        title="DMT Education - Lịch khai giảng toàn hệ thống"
        description="Xem lịch khai giảng các khóa học tại 3 cơ sở DMT Education: Gò Vấp, Quận 12, Quận 3"
        keywords="DMT Education, lịch khai giảng, thời khóa biểu, lịch học, 3 cơ sở"
      />
      
      <Layout>
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
          {/* Hero Section with Gradient */}
          <section style={{
            position: 'relative',
            padding: '60px 20px 80px',
            background: 'linear-gradient(135deg, #dc2626 0%, #f43f5e 40%, #ec4899 70%, #a855f7 100%)',
            overflow: 'hidden'
          }}>
            {/* Animated background elements */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1
            }}>
              <div style={{
                position: 'absolute',
                top: '-100px',
                left: '-100px',
                width: '500px',
                height: '500px',
                background: 'white',
                borderRadius: '50%',
                filter: 'blur(120px)',
                animation: 'float 8s ease-in-out infinite'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-100px',
                right: '-100px',
                width: '500px',
                height: '500px',
                background: 'white',
                borderRadius: '50%',
                filter: 'blur(120px)',
                animation: 'float 10s ease-in-out infinite reverse'
              }} />
            </div>

            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 10
            }}>
              <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '9999px',
                  marginBottom: '20px',
                  gap: '8px'
                }}>
                  <Sparkles size={18} />
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>Hệ thống 3 cơ sở hiện đại</span>
                </div>
                
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  marginBottom: '20px',
                  lineHeight: '1.2',
                  textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  Lịch Khai Giảng Toàn Hệ Thống
                </h1>
                <p style={{
                  fontSize: '18px',
                  opacity: 0.95,
                  maxWidth: '700px',
                  margin: '0 auto 30px',
                  lineHeight: '1.7'
                }}>
                  Tìm khóa học phù hợp với bạn tại 3 cơ sở Gò Vấp, Quận 12 và Quận 3<br/>
                  Đa dạng môn học - Linh hoạt thời gian - Chất lượng cam kết
                </p>

                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '15px',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '16px',
                          padding: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          transition: 'all 0.3s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        }}
                      >
                        <IconComponent size={28} style={{ marginBottom: '8px' }} />
                        <div style={{ fontSize: '28px', fontWeight: '800', marginBottom: '4px' }}>
                          {stat.value}
                        </div>
                        <div style={{ fontSize: '13px', opacity: 0.9 }}>{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Filters & Controls */}
          <div style={{
            maxWidth: '1400px',
            margin: '-40px auto 40px',
            padding: '0 20px',
            position: 'relative',
            zIndex: 20
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e5e7eb'
            }}>
              {/* Search bar */}
              <div style={{ position: 'relative', marginBottom: '25px' }}>
                <Search size={22} style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  placeholder="Tìm kiếm lớp học theo tên, mã lớp, giáo viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 60px 16px 60px',
                    borderRadius: '14px',
                    border: '2px solid #e5e7eb',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9ca3af',
                      padding: '5px'
                    }}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* View mode & Filters */}
              <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {/* View toggle */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  background: '#f9fafb',
                  padding: '6px',
                  borderRadius: '12px'
                }}>
                  {[
                    { id: 'campus', label: 'Theo cơ sở', icon: Building2 },
                    { id: 'grid', label: 'Lưới', icon: Grid3x3 },
                    { id: 'list', label: 'Danh sách', icon: List }
                  ].map((viewOption) => {
                    const IconComponent = viewOption.icon;
                    return (
                      <button
                        key={viewOption.id}
                        onClick={() => setView(viewOption.id as any)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '10px',
                          border: 'none',
                          background: view === viewOption.id ? 'white' : 'transparent',
                          color: view === viewOption.id ? '#111827' : '#6b7280',
                          fontWeight: view === viewOption.id ? '600' : '500',
                          cursor: 'pointer',
                          fontSize: '14px',
                          boxShadow: view === viewOption.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <IconComponent size={16} />
                        {viewOption.label}
                      </button>
                    );
                  })}
                </div>

                {/* Campus filter */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedCampus('all')}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: selectedCampus === 'all' ? '2px solid #6b7280' : '2px solid #e5e7eb',
                      background: selectedCampus === 'all' ? '#f9fafb' : 'white',
                      color: selectedCampus === 'all' ? '#111827' : '#6b7280',
                      fontWeight: selectedCampus === 'all' ? '600' : '500',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                  >
                    Tất cả cơ sở
                  </button>
                  {campusInfo.map(campus => (
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

                {/* Subject filter */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {subjectCategories.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        border: selectedSubject === subject.id ? `2px solid ${subject.color}` : '2px solid #e5e7eb',
                        background: selectedSubject === subject.id ? `${subject.color}15` : 'white',
                        color: selectedSubject === subject.id ? subject.color : '#6b7280',
                        fontWeight: selectedSubject === subject.id ? '600' : '500',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {subject.icon} {subject.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results count */}
              <div style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #e5e7eb',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Tìm thấy <strong style={{ color: '#111827' }}>{filteredClasses.length}</strong> lớp học
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>
            {/* Campus View */}
            {view === 'campus' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                {classesByCampus.filter(c => c.classes.length > 0).map((campus, campusIndex) => (
                  <div key={campus.id}>
                    {/* Campus Header */}
                    <div style={{
                      background: `linear-gradient(135deg, ${campus.color}, ${campus.color}dd)`,
                      borderRadius: '20px',
                      padding: '40px',
                      color: 'white',
                      marginBottom: '30px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage: `url(${campus.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}></div>
                      
                      <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'start',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '20px'
                        }}>
                          <div style={{ flex: '1', minWidth: '300px' }}>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '8px 16px',
                              background: 'rgba(255, 255, 255, 0.2)',
                              backdropFilter: 'blur(10px)',
                              borderRadius: '9999px',
                              marginBottom: '15px',
                              gap: '8px'
                            }}>
                              <Building2 size={16} />
                              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                                {campus.classes.length} lớp học
                              </span>
                            </div>
                            
                            <h2 style={{
                              fontSize: '36px',
                              fontWeight: '800',
                              marginBottom: '15px'
                            }}>
                              {campus.fullName}
                            </h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.95 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={18} />
                                <span>{campus.address}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Phone size={18} />
                                <span>{campus.phone}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={18} />
                                <span>{campus.openingHours}</span>
                              </div>
                            </div>
                          </div>

                          <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            padding: '20px',
                            minWidth: '200px'
                          }}>
                            <div style={{
                              fontSize: '13px',
                              fontWeight: '600',
                              marginBottom: '12px',
                              opacity: 0.9
                            }}>
                              CƠ SỞ VẬT CHẤT
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {campus.facilities.map((facility, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <CheckCircle size={16} />
                                  <span style={{ fontSize: '14px' }}>{facility}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campus Classes Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                      gap: '25px'
                    }}>
                      {campus.classes.map((cls, index) => {
                        const enrollmentStatus = getEnrollmentStatus(cls.enrolled, cls.capacity);
                        const enrollmentPercentage = getEnrollmentPercentage(cls.enrolled, cls.capacity);
                        
                        return (
                          <div
                            key={cls.id}
                            style={{
                              background: '#ffffff',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              border: '2px solid #e5e7eb',
                              transition: 'all 0.3s',
                              cursor: 'pointer',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-6px)';
                              e.currentTarget.style.boxShadow = `0 20px 40px ${cls.color}30`;
                              e.currentTarget.style.borderColor = cls.color;
                              setHoveredClass(cls.id);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                              e.currentTarget.style.borderColor = '#e5e7eb';
                              setHoveredClass(null);
                            }}
                          >
                            {/* Class Header */}
                            <div style={{
                              background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                              padding: '20px',
                              color: 'white',
                              position: 'relative'
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'start',
                                marginBottom: '12px'
                              }}>
                                <div style={{
                                  background: 'rgba(255, 255, 255, 0.25)',
                                  backdropFilter: 'blur(10px)',
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: '700',
                                  letterSpacing: '0.5px'
                                }}>
                                  {cls.code}
                                </div>
                                <div style={{
                                  background: enrollmentStatus.color,
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  fontSize: '11px',
                                  fontWeight: '700'
                                }}>
                                  {enrollmentStatus.label}
                                </div>
                              </div>
                              
                              <h3 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginBottom: '8px',
                                lineHeight: '1.4'
                              }}>
                                {cls.name}
                              </h3>
                              
                              <div style={{
                                fontSize: '13px',
                                opacity: 0.95,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <BookOpen size={14} />
                                {cls.subject}
                              </div>
                            </div>

                            {/* Class Body */}
                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                              {/* Teacher */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '16px',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #f3f4f6'
                              }}>
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: '700',
                                  fontSize: '14px'
                                }}>
                                  <GraduationCap size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#111827'
                                  }}>
                                    {cls.teacher}
                                  </div>
                                  <div style={{
                                    fontSize: '12px',
                                    color: '#6b7280'
                                  }}>
                                    Giảng viên
                                  </div>
                                </div>
                              </div>

                              {/* Schedule Info */}
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginBottom: '16px',
                                flex: 1
                              }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  fontSize: '14px',
                                  color: '#374151'
                                }}>
                                  <MapPin size={16} style={{ color: cls.color }} />
                                  <span>{cls.room}</span>
                                </div>
                                
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  fontSize: '14px',
                                  color: '#374151'
                                }}>
                                  <Calendar size={16} style={{ color: cls.color }} />
                                  <span>{cls.schedule.days.join(', ')}</span>
                                </div>
                                
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  fontSize: '14px',
                                  color: '#374151'
                                }}>
                                  <Clock size={16} style={{ color: cls.color }} />
                                  <span>{cls.schedule.time}</span>
                                </div>

                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  fontSize: '14px',
                                  color: '#374151'
                                }}>
                                  <Target size={16} style={{ color: cls.color }} />
                                  <span>{cls.duration}</span>
                                </div>
                              </div>

                              {/* Enrollment Progress */}
                              <div style={{ marginBottom: '16px' }}>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  marginBottom: '8px',
                                  fontSize: '13px'
                                }}>
                                  <span style={{ color: '#6b7280' }}>Đã đăng ký</span>
                                  <span style={{ fontWeight: '700', color: '#111827' }}>
                                    {cls.enrolled}/{cls.capacity} ({enrollmentPercentage}%)
                                  </span>
                                </div>
                                <div style={{
                                  height: '8px',
                                  background: '#f3f4f6',
                                  borderRadius: '10px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    height: '100%',
                                    width: `${enrollmentPercentage}%`,
                                    background: `linear-gradient(90deg, ${cls.color}, ${cls.color}dd)`,
                                    transition: 'width 0.5s',
                                    borderRadius: '10px'
                                  }}></div>
                                </div>
                              </div>

                              {/* Price & CTA */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '16px',
                                borderTop: '1px solid #f3f4f6'
                              }}>
                                <div>
                                  <div style={{
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    marginBottom: '4px'
                                  }}>
                                    Học phí
                                  </div>
                                  <div style={{
                                    fontSize: '20px',
                                    fontWeight: '800',
                                    color: cls.color
                                  }}>
                                    {formatPrice(cls.price)}
                                  </div>
                                </div>
                                <button
                                  style={{
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: hoveredClass === cls.id ? `0 8px 20px ${cls.color}40` : 'none',
                                    transform: hoveredClass === cls.id ? 'scale(1.05)' : 'scale(1)'
                                  }}
                                >
                                  Đăng ký
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grid View */}
            {view === 'grid' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '25px'
              }}>
                {filteredClasses.map((cls) => {
                  const enrollmentStatus = getEnrollmentStatus(cls.enrolled, cls.capacity);
                  const enrollmentPercentage = getEnrollmentPercentage(cls.enrolled, cls.capacity);
                  
                  return (
                    <div
                      key={cls.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '2px solid #e5e7eb',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = `0 20px 40px ${cls.color}30`;
                        e.currentTarget.style.borderColor = cls.color;
                        setHoveredClass(cls.id);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        setHoveredClass(null);
                      }}
                    >
                      {/* Class Header */}
                      <div style={{
                        background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                        padding: '20px',
                        color: 'white',
                        position: 'relative'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '12px'
                        }}>
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(10px)',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '700',
                            letterSpacing: '0.5px'
                          }}>
                            {cls.code}
                          </div>
                          <div style={{
                            background: enrollmentStatus.color,
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}>
                            {enrollmentStatus.label}
                          </div>
                        </div>
                        
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '12px',
                          display: 'inline-block'
                        }}>
                          {cls.campusName}
                        </div>
                        
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {cls.name}
                        </h3>
                        
                        <div style={{
                          fontSize: '13px',
                          opacity: 0.95,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <BookOpen size={14} />
                          {cls.subject}
                        </div>
                      </div>

                      {/* Class Body - Same as Campus View */}
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '16px',
                          paddingBottom: '16px',
                          borderBottom: '1px solid #f3f4f6'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '14px'
                          }}>
                            <GraduationCap size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#111827'
                            }}>
                              {cls.teacher}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: '#6b7280'
                            }}>
                              Giảng viên
                            </div>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          marginBottom: '16px',
                          flex: 1
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            color: '#374151'
                          }}>
                            <MapPin size={16} style={{ color: cls.color }} />
                            <span>{cls.room}</span>
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            color: '#374151'
                          }}>
                            <Calendar size={16} style={{ color: cls.color }} />
                            <span>{cls.schedule.days.join(', ')}</span>
                          </div>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            color: '#374151'
                          }}>
                            <Clock size={16} style={{ color: cls.color }} />
                            <span>{cls.schedule.time}</span>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            color: '#374151'
                          }}>
                            <Target size={16} style={{ color: cls.color }} />
                            <span>{cls.duration}</span>
                          </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                            fontSize: '13px'
                          }}>
                            <span style={{ color: '#6b7280' }}>Đã đăng ký</span>
                            <span style={{ fontWeight: '700', color: '#111827' }}>
                              {cls.enrolled}/{cls.capacity} ({enrollmentPercentage}%)
                            </span>
                          </div>
                          <div style={{
                            height: '8px',
                            background: '#f3f4f6',
                            borderRadius: '10px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${enrollmentPercentage}%`,
                              background: `linear-gradient(90deg, ${cls.color}, ${cls.color}dd)`,
                              transition: 'width 0.5s',
                              borderRadius: '10px'
                            }}></div>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '16px',
                          borderTop: '1px solid #f3f4f6'
                        }}>
                          <div>
                            <div style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              marginBottom: '4px'
                            }}>
                              Học phí
                            </div>
                            <div style={{
                              fontSize: '20px',
                              fontWeight: '800',
                              color: cls.color
                            }}>
                              {formatPrice(cls.price)}
                            </div>
                          </div>
                          <button
                            style={{
                              padding: '12px 24px',
                              borderRadius: '10px',
                              border: 'none',
                              background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                              color: 'white',
                              fontWeight: '700',
                              fontSize: '14px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              boxShadow: hoveredClass === cls.id ? `0 8px 20px ${cls.color}40` : 'none',
                              transform: hoveredClass === cls.id ? 'scale(1.05)' : 'scale(1)'
                            }}
                          >
                            Đăng ký
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* List View */}
            {view === 'list' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredClasses.map((cls) => {
                  const enrollmentStatus = getEnrollmentStatus(cls.enrolled, cls.capacity);
                  const enrollmentPercentage = getEnrollmentPercentage(cls.enrolled, cls.capacity);
                  
                  return (
                    <div
                      key={cls.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '2px solid #e5e7eb',
                        transition: 'all 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = `0 15px 35px ${cls.color}25`;
                        e.currentTarget.style.borderColor = cls.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        gap: '30px',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}>
                        {/* Left: Icon & Basic Info */}
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '16px',
                          background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '32px',
                          fontWeight: '800',
                          flexShrink: 0,
                          boxShadow: `0 10px 30px ${cls.color}40`
                        }}>
                          <BookOpen size={40} />
                        </div>

                        {/* Middle: Info */}
                        <div style={{ flex: '1', minWidth: '300px' }}>
                          <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '12px',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              background: `${cls.color}15`,
                              color: cls.color,
                              fontSize: '12px',
                              fontWeight: '700'
                            }}>
                              {cls.code}
                            </span>
                            <span style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              background: `${cls.color}15`,
                              color: cls.color,
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {cls.campusName}
                            </span>
                            <span style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              background: enrollmentStatus.color,
                              color: 'white',
                              fontSize: '11px',
                              fontWeight: '700'
                            }}>
                              {enrollmentStatus.label}
                            </span>
                          </div>
                          
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#111827',
                            marginBottom: '12px'
                          }}>
                            {cls.name}
                          </h3>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#6b7280',
                              fontSize: '14px'
                            }}>
                              <GraduationCap size={16} style={{ color: cls.color }} />
                              <span>{cls.teacher}</span>
                            </div>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#6b7280',
                              fontSize: '14px'
                            }}>
                              <MapPin size={16} style={{ color: cls.color }} />
                              <span>{cls.room}</span>
                            </div>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#6b7280',
                              fontSize: '14px'
                            }}>
                              <Calendar size={16} style={{ color: cls.color }} />
                              <span>{cls.schedule.days.join(', ')}</span>
                            </div>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#6b7280',
                              fontSize: '14px'
                            }}>
                              <Clock size={16} style={{ color: cls.color }} />
                              <span>{cls.schedule.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Stats & Action */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '15px',
                          alignItems: 'flex-end',
                          minWidth: '200px'
                        }}>
                          <div style={{
                            textAlign: 'right'
                          }}>
                            <div style={{
                              fontSize: '13px',
                              color: '#6b7280',
                              marginBottom: '4px'
                            }}>
                              Học phí
                            </div>
                            <div style={{
                              fontSize: '24px',
                              fontWeight: '800',
                              color: cls.color
                            }}>
                              {formatPrice(cls.price)}
                            </div>
                          </div>

                          <div style={{ width: '180px' }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '6px',
                              fontSize: '12px',
                              color: '#6b7280'
                            }}>
                              <span>Đã đăng ký</span>
                              <span style={{ fontWeight: '700' }}>
                                {cls.enrolled}/{cls.capacity}
                              </span>
                            </div>
                            <div style={{
                              height: '6px',
                              background: '#f3f4f6',
                              borderRadius: '10px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                height: '100%',
                                width: `${enrollmentPercentage}%`,
                                background: `linear-gradient(90deg, ${cls.color}, ${cls.color}dd)`,
                                transition: 'width 0.5s',
                                borderRadius: '10px'
                              }}></div>
                            </div>
                          </div>

                          <button
                            style={{
                              padding: '12px 28px',
                              borderRadius: '10px',
                              border: 'none',
                              background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                              color: 'white',
                              fontWeight: '700',
                              fontSize: '14px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              boxShadow: `0 4px 15px ${cls.color}40`,
                              whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = `0 8px 25px ${cls.color}50`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = `0 4px 15px ${cls.color}40`;
                            }}
                          >
                            Đăng ký ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No results */}
            {filteredClasses.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: '#f9fafb',
                borderRadius: '20px'
              }}>
                <BookOpen size={64} style={{ color: '#d1d5db', marginBottom: '20px' }} />
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '10px'
                }}>
                  Không tìm thấy lớp học
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '30px'
                }}>
                  Vui lòng thử lại với bộ lọc khác hoặc liên hệ tư vấn
                </p>
                <button
                  onClick={() => {
                    setSelectedCampus('all');
                    setSelectedSubject('all');
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <section style={{
            background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
            padding: '80px 20px',
            marginTop: '60px'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px',
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)'
              }}>
                <Heart size={40} style={{ color: 'white' }} />
              </div>
              
              <h2 style={{
                fontSize: '36px',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Chưa tìm được lớp phù hợp?
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                marginBottom: '40px',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: '1.8'
              }}>
                Đội ngũ tư vấn của DMT Education luôn sẵn sàng hỗ trợ bạn tìm khóa học<br/>
                phù hợp nhất với nhu cầu, mục tiêu và thời gian của bạn
              </p>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  style={{
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(220, 38, 38, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.3)';
                  }}
                >
                  <Phone size={20} />
                  Gọi tư vấn: 077 230 5566
                </button>
                
                <button
                  style={{
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    background: 'white',
                    color: '#374151',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.color = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Mail size={20} />
                  Nhận tư vấn qua email
                </button>
              </div>
            </div>
          </section>
        </div>
      </Layout>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </>
  );
};

export default EnhancedSchedulePage;
