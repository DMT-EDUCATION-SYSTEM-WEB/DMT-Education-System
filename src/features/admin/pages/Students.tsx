import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Eye
} from 'lucide-react';
import Spinner from '../../../components/common/Spinner';

interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  grade: string;
  joinDate: string;
  parentName?: string;
  parentPhone?: string;
  classes: string[];
}

const mockStudents: Student[] = Array.from({ length: 50 }, (_, idx) => ({
  id: `STD${(idx + 1).toString().padStart(4, '0')}`,
  fullName: ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường', 'Phạm Minh Đức', 'Hoàng Thị Em'][idx % 5] + ` ${idx + 1}`,
  email: `student${idx + 1}@example.com`,
  phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
  status: Math.random() > 0.2 ? 'active' : 'inactive',
  grade: ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Ôn thi đại học'][idx % 4],
  joinDate: new Date(2023, idx % 12, Math.floor(1 + Math.random() * 28)).toLocaleDateString('vi-VN'),
  parentName: Math.random() > 0.3 ? ['Nguyễn Văn Cao', 'Trần Văn Dũng', 'Lê Văn Hùng'][idx % 3] : undefined,
  parentPhone: Math.random() > 0.3 ? `09${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
  classes: Array.from(
    { length: Math.floor(1 + Math.random() * 3) }, 
    () => ['Toán cao cấp', 'Vật lý nâng cao', 'Hóa học cơ bản', 'Tiếng Anh giao tiếp', 'Ngữ văn'][Math.floor(Math.random() * 5)]
  )
}));

interface StudentModalProps {
  student?: Student;
  onClose: () => void;
  onSave: (student: Student) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ student, onClose, onSave }) => {
  const isEdit = !!student;
  const [form, setForm] = useState<Partial<Student>>(
    student || {
      status: 'active',
      grade: 'Lớp 10',
      classes: []
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would validate form here
    onSave(form as Student);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{isEdit ? 'Chỉnh sửa học sinh' : 'Thêm học sinh mới'}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khối lớp
              </label>
              <select
                name="grade"
                value={form.grade || 'Lớp 10'}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12</option>
                <option value="Ôn thi đại học">Ôn thi đại học</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên phụ huynh
              </label>
              <input
                type="text"
                name="parentName"
                value={form.parentName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SĐT phụ huynh
              </label>
              <input
                type="tel"
                name="parentPhone"
                value={form.parentPhone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                name="status"
                value={form.status || 'active'}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="active">Đang học</option>
                <option value="inactive">Đã nghỉ</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end border-t border-gray-100 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StudentsManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionStudent, setActionStudent] = useState<Student | null>(null);
  
  const pageSize = 10;

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);
      
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
    
    return matchesSearch && matchesStatus && matchesGrade;
  });
  
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddStudent = () => {
    setSelectedStudent(undefined);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = (student: Student) => {
    if (selectedStudent) {
      // Edit existing student
      setStudents(prevStudents => 
        prevStudents.map(s => s.id === selectedStudent.id ? student : s)
      );
    } else {
      // Add new student with generated ID
      const newStudent = {
        ...student,
        id: `STD${(students.length + 1).toString().padStart(4, '0')}`,
        joinDate: new Date().toLocaleDateString('vi-VN')
      };
      setStudents(prevStudents => [...prevStudents, newStudent]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
      setStudents(prevStudents => prevStudents.filter(s => s.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={40} />
        <span className="ml-3 text-gray-600">Đang tải dữ liệu học sinh...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý học sinh</h1>
          <p className="text-gray-600">Quản lý thông tin và trạng thái của học sinh</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => alert('Chức năng xuất dữ liệu sẽ được bổ sung sau')}
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <Download size={18} />
            <span className="hidden sm:inline-block">Xuất Excel</span>
          </button>
          <button
            onClick={() => alert('Chức năng nhập dữ liệu sẽ được bổ sung sau')}
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <Upload size={18} />
            <span className="hidden sm:inline-block">Nhập Excel</span>
          </button>
          <button
            onClick={handleAddStudent}
            className="px-3 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors flex items-center gap-1"
          >
            <UserPlus size={18} />
            <span>Thêm học sinh</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang học</option>
              <option value="inactive">Đã nghỉ</option>
            </select>
          </div>
          <div className="flex gap-2">
            <select
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
            >
              <option value="all">Tất cả khối lớp</option>
              <option value="Lớp 10">Lớp 10</option>
              <option value="Lớp 11">Lớp 11</option>
              <option value="Lớp 12">Lớp 12</option>
              <option value="Ôn thi đại học">Ôn thi đại học</option>
            </select>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm">
                <th className="py-3 px-4 font-medium">Mã HS</th>
                <th className="py-3 px-4 font-medium">Học sinh</th>
                <th className="py-3 px-4 font-medium">Khối lớp</th>
                <th className="py-3 px-4 font-medium">Trạng thái</th>
                <th className="py-3 px-4 font-medium">Ngày tham gia</th>
                <th className="py-3 px-4 font-medium">Lớp học</th>
                <th className="py-3 px-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedStudents.map(student => (
                <tr 
                  key={student.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{student.fullName}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                      <div className="text-xs text-gray-500">{student.phone}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{student.grade}</td>
                  <td className="py-3 px-4">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.status === 'active' ? (
                        <>
                          <CheckCircle size={12} className="mr-1" />
                          Đang học
                        </>
                      ) : (
                        <>
                          <XCircle size={12} className="mr-1" />
                          Đã nghỉ
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4">{student.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {student.classes.slice(0, 2).map((cls, idx) => (
                        <span 
                          key={idx} 
                          className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-xs"
                        >
                          {cls}
                        </span>
                      ))}
                      {student.classes.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                          +{student.classes.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Xem chi tiết học sinh ${student.fullName}`)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Không tìm thấy học sinh nào phù hợp với bộ lọc
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="py-3 px-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Hiển thị {paginatedStudents.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, filteredStudents.length)} 
            {' '}trong số {filteredStudents.length} học sinh
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              let pageNum: number;
              
              // Show first page, last page, current page, and pages around current
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }
              
              if (pageNum <= 0 || pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === pageNum
                      ? 'bg-primary-50 text-primary-700 font-medium border border-primary-100'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-2 rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Student Modal */}
      {isModalOpen && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

export default StudentsManagement;
