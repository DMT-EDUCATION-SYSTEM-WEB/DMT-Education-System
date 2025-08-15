// Ticket Service
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export const fetchTickets = async (): Promise<Ticket[]> => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Ticket hỗ trợ #001',
          description: 'Học sinh cần hỗ trợ về bài tập',
          status: 'open',
          priority: 'medium',
          createdAt: '2025-08-13T10:00:00Z',
          updatedAt: '2025-08-13T10:00:00Z'
        },
        {
          id: '2',
          title: 'Ticket hỗ trợ #002',
          description: 'Vấn đề về tài khoản đăng nhập',
          status: 'in-progress',
          priority: 'high',
          createdAt: '2025-08-13T09:00:00Z',
          updatedAt: '2025-08-13T11:00:00Z'
        }
      ]);
    }, 1000);
  });
};

export const createTicket = async (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...ticket,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }, 500);
  });
};
