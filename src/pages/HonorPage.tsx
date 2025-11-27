import React, { useState } from 'react';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { Trophy, Award, Star, Medal, Calendar, TrendingUp, BookOpen, Target } from 'lucide-react';

// Honor sections data với đường dẫn ảnh đúng
const honorSections = {
  ielts: [
    { src: '/images/all-image/honor-7.5-ielts.jpg', title: 'IELTS 7.5', student: 'Học viên xuất sắc', term: '2024-2025' },
    { src: '/images/all-image/honor-6.5-ielts.jpg', title: 'IELTS 6.5', student: 'Thành tích ấn tượng', term: '2024-2025' },
    { src: '/images/all-image/honor-6.5-ielts-2.jpg', title: 'IELTS 6.5', student: 'Tiến bộ vượt bậc', term: '2024-2025' },
    { src: '/images/all-image/honor-6.0-ielts.jpg', title: 'IELTS 6.0', student: 'Nền tảng vững chắc', term: '2024-2025' },
  ],
  vsat: [
    { src: '/images/all-image/honor-vsat-1.jpg', title: 'Bảng Vàng Điểm Thi', student: 'Lê Thị Hải Yến - 395đ, Lê Huỳnh Hoàng Hải - 373đ, Nguyễn Huỳnh Bảo Trâm - 373đ', term: 'Năm học 2024-2025' },
    { src: '/images/all-image/honor-vsat-2.jpg', title: 'Thành Tích THPT', student: 'Ngô Tú Linh - 337đ, Cao Nguyễn Nhật Trung - 325đ', term: 'Năm học 2024-2025' },
    { src: '/images/all-image/honor-vsat-3.jpg', title: 'Bảng Vinh Danh', student: 'Nguyễn Tấn Thuận - 332đ, Mai Thanh Quyên - 315đ, Nguyễn Quang Hiển - 315đ', term: 'Năm học 2024-2025' },
    { src: '/images/all-image/honor-vsat-4.jpg', title: 'Điểm Thi Cao', student: 'Huỳnh Hồng Hân - 308đ, Nguyễn Ngọc Phương Anh - 304đ, Nguyễn Đình Long Nhật - 300đ', term: 'Năm học 2024-2025' },
  ],
  vsatBanner: '/images/all-image/honor-vsat.jpg',
  midSemester1: [
    { src: '/images/all-image/honor-mid-semester-1-2425-2.jpg', title: 'Giữa kỳ 1', student: 'Học sinh xuất sắc', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-1-2425-3.jpg', title: 'Giữa kỳ 1', student: 'Thành tích nổi bật', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-1-2425-4.jpg', title: 'Giữa kỳ 1', student: 'Tiến bộ vượt bậc', term: 'HK1 2024-2025' },
  ],
  midSemester1Banner: '/images/all-image/honor-mid-semester-1-2425-1.jpg',
  midSemester2: [
    { src: '/images/all-image/honor-mid-semester-2-2425-2.jpg', title: 'Giữa kỳ 2', student: 'Học sinh giỏi', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-3.jpg', title: 'Giữa kỳ 2', student: 'Xuất sắc', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-4.jpg', title: 'Giữa kỳ 2', student: 'Thành tích cao', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-5.jpg', title: 'Giữa kỳ 2', student: 'Học lực khá', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-6.jpg', title: 'Giữa kỳ 2', student: 'Tiến bộ nổi bật', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-7.jpg', title: 'Giữa kỳ 2', student: 'Học sinh tiêu biểu', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-8.jpg', title: 'Giữa kỳ 2', student: 'Học sinh chăm chỉ', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-mid-semester-2-2425-9.jpg', title: 'Giữa kỳ 2', student: 'Thành tích ổn định', term: 'HK2 2024-2025' },
  ],
  midSemester2Banner: '/images/all-image/honor-mid-semester-2-2425-1.jpg',
  endSemester1: [
    { src: '/images/all-image/honor-end-semester-1-2425-2.jpg', title: 'Cuối kỳ 1', student: 'Thủ khoa', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-3.jpg', title: 'Cuối kỳ 1', student: 'Á khoa', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-4.jpg', title: 'Cuối kỳ 1', student: 'Học sinh giỏi', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-5.jpg', title: 'Cuối kỳ 1', student: 'Xuất sắc', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-6.jpg', title: 'Cuối kỳ 1', student: 'Học lực tốt', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-7.jpg', title: 'Cuối kỳ 1', student: 'Tiến bộ nhanh', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-8.jpg', title: 'Cuối kỳ 1', student: 'Học sinh tích cực', term: 'HK1 2024-2025' },
    { src: '/images/all-image/honor-end-semester-1-2425-9.jpg', title: 'Cuối kỳ 1', student: 'Điểm số cao', term: 'HK1 2024-2025' },
  ],
  endSemester1Banner: '/images/all-image/honor-end-semester-1-2425-1.jpg',
  endSemester2: [
    { src: '/images/all-image/honor-end-semester-2-2425-2.jpg', title: 'Cuối kỳ 2', student: 'Thủ khoa lớp', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-3.jpg', title: 'Cuối kỳ 2', student: 'Á khoa lớp', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-4.jpg', title: 'Cuối kỳ 2', student: 'Học sinh giỏi', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-5.jpg', title: 'Cuối kỳ 2', student: 'Xuất sắc toàn diện', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-6.jpg', title: 'Cuối kỳ 2', student: 'Học lực khá giỏi', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-7.jpg', title: 'Cuối kỳ 2', student: 'Học sinh tích cực', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-8.jpg', title: 'Cuối kỳ 2', student: 'Tiến bộ đột phá', term: 'HK2 2024-2025' },
    { src: '/images/all-image/honor-end-semester-2-2425-9.jpg', title: 'Cuối kỳ 2', student: 'Thành tích ổn định', term: 'HK2 2024-2025' },
  ],
  endSemester2Banner: '/images/all-image/honor-end-semester-2-2425-1.jpg',
  students: [
    { src: '/images/all-image/student-1.jpg', title: 'Học viên DMT', student: 'Lớp Toán', term: '2024-2025' },
    { src: '/images/all-image/student-2.jpg', title: 'Học viên DMT', student: 'Lớp Lý', term: '2024-2025' },
    { src: '/images/all-image/student-3.jpg', title: 'Học viên DMT', student: 'Lớp Hóa', term: '2024-2025' },
    { src: '/images/all-image/student-4.jpg', title: 'Học viên DMT', student: 'Lớp Văn', term: '2024-2025' },
    { src: '/images/all-image/student-5.jpg', title: 'Học viên DMT', student: 'Lớp Anh', term: '2024-2025' },
    { src: '/images/all-image/student-6.jpg', title: 'Học viên DMT', student: 'Lớp IELTS', term: '2024-2025' },
  ],
};

// Honor Section Component
interface HonorSectionProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  images: Array<{ src: string; title: string; student: string; term: string }>;
  bannerImage?: string;
}

