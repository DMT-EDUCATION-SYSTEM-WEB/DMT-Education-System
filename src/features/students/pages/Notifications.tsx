import React, { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, Mail, MailOpen, FileText, BarChart3, CreditCard, Settings } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'general' | 'assignment' | 'grade' | 'payment' | 'system';
  isRead: boolean;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // TODO: Integrate with Supabase API
      // const data = await studentService.getNotifications();
      
      // Mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Bài tập mới đã được giao',
          message: 'Giáo viên đã giao bài tập "Phương trình bậc 2" cho khóa Toán 10. Hạn nộp: 15/10/2025',
          type: 'assignment',
          isRead: false,
          createdAt: '2025-10-01T10:30:00Z'
        },
        {
          id: '2',
          title: 'Điểm kiểm tra đã được cập nhật',
          message: 'Điểm kiểm tra môn Vật Lý đã được cập nhật. Xem chi tiết tại bảng điểm.',
          type: 'grade',
          isRead: false,
          createdAt: '2025-09-30T14:20:00Z'
        },
        {
          id: '3',
          title: 'Nhắc nhở thanh toán học phí',
          message: 'Học phí tháng 10/2025 sắp đến hạn. Vui lòng thanh toán trước ngày 15/10/2025.',
          type: 'payment',
          isRead: true,
          createdAt: '2025-09-28T09:00:00Z'
        },
        {
          id: '4',
          title: 'Lịch học đã được cập nhật',
          message: 'Lịch học môn Hóa học đã được thay đổi. Vui lòng kiểm tra lại thời khóa biểu.',
          type: 'general',
          isRead: true,
          createdAt: '2025-09-25T16:45:00Z'
        },
        {
          id: '5',
          title: 'Bảo trì hệ thống',
          message: 'Hệ thống sẽ bảo trì từ 23:00 - 23:30 tối nay. Vui lòng không đăng nhập trong thời gian này.',
          type: 'system',
          isRead: true,
          createdAt: '2025-09-24T18:00:00Z'
        }
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      // TODO: API call to mark as read
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // TODO: API call to mark all as read
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: API call to delete notification
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText size={20} />;
      case 'grade':
        return <BarChart3 size={20} />;
      case 'payment':
        return <CreditCard size={20} />;
      case 'system':
        return <Settings size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-50';
      case 'grade':
        return 'bg-green-50';
      case 'payment':
        return 'bg-yellow-50';
      case 'system':
        return 'bg-gray-50';
      default:
        return 'bg-red-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInHours < 48) return 'Hôm qua';
    
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
          <p className="mt-1 text-sm text-gray-600">
            {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : 'Bạn đã đọc tất cả thông báo'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Đánh dấu đã đọc tất cả</span>
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            filter === 'all'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Tất cả ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            filter === 'unread'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Chưa đọc ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg border transition-all ${
              notification.isRead 
                ? 'border-gray-200' 
                : 'border-primary-200 shadow-sm'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getTypeBgColor(notification.type)} flex items-center justify-center text-xl`}>
                  {getTypeIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-semibold ${
                          notification.isRead ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                        )}
                      </div>
                      <p className={`mt-1 text-sm ${
                        notification.isRead ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Đánh dấu đã đọc"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {filter === 'unread' ? 'Không có thông báo chưa đọc' : 'Chưa có thông báo'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'unread' 
              ? 'Bạn đã đọc tất cả thông báo' 
              : 'Thông báo của bạn sẽ hiển thị tại đây'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
