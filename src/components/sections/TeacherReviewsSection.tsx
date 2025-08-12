import React from 'react';
import { Icons } from '../common/Icons';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

const TeacherReviewsSection: React.FC = () => {
  const { ref: reviewsRef, inView: reviewsInView } = useOptimizedAnimation();

  // Dữ liệu giảng viên DMT 
  const teacherReviews = [
    {
      id: 1,
      name: 'Trần Giang Thanh',
      position: 'Giáo dục không phải là việc đổ đầy một cái thùng, mà là thắp sáng ngọn lửa tri thức.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      score: 'Giáo viên Toán',
      scoreType: 'Chuyên môn',
      bgColor: '#E5E7EB'
    },
    {
      id: 2,
      name: 'Hà Đăng Như Quỳnh',
      position: 'Thành công đến từ sự kiên trì và đam mê không ngừng nghỉ.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      score: 'Giáo viên Văn',
      scoreType: 'Chuyên môn',
      bgColor: '#FDE2E7'
    },
    {
      id: 3,
      name: 'Trần Anh Khoa',
      position: 'Học tập là hành trình không có điểm kết thúc, chỉ có những cột mốc.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      score: 'Giáo viên Anh',
      scoreType: 'Chuyên môn',
      bgColor: '#FECACA'
    },
    {
      id: 4,
      name: 'Nguyễn Bá Thọ',
      position: 'Giáo viên giỏi là người biết cách thắp lên ngọn lửa học tập trong mỗi học sinh.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      score: 'Giáo viên Lý',
      scoreType: 'Chuyên môn',
      bgColor: '#E5E7EB'
    },
    {
      id: 5,
      name: 'Từ Kim Loan',
      position: 'Mỗi học sinh đều có tiềm năng vô hạn, nhiệm vụ của tôi là giúp họ khám phá ra điều đó.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      score: 'Giáo viên Hóa',
      scoreType: 'Chuyên môn',
      bgColor: '#F3E8FF'
    }
  ];

  return (
    <section 
      id="teachers"
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