const HonorSection: React.FC<HonorSectionProps> = ({ title, subtitle, icon: IconComponent, color, images, bannerImage }) => {
  return (
    <div style={{
      padding: '80px 20px',
      background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: `${color}10`,
            padding: '12px 28px',
            borderRadius: '50px',
            marginBottom: '20px',
            border: `2px solid ${color}30`
          }}>
            <IconComponent size={24} style={{ color }} />
            <span style={{ fontSize: '15px', fontWeight: 700, color }}>
              {subtitle}
            </span>
          </div>
          
          <h2 style={{
            fontSize: '44px',
            fontWeight: 800,
            color: '#111827',
            marginBottom: '16px'
          }}>
            {title}
          </h2>
        </div>

        {/* Banner Image nếu có */}
        {bannerImage && (
          <div style={{
            marginBottom: '60px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: `0 20px 60px ${color}30`,
            border: `3px solid ${color}`,
            maxWidth: '1200px',
            margin: '0 auto 60px'
          }}>
            <img
              src={bannerImage}
              alt={`${title} Banner`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Images Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.4s',
                cursor: 'pointer',
                background: 'white',
                border: '2px solid #f3f4f6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 24px 48px ${color}30`;
                e.currentTarget.style.borderColor = color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#f3f4f6';
              }}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                height: '400px',
                overflow: 'hidden',
                background: '#f3f4f6'
              }}>
                <img
                  src={img.src}
                  alt={img.student}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s'
                  }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML += `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #9ca3af; font-size: 14px;">Ảnh đang được cập nhật</div>`;
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: color,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Trophy size={16} />
                  {img.term}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '24px' }}>
                <div style={{
                  display: 'inline-block',
                  background: `${color}15`,
                  color,
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}>
                  {img.title}
                </div>
                
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  {img.student}
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  <Star size={16} style={{ color }} fill={color} />
                  Trung tâm DMT Education
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HonorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ielts' | 'vsat' | 'semester'>('all');

  return (
    <Layout>
      <SEOHead
        title="Bảng Vinh Danh Học Sinh - DMT Education"
        description="Vinh danh học sinh xuất sắc năm học 2024-2025 tại trung tâm DMT Education. Thành tích IELTS, VSAT, học kỳ 1, học kỳ 2"
        keywords="vinh danh học sinh, IELTS, VSAT, học sinh giỏi, DMT Education, năm học 2024-2025"
      />

      {/* Hero Section với màu đỏ */}
      <div style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)',
        padding: '100px 20px 80px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)'
        }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '10px 24px',
            borderRadius: '50px',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <Trophy size={24} />
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Năm học 2024 - 2025</span>
          </div>
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: 800,
            marginBottom: '24px',
            textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
            lineHeight: 1.2
          }}>
            Bảng Vinh Danh<br/>Học Sinh Xuất Sắc
          </h1>
          
          <p style={{
            fontSize: '22px',
            opacity: 0.95,
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            Tự hào ghi nhận những thành tích xuất sắc và nỗ lực không ngừng của các học viên<br/>
            trong hành trình chinh phục tri thức tại trung tâm DMT Education
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { icon: Award, value: '200+', label: 'Học sinh xuất sắc', color: '#fbbf24' },
              { icon: Medal, value: '150+', label: 'Giải thưởng học thuật', color: '#60a5fa' },
              { icon: TrendingUp, value: '95%', label: 'Tiến bộ vượt bậc', color: '#34d399' },
              { icon: Star, value: '4.9/5', label: 'Đánh giá phụ huynh', color: '#f472b6' }
            ].map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    padding: '28px 20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  }}
                >
                  <IconComponent size={40} style={{ color: stat.color, marginBottom: '12px' }} />
                  <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9, fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div style={{
        padding: '80px 20px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '20px'
            }}>
              Về Chương Trình Vinh Danh
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              lineHeight: 1.8,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Trung tâm DMT Education tự hào ghi nhận và vinh danh những học sinh đạt thành tích xuất sắc trong học tập. 
              Đây là động lực to lớn giúp các em tiếp tục phấn đấu và là niềm khích lệ cho toàn thể học viên trong hệ thống.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {[
              { 
                icon: BookOpen,
                color: '#dc2626',
                title: 'Học Thuật',
                desc: 'Vinh danh học sinh đạt điểm cao trong các kỳ thi giữa kỳ và cuối kỳ, thể hiện sự tiến bộ vượt bậc'
              },
              { 
                icon: Award,
                color: '#ea580c',
                title: 'Chứng Chỉ',
                desc: 'Ghi nhận thành tích IELTS, TOEFL, VSAT và các chứng chỉ quốc tế khác của học viên'
              },
              { 
                icon: Target,
                color: '#ca8a04',
                title: 'Tiến Bộ',
                desc: 'Khen thưởng học sinh có sự tiến bộ nổi bật, nỗ lực vươn lên trong quá trình học tập'
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
                    padding: '40px 32px',
                    borderRadius: '20px',
                    border: '2px solid #fee2e2',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${item.color}20`;
                    e.currentTarget.style.borderColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#fee2e2';
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: item.color,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <IconComponent size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '12px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#6b7280',
                    lineHeight: 1.7
                  }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* IELTS Achievements */}
      <HonorSection
        title="Thành Tích IELTS"
        subtitle="Học viên đạt điểm số ấn tượng trong kỳ thi IELTS"
        icon={Award}
        color="#dc2626"
        images={honorSections.ielts}
      />

      {/* VSAT Achievements */}
      <HonorSection
        title="Thành Tích VSAT"
        subtitle="Học sinh xuất sắc trong kỳ thi đánh giá năng lực VSAT"
        icon={Medal}
        color="#ea580c"
        images={honorSections.vsat}
        bannerImage={honorSections.vsatBanner}
      />

      {/* Mid Semester 1 */}
      <HonorSection
        title="Vinh Danh Giữa Kỳ 1"
        subtitle="Học kỳ 1 năm học 2024-2025"
        icon={Calendar}
        color="#ca8a04"
        images={honorSections.midSemester1}
        bannerImage={honorSections.midSemester1Banner}
      />

      {/* Mid Semester 2 */}
      <HonorSection
        title="Vinh Danh Giữa Kỳ 2"
        subtitle="Học kỳ 2 năm học 2024-2025"
        icon={Calendar}
        color="#16a34a"
        images={honorSections.midSemester2}
        bannerImage={honorSections.midSemester2Banner}
      />

      {/* End Semester 1 */}
      <HonorSection
        title="Vinh Danh Cuối Kỳ 1"
        subtitle="Kết thúc học kỳ 1 năm học 2024-2025"
        icon={Trophy}
        color="#2563eb"
        images={honorSections.endSemester1}
        bannerImage={honorSections.endSemester1Banner}
      />

      {/* End Semester 2 */}
      <HonorSection
        title="Vinh Danh Cuối Kỳ 2"
        subtitle="Kết thúc học kỳ 2 năm học 2024-2025"
        icon={Trophy}
        color="#7c3aed"
        images={honorSections.endSemester2}
        bannerImage={honorSections.endSemester2Banner}
      />

      {/* Students Gallery */}
      <HonorSection
        title="Học Viên DMT"
        subtitle="Khoảnh khắc đáng nhớ của các học viên trong quá trình học tập"
        icon={Star}
        color="#dc2626"
        images={honorSections.students}
      />

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        padding: '100px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            border: '3px solid rgba(255,255,255,0.3)'
          }}>
            <Target size={48} />
          </div>
          
          <h2 style={{
            fontSize: '48px',
            fontWeight: 800,
            marginBottom: '24px',
            textShadow: '2px 4px 8px rgba(0,0,0,0.2)'
          }}>
            Bạn Cũng Có Thể Tỏa Sáng!
          </h2>
          
          <p style={{
            fontSize: '20px',
            opacity: 0.95,
            lineHeight: 1.8,
            marginBottom: '48px'
          }}>
            Hãy để DMT Education đồng hành cùng bạn trên con đường chinh phục tri thức.<br/>
            Với đội ngũ giáo viên tận tâm và phương pháp giảng dạy hiệu quả, chúng tôi cam kết<br/>
            giúp bạn đạt được những thành tích xuất sắc nhất!
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.location.href = '/courses'}
              style={{
                padding: '18px 40px',
                borderRadius: '12px',
                border: '2px solid white',
                background: 'white',
                color: '#dc2626',
                fontSize: '17px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <BookOpen size={22} />
              Xem Các Khóa Học
            </button>
            
            <button
              onClick={() => window.location.href = '/contact'}
              style={{
                padding: '18px 40px',
                borderRadius: '12px',
                border: '2px solid white',
                background: 'transparent',
                color: 'white',
                fontSize: '17px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Calendar size={22} />
              Đăng Ký Ngay
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HonorPage;
