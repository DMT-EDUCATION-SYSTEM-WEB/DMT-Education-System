import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { publicTeachersApi, PublicTeacher } from '../services/publicApi';
import {
  Award,
  BookOpen,
  Users,
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

// Internal Teacher interface for UI
interface Teacher {
  id: number;
  teacher_code: string;
  full_name: string;
  email: string;
  phone?: string;
  main_subject?: string;
  years_experience: number;
  degree?: string;
  specialization?: string;
}

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
        const response = await publicTeachersApi.getAll({ 
          page: 1,
          limit: 50, // Get more teachers
          is_active: true
        });
        
        if (response.success && response.data && response.data.length > 0) {
          // Transform PublicTeacher to our Teacher interface
          const transformedTeachers: Teacher[] = response.data.map((t: PublicTeacher) => ({
            id: t.id,
            teacher_code: t.teacher_code,
            full_name: t.full_name,
            email: `teacher${t.id}@dmt.edu.vn`, // Mock email for now
            phone: t.phone,
            main_subject: t.main_subject?.name,
            years_experience: t.years_experience || 0,
            degree: t.degree,
            specialization: t.specialization
          }));
          setTeachers(transformedTeachers);
        } else {
          setTeachers([]);
        }
      } catch (err: any) {
        console.error('Error fetching teachers:', err);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Users },
    { id: 'math', name: 'Toán học', icon: BookOpen },
    { id: 'language', name: 'Ngôn ngữ', icon: GraduationCap },
    { id: 'science', name: 'Khoa học', icon: Award },
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'math' && teacher.main_subject?.includes('Toán')) ||
      (selectedCategory === 'language' && (teacher.main_subject?.includes('Văn') || teacher.main_subject?.includes('Anh'))) ||
      (selectedCategory === 'science' && (teacher.main_subject?.includes('Lý') || teacher.main_subject?.includes('Hóa') || teacher.main_subject?.includes('Sinh')));
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
                <GraduationCap size={16} style={{ marginRight: '6px' }} />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>30+ giảng viên</span>
              </div>
              
              <h1 style={{
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                Đội ngũ giảng viên
              </h1>
              <p style={{
                fontSize: '16px',
                opacity: 0.9,
                maxWidth: '640px',
                margin: '0 auto 24px',
                lineHeight: '1.6'
              }}>
                Chương trình đào tạo từ giáo viên giỏi kiến thức, giỏi truyền đạt
              </p>

              {/* Search bar */}
              <div style={{
                maxWidth: '768px',
                margin: '0 auto'
              }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm giảng viên..."
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section style={{
          position: 'sticky',
          top: '64px',
          zIndex: 40,
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              overflowX: 'auto'
            }}>
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s',
                      background: isActive ? '#01AAD3' : '#f3f4f6',
                      color: isActive ? 'white' : '#374151',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 4px 6px -1px rgba(1, 170, 211, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#e5e7eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#f3f4f6';
                      }
                    }}
                  >
                    <Icon size={20} />
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
          background: '#ffffff',
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
                <Loader className="animate-spin" size={40} color="#01AAD3" />
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
                        e.currentTarget.style.borderColor = '#01AAD3';
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
                        background: 'linear-gradient(135deg, #01AAD3 0%, #016A8C 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <div style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px',
                          color: 'white',
                          fontWeight: '700',
                          backdropFilter: 'blur(10px)',
                        }}>
                          {teacher.full_name.charAt(0).toUpperCase()}
                        </div>
                        
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
                          {teacher.email && (
                            <a
                              href={`mailto:${teacher.email}`}
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
                          {teacher.phone && (
                            <a
                              href={`tel:${teacher.phone}`}
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
                          {teacher.full_name}
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
                          {teacher.main_subject || teacher.specialization || 'Giảng viên'}
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
