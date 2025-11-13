import React, { useEffect, useState } from 'react';
import { getStudentSchedule } from '../api';
import Card from '../../../components/common/Card';
import Spinner from '../../../components/common/Spinner';
import { Calendar } from 'lucide-react';

interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  teacher: string;
  room: string;
  date: string;
  type: 'class' | 'exam' | 'assignment';
  status: 'upcoming' | 'ongoing' | 'completed';
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'exam': return 'bg-red-100 text-red-700';
    case 'assignment': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-blue-100 text-blue-700';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ongoing': return 'bg-green-500';
    case 'completed': return 'bg-gray-400';
    default: return 'bg-primary-500';
  }
};

const ScheduleCard: React.FC<{ item: ScheduleItem }> = ({ item }) => (
  <Card className="relative">
    <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(item.status)}`} />
    <div className="pl-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{item.subject}</h3>
          <p className="text-sm text-gray-600">{item.teacher}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
          {item.type === 'class' ? 'Lớp học' : item.type === 'exam' ? 'Kiểm tra' : 'Bài tập'}
        </span>
      </div>
      
      <div className="mt-3 grid grid-cols-3 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Thời gian:</span>
          <p>{item.time}</p>
        </div>
        <div>
          <span className="font-medium">Phòng:</span>
          <p>{item.room}</p>
        </div>
        <div>
          <span className="font-medium">Ngày:</span>
          <p>{item.date}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${getStatusColor(item.status)}`} />
        <span className="text-xs text-gray-500 capitalize">
          {item.status === 'upcoming' ? 'Sắp tới' : 
           item.status === 'ongoing' ? 'Đang diễn ra' : 'Đã hoàn thành'}
        </span>
      </div>
    </div>
  </Card>
);

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('today');

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        // Mock data since API might not be ready
        const mockSchedule: ScheduleItem[] = [
          {
            id: '1',
            subject: 'Toán 9',
            time: '08:00 - 09:30',
            teacher: 'Thầy Minh',
            room: 'A101',
            date: '09/08/2025',
            type: 'class',
            status: 'upcoming'
          },
          {
            id: '2',
            subject: 'Vật lý 9',
            time: '10:00 - 11:30',
            teacher: 'Cô Hương',
            room: 'B203',
            date: '09/08/2025',
            type: 'class',
            status: 'upcoming'
          },
          {
            id: '3',
            subject: 'Hóa học 9',
            time: '14:00 - 15:30',
            teacher: 'Thầy Đức',
            room: 'C105',
            date: '09/08/2025',
            type: 'exam',
            status: 'upcoming'
          },
          {
            id: '4',
            subject: 'Toán 9 - Bài tập',
            time: '23:59',
            teacher: 'Thầy Minh',
            room: 'Online',
            date: '10/08/2025',
            type: 'assignment',
            status: 'upcoming'
          }
        ];
        setSchedule(mockSchedule);
      } catch (err: any) {
        setError(err.message || 'Không thể tải thời khóa biểu');
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, []);

  const filteredSchedule = schedule.filter(item => {
    const today = new Date().toDateString();
    const itemDate = new Date(item.date.split('/').reverse().join('-')).toDateString();
    
    if (filter === 'today') return itemDate === today;
    if (filter === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return new Date(item.date.split('/').reverse().join('-')) <= weekFromNow;
    }
    return true;
  });

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải thời khóa biểu...
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
        <h1 className="text-xl font-semibold text-gray-900">Thời khóa biểu cá nhân</h1>
        <p className="text-sm text-gray-600">Lịch học và deadline bài tập của bạn. Có thể đồng bộ với Google Calendar.</p>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'today', label: 'Hôm nay' },
          { key: 'week', label: 'Tuần này' },
          { key: 'all', label: 'Tất cả' }
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

      {filteredSchedule.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            Không có lịch học nào trong khoảng thời gian này.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredSchedule.map(item => (
            <ScheduleCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <Card>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium flex items-center gap-2"><Calendar size={16} /> Tính năng hỗ trợ:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Nhận thông báo nhắc nhở qua email/SMS</li>
            <li>Đồng bộ với Google Calendar</li>
            <li>Cảnh báo deadline bài tập</li>
            <li>Gửi feedback cho giáo viên</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Schedule;