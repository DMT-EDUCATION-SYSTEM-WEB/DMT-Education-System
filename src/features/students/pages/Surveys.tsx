import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, Star } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'pending' | 'completed';
  courseTitle: string;
  questionCount: number;
  completedAt?: string;
}

const Surveys: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      // TODO: Integrate with Supabase API
      // const data = await studentService.getSurveys();
      
      // Mock data
      const mockSurveys: Survey[] = [
        {
          id: '1',
          title: 'Khảo sát đánh giá khóa học Toán 10',
          description: 'Vui lòng đánh giá chất lượng giảng dạy và nội dung khóa học',
          deadline: '2025-10-10',
          status: 'pending',
          courseTitle: 'Toán 10 - Nâng cao',
          questionCount: 10
        },
        {
          id: '2',
          title: 'Khảo sát hài lòng về giáo viên',
          description: 'Đánh giá về phương pháp giảng dạy của giáo viên',
          status: 'completed',
          courseTitle: 'Vật Lý 10',
          questionCount: 8,
          completedAt: '2025-09-25'
        },
        {
          id: '3',
          title: 'Khảo sát chất lượng dịch vụ',
          description: 'Đánh giá về cơ sở vật chất và dịch vụ hỗ trợ',
          deadline: '2025-10-15',
          status: 'pending',
          courseTitle: 'Chung',
          questionCount: 12
        }
      ];

      setSurveys(mockSurveys);
    } catch (error) {
      console.error('Failed to load surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSurveys = surveys.filter(survey => {
    if (filter === 'all') return true;
    return survey.status === filter;
  });

  const handleStartSurvey = (surveyId: string) => {
    // TODO: Navigate to survey form
    console.log('Start survey:', surveyId);
  };

  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Khảo sát</h1>
        <p className="mt-1 text-sm text-gray-600">
          Hoàn thành khảo sát để giúp chúng tôi cải thiện chất lượng giảng dạy
        </p>
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
          Tất cả ({surveys.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            filter === 'pending'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Chưa hoàn thành ({surveys.filter(s => s.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            filter === 'completed'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Đã hoàn thành ({surveys.filter(s => s.status === 'completed').length})
        </button>
      </div>

      {/* Surveys List */}
      <div className="grid gap-4">
        {filteredSurveys.map((survey) => {
          const daysRemaining = getDaysRemaining(survey.deadline);
          const isUrgent = daysRemaining !== null && daysRemaining <= 3;

          return (
            <div
              key={survey.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      survey.status === 'completed' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      {survey.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {survey.title}
                      </h3>
                      <p className="text-sm text-gray-600">{survey.courseTitle}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-700">
                    {survey.description}
                  </p>

                  <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{survey.questionCount} câu hỏi</span>
                    </div>

                    {survey.deadline && survey.status === 'pending' && (
                      <div className={`flex items-center space-x-1 ${
                        isUrgent ? 'text-red-600 font-medium' : ''
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>
                          {daysRemaining !== null && daysRemaining > 0
                            ? `Còn ${daysRemaining} ngày`
                            : 'Hết hạn'}
                        </span>
                      </div>
                    )}

                    {survey.completedAt && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>
                          Hoàn thành: {new Date(survey.completedAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-4">
                  {survey.status === 'pending' ? (
                    <button
                      onClick={() => handleStartSurvey(survey.id)}
                      className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Bắt đầu
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartSurvey(survey.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Xem lại
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSurveys.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Không có khảo sát {filter === 'pending' ? 'chưa hoàn thành' : filter === 'completed' ? 'đã hoàn thành' : ''}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'pending' 
              ? 'Bạn đã hoàn thành tất cả khảo sát' 
              : 'Chưa có khảo sát nào'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Surveys;
