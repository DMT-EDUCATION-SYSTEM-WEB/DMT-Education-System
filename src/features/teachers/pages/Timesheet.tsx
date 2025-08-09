import React, { useEffect, useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner';
import Modal from '../../../components/common/Modal';

interface TimesheetEntry {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  overtime: number;
  status: 'present' | 'absent' | 'late' | 'leave';
  notes: string;
  activities: string[];
}

interface LeaveRequest {
  id: string;
  type: 'sick' | 'personal' | 'vacation' | 'emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface WorkSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  totalHours: number;
  overtimeHours: number;
  leavesTaken: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'present': return 'bg-green-100 text-green-700';
    case 'late': return 'bg-yellow-100 text-yellow-700';
    case 'absent': return 'bg-red-100 text-red-700';
    case 'leave': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getLeaveStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    default: return 'bg-yellow-100 text-yellow-700';
  }
};

const TimesheetRow: React.FC<{ 
  entry: TimesheetEntry; 
  onUpdate: (id: string, updates: Partial<TimesheetEntry>) => void;
}> = ({ entry, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(entry.notes);

  const handleNotesUpdate = () => {
    onUpdate(entry.id, { notes });
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3 border-b">
          <div className="font-medium text-gray-900">
            {new Date(entry.date).toLocaleDateString('vi-VN')}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(entry.date).toLocaleDateString('vi-VN', { weekday: 'long' })}
          </div>
        </td>
        <td className="px-4 py-3 border-b">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(entry.status)}`}>
            {entry.status === 'present' ? 'Có mặt' :
             entry.status === 'late' ? 'Đi muộn' :
             entry.status === 'absent' ? 'Vắng mặt' : 'Nghỉ phép'}
          </span>
        </td>
        <td className="px-4 py-3 border-b text-sm text-gray-600">
          {entry.checkIn || '--'}
        </td>
        <td className="px-4 py-3 border-b text-sm text-gray-600">
          {entry.checkOut || '--'}
        </td>
        <td className="px-4 py-3 border-b">
          <div className="text-sm font-medium text-gray-900">
            {entry.totalHours.toFixed(1)}h
          </div>
          {entry.overtime > 0 && (
            <div className="text-xs text-blue-600">
              +{entry.overtime.toFixed(1)}h OT
            </div>
          )}
        </td>
        <td className="px-4 py-3 border-b">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Thu gọn' : 'Chi tiết'}
          </Button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-4 py-3 bg-gray-50 border-b">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Hoạt động trong ngày</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {entry.activities.map((activity, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ghi chú</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Thêm ghi chú..."
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <Button size="sm" onClick={handleNotesUpdate}>
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const LeaveRequestForm: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>) => void;
}> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'personal' as const,
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ type: 'personal', startDate: '', endDate: '', reason: '' });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Đăng ký nghỉ phép">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại nghỉ phép *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="personal">Nghỉ phép cá nhân</option>
            <option value="sick">Nghỉ ốm</option>
            <option value="vacation">Nghỉ lễ</option>
            <option value="emergency">Nghỉ khẩn cấp</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Từ ngày *
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đến ngày *
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lý do nghỉ phép *
          </label>
          <textarea
            required
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Mô tả lý do cần nghỉ phép..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Gửi đăng ký
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Hủy
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const Timesheet: React.FC = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [summary, setSummary] = useState<WorkSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isLeaveFormOpen, setIsLeaveFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'timesheet' | 'leave'>('timesheet');

  useEffect(() => {
    loadTimesheetData();
  }, [selectedMonth]);

  const loadTimesheetData = async () => {
    try {
      setLoading(true);
      // Mock data since API might not be ready
      const mockEntries: TimesheetEntry[] = [
        {
          id: '1',
          date: '2025-08-14',
          checkIn: '07:30',
          checkOut: '16:45',
          totalHours: 8.5,
          overtime: 0.5,
          status: 'present',
          notes: 'Hoàn thành đầy đủ công việc',
          activities: ['Giảng dạy lớp 9A (2 tiết)', 'Chấm bài kiểm tra', 'Họp tổ bộ môn']
        },
        {
          id: '2',
          date: '2025-08-13',
          checkIn: '08:05',
          checkOut: '16:30',
          totalHours: 7.8,
          overtime: 0,
          status: 'late',
          notes: 'Đến muộn do kẹt xe',
          activities: ['Giảng dạy lớp 9B (3 tiết)', 'Tư vấn học sinh', 'Chuẩn bị bài giảng']
        },
        {
          id: '3',
          date: '2025-08-12',
          checkIn: '--',
          checkOut: '--',
          totalHours: 0,
          overtime: 0,
          status: 'leave',
          notes: 'Nghỉ phép được duyệt',
          activities: []
        }
      ];

      const mockLeaveRequests: LeaveRequest[] = [
        {
          id: '1',
          type: 'personal',
          startDate: '2025-08-12',
          endDate: '2025-08-12',
          reason: 'Đi khám sức khỏe định kỳ',
          status: 'approved',
          submittedAt: '2025-08-10'
        },
        {
          id: '2',
          type: 'sick',
          startDate: '2025-08-20',
          endDate: '2025-08-21',
          reason: 'Bị cảm sốt, cần nghỉ ngơi',
          status: 'pending',
          submittedAt: '2025-08-14'
        }
      ];

      const mockSummary: WorkSummary = {
        totalDays: 14,
        presentDays: 12,
        absentDays: 0,
        lateDays: 1,
        totalHours: 96.3,
        overtimeHours: 4.5,
        leavesTaken: 1
      };

      setEntries(mockEntries);
      setLeaveRequests(mockLeaveRequests);
      setSummary(mockSummary);
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu chấm công');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEntry = (id: string, updates: Partial<TimesheetEntry>) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const handleSubmitLeaveRequest = (requestData: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newRequest: LeaveRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
  };

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải dữ liệu chấm công...
    </div>
  );

  if (error) return (
    <div className="text-red-600 bg-red-50 p-4 rounded-md">
      Lỗi: {error}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Chấm công & Nghỉ phép</h1>
          <p className="text-sm text-gray-600">Quản lý thời gian làm việc và đăng ký nghỉ phép</p>
        </div>
        <Button onClick={() => setIsLeaveFormOpen(true)}>
          + Đăng ký nghỉ phép
        </Button>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{summary.presentDays}</div>
              <div className="text-sm text-gray-600">Ngày có mặt</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{summary.totalHours.toFixed(1)}h</div>
              <div className="text-sm text-gray-600">Tổng giờ làm</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summary.overtimeHours.toFixed(1)}h</div>
              <div className="text-sm text-gray-600">Giờ tăng ca</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{summary.leavesTaken}</div>
              <div className="text-sm text-gray-600">Ngày nghỉ phép</div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-gray-200">
        {[
          { key: 'timesheet', label: 'Bảng chấm công' },
          { key: 'leave', label: 'Đơn nghỉ phép' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === key
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'timesheet' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Bảng chấm công</h2>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giờ vào
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giờ ra
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng giờ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map(entry => (
                  <TimesheetRow 
                    key={entry.id}
                    entry={entry}
                    onUpdate={handleUpdateEntry}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'leave' && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn nghỉ phép</h2>
          
          <div className="space-y-4">
            {leaveRequests.map(request => (
              <div key={request.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">
                        {request.type === 'personal' ? 'Nghỉ phép cá nhân' :
                         request.type === 'sick' ? 'Nghỉ ốm' :
                         request.type === 'vacation' ? 'Nghỉ lễ' : 'Nghỉ khẩn cấp'}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getLeaveStatusColor(request.status)}`}>
                        {request.status === 'approved' ? 'Đã duyệt' :
                         request.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Thời gian:</span> {request.startDate} → {request.endDate}
                      </div>
                      <div>
                        <span className="font-medium">Ngày gửi:</span> {request.submittedAt}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Lý do:</span> {request.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {leaveRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Chưa có đơn nghỉ phép nào.
              </div>
            )}
          </div>
        </Card>
      )}

      <LeaveRequestForm
        open={isLeaveFormOpen}
        onClose={() => setIsLeaveFormOpen(false)}
        onSubmit={handleSubmitLeaveRequest}
      />
    </div>
  );
};

export default Timesheet;