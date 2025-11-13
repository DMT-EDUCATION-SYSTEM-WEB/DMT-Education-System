import React, { useEffect, useState } from 'react';
import { getStudentVideos } from '../api';
import Card from '../../../components/common/Card';
import Spinner from '../../../components/common/Spinner';
import { Video as VideoIcon, Lightbulb, CheckCircle } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  thumbnail?: string;
  watchedProgress: number;
  isCompleted: boolean;
}

const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
  <Card className="overflow-hidden">
    <div className="aspect-video bg-gray-100 relative">
      {video.thumbnail ? (
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <VideoIcon size={40} className="text-blue-600" />
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {video.duration}
      </div>
      {video.isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
          <CheckCircle size={12} className="text-green-600" />
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900">{video.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{video.description}</p>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Tiến độ</span>
          <span>{video.watchedProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all" 
            style={{ width: `${video.watchedProgress}%` }}
          />
        </div>
      </div>

      <button 
        className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition"
        onClick={() => window.open(video.url, '_blank')}
      >
        {video.watchedProgress > 0 ? 'Tiếp tục xem' : 'Bắt đầu xem'}
      </button>
    </div>
  </Card>
);

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        // Fallback with mock data since API might not be ready
        const mockVideos: Video[] = [
          {
            id: '1',
            title: 'Toán 9 - Phương trình bậc 2',
            description: 'Học cách giải phương trình bậc 2 với các ví dụ cụ thể',
            duration: '45:30',
            url: '#',
            watchedProgress: 75,
            isCompleted: false
          },
          {
            id: '2',
            title: 'Lý 9 - Động học chất điểm',
            description: 'Tìm hiểu về chuyển động thẳng đều và biến đổi đều',
            duration: '38:15',
            url: '#',
            watchedProgress: 100,
            isCompleted: true
          },
          {
            id: '3',
            title: 'Hóa 9 - Axit và bazơ',
            description: 'Khái niệm và tính chất của axit, bazơ trong hóa học',
            duration: '42:20',
            url: '#',
            watchedProgress: 0,
            isCompleted: false
          }
        ];
        setVideos(mockVideos);
      } catch (err: any) {
        setError(err.message || 'Không thể tải video');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const filteredVideos = videos.filter(video => {
    if (filter === 'completed') return video.isCompleted;
    if (filter === 'in-progress') return video.watchedProgress > 0 && !video.isCompleted;
    return true;
  });

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải video...
    </div>
  );

  if (error) return (
    <div className="text-red-600 bg-red-50 p-4 rounded-md">
      Lỗi: {error}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Video bài học</h1>
        <p className="text-sm text-gray-600">Xem lại các buổi học đã ghi hình. Video được bảo vệ bản quyền.</p>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'in-progress', label: 'Đang xem' },
          { key: 'completed', label: 'Đã hoàn thành' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              filter === key
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            Không có video nào phù hợp với bộ lọc hiện tại.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      <Card>
        <div className="text-center py-4">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Lightbulb size={14} /> Video được bảo vệ bản quyền - không thể tải xuống
          </p>
          <p className="text-xs text-gray-500">Tối đa 3 thiết bị có thể xem cùng lúc</p>
        </div>
      </Card>
    </div>
  );
};

export default Videos;