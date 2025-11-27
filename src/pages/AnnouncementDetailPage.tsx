import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { newsApi, News } from '../services/news';
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon
} from 'lucide-react';

const AnnouncementDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  useEffect(() => {
    if (id) {
      fetchNewsDetail(parseInt(id));
      fetchRelatedNews();
    }
  }, [id]);

  const fetchNewsDetail = async (newsId: number) => {
    try {
      setLoading(true);
      const response = await newsApi.getById(newsId);
      setNews(response.data);
    } catch (err) {
      console.error('Failed to load news:', err);
      // Fallback to mock data
      const mockNews = getMockNewsById(newsId);
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async () => {
    try {
      const response = await newsApi.getAll({
        status: 'published',
        limit: 3,
        page: 1
      });
      setRelatedNews(response.data);
    } catch (err) {
      console.error('Failed to load related news:', err);
      setRelatedNews(getRelatedMockNews());
    }
  };

  const getMockNewsById = (newsId: number): News => {
    const mockData: { [key: number]: News } = {
      1: {
        id: 1,
        title: 'Thông báo khai giảng khóa học mới năm 2025',
        excerpt: 'DMT Education trân trọng thông báo lịch khai giảng các khóa học mới trong năm học 2024-2025. Đăng ký sớm để nhận ưu đãi đặc biệt.',
        content: `
          <h2>Khai giảng các khóa học mới năm 2025</h2>
          <p>DMT Education trân trọng thông báo lịch khai giảng các khóa học mới trong năm học 2024-2025. Chúng tôi mở rộng chương trình đào tạo với nhiều khóa học chất lượng cao.</p>
          
          <h3>Các khóa học mở mới:</h3>
          <ul>
            <li><strong>Toán nâng cao THPT:</strong> Ôn thi THPT Quốc gia và tuyển sinh Đại học</li>
            <li><strong>Lý - Hóa chuyên sâu:</strong> Chương trình Olympic và HSG</li>
            <li><strong>Văn học THPT:</strong> Kỹ năng làm bài và phát triển tư duy</li>
            <li><strong>IELTS 6.0 - 8.0:</strong> Lộ trình từ cơ bản đến nâng cao</li>
            <li><strong>TOEFL iBT:</strong> Chuẩn bị thi du học</li>
            <li><strong>VSAT:</strong> Đánh giá năng lực Đại học Quốc gia</li>
          </ul>

          <h3>Ưu đãi đăng ký sớm:</h3>
          <ul>
            <li>Giảm 20% học phí cho học viên đăng ký trước 31/12/2024</li>
            <li>Tặng bộ giáo trình độc quyền trị giá 500.000đ</li>
            <li>Miễn phí 2 buổi học thử</li>
            <li>Tặng 1 tháng học online miễn phí</li>
          </ul>

          <h3>Thông tin liên hệ:</h3>
          <p><strong>Hotline:</strong> 077.230.5566</p>
          <p><strong>Địa chỉ cơ sở 1:</strong> Lô N01, chung cư K26, Đường Quảng Hàm, phường 7, quận Gò Vấp, TPHCM</p>
          <p><strong>Địa chỉ cơ sở 2:</strong> 71/31 Song Hành, phường Tân Hưng Thuận, quận 12</p>
          <p><strong>Địa chỉ cơ sở 3:</strong> 384/26 Nam Kỳ Khởi Nghĩa, phường 8, Quận 3</p>
        `,
        type: 'announcement',
        status: 'published',
        is_featured: true,
        image_url: '/images/all-image/event-1.jpg',
        author_id: 1,
        created_at: '2024-11-20T10:00:00Z',
        updated_at: '2024-11-20T10:00:00Z',
        published_at: '2024-11-20T10:00:00Z'
      },
      2: {
        id: 2,
        title: 'Chúc mừng học viên đạt IELTS 7.5+',
        excerpt: 'Xin chúc mừng các học viên DMT đạt điểm IELTS xuất sắc trong kỳ thi tháng 11/2024.',
        content: `
          <h2>Thành tích IELTS ấn tượng của học viên DMT</h2>
          <p>Trung tâm DMT Education xin chúc mừng các học viên đạt điểm IELTS xuất sắc trong kỳ thi tháng 11/2024.</p>
          
          <h3>Danh sách học viên đạt điểm cao:</h3>
          <ul>
            <li><strong>Lê Thị Hải Yến:</strong> IELTS 7.5 Overall (Listening 8.0, Reading 8.5, Writing 7.0, Speaking 7.0)</li>
            <li><strong>Nguyễn Minh Anh:</strong> IELTS 7.0 Overall</li>
            <li><strong>Trần Bảo Ngọc:</strong> IELTS 6.5 Overall</li>
            <li><strong>Lê Đức Minh:</strong> IELTS 6.5 Overall</li>
          </ul>

          <p>Thành tích này là kết quả của sự nỗ lực không ngừng nghỉ của các em học sinh cùng với phương pháp giảng dạy hiệu quả của đội ngũ giáo viên DMT.</p>

          <h3>Bí quyết thành công:</h3>
          <ul>
            <li>Lộ trình học rõ ràng, từ cơ bản đến nâng cao</li>
            <li>Giáo viên tận tâm, giàu kinh nghiệm</li>
            <li>Tài liệu độc quyền, cập nhật liên tục</li>
            <li>Luyện đề thường xuyên, chữa bài chi tiết</li>
            <li>Hỗ trợ học viên 24/7</li>
          </ul>

          <p>Chúc mừng các em! DMT Education tự hào về thành tích của các học viên.</p>
        `,
        type: 'news',
        status: 'published',
        is_featured: false,
        image_url: '/images/all-image/honor-7.5-ielts.jpg',
        author_id: 1,
        created_at: '2024-11-18T14:30:00Z',
        updated_at: '2024-11-18T14:30:00Z',
        published_at: '2024-11-18T14:30:00Z'
      },
      3: {
        id: 3,
        title: 'Vinh danh học sinh giữa kỳ 2 năm học 2024-2025',
        excerpt: 'Trung tâm DMT Education tổ chức lễ vinh danh học sinh có thành tích xuất sắc trong kỳ thi giữa kỳ 2.',
        content: `
          <h2>Lễ vinh danh học sinh xuất sắc giữa kỳ 2</h2>
          <p>Sáng ngày 15/11/2024, trung tâm DMT Education đã tổ chức lễ vinh danh học sinh có thành tích xuất sắc trong kỳ thi giữa kỳ 2 năm học 2024-2025.</p>

          <h3>Thống kê thành tích:</h3>
          <ul>
            <li>Hơn 50 học sinh đạt danh hiệu Học sinh giỏi</li>
            <li>30 học sinh đạt danh hiệu Học sinh xuất sắc</li>
            <li>20 học sinh có tiến bộ vượt bậc</li>
          </ul>

          <h3>Các giải thưởng:</h3>
          <ul>
            <li>Giải Nhất: Học bổng 5.000.000đ + Bằng khen</li>
            <li>Giải Nhì: Học bổng 3.000.000đ + Bằng khen</li>
            <li>Giải Ba: Học bổng 2.000.000đ + Bằng khen</li>
            <li>Giải Khuyến khích: Học bổng 1.000.000đ</li>
          </ul>

          <p>Lễ vinh danh không chỉ là dịp ghi nhận thành tích của các em mà còn là động lực to lớn để các em tiếp tục phấn đấu trong học tập.</p>

          <p>DMT Education cam kết luôn đồng hành cùng học viên trên con đường chinh phục tri thức!</p>
        `,
        type: 'event',
        status: 'published',
        is_featured: false,
        image_url: '/images/all-image/honor-mid-semester-2-2425-1.jpg',
        author_id: 1,
        created_at: '2024-11-15T09:00:00Z',
        updated_at: '2024-11-15T09:00:00Z',
        published_at: '2024-11-15T09:00:00Z'
      }
    };

    return mockData[newsId] || mockData[1];
  };

  const getRelatedMockNews = (): News[] => {
    return [
      {
        id: 4,
        title: 'Thông báo lịch nghỉ Tết Nguyên Đán 2025',
        excerpt: 'Trung tâm DMT Education thông báo lịch nghỉ Tết Nguyên Đán Ất Tỵ 2025.',
        content: '',
        type: 'announcement',
        status: 'published',
        is_featured: false,
        image_url: '/images/all-image/event-2.jpg',
        author_id: 1,
        created_at: '2024-11-10T16:00:00Z',
        updated_at: '2024-11-10T16:00:00Z',
        published_at: '2024-11-10T16:00:00Z'
      },
      {
        id: 5,
        title: 'Khai trương cơ sở mới tại Quận 3',
        excerpt: 'DMT Education hân hạnh thông báo khai trương cơ sở thứ 3 tại Quận 3, TP.HCM.',
        content: '',
        type: 'news',
        status: 'published',
        is_featured: false,
        image_url: '/images/all-image/event-3.jpg',
        author_id: 1,
        created_at: '2024-11-05T11:00:00Z',
        updated_at: '2024-11-05T11:00:00Z',
        published_at: '2024-11-05T11:00:00Z'
      },
      {
        id: 6,
        title: 'Thành tích VSAT xuất sắc năm học 2024-2025',
        excerpt: 'Chúc mừng học sinh DMT đạt điểm VSAT cao trong kỳ thi năm học 2024-2025.',
        content: '',
        type: 'news',
        status: 'published',
        is_featured: false,
        image_url: '/images/all-image/honor-vsat.jpg',
        author_id: 1,
        created_at: '2024-11-01T13:30:00Z',
        updated_at: '2024-11-01T13:30:00Z',
        published_at: '2024-11-01T13:30:00Z'
      }
    ];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return '#dc2626';
      case 'news': return '#16a34a';
      case 'event': return '#ea580c';
      default: return '#6b7280';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'announcement': return 'Thông báo';
      case 'news': return 'Tin tức';
      case 'event': return 'Sự kiện';
      default: return 'Khác';
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = news?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Đã sao chép link!');
        break;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          minHeight: '60vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '3px solid #f3f4f6',
              borderTop: '3px solid #dc2626',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }} />
            <p style={{ color: '#6b7280' }}>Đang tải...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div style={{ 
          minHeight: '60vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Không tìm thấy bài viết</h2>
          <button
            onClick={() => navigate('/announcements')}
            style={{
              padding: '12px 24px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Quay lại danh sách
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${news.title} - DMT Education`}
        description={news.excerpt || news.title}
        keywords={`DMT Education, ${getTypeLabel(news.type)}, ${news.title}`}
      />
      
      <Layout>
        <article style={{ background: '#ffffff', minHeight: '100vh' }}>
          {/* Back Button */}
          <div style={{ 
            background: '#f9fafb',
            padding: '20px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <button
                onClick={() => navigate('/announcements')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#374151',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <ArrowLeft size={20} />
                Quay lại
              </button>
            </div>
          </div>

          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            padding: '60px 20px',
            color: 'white'
          }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              {/* Category Badge */}
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '20px'
              }}>
                {getTypeLabel(news.type)}
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: '42px',
                fontWeight: 800,
                marginBottom: '24px',
                lineHeight: 1.3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}>
                {news.title}
              </h1>

              {/* Meta Info */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                fontSize: '15px',
                opacity: 0.95
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} />
                  {formatDate(news.published_at || news.created_at)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} />
                  {Math.floor(Math.random() * 2000) + 500} lượt xem
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {news.image_url && (
            <div style={{ 
              maxWidth: '1200px', 
              margin: '-60px auto 0',
              padding: '0 20px',
              position: 'relative',
              zIndex: 1
            }}>
              <img
                src={news.image_url}
                alt={news.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  border: '4px solid white'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto',
            padding: '60px 20px'
          }}>
            {/* Excerpt */}
            {news.excerpt && (
              <div style={{
                fontSize: '20px',
                lineHeight: 1.8,
                color: '#374151',
                padding: '24px',
                background: '#f9fafb',
                borderLeft: '4px solid #dc2626',
                borderRadius: '8px',
                marginBottom: '40px',
                fontWeight: 500
              }}>
                {news.excerpt}
              </div>
            )}

            {/* Main Content */}
            <div 
              style={{
                fontSize: '17px',
                lineHeight: 1.9,
                color: '#1f2937'
              }}
              dangerouslySetInnerHTML={{ __html: news.content }}
              className="article-content"
            />

            {/* Share Buttons */}
            <div style={{
              marginTop: '60px',
              paddingTop: '40px',
              borderTop: '2px solid #e5e7eb'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 700,
                marginBottom: '20px',
                color: '#111827'
              }}>
                Chia sẻ bài viết
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleShare('facebook')}
                  style={{
                    padding: '12px 24px',
                    background: '#1877f2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    fontWeight: 600
                  }}
                >
                  <Facebook size={20} />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  style={{
                    padding: '12px 24px',
                    background: '#1da1f2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    fontWeight: 600
                  }}
                >
                  <Twitter size={20} />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  style={{
                    padding: '12px 24px',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    fontWeight: 600
                  }}
                >
                  <LinkIcon size={20} />
                  Sao chép link
                </button>
              </div>
            </div>
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div style={{
              background: '#f9fafb',
              padding: '80px 20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  marginBottom: '40px',
                  color: '#111827'
                }}>
                  Bài viết liên quan
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '32px'
                }}>
                  {relatedNews.filter(item => item.id !== news.id).slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/announcements/${item.id}`)}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        border: '2px solid #e5e7eb'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                        e.currentTarget.style.borderColor = getTypeColor(item.type);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }}
                    >
                      {item.image_url && (
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                          <img
                            src={item.image_url}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      )}
                      <div style={{ padding: '24px' }}>
                        <div style={{
                          display: 'inline-block',
                          background: `${getTypeColor(item.type)}15`,
                          color: getTypeColor(item.type),
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          marginBottom: '12px'
                        }}>
                          {getTypeLabel(item.type)}
                        </div>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          marginBottom: '12px',
                          color: '#111827',
                          lineHeight: 1.4
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: 1.6
                        }}>
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .article-content h2 {
            font-size: 28px;
            font-weight: 700;
            margin: 40px 0 20px;
            color: #111827;
          }

          .article-content h3 {
            font-size: 22px;
            font-weight: 700;
            margin: 32px 0 16px;
            color: #374151;
          }

          .article-content p {
            margin-bottom: 20px;
          }

          .article-content ul, .article-content ol {
            margin: 20px 0;
            padding-left: 32px;
          }

          .article-content li {
            margin-bottom: 12px;
            line-height: 1.8;
          }

          .article-content strong {
            font-weight: 700;
            color: #dc2626;
          }

          .article-content a {
            color: #dc2626;
            text-decoration: underline;
          }

          .article-content a:hover {
            color: #991b1b;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default AnnouncementDetailPage;
