import React, { useEffect, useState } from 'react';
import { getStudentMaterials } from '../api';
import Card from '../../../components/common/Card';
import Spinner from '../../../components/common/Spinner';
import { FileText, File, Presentation, Image, Paperclip, Lock, ClipboardList } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'image';
  size: string;
  downloadCount: number;
  maxDownloads: number;
  url: string;
  uploadDate: string;
  hasWatermark: boolean;
}

const MaterialCard: React.FC<{ material: Material }> = ({ material }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText size={24} />;
      case 'doc': return <File size={24} />;
      case 'ppt': return <Presentation size={24} />;
      case 'image': return <Image size={24} />;
      default: return <Paperclip size={24} />;
    }
  };

  const canDownload = material.downloadCount < material.maxDownloads;

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="text-gray-600">{getFileIcon(material.fileType)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{material.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{material.description}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>{material.size}</span>
            <span>{material.fileType.toUpperCase()}</span>
            <span>{material.uploadDate}</span>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Lượt tải: {material.downloadCount}/{material.maxDownloads}</span>
              {material.hasWatermark && <span className="text-primary-600 flex items-center gap-1"><Lock size={12} /> Có watermark</span>}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  canDownload ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${(material.downloadCount / material.maxDownloads) * 100}%` }}
              />
            </div>
          </div>

          <button 
            className={`mt-4 w-full py-2 px-4 rounded-md text-sm font-medium transition ${
              canDownload
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => canDownload && window.open(material.url, '_blank')}
            disabled={!canDownload}
          >
            {canDownload ? 'Tải xuống' : 'Hết lượt tải'}
          </button>
        </div>
      </div>
    </Card>
  );
};

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pdf' | 'doc' | 'ppt' | 'image'>('all');

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setLoading(true);
        // Mock data since API might not be ready
        const mockMaterials: Material[] = [
          {
            id: '1',
            title: 'Bài tập Toán 9 - Chương 1',
            description: 'Tập hợp các bài tập về phương trình và hệ phương trình',
            fileType: 'pdf',
            size: '2.4 MB',
            downloadCount: 2,
            maxDownloads: 5,
            url: '#',
            uploadDate: '05/08/2025',
            hasWatermark: true
          },
          {
            id: '2',
            title: 'Lý thuyết Vật lý 9',
            description: 'Tài liệu tổng hợp lý thuyết cơ bản về động học',
            fileType: 'pdf',
            size: '1.8 MB',
            downloadCount: 1,
            maxDownloads: 3,
            url: '#',
            uploadDate: '03/08/2025',
            hasWatermark: true
          },
          {
            id: '3',
            title: 'Slide bài giảng Hóa học',
            description: 'Các khái niệm cơ bản về axit, bazơ và muối',
            fileType: 'ppt',
            size: '5.2 MB',
            downloadCount: 0,
            maxDownloads: 2,
            url: '#',
            uploadDate: '01/08/2025',
            hasWatermark: false
          }
        ];
        setMaterials(mockMaterials);
      } catch (err: any) {
        setError(err.message || 'Không thể tải tài liệu');
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  const filteredMaterials = materials.filter(material => 
    filter === 'all' || material.fileType === filter
  );

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải tài liệu...
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
        <h1 className="text-xl font-semibold text-gray-900">Tài liệu khóa học</h1>
        <p className="text-sm text-gray-600">Tải về tài liệu học tập với watermark bảo vệ. Giới hạn số lần tải.</p>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'pdf', label: 'PDF' },
          { key: 'doc', label: 'Word' },
          { key: 'ppt', label: 'PowerPoint' },
          { key: 'image', label: 'Hình ảnh' }
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

      {filteredMaterials.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            Không có tài liệu nào phù hợp với bộ lọc hiện tại.
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredMaterials.map(material => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}

      <Card>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium flex items-center gap-2"><ClipboardList size={16} /> Quy định sử dụng tài liệu:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Tài liệu có watermark, không được chỉnh sửa hoặc phân phối</li>
            <li>Số lượt tải giới hạn theo từng tài liệu</li>
            <li>Chỉ sử dụng cho mục đích học tập cá nhân</li>
            <li>Liên hệ giáo viên nếu cần tải thêm</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Materials;