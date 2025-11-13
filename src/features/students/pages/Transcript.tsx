import React, { useEffect, useState } from 'react';
import { getStudentTranscript } from '../api';
import Card from '../../../components/common/Card';
import Spinner from '../../../components/common/Spinner';

interface Grade {
  id: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  teacher: string;
  comment: string;
  date: string;
  type: 'homework' | 'quiz' | 'midterm' | 'final';
}

interface SubjectSummary {
  subject: string;
  avgScore: number;
  totalAssignments: number;
  grade: string;
  color: string;
}

const getGradeColor = (percentage: number) => {
  if (percentage >= 90) return 'text-green-600 bg-green-50';
  if (percentage >= 80) return 'text-blue-600 bg-blue-50';
  if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
  if (percentage >= 60) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'final': return 'bg-red-100 text-red-700';
    case 'midterm': return 'bg-orange-100 text-orange-700';
    case 'quiz': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const GradeCard: React.FC<{ grade: Grade }> = ({ grade }) => (
  <Card>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{grade.assignment}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(grade.type)}`}>
            {grade.type === 'homework' ? 'Bài tập' : 
             grade.type === 'quiz' ? 'Kiểm tra' :
             grade.type === 'midterm' ? 'Giữa kỳ' : 'Cuối kỳ'}
          </span>
        </div>
        <p className="text-sm text-gray-600">{grade.subject} - {grade.teacher}</p>
        <p className="text-xs text-gray-500 mt-1">{grade.date}</p>
      </div>
      
      <div className="text-right">
        <div className={`px-3 py-1 rounded-md font-semibold ${getGradeColor(grade.percentage)}`}>
          {grade.score}/{grade.maxScore}
        </div>
        <p className="text-xs text-gray-500 mt-1">{grade.percentage}% ({grade.grade})</p>
      </div>
    </div>
    
    {grade.comment && (
      <div className="mt-3 p-3 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Nhận xét:</span> {grade.comment}
        </p>
      </div>
    )}
  </Card>
);

const SubjectCard: React.FC<{ summary: SubjectSummary }> = ({ summary }) => (
  <Card>
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-900">{summary.subject}</h3>
        <p className="text-sm text-gray-600">{summary.totalAssignments} bài đánh giá</p>
      </div>
      <div className="text-right">
        <div className={`px-3 py-1 rounded-md font-semibold ${summary.color}`}>
          {summary.avgScore.toFixed(1)}/10
        </div>
        <p className="text-xs text-gray-500 mt-1">Điểm {summary.grade}</p>
      </div>
    </div>
    
    <div className="mt-3">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${
            summary.avgScore >= 9 ? 'bg-green-500' :
            summary.avgScore >= 8 ? 'bg-blue-500' :
            summary.avgScore >= 7 ? 'bg-yellow-500' :
            summary.avgScore >= 6 ? 'bg-orange-500' : 'bg-red-500'
          }`}
          style={{ width: `${(summary.avgScore / 10) * 100}%` }}
        />
      </div>
    </div>
  </Card>
);

const Transcript: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [summaries, setSummaries] = useState<SubjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'homework' | 'quiz' | 'midterm' | 'final'>('all');

  useEffect(() => {
    const loadTranscript = async () => {
      try {
        setLoading(true);
        // Mock data since API might not be ready
        const mockGrades: Grade[] = [
          {
            id: '1',
            subject: 'Toán 9',
            assignment: 'Phương trình bậc 2',
            score: 8.5,
            maxScore: 10,
            percentage: 85,
            grade: 'B+',
            teacher: 'Thầy Minh',
            comment: 'Làm tốt, cần chú ý thêm về giải phương trình có nghiệm kép',
            date: '05/08/2025',
            type: 'homework'
          },
          {
            id: '2',
            subject: 'Vật lý 9',
            assignment: 'Kiểm tra giữa kỳ',
            score: 9.0,
            maxScore: 10,
            percentage: 90,
            grade: 'A-',
            teacher: 'Cô Hương',
            comment: 'Rất tốt! Hiểu sâu về động học chất điểm',
            date: '03/08/2025',
            type: 'midterm'
          },
          {
            id: '3',
            subject: 'Hóa học 9',
            assignment: 'Bài tập Axit-Bazơ',
            score: 7.5,
            maxScore: 10,
            percentage: 75,
            grade: 'B',
            teacher: 'Thầy Đức',
            comment: 'Cần ôn lại phần cân bằng phương trình hóa học',
            date: '01/08/2025',
            type: 'homework'
          }
        ];

        const mockSummaries: SubjectSummary[] = [
          {
            subject: 'Toán 9',
            avgScore: 8.2,
            totalAssignments: 5,
            grade: 'B+',
            color: 'text-blue-600 bg-blue-50'
          },
          {
            subject: 'Vật lý 9',
            avgScore: 8.8,
            totalAssignments: 4,
            grade: 'A-',
            color: 'text-green-600 bg-green-50'
          },
          {
            subject: 'Hóa học 9',
            avgScore: 7.8,
            totalAssignments: 3,
            grade: 'B',
            color: 'text-yellow-600 bg-yellow-50'
          }
        ];

        setGrades(mockGrades);
        setSummaries(mockSummaries);
      } catch (err: any) {
        setError(err.message || 'Không thể tải bảng điểm');
      } finally {
        setLoading(false);
      }
    };

    loadTranscript();
  }, []);

  const filteredGrades = grades.filter(grade => 
    filter === 'all' || grade.type === filter
  );

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải bảng điểm...
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
        <h1 className="text-xl font-semibold text-gray-900">Bảng điểm & nhận xét</h1>
        <p className="text-sm text-gray-600">Xem điểm số và phản hồi từ giáo viên. Cập nhật theo thời gian thực.</p>
      </div>

      {/* Subject Summaries */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Tổng kết môn học</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaries.map(summary => (
            <SubjectCard key={summary.subject} summary={summary} />
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'homework', label: 'Bài tập' },
          { key: 'quiz', label: 'Kiểm tra' },
          { key: 'midterm', label: 'Giữa kỳ' },
          { key: 'final', label: 'Cuối kỳ' }
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

      {/* Grade Details */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Chi tiết điểm số</h2>
        {filteredGrades.length === 0 ? (
          <Card>
            <div className="text-center py-8 text-gray-500">
              Không có điểm nào phù hợp với bộ lọc hiện tại.
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredGrades.map(grade => (
              <GradeCard key={grade.id} grade={grade} />
            ))}
          </div>
        )}
      </div>

      <Card>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium">Thống kê và phân tích:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Điểm được cập nhật ngay sau khi giáo viên chấm</li>
            <li>Nhận thông báo khi có điểm mới</li>
            <li>Xuất bảng điểm PDF để lưu trữ</li>
            <li>So sánh tiến độ với trung bình lớp (nếu có)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Transcript;