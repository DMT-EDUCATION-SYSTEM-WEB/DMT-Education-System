import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit, Trash2, Star, MoreHorizontal, Download, Mail, Calendar, Phone } from 'lucide-react';
import { adminService, Teacher } from '../../../services/admin';

const specializations = [
  'Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 
  'Tiếng Anh', 'Tiếng Việt', 'Lịch sử', 'Địa lý',
  'Tin học', 'Nghệ thuật', 'Âm nhạc', 'Thể dục'
];

const TeacherCard: React.FC<{ teacher: Teacher; onEdit: (teacher: Teacher) => void; onDelete: (id: string) => void }> = ({ 
  teacher, 
  onEdit, 
  onDelete 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-5 flex items-center space-x-4 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {teacher.profileImage ? (
            <img src={teacher.profileImage} alt={teacher.fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
              {teacher.fullName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{teacher.fullName}</h3>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <MoreHorizontal size={18} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-8 z-10 bg-white shadow-lg rounded-md py-2 w-48">
                  <button 
                    onClick={() => { onEdit(teacher); setShowDropdown(false); }} 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                  >
                    <Edit size={16} className="mr-2" /> Chỉnh sửa
                  </button>
                  <button 
                    onClick={() => { onDelete(teacher.id); setShowDropdown(false); }} 
                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                  >
                    <Trash2 size={16} className="mr-2" /> Xóa
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                    <Calendar size={16} className="mr-2" /> Lịch dạy
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                    <Mail size={16} className="mr-2" /> Gửi email
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                    <Download size={16} className="mr-2" /> Tải hồ sơ
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="flex items-center text-yellow-500">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  size={14}
                  fill={i < teacher.rating ? "currentColor" : "none"}
                  className={i < teacher.rating ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">{teacher.rating.toFixed(1)}</span>
          </div>
          <div className="mt-1 flex space-x-2">
            {teacher.specialization.slice(0, 2).map((spec, idx) => (
              <span key={idx} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                {spec}
              </span>
            ))}
            {teacher.specialization.length > 2 && (
              <span className="px-2 py-0.5 text-xs bg-gray-50 text-gray-500 rounded-full">
                +{teacher.specialization.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 text-sm text-gray-600 flex-1">
        <div className="mb-3 line-clamp-3">{teacher.bio}</div>
        <div className="flex items-center mb-1.5">
          <Mail size={14} className="mr-2 text-gray-400" />
          <span>{teacher.email}</span>
        </div>
        <div className="flex items-center">
          <Phone size={14} className="mr-2 text-gray-400" />
          <span>{teacher.phone}</span>
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Ngày vào làm:</span>
          <span className="font-medium text-gray-800">{new Date(teacher.hireDate).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-gray-500">Trạng thái:</span>
          <span className={`font-medium ${
            teacher.status === 'active' ? 'text-green-600' :
            teacher.status === 'on_leave' ? 'text-orange-600' : 'text-red-600'
          }`}>
            {teacher.status === 'active' ? 'Đang dạy' :
             teacher.status === 'on_leave' ? 'Nghỉ phép' : 'Ngừng dạy'}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-gray-500">Số lớp phụ trách:</span>
          <span className="font-medium text-gray-800">{teacher.courseIds.length}</span>
        </div>
      </div>
    </div>
  );
};

const TeacherModal: React.FC<{ 
  teacher?: Teacher; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (teacher: Partial<Teacher>) => void;
}> = ({ teacher, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Teacher>>({
    fullName: '',
    email: '',
    phone: '',
    specialization: [],
    bio: '',
    hireDate: new Date().toISOString().split('T')[0],
    status: 'active',
    courseIds: [],
    rating: 5,
    qualifications: []
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        ...teacher,
        hireDate: new Date(teacher.hireDate).toISOString().split('T')[0]
      });
    }
  }, [teacher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecializationChange = (spec: string) => {
    setFormData(prev => {
      const currentSpecs = prev.specialization || [];
      if (currentSpecs.includes(spec)) {
        return { ...prev, specialization: currentSpecs.filter(s => s !== spec) };
      } else {
        return { ...prev, specialization: [...currentSpecs, spec] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {teacher ? 'Chỉnh sửa giáo viên' : 'Thêm giáo viên mới'}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày vào làm</label>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Đang dạy</option>
                  <option value="on_leave">Nghỉ phép</option>
                  <option value="inactive">Ngừng dạy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên môn</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {specializations.map((spec) => (
                    <div key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`spec-${spec}`}
                        checked={(formData.specialization || []).includes(spec)}
                        onChange={() => handleSpecializationChange(spec)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`spec-${spec}`} className="text-sm text-gray-700">
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiểu sử</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {teacher ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock data for demo purposes
    const mockTeachers: Teacher[] = [
      {
        id: '1',
        fullName: 'Nguyễn Văn Anh',
        email: 'nguyenvananh@dmt.edu.vn',
        phone: '0912345678',
        specialization: ['Toán học', 'Vật lý'],
        bio: 'Giáo viên dạy Toán với hơn 10 năm kinh nghiệm. Chuyên dạy luyện thi đại học và các kỳ thi quốc tế.',
        hireDate: '2018-06-15',
        status: 'active',
        courseIds: ['course1', 'course2', 'course3'],
        rating: 4.8,
        qualifications: ['Thạc sĩ Toán học ứng dụng', 'Chứng chỉ sư phạm xuất sắc'],
        profileImage: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      {
        id: '2',
        fullName: 'Trần Thị Bình',
        email: 'tranthibinh@dmt.edu.vn',
        phone: '0923456789',
        specialization: ['Tiếng Anh', 'Ngữ văn'],
        bio: 'Giáo viên tiếng Anh với chứng chỉ IELTS 8.0, có kinh nghiệm giảng dạy tại các trung tâm tiếng Anh hàng đầu.',
        hireDate: '2019-08-20',
        status: 'active',
        courseIds: ['course4', 'course5'],
        rating: 4.5,
        qualifications: ['Cử nhân Ngôn ngữ Anh', 'TESOL', 'IELTS 8.0'],
        profileImage: 'https://randomuser.me/api/portraits/women/42.jpg'
      },
      {
        id: '3',
        fullName: 'Lê Văn Cường',
        email: 'levancuong@dmt.edu.vn',
        phone: '0934567890',
        specialization: ['Vật lý', 'Hóa học', 'Sinh học'],
        bio: 'Tiến sĩ Vật lý, từng công tác tại Viện Khoa học và Công nghệ Việt Nam. Chuyên dạy Vật lý và Hóa học.',
        hireDate: '2017-03-10',
        status: 'on_leave',
        courseIds: ['course6'],
        rating: 4.9,
        qualifications: ['Tiến sĩ Vật lý', 'Nghiên cứu sinh tại Đại học Tokyo'],
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: '4',
        fullName: 'Phạm Thị Dung',
        email: 'phamthidung@dmt.edu.vn',
        phone: '0945678901',
        specialization: ['Tiếng Việt', 'Lịch sử', 'Địa lý'],
        bio: 'Giáo viên dạy Văn - Sử - Địa với phương pháp giảng dạy sáng tạo, giúp học sinh dễ hiểu và ghi nhớ kiến thức.',
        hireDate: '2020-02-15',
        status: 'active',
        courseIds: ['course7', 'course8', 'course9', 'course10'],
        rating: 4.3,
        qualifications: ['Cử nhân Sư phạm Ngữ văn', 'Thạc sĩ Việt Nam học'],
        profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
      },
      {
        id: '5',
        fullName: 'Hoàng Văn Emm',
        email: 'hoangvanemm@dmt.edu.vn',
        phone: '0956789012',
        specialization: ['Tin học', 'Toán học'],
        bio: 'Kỹ sư CNTT, chuyên gia về lập trình và thuật toán. Giảng dạy Tin học và Toán cho học sinh từ cấp 2 đến cấp 3.',
        hireDate: '2021-01-05',
        status: 'inactive',
        courseIds: [],
        rating: 4.0,
        qualifications: ['Kỹ sư Công nghệ thông tin', 'Chứng chỉ Microsoft Expert'],
        profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: '6',
        fullName: 'Mai Thị Phương',
        email: 'maithiphuong@dmt.edu.vn',
        phone: '0967890123',
        specialization: ['Nghệ thuật', 'Âm nhạc'],
        bio: 'Giáo viên nghệ thuật với nhiều năm kinh nghiệm dạy vẽ và âm nhạc. Từng tốt nghiệp Học viện Âm nhạc Quốc gia Việt Nam.',
        hireDate: '2019-11-20',
        status: 'active',
        courseIds: ['course11', 'course12'],
        rating: 4.7,
        qualifications: ['Cử nhân Mỹ thuật', 'Chứng chỉ Piano bậc 8'],
        profileImage: 'https://randomuser.me/api/portraits/women/24.jpg'
      }
    ];
    
    setTimeout(() => {
      setTeachers(mockTeachers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecializations.length === 0 || 
                               teacher.specialization.some(spec => 
                                 selectedSpecializations.includes(spec));
    
    const matchesStatus = !selectedStatus || teacher.status === selectedStatus;
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const handleEdit = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giáo viên này?')) {
      // In a real app, call API to delete
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  const handleSaveTeacher = (teacherData: Partial<Teacher>) => {
    if (currentTeacher) {
      // Update existing teacher
      setTeachers(teachers.map(teacher => 
        teacher.id === currentTeacher.id ? { ...teacher, ...teacherData } as Teacher : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher: Teacher = {
        id: `teacher-${Date.now()}`,
        fullName: teacherData.fullName || '',
        email: teacherData.email || '',
        phone: teacherData.phone || '',
        specialization: teacherData.specialization || [],
        bio: teacherData.bio || '',
        hireDate: teacherData.hireDate || new Date().toISOString(),
        status: teacherData.status as 'active' | 'inactive' | 'on_leave' || 'active',
        courseIds: teacherData.courseIds || [],
        rating: teacherData.rating || 5,
        qualifications: teacherData.qualifications || [],
        profileImage: teacherData.profileImage
      };
      
      setTeachers([...teachers, newTeacher]);
    }
    
    setIsModalOpen(false);
    setCurrentTeacher(undefined);
  };

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(spec) 
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Quản lý giáo viên</h1>
        <button 
          onClick={() => { setCurrentTeacher(undefined); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={18} className="mr-1" /> Thêm giáo viên
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tìm kiếm giáo viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50 flex items-center"
            >
              <Filter size={18} className="mr-1" /> Bộ lọc
            </button>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang dạy</option>
              <option value="on_leave">Nghỉ phép</option>
              <option value="inactive">Ngừng dạy</option>
            </select>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="font-medium text-gray-700 mb-3">Lọc theo chuyên môn</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {specializations.map(spec => (
                <div key={spec} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`filter-${spec}`}
                    checked={selectedSpecializations.includes(spec)}
                    onChange={() => toggleSpecialization(spec)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`filter-${spec}`} className="text-sm text-gray-700">
                    {spec}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map(teacher => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Không tìm thấy giáo viên nào phù hợp với tiêu chí tìm kiếm
          </div>
        )}
        
        {isModalOpen && (
          <TeacherModal
            teacher={currentTeacher}
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setCurrentTeacher(undefined); }}
            onSave={handleSaveTeacher}
          />
        )}
      </div>
    </div>
  );
};

export default TeachersPage;
