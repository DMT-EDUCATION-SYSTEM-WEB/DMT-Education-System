import React, { useState } from 'react';
import { SEOHead } from '../../../components/common';
import TeacherLayout from '../../../components/layout/TeacherLayout';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'image' | 'document';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  downloadCount: number;
  status: 'active' | 'inactive';
  subject: string;
  grade: string;
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'Bài giảng Toán học - Chương 1',
      description: 'Căn bản về phương trình bậc hai',
      type: 'pdf',
      fileName: 'toan-chuong1.pdf',
      fileSize: '2.5 MB',
      uploadedAt: '2025-08-10T10:00:00',
      downloadCount: 45,
      status: 'active',
      subject: 'Toán học',
      grade: '10'
    },
    {
      id: '2',
      title: 'Video bài giảng Vật lý',
      description: 'Chuyển động thẳng đều',
      type: 'video',
      fileName: 'vatly-chuyen-dong.mp4',
      fileSize: '125 MB',
      uploadedAt: '2025-08-12T14:30:00',
      downloadCount: 32,
      status: 'active',
      subject: 'Vật lý',
      grade: '10'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    type: 'pdf' as 'pdf' | 'video' | 'image' | 'document'
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      case 'document': return '📝';
      default: return '📎';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'video': return 'bg-blue-100 text-blue-700';
      case 'image': return 'bg-green-100 text-green-700';
      case 'document': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleUpload = () => {
    // Simulate file upload
    const newMaterial: Material = {
      id: Date.now().toString(),
      ...uploadForm,
      fileName: `${uploadForm.title.toLowerCase().replace(/\s+/g, '-')}.${uploadForm.type}`,
      fileSize: '0 MB',
      uploadedAt: new Date().toISOString(),
      downloadCount: 0,
      status: 'active'
    };
    
    setMaterials([newMaterial, ...materials]);
    setShowUploadModal(false);
    setUploadForm({
      title: '',
      description: '',
      subject: '',
      grade: '',
      type: 'pdf'
    });
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <>
      <SEOHead 
        title="Quản lý Tài liệu - DMT Education"
        description="Quản lý tài liệu giảng dạy và video bài giảng"
        keywords="tài liệu, video, giảng dạy, upload"
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
                📚 Quản lý Tài liệu
              </h1>
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                Upload và quản lý tài liệu, video bài giảng
              </p>
            </div>
            
            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ➕ Upload tài liệu mới
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
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
                    Tổng tài liệu
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    {materials.length}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>📚</div>
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
                    Video bài giảng
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    {materials.filter(m => m.type === 'video').length}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>🎥</div>
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
                    Tổng lượt tải
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    {materials.reduce((sum, m) => sum + m.downloadCount, 0)}
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>📥</div>
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
                    Dung lượng
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>
                    2.1 GB
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>💾</div>
              </div>
            </div>
          </div>

          {/* Materials List */}
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
                Danh sách tài liệu
              </h2>
            </div>

            <div style={{ padding: '20px' }}>
              {materials.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#64748b'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
                  <p>Chưa có tài liệu nào. Hãy upload tài liệu đầu tiên!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {materials.map((material) => (
                    <div key={material.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc'
                    }}>
                      <div style={{ fontSize: '32px', marginRight: '16px' }}>
                        {getTypeIcon(material.type)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                            {material.title}
                          </h3>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }} className={getTypeColor(material.type)}>
                            {material.type.toUpperCase()}
                          </span>
                        </div>
                        
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
                          {material.description}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#64748b' }}>
                          <span>📂 {material.subject}</span>
                          <span>🎓 Lớp {material.grade}</span>
                          <span>📏 {material.fileSize}</span>
                          <span>📥 {material.downloadCount} lượt tải</span>
                          <span>📅 {formatDate(material.uploadedAt)}</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          padding: '8px 12px',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}>
                          ✏️ Sửa
                        </button>
                        
                        <button style={{
                          padding: '8px 12px',
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleDelete(material.id)}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upload Modal */}
          {showUploadModal && (
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
                  Upload tài liệu mới
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Mô tả
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                      Môn học
                    </label>
                    <select
                      value={uploadForm.subject}
                      onChange={(e) => setUploadForm({...uploadForm, subject: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Chọn môn</option>
                      <option value="Toán học">Toán học</option>
                      <option value="Vật lý">Vật lý</option>
                      <option value="Hóa học">Hóa học</option>
                      <option value="Sinh học">Sinh học</option>
                      <option value="Văn học">Văn học</option>
                      <option value="Tiếng Anh">Tiếng Anh</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                      Lớp
                    </label>
                    <select
                      value={uploadForm.grade}
                      onChange={(e) => setUploadForm({...uploadForm, grade: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Chọn lớp</option>
                      <option value="6">Lớp 6</option>
                      <option value="7">Lớp 7</option>
                      <option value="8">Lớp 8</option>
                      <option value="9">Lớp 9</option>
                      <option value="10">Lớp 10</option>
                      <option value="11">Lớp 11</option>
                      <option value="12">Lớp 12</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                      Loại file
                    </label>
                    <select
                      value={uploadForm.type}
                      onChange={(e) => setUploadForm({...uploadForm, type: e.target.value as any})}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="pdf">PDF</option>
                      <option value="video">Video</option>
                      <option value="image">Hình ảnh</option>
                      <option value="document">Tài liệu</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    Chọn file
                  </label>
                  <div style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    padding: '24px',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Kéo thả file vào đây hoặc click để chọn file
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setShowUploadModal(false)}
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
                    onClick={handleUpload}
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
                    Upload
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

export default Materials;
