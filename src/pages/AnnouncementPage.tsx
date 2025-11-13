import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/common';
import Layout from '../components/layout/Layout';
import { newsApi, News } from '../services/news';
import {
  Bell,
  Calendar,
  Clock,
  Tag,
  Search,
  Filter,
  ChevronRight,
  Megaphone,
  TrendingUp,
  Star,
  AlertCircle,
  X
} from 'lucide-react';

const AnnouncementPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredNews, setFeaturedNews] = useState<News | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getAll({
        status: 'published',
        limit: 20,
        page: 1
      });
      setNews(response.data);
      
      // Set featured news (first featured item or first item)
      const featured = response.data.find(item => item.is_featured) || response.data[0];
      setFeaturedNews(featured || null);
    } catch (err) {
      console.error('Failed to load news:', err);
      setNews(getMockNews());
      setFeaturedNews(getMockNews()[0]);
    } finally {
      setLoading(false);
    }
  };

  const getMockNews = (): News[] => [
    {
      id: 1,
      title: 'Khai giảng khóa học IELTS Intensive - Tháng 1/2025',
      excerpt: 'DMT Education chính thức khai giảng khóa học IELTS Intensive với đội ngũ giảng viên 8.0+ IELTS',
      content: '',
      type: 'announcement',
      status: 'published',
      is_featured: true,
      image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      published_at: '2025-01-10',
      created_at: '2025-01-10',
      author_id: 1
    },
    {
      id: 2,
      title: 'Học viên DMT đạt 8.5 IELTS sau 3 tháng học',
      excerpt: 'Chúc mừng em Nguyễn Minh Anh đã đạt 8.5 IELTS Overall chỉ sau 3 tháng học tại DMT Education',
      content: '',
      type: 'news',
      status: 'published',
      is_featured: false,
      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      published_at: '2025-01-08',
      created_at: '2025-01-08',
      author_id: 1
    },
    {
      id: 3,
      title: 'Workshop: Kỹ năng học tập hiệu quả',
      excerpt: 'Tham gia workshop miễn phí về kỹ năng học tập và quản lý thời gian hiệu quả cùng chuyên gia',
      content: '',
      type: 'event',
      status: 'published',
      is_featured: false,
      image_url: 'https://images.unsplash.com/photo-1559223607-a43c990af5d1?w=800&h=600&fit=crop',
      published_at: '2025-01-05',
      created_at: '2025-01-05',
      author_id: 1
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Bell, color: '#374151' },
    { id: 'announcement', name: 'Thông báo', icon: Megaphone, color: '#3b82f6' },
    { id: 'news', name: 'Tin tức', icon: TrendingUp, color: '#10b981' },
    { id: 'event', name: 'Sự kiện', icon: Calendar, color: '#f59e0b' },
  ];

  const filteredNews = news.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return '#3b82f6';
      case 'news': return '#10b981';
      case 'event': return '#f59e0b';
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

  return (
    <>
      <SEOHead 
        title="DMT Education - Thông báo & Tin tức"
        description="Thông báo và tin tức mới nhất từ DMT Education"
        keywords="DMT Education, thông báo, tin tức, hoạt động, sự kiện"
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
                <Bell size={16} style={{ display: 'inline', marginRight: '8px', marginBottom: '-2px' }} />
                Thông báo & Tin tức
              </div>
              
              <h1 style={{
                fontSize: '42px',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#111827',
                lineHeight: '1.2'
              }}>
                Cập nhật mới nhất
              </h1>
              
              <p style={{
                fontSize: '17px',
                color: '#6b7280',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Những thông tin, tin tức và sự kiện mới nhất từ DMT Education
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{
          background: '#ffffff',
          padding: '30px 1rem',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '25px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
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
                  placeholder="Tìm kiếm thông báo, tin tức..."
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
            </div>

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}>
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedType === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedType(category.id)}
                    style={{
                      padding: '10px 20px',
                      background: isActive ? '#f9fafb' : 'white',
                      color: isActive ? '#111827' : '#6b7280',
                      border: `2px solid ${isActive ? category.color : '#e5e7eb'}`,
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: isActive ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={16} color={isActive ? category.color : '#6b7280'} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 1rem',
          background: '#ffffff'
        }}>
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 0',
              color: '#6b7280'
            }}>
              <div style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '4px solid #f3f4f6',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '20px', fontSize: '16px' }}>Đang tải...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280'
            }}>
              <AlertCircle size={64} style={{ opacity: 0.3, marginBottom: '20px' }} />
              <p style={{ fontSize: '18px', fontWeight: '600' }}>Không tìm thấy kết quả</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            <>
              {/* Featured News */}
              {featuredNews && selectedType === 'all' && !searchQuery && (
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '40px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '0'
                  }}>
                    <div style={{
                      height: '400px',
                      background: featuredNews.image_url 
                        ? `url(${featuredNews.image_url}) center/cover` 
                        : '#e5e7eb'
                    }}></div>
                    <div style={{ padding: '40px' }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        background: getTypeColor(featuredNews.type),
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '16px'
                      }}>
                        <Star size={14} style={{ display: 'inline', marginRight: '4px', marginBottom: '-2px' }} />
                        Nổi bật
                      </div>
                      
                      <h2 style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        color: '#111827',
                        marginBottom: '16px',
                        lineHeight: '1.3'
                      }}>
                        {featuredNews.title}
                      </h2>
                      
                      <p style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        lineHeight: '1.6',
                        marginBottom: '24px'
                      }}>
                        {featuredNews.excerpt}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '24px',
                        fontSize: '14px',
                        color: '#9ca3af'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={16} />
                          {formatDate(featuredNews.published_at || featuredNews.created_at)}
                        </div>
                        <div style={{
                          padding: '4px 10px',
                          background: `${getTypeColor(featuredNews.type)}15`,
                          color: getTypeColor(featuredNews.type),
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {getTypeLabel(featuredNews.type)}
                        </div>
                      </div>
                      
                      <button style={{
                        padding: '12px 24px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        Xem chi tiết
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* News Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {filteredNews.map((item) => (
                  <article
                    key={item.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = getTypeColor(item.type);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <div style={{
                      height: '200px',
                      background: item.image_url 
                        ? `url(${item.image_url}) center/cover` 
                        : '#f3f4f6',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '6px 12px',
                        background: getTypeColor(item.type),
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {getTypeLabel(item.type)}
                      </div>
                      {item.is_featured && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '6px 10px',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          <Star size={12} style={{ display: 'inline', marginBottom: '-1px' }} />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ padding: '20px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '12px',
                        fontSize: '13px',
                        color: '#9ca3af'
                      }}>
                        <Clock size={14} />
                        {formatDate(item.published_at || item.created_at)}
                      </div>
                      
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '10px',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.title}
                      </h3>
                      
                      {item.excerpt && (
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.6',
                          marginBottom: '16px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {item.excerpt}
                        </p>
                      )}
                      
                      <button style={{
                        color: getTypeColor(item.type),
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: 0
                      }}>
                        Đọc thêm
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Animations */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Layout>
    </>
  );
};

export default AnnouncementPage;
