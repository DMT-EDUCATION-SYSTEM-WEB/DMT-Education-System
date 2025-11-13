import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { teachersApi, Teacher } from '../services/academic';
import {
  Award,
  BookOpen,
  Users,
  Star,
  GraduationCap,
  Briefcase,
  Search,
  Filter,
  ChevronRight,
  Loader,
  TrendingUp,
  CheckCircle,
  Mail,
  Phone,
} from 'lucide-react';

const TeachersPage: React.FC = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await teachersApi.getAll({ 
          status: true,
          page: 1,
          limit: 12
        });
        
        if (response.success && response.data && response.data.length > 0) {
          setTeachers(response.data);
        } else {
          setTeachers(getMockTeachers());
        }
      } catch (err: any) {
        console.error('Error fetching teachers:', err);
        setTeachers(getMockTeachers());
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const getMockTeachers = (): Teacher[] => [
    {
      id: 1, user_id: 101, teacher_code: 'GV001', main_subject_id: 1,
      years_experience: 10, degree: 'Thạc sĩ Toán học', specialization: 'Toán học',
      created_at: new Date().toISOString(),
      users: {
        id: 101, email: 'thanh@dmt.edu.vn', full_name: 'Trần Giang Thanh',
        phone: '0901234567', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM', role: 'teacher', birth_date: '1985-01-15', status: true, created_at: new Date().toISOString()
      },
      subjects: { id: 1, name: 'Toán học', code: 'MATH', description: 'Môn Toán' }
    },
    {
      id: 2, user_id: 102, teacher_code: 'GV002', main_subject_id: 2,
      years_experience: 8, degree: 'Thạc sĩ Ngữ văn', specialization: 'Ngữ văn',
      created_at: new Date().toISOString(),
      users: {
        id: 102, email: 'quynh@dmt.edu.vn', full_name: 'Hà Đăng Như Quỳnh',
        phone: '0902234567', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM', role: 'teacher', birth_date: '1987-03-20', status: true, created_at: new Date().toISOString()
      },
      subjects: { id: 2, name: 'Ngữ văn', code: 'LIT', description: 'Môn Văn' }
    },
    {
      id: 3, user_id: 103, teacher_code: 'GV003', main_subject_id: 3,
      years_experience: 12, degree: 'Cử nhân Tiếng Anh', specialization: 'Tiếng Anh',
      created_at: new Date().toISOString(),
      users: {
        id: 103, email: 'khoa@dmt.edu.vn', full_name: 'Trần Anh Khoa',
        phone: '0903234567', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM', role: 'teacher', birth_date: '1983-07-10', status: true, created_at: new Date().toISOString()
      },
      subjects: { id: 3, name: 'Tiếng Anh', code: 'ENG', description: 'Môn Anh' }
    },
    {
      id: 4, user_id: 104, teacher_code: 'GV004', main_subject_id: 4,
      years_experience: 15, degree: 'Tiến sĩ Vật lý', specialization: 'Vật lý',
      created_at: new Date().toISOString(),
      users: {
        id: 104, email: 'tho@dmt.edu.vn', full_name: 'Nguyễn Bá Thọ',
        phone: '0904234567', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM', role: 'teacher', birth_date: '1980-05-25', status: true, created_at: new Date().toISOString()
      },
      subjects: { id: 4, name: 'Vật lý', code: 'PHY', description: 'Môn Lý' }
    },
    {
      id: 5, user_id: 105, teacher_code: 'GV005', main_subject_id: 5,
      years_experience: 9, degree: 'Thạc sĩ Hóa học', specialization: 'Hóa học',
      created_at: new Date().toISOString(),
      users: {
        id: 105, email: 'loan@dmt.edu.vn', full_name: 'Từ Kim Loan',
        phone: '0905234567', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM', role: 'teacher', birth_date: '1986-11-30', status: true, created_at: new Date().toISOString()
      },
      subjects: { id: 5, name: 'Hóa học', code: 'CHEM', description: 'Môn Hóa' }
    },
    {
      id: 6, user_id: 106, teacher_code: 'GV006', main_subject_id: 6,
      years_experience: 7, degree: 'Thạc sĩ Sinh học', specialization: 'Sinh học',
      created_at: new Date().toISOString(),
      users: {
        id: 106, email: 'minh@dmt.edu.vn', full_name: 'Lê Văn Minh',
        phone: '0906234567', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM', role: 'teacher', birth_date: '1988-08-12', status: true, created_at: new Date().toISOString()
      },
      subjects: { id: 6, name: 'Sinh học', code: 'BIO', description: 'Môn Sinh' }
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Users },
    { id: 'math', name: 'Toán học', icon: BookOpen },
    { id: 'language', name: 'Ngôn ngữ', icon: GraduationCap },
    { id: 'science', name: 'Khoa học', icon: Award },
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.users.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'math' && teacher.subjects?.name?.includes('Toán')) ||
      (selectedCategory === 'language' && (teacher.subjects?.name?.includes('Văn') || teacher.subjects?.name?.includes('Anh'))) ||
      (selectedCategory === 'science' && (teacher.subjects?.name?.includes('Lý') || teacher.subjects?.name?.includes('Hóa') || teacher.subjects?.name?.includes('Sinh')));
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead 
        title="DMT Education - Đội ngũ giảng viên"
        description="Đội ngũ giảng viên giàu kinh nghiệm tại DMT Education"
        keywords="DMT Education, giảng viên, giáo viên, đội ngũ"
      />
      
      <Layout>
        {/* Hero Section */}
        <section style={{
          background: '#ffffff',
          padding: '60px 20px 40px',
          borderBottom: '1px solid #e5e7eb',
        }}>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
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
                <GraduationCap size={16} style={{ display: 'inline', marginRight: '8px', marginBottom: '-2px' }} />
                Đội ngũ giảng viên DMT Education
              </div>
              
              <h1 style={{
                fontSize: '42px',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#111827',
              }}>
                Đội ngũ giảng viên
              </h1>
              <p style={{
                fontSize: '17px',
                marginBottom: '40px',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: '1.6',
                color: '#6b7280',
              }}>
                30 giáo viên giỏi kiến thức, giỏi truyền đạt, tận tâm với học viên
              </p>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '20px',
                maxWidth: '900px',
                margin: '0 auto',
              }}>
                {[
                  { icon: Users, label: '30+ Giảng viên', color: '#3b82f6' },
                  { icon: BookOpen, label: '10+ Môn học', color: '#10b981' },
                  { icon: Award, label: '15+ Năm kinh nghiệm', color: '#f59e0b' },
                  { icon: Star, label: '4.8/5 Đánh giá', color: '#ef4444' },
                ].map((stat, index) => (
                  <div key={index} style={{
                    padding: '24px',
                    background: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                  }}>
                    <stat.icon size={28} style={{ marginBottom: '12px', color: stat.color }} />
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section style={{
          padding: '30px 20px',
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: '0',
          zIndex: 10,
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              <div style={{ 
                flex: '1 1 300px',
                position: 'relative',
              }}>
                <Search 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                  }}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm giảng viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                onClick={() => navigate('/teachers/list')}
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Xem tất cả
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}>
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      padding: '10px 20px',
                      background: isActive ? '#f9fafb' : 'white',
                      color: isActive ? '#111827' : '#6b7280',
                      border: `2px solid ${isActive ? '#3b82f6' : '#e5e7eb'}`,
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: isActive ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#f59e0b';
                        e.currentTarget.style.color = '#f59e0b';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.color = '#6b7280';
                      }
                    }}
                  >
                    <Icon size={16} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Teachers Grid */}
        <section style={{
          padding: '60px 20px',
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <Loader className="animate-spin" size={40} color="#3b82f6" />
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Đang tải danh sách giảng viên...</p>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '30px',
                }}>
                  {filteredTeachers.map((teacher, index) => (
                    <div
                      key={teacher.id}
                      onClick={() => navigate(`/teachers/${teacher.id}`)}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid #e5e7eb',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }}
                    >
                      {/* Avatar */}
                      <div style={{
                        width: '100%',
                        height: '280px',
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#f9fafb',
                      }}>
                        <img 
                          src={teacher.users.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.users.full_name)}&size=300&background=random`}
                          alt={teacher.users.full_name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                        
                        {/* Overlay gradient */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '100px',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                        }} />

                        {/* Teacher Code Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          padding: '6px 12px',
                          background: 'rgba(59, 130, 246, 0.95)',
                          color: 'white',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          backdropFilter: 'blur(10px)',
                        }}>
                          {teacher.teacher_code || 'N/A'}
                        </div>

                        {/* Quick Actions */}
                        <div style={{
                          position: 'absolute',
                          bottom: '16px',
                          left: '16px',
                          right: '16px',
                          display: 'flex',
                          gap: '8px',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }}
                        className="quick-actions"
                        >
                          {teacher.users.email && (
                            <a
                              href={`mailto:${teacher.users.email}`}
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                padding: '8px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <Mail size={16} color="#3b82f6" />
                            </a>
                          )}
                          {teacher.users.phone && (
                            <a
                              href={`tel:${teacher.users.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                padding: '8px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <Phone size={16} color="#10b981" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div style={{ padding: '24px' }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '8px',
                        }}>
                          {teacher.users.full_name}
                        </h3>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '16px',
                          color: '#3b82f6',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}>
                          <BookOpen size={16} />
                          {teacher.subjects?.name || teacher.specialization || 'Giảng viên'}
                        </div>

                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginBottom: '16px',
                        }}>
                          {teacher.degree && (
                            <div style={{
                              padding: '6px 12px',
                              background: '#f3f4f6',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}>
                              <GraduationCap size={14} />
                              {teacher.degree}
                            </div>
                          )}
                          <div style={{
                            padding: '6px 12px',
                            background: '#eff6ff',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#1e40af',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}>
                            <Briefcase size={14} />
                            {teacher.years_experience || 0}+ năm
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          style={{
                            width: '100%',
                            padding: '12px',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/teachers/${teacher.id}`);
                          }}
                        >
                          Xem chi tiết
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredTeachers.length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#6b7280',
                  }}>
                    <Users size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                      Không tìm thấy giảng viên
                    </h3>
                    <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              marginBottom: '20px',
            }}>
              Sẵn sàng bắt đầu học tập?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: '1.6',
            }}>
              Đội ngũ giảng viên giàu kinh nghiệm của chúng tôi sẵn sàng đồng hành cùng bạn
              trên con đường chinh phục tri thức
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => navigate('/courses')}
                style={{
                  padding: '14px 28px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#3b82f6';
                }}
              >
                Khám phá khóa học
              </button>
              <button
                onClick={() => navigate('/teachers/list')}
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#1f2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Xem tất cả giảng viên
              </button>
            </div>
          </div>
        </section>

        {/* Animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-spin {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          /* Show quick actions on hover */
          div:hover .quick-actions {
            opacity: 1 !important;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default TeachersPage;
