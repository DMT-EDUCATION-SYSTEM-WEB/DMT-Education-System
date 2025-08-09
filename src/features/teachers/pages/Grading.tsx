import React, { useEffect, useState } from 'react';
import { getGradingData } from '../api';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner';
import Modal from '../../../components/common/Modal';

interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  assignmentId: string;
  assignmentTitle: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  currentScore?: number;
  maxScore: number;
  files: string[];
  teacherComment?: string;
  submissionText?: string;
  gradedAt?: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  maxScore: number;
  submissionCount: number;
  gradedCount: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'graded': return 'bg-green-100 text-green-700';
    case 'late': return 'bg-red-100 text-red-700';
    default: return 'bg-yellow-100 text-yellow-700';
  }
};

const SubmissionCard: React.FC<{ 
  submission: StudentSubmission; 
  onGrade: (submission: StudentSubmission) => void;
}> = ({ submission, onGrade }) => (
  <Card>
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3 flex-1">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          {submission.studentAvatar ? (
            <img src={submission.studentAvatar} alt={submission.studentName} className="h-10 w-10 rounded-full" />
          ) : (
            <span className="text-sm font-medium text-gray-600">
              {submission.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{submission.studentName}</h3>
          <p className="text-sm text-gray-600">{submission.assignmentTitle}</p>
          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
            <span>Nộp: {submission.submittedAt}</span>
            {submission.gradedAt && <span>Chấm: {submission.gradedAt}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(submission.status)}`}>
          {submission.status === 'submitted' ? 'Chờ chấm' : 
           submission.status === 'graded' ? 'Đã chấm' : 'Nộp muộn'}
        </span>
        
        {submission.status === 'graded' && (
          <div className="text-right">
            <div className="font-semibold text-lg">
              {submission.currentScore}/{submission.maxScore}
            </div>
            <div className="text-xs text-gray-500">
              {((submission.currentScore! / submission.maxScore) * 100).toFixed(0)}%
            </div>
          </div>
        )}

        <Button size="sm" onClick={() => onGrade(submission)}>
          {submission.status === 'graded' ? 'Xem/Sửa' : 'Chấm điểm'}
        </Button>
      </div>
    </div>

    {submission.files.length > 0 && (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-700 mb-2">File đính kèm:</p>
        <div className="flex gap-2">
          {submission.files.map((file, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
              📎 {file}
            </span>
          ))}
        </div>
      </div>
    )}

    {submission.submissionText && (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-700 mb-2">Nội dung bài làm:</p>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          {submission.submissionText}
        </p>
      </div>
    )}

    {submission.teacherComment && (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-700 mb-2">Nhận xét của giáo viên:</p>
        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
          {submission.teacherComment}
        </p>
      </div>
    )}
  </Card>
);

const GradingModal: React.FC<{
  open: boolean;
  onClose: () => void;
  submission: StudentSubmission | null;
  onSubmit: (score: number, comment: string) => void;
}> = ({ open, onClose, submission, onSubmit }) => {
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (submission) {
      setScore(submission.currentScore || 0);
      setComment(submission.teacherComment || '');
    }
  }, [submission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (score < 0 || score > (submission?.maxScore || 0)) {
      alert(`Điểm phải từ 0 đến ${submission?.maxScore}`);
      return;
    }
    onSubmit(score, comment);
  };

  if (!submission) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Chấm bài - ${submission.studentName}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Bài tập: {submission.assignmentTitle}</p>
          <p className="text-xs text-gray-500">Nộp lúc: {submission.submittedAt}</p>
        </div>

        {submission.submissionText && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Nội dung bài làm:</p>
            <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded text-sm text-gray-600">
              {submission.submissionText}
            </div>
          </div>
        )}

        {submission.files.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">File đính kèm:</p>
            <div className="space-y-1">
              {submission.files.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📎</span>
                  <span>{file}</span>
                  <Button size="sm" variant="outline">Xem</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Điểm số * (0 - {submission.maxScore})
          </label>
          <input
            type="number"
            required
            min="0"
            max={submission.maxScore}
            step="0.1"
            value={score}
            onChange={(e) => setScore(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhận xét
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Nhận xét, góp ý cho học sinh..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Lưu điểm
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Hủy
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const Grading: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'graded' | 'late'>('all');
  const [gradingSubmission, setGradingSubmission] = useState<StudentSubmission | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Mock data since API might not be ready
      const mockAssignments: Assignment[] = [
        {
          id: '1',
          title: 'Phương trình bậc 2',
          subject: 'Toán 9',
          dueDate: '2025-08-15',
          maxScore: 10,
          submissionCount: 25,
          gradedCount: 18
        },
        {
          id: '2',
          title: 'Kiểm tra Động học',
          subject: 'Vật lý 9',
          dueDate: '2025-08-12',
          maxScore: 10,
          submissionCount: 28,
          gradedCount: 28
        }
      ];

      const mockSubmissions: StudentSubmission[] = [
        {
          id: '1',
          studentId: 's1',
          studentName: 'Nguyễn Văn An',
          assignmentId: '1',
          assignmentTitle: 'Phương trình bậc 2',
          submittedAt: '2025-08-14 14:30',
          status: 'submitted',
          maxScore: 10,
          files: ['baitap_toan.pdf'],
          submissionText: 'Em đã giải được 8/10 câu, câu 9 và 10 em chưa hiểu rõ cách làm.'
        },
        {
          id: '2',
          studentId: 's2',
          studentName: 'Trần Thị Bình',
          assignmentId: '1',
          assignmentTitle: 'Phương trình bậc 2',
          submittedAt: '2025-08-13 20:15',
          status: 'graded',
          currentScore: 8.5,
          maxScore: 10,
          files: ['math_homework.docx'],
          submissionText: 'Em đã hoàn thành tất cả các câu hỏi theo yêu cầu.',
          teacherComment: 'Bài làm tốt! Cần chú ý thêm về cách trình bày lời giải câu 7.',
          gradedAt: '2025-08-14 09:00'
        },
        {
          id: '3',
          studentId: 's3',
          studentName: 'Lê Minh Cường',
          assignmentId: '2',
          assignmentTitle: 'Kiểm tra Động học',
          submittedAt: '2025-08-13 10:45',
          status: 'graded',
          currentScore: 9.0,
          maxScore: 10,
          files: ['physics_test.pdf'],
          submissionText: 'Bài kiểm tra về chuyển động thẳng đều và biến đổi đều.',
          teacherComment: 'Xuất sắc! Hiểu rất rõ về các khái niệm động học.',
          gradedAt: '2025-08-13 16:30'
        },
        {
          id: '4',
          studentId: 's4',
          studentName: 'Phạm Thu Dương',
          assignmentId: '1',
          assignmentTitle: 'Phương trình bậc 2',
          submittedAt: '2025-08-16 08:20',
          status: 'late',
          maxScore: 10,
          files: ['late_submission.pdf'],
          submissionText: 'Em xin lỗi vì nộp muộn. Em bị ốm nên không kịp thời gian.'
        }
      ];

      setAssignments(mockAssignments);
      setSubmissions(mockSubmissions);
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu chấm điểm');
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = (submission: StudentSubmission) => {
    setGradingSubmission(submission);
  };

  const handleSubmitGrade = async (score: number, comment: string) => {
    if (!gradingSubmission) return;

    try {
      setSubmissions(prev => prev.map(sub => 
        sub.id === gradingSubmission.id 
          ? { 
              ...sub, 
              currentScore: score, 
              teacherComment: comment, 
              status: 'graded' as const,
              gradedAt: new Date().toLocaleString('vi-VN')
            }
          : sub
      ));
      setGradingSubmission(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const assignmentMatch = selectedAssignment === 'all' || submission.assignmentId === selectedAssignment;
    const statusMatch = statusFilter === 'all' || submission.status === statusFilter;
    return assignmentMatch && statusMatch;
  });

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải dữ liệu chấm điểm...
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
        <h1 className="text-xl font-semibold text-gray-900">Chấm điểm</h1>
        <p className="text-sm text-gray-600">Chấm bài và nhận xét cho học sinh. Hệ thống sẽ thông báo deadline.</p>
      </div>

      {/* Assignment Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {assignments.map(assignment => (
          <Card key={assignment.id}>
            <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
            <p className="text-sm text-gray-600">{assignment.subject}</p>
            <div className="mt-2 text-xs text-gray-500">
              Hạn: {assignment.dueDate} | Điểm tối đa: {assignment.maxScore}
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Đã chấm</span>
                <span>{assignment.gradedCount}/{assignment.submissionCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all" 
                  style={{ width: `${(assignment.gradedCount / assignment.submissionCount) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700">Bài tập:</span>
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tất cả</option>
            {assignments.map(assignment => (
              <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700">Trạng thái:</span>
          {[
            { key: 'all', label: 'Tất cả' },
            { key: 'submitted', label: 'Chờ chấm' },
            { key: 'graded', label: 'Đã chấm' },
            { key: 'late', label: 'Nộp muộn' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key as any)}
              className={`px-3 py-1 text-sm rounded-md transition ${
                statusFilter === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            Không có bài nộp nào phù hợp với bộ lọc hiện tại.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredSubmissions.map(submission => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onGrade={handleGradeSubmission}
            />
          ))}
        </div>
      )}

      <GradingModal
        open={!!gradingSubmission}
        onClose={() => setGradingSubmission(null)}
        submission={gradingSubmission}
        onSubmit={handleSubmitGrade}
      />
    </div>
  );
};

export default Grading;