import React, { useState, useEffect } from 'react';
import { CreditCard, Clock, CheckCircle, AlertCircle, Receipt, Download } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  method: string;
  date: string;
  status: 'completed' | 'pending' | 'overdue';
  description: string;
  receiptNumber?: string;
}

interface PaymentSummary {
  totalFee: number;
  paidAmount: number;
  remainingAmount: number;
  nextDueDate?: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<PaymentSummary>({
    totalFee: 0,
    paidAmount: 0,
    remainingAmount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      // TODO: Integrate with Supabase API
      // const data = await studentService.getPayments();
      
      // Mock data
      const mockPayments: Payment[] = [
        {
          id: '1',
          amount: 5000000,
          method: 'bank_transfer',
          date: '2025-09-01',
          status: 'completed',
          description: 'Học phí tháng 9/2025',
          receiptNumber: 'HD001'
        },
        {
          id: '2',
          amount: 5000000,
          method: 'cash',
          date: '2025-08-01',
          status: 'completed',
          description: 'Học phí tháng 8/2025',
          receiptNumber: 'HD002'
        },
        {
          id: '3',
          amount: 5000000,
          method: 'pending',
          date: '2025-10-01',
          status: 'pending',
          description: 'Học phí tháng 10/2025',
        }
      ];

      const mockSummary: PaymentSummary = {
        totalFee: 15000000,
        paidAmount: 10000000,
        remainingAmount: 5000000,
        nextDueDate: '2025-10-15'
      };

      setPayments(mockPayments);
      setSummary(mockSummary);
    } catch (error) {
      console.error('Failed to load payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'overdue':
        return 'Quá hạn';
      default:
        return status;
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Chuyển khoản';
      case 'cash':
        return 'Tiền mặt';
      case 'online':
        return 'Thanh toán online';
      default:
        return method;
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Quản lý học phí</h1>
        <p className="mt-1 text-sm text-gray-600">
          Theo dõi lịch sử thanh toán và học phí còn lại
        </p>
      </div>

      {/* Payment Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng học phí</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatCurrency(summary.totalFee)}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã thanh toán</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {formatCurrency(summary.paidAmount)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Còn lại</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {formatCurrency(summary.remainingAmount)}
              </p>
              {summary.nextDueDate && (
                <p className="mt-1 text-xs text-gray-500">
                  Hạn: {new Date(summary.nextDueDate).toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lịch sử thanh toán</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {getMethodText(payment.method)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className="text-sm text-gray-700">
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {payment.status === 'completed' && payment.receiptNumber && (
                      <button
                        className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-800"
                        onClick={() => {
                          // TODO: Implement receipt download
                          console.log('Download receipt:', payment.receiptNumber);
                        }}
                      >
                        <Download className="w-4 h-4" />
                        <span>Tải hóa đơn</span>
                      </button>
                    )}
                    {payment.status === 'pending' && (
                      <button
                        className="inline-flex items-center space-x-1 text-green-600 hover:text-green-800"
                        onClick={() => {
                          // TODO: Implement payment
                          console.log('Process payment:', payment.id);
                        }}
                      >
                        <Receipt className="w-4 h-4" />
                        <span>Thanh toán</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có lịch sử thanh toán</h3>
            <p className="mt-1 text-sm text-gray-500">
              Lịch sử thanh toán của bạn sẽ hiển thị tại đây.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
