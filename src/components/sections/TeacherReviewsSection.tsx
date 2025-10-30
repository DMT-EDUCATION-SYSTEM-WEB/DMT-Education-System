import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';
import { teachersApi, Teacher } from '../../services/academic';
import { Loader } from 'lucide-react';

const TeacherReviewsSection: React.FC = () => {
  const { ref: reviewsRef, inView: reviewsInView } = useOptimizedAnimation();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await teachersApi.getAll({ 
          status: true,
          page: 1,
          limit: 8
        });
        
        if (response.success && response.data && response.data.length > 0) {
          setTeachers(response.data);
        } else {
          // Fallback to mock data if no teachers returned
          console.warn('No teachers returned from API, using fallback data');
          setTeachers(getMockTeachers());
        }
      } catch (err: any) {
        console.error('Error fetching teachers:', err);
        setError(err.message || 'Không thể tải thông tin giáo viên');
        // Use mock data on error
        setTeachers(getMockTeachers());
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Mock data fallback
  const getMockTeachers = (): Teacher[] => [
    {
      id: 1,
      user_id: 101,
      teacher_code: 'GV001',
      main_subject_id: 1,
      years_experience: 10,
      degree: 'Thạc sĩ Toán học',
      specialization: 'Toán học',
      created_at: new Date().toISOString(),
      users: {
        id: 101,
        email: 'thanh@dmt.edu.vn',
        full_name: 'Trần Giang Thanh',
        phone: '0901234567',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM',
        role: 'teacher',
        birth_date: '1985-01-15',
        status: true,
        created_at: new Date().toISOString()
      },
      subjects: {
        id: 1,
        name: 'Toán học',
        code: 'MATH',
        description: 'Môn Toán'
      }
    },
    {
      id: 2,
      user_id: 102,
      teacher_code: 'GV002',
      main_subject_id: 2,
      years_experience: 8,
      degree: 'Thạc sĩ Ngữ văn',
      specialization: 'Ngữ văn',
      created_at: new Date().toISOString(),
      users: {
        id: 102,
        email: 'quynh@dmt.edu.vn',
        full_name: 'Hà Đăng Như Quỳnh',
        phone: '0902234567',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM',
        role: 'teacher',
        birth_date: '1987-03-20',
        status: true,
        created_at: new Date().toISOString()
      },
      subjects: {
        id: 2,
        name: 'Ngữ văn',
        code: 'LIT',
        description: 'Môn Văn'
      }
    },
    {
      id: 3,
      user_id: 103,
      teacher_code: 'GV003',
      main_subject_id: 3,
      years_experience: 12,
      degree: 'Cử nhân Tiếng Anh',
      specialization: 'Tiếng Anh',
      created_at: new Date().toISOString(),
      users: {
        id: 103,
        email: 'khoa@dmt.edu.vn',
        full_name: 'Trần Anh Khoa',
        phone: '0903234567',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM',
        role: 'teacher',
        birth_date: '1983-07-10',
        status: true,
        created_at: new Date().toISOString()
      },
      subjects: {
        id: 3,
        name: 'Tiếng Anh',
        code: 'ENG',
        description: 'Môn Anh'
      }
    },
    {
      id: 4,
      user_id: 104,
      teacher_code: 'GV004',
      main_subject_id: 4,
      years_experience: 15,
      degree: 'Tiến sĩ Vật lý',
      specialization: 'Vật lý',
      created_at: new Date().toISOString(),
      users: {
        id: 104,
        email: 'tho@dmt.edu.vn',
        full_name: 'Nguyễn Bá Thọ',
        phone: '0904234567',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM',
        role: 'teacher',
        birth_date: '1980-05-25',
        status: true,
        created_at: new Date().toISOString()
      },
      subjects: {
        id: 4,
        name: 'Vật lý',
        code: 'PHY',
        description: 'Môn Lý'
      }
    },
    {
      id: 5,
      user_id: 105,
      teacher_code: 'GV005',
      main_subject_id: 5,
      years_experience: 9,
      degree: 'Thạc sĩ Hóa học',
      specialization: 'Hóa học',
      created_at: new Date().toISOString(),
      users: {
        id: 105,
        email: 'loan@dmt.edu.vn',
        full_name: 'Từ Kim Loan',
        phone: '0905234567',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        address: 'TP.HCM',
        role: 'teacher',
        birth_date: '1986-11-30',
        status: true,
        created_at: new Date().toISOString()
      },
      subjects: {
        id: 5,
        name: 'Hóa học',
        code: 'CHEM',
        description: 'Môn Hóa'
      }
    }
  ];

  if (loading) {
    return (
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#92400e' }}>
          <Loader className="animate-spin" size={24} />
          <span>Đang tải thông tin giáo viên...</span>
        </div>
      </section>
    );
  }

  if (error && teachers.length === 0) {
    return (
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)'
      }}>
        <div style={{ color: '#dc2626' }}>{error}</div>
      </section>
    );
  }

  // Dữ liệu giảng viên DMT 
  const teacherReviews = teachers.map((teacher, index) => {
    const bgColors = ['#E5E7EB', '#FDE2E7', '#fcfcfcff', '#E5E7EB', '#FDE2E7', '#fcfcfcff', '#E5E7EB', '#FDE2E7'];
    const quotes = [
      'Giáo dục không phải là việc đổ đầy một cái thùng, mà là thắp sáng ngọn lửa tri thức.',
      'Thành công đến từ sự kiên trì và đam mê không ngừng nghỉ.',
      'Học tập là hành trình không có điểm kết thúc, chỉ có những cột mốc.',
      'Giáo viên giỏi là người biết cách thắp lên ngọn lửa học tập trong mỗi học sinh.',
      'Mỗi học sinh đều có tiềm năng vô hạn, nhiệm vụ của tôi là giúp họ khám phá ra điều đó.',
      'Tri thức là chìa khóa mở cửa tương lai.',
      'Sự kiên nhẫn và tận tâm là nền tảng của giảng dạy hiệu quả.',
      'Mỗi học sinh là một ngôi sao sáng, nhiệm vụ của tôi là giúp họ tỏa sáng.'
    ];

    return {
      id: teacher.id,
      name: teacher.users?.full_name || 'Giáo viên',
      position: quotes[index % quotes.length],
      avatar: teacher.users?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.users?.full_name || 'Teacher')}&size=300&background=random`,
      score: `Giáo viên ${teacher.subjects?.name || teacher.specialization || 'DMT'}`,
      scoreType: `${teacher.years_experience || 0}+ năm kinh nghiệm`,
      bgColor: bgColors[index % bgColors.length]
    };
  });

  return (
    <section 
      id="teachers"
      ref={reviewsRef}
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className={`transform transition-all duration-1000 ${reviewsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#1f2937',
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
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Là những giáo viên giỏi kiến thức và giỏi truyền đạt. Rất tận tâm với học viên, đi
              <br />
              đầu vì cái tâm và luôn khát khao cải tiến việc học Tiếng Anh ở Việt Nam.
            </p>
          </div>
        </div>

        {/* Teacher Cards Horizontal Scroll */}
        <div 
          className={`transform transition-all duration-1000 delay-300 ${reviewsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '20px',
            marginBottom: '40px',
            position: 'relative'
          }}
        >
          {/* Left Shadow Gradient */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '20px',
            width: '40px',
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }} />
          
          {/* Right Shadow Gradient */}
          <div style={{
            position: 'absolute',
            right: '0',
            top: '0',
            bottom: '20px',
            width: '40px',
            background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }} />

          <style>{`
            .teacher-cards-container::-webkit-scrollbar {
              display: none;
            }
            
            .teacher-card-image {
              transition: all 0.3s ease;
            }
            
            .teacher-card:hover .teacher-card-image {
              transform: scale(1.05);
              filter: brightness(1.1);
            }
            
            .teacher-info-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0;
              transition: all 0.3s ease;
              borderRadius: 12px;
              color: white;
              padding: 20px;
              textAlign: center;
            }
            
            .teacher-card:hover .teacher-info-overlay {
              opacity: 1;
            }
          `}</style>
          
          <div 
            className="teacher-cards-container"
            style={{
              display: 'flex',
              gap: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              minWidth: 'min-content'
            }}
          >
            {teacherReviews.map((teacher, index) => (
              <div
                key={teacher.id}
                className="teacher-card"
                style={{
                  backgroundColor: teacher.bgColor,
                  borderRadius: '16px',
                  padding: '20px',
                  width: '280px',
                  minWidth: '280px',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`,
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Teacher Image */}
                <div style={{
                  width: '240px',
                  height: '280px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  position: 'relative'
                }}>
                  <img 
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="teacher-card-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Teacher Info Overlay */}
                  <div 
                    className="teacher-info-overlay"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      background: 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: '0',
                      transition: 'all 0.3s ease',
                      borderRadius: '12px',
                      color: 'white',
                      padding: '20px',
                      textAlign: 'center'
                    }}
                  >
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      marginBottom: '10px',
                      color: 'white'
                    }}>
                      {teacher.name}
                    </h4>
                    <p style={{
                      fontSize: '13px',
                      marginBottom: '15px',
                      lineHeight: '1.4',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontStyle: 'italic'
                    }}>
                      "{teacher.position}"
                    </p>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#60a5fa',
                      marginBottom: '5px'
                    }}>
                      {teacher.score}
                    </div>
                  </div>
                  
                  {/* Score Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    zIndex: 3
                  }}>
                    {teacher.score}
                  </div>
                </div>

                {/* Teacher Info */}
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}>
                    {teacher.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.4',
                    margin: '0',
                    transition: 'all 0.3s ease',
                    fontStyle: 'italic'
                  }}>
                    "{teacher.position}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Teachers Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <div className={`transform transition-all duration-1000 delay-500 ${reviewsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
            }}
            >
              Xem tất cả giáo viên
            </button>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
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
      `}</style>
    </section>
  );
};

export default TeacherReviewsSection;