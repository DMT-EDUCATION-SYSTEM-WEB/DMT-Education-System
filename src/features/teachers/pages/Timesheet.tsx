import React, { useState } from 'react';
import { SEOHead } from '../../../components/common';
import TeacherLayout from '../../../components/layout/TeacherLayout';

interface TimesheetEntry {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'leave';
  notes: string;
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

const Timesheet: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('2025-08');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: 'personal' as 'sick' | 'personal' | 'vacation' | 'emergency',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [timesheets] = useState<TimesheetEntry[]>([
    {
      id: '1',
      date: '2025-08-14',
      checkIn: '08:00',
      checkOut: '17:00',
      totalHours: 8,
      status: 'present',
      notes: 'Dạy lớp 10A, 11B'
    },
    {
      id: '2',
      date: '2025-08-13',
      checkIn: '08:15',
      checkOut: '17:00',
      totalHours: 7.75,
      status: 'late',
      notes: 'Muộn 15 phút do kẹt xe'
    },
    {
      id: '3',
      date: '2025-08-12',
      checkIn: '-',
      checkOut: '-',
      totalHours: 0,
      status: 'leave',
      notes: 'Nghỉ phép cá nhân'
    }
  ]);

  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      type: 'personal',
      startDate: '2025-08-20',
      endDate: '2025-08-21',
      reason: 'Việc gia đình',
      status: 'pending',
      submittedAt: '2025-08-14T10:00:00'
    },
    {
      id: '2',
      type: 'sick',
      startDate: '2025-08-12',
      endDate: '2025-08-12',
      reason: 'Ốm',
      status: 'approved',
      submittedAt: '2025-08-11T15:30:00'
    }
  ]);

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
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case 'sick': return 'Nghỉ ốm';
      case 'personal': return 'Nghỉ phép';
      case 'vacation': return 'Nghỉ lễ';
      case 'emergency': return 'Nghỉ khẩn cấp';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  const handleSubmitLeave = () => {
    // Handle leave request submission
    console.log('Leave request:', leaveForm);
    setShowLeaveModal(false);
    setLeaveForm({
      type: 'personal',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  // Calculate summary stats
  const totalDays = timesheets.length;
  const presentDays = timesheets.filter(t => t.status === 'present').length;
  const lateDays = timesheets.filter(t => t.status === 'late').length;
  const leaveDays = timesheets.filter(t => t.status === 'leave').length;
  const totalHours = timesheets.reduce((sum, t) => sum + t.totalHours, 0);

  return (
    <>
      <SEOHead 
        title="Chấm công - DMT Education"
        description="Quản lý chấm công và đăng ký nghỉ phép"
        keywords="chấm công, nghỉ phép, thời gian làm việc"
      />
      
      <TeacherLayout>
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '4px'
              }}>
                ⏰ Chấm công & Nghỉ phép
              </h1>
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                Quản lý thời gian làm việc và đăng ký nghỉ phép
              </p>
            </div>
            
            <button
              onClick={() => setShowLeaveModal(true)}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              ➕ Đăng ký nghỉ phép
            </button>
          </div>

          {/* Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Tổng ngày làm
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    {totalDays}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>📅</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Đi làm đúng giờ
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>
                    {presentDays}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>✅</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Đi muộn
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>
                    {lateDays}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>⏰</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Nghỉ phép
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
                    {leaveDays}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>🏠</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Tổng giờ làm
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    {totalHours}h
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>⏱️</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Timesheet Table */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
                  Bảng chấm công tháng {currentMonth}
                </h2>
                <input
                  type="month"
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Ngày
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Giờ vào
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Giờ ra
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Tổng giờ
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Trạng thái
                        </th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                          Ghi chú
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {timesheets.map((entry) => (
                        <tr key={entry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#1e293b' }}>
                            {formatDate(entry.date)}
                          </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#1e293b' }}>
                            {entry.checkIn}
                          </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#1e293b' }}>
                            {entry.checkOut}
                          </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#1e293b' }}>
                            {entry.totalHours}h
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }} className={getStatusColor(entry.status)}>
                              {entry.status === 'present' ? 'Có mặt' :
                               entry.status === 'late' ? 'Muộn' :
                               entry.status === 'absent' ? 'Vắng' :
                               'Nghỉ phép'}
                            </span>
                          </td>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>
                            {entry.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Leave Requests */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
                  Đơn nghỉ phép
                </h2>
              </div>

              <div style={{ padding: '20px' }}>
                {leaveRequests.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#64748b'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
                    <p>Chưa có đơn nghỉ phép nào</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {leaveRequests.map((request) => (
                      <div key={request.id} style={{
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                            {getLeaveTypeLabel(request.type)}
                          </h3>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }} className={getLeaveStatusColor(request.status)}>
                            {request.status === 'pending' ? 'Chờ duyệt' :
                             request.status === 'approved' ? 'Đã duyệt' :
                             'Từ chối'}
                          </span>
                        </div>
                        
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                          <p style={{ marginBottom: '4px' }}>
                            📅 {formatDate(request.startDate)} → {formatDate(request.endDate)}
                          </p>
                          <p>
                            🕒 Gửi lúc: {formatDateTime(request.submittedAt)}
                          </p>
                        </div>
                        
                        <p style={{ fontSize: '14px', color: '#1e293b' }}>
                          <strong>Lý do:</strong> {request.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leave Request Modal */}
          {showLeaveModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '12px',
                width: '500px',
                maxWidth: '90vw'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>
                  Đăng ký nghỉ phép
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Loại nghỉ phép
                  </label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value as any})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="personal">Nghỉ phép cá nhân</option>
                    <option value="sick">Nghỉ ốm</option>
                    <option value="vacation">Nghỉ lễ</option>
                    <option value="emergency">Nghỉ khẩn cấp</option>
                  </select>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                      Từ ngày
                    </label>
                    <input
                      type="date"
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                      Đến ngày
                    </label>
                    <input
                      type="date"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Lý do nghỉ phép
                  </label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                    placeholder="Nhập lý do nghỉ phép..."
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setShowLeaveModal(false)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy
                  </button>
                  
                  <button
                    onClick={handleSubmitLeave}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Gửi đơn
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </TeacherLayout>
    </>
  );
};

export default Timesheet;