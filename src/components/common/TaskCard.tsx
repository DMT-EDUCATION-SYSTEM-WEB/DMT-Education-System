import React from 'react';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
  };
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  return (
    <div 
      onClick={onClick}
      style={{
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        marginBottom: '1rem'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '600', 
          color: '#111827',
          margin: 0,
          flex: 1,
          marginRight: '1rem'
        }}>
          {task.title}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '500',
            backgroundColor: getPriorityColor(task.priority) + '20',
            color: getPriorityColor(task.priority)
          }}>
            {task.priority}
          </span>
          <span style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '500',
            backgroundColor: getStatusColor(task.status) + '20',
            color: getStatusColor(task.status)
          }}>
            {task.status}
          </span>
        </div>
      </div>
      
      <p style={{ 
        color: '#6B7280', 
        fontSize: '0.9rem',
        margin: '0 0 0.75rem 0',
        lineHeight: '1.4'
      }}>
        {task.description}
      </p>
      
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#9CA3AF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>ID: {task.id}</span>
        <span>Due: {new Date(task.dueDate).toLocaleDateString('vi-VN')}</span>
      </div>
    </div>
  );
};

export default TaskCard;
