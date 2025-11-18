import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { walletAPI } from "../../services/api";

const AccountPayments = () => {
  const { data: walletData, isLoading: isLoadingWallet, isError: isErrorWallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: walletAPI.getWallet,
  });

  const { data: transactionsData, isLoading: isLoadingTransactions, isError: isErrorTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: walletAPI.getTransactions,
  });

  const balance = walletData || { balance_sar: 0, balance_points: 0 };
  const transactions = transactionsData?.transactions?.data || [];

  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "جميع العمليات" },
    { key: "payments", label: "المدفوعات" },
    { key: "refunds", label: "المستردات" },
    { key: "rejected", label: "المرفوضة" },
  ];

  const filteredTransactions = activeFilter === "all"
    ? transactions
    : transactions.filter(t => t.status === activeFilter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     

      <div className="mb-8">
        <div className="bg-gradient-to-r from-black to-gray-800 shadow-lg rounded-br-3xl rounded-tl-3xl p-6 border border-black hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-bold text-white text-right -mt-2">إجمالي رصيد المحفظة</h2>
          {isLoadingWallet ? (
            <p className="text-white text-center mt-4">جاري تحميل الرصيد...</p>
          ) : isErrorWallet ? (
            <p className="text-red-500 text-center mt-4">خطأ في تحميل الرصيد.</p>
          ) : (
            <div className="flex justify-between items-center mt-4 mr-7">
              <p className="text-lg font-bold text-white">
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent font-bold text-lg drop-shadow-lg">
                  {balance.balance_sar}
                </span>{" "}
                ر.س
              </p>
              <p className="text-lg font-bold text-white -mt-5">
                عدد النقاط:{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent font-bold text-lg drop-shadow-lg">
                  {balance.balance_points}
                </span>{" "}
                نقطة
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-right border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">سجل العمليات</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-gray-500 to-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          {isLoadingTransactions ? (
            <p className="text-center text-gray-600">جاري تحميل العمليات...</p>
          ) : isErrorTransactions ? (
            <p className="text-red-500 text-center">خطأ في تحميل العمليات.</p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-center text-gray-600">لا توجد عمليات لعرضها.</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 text-gray-600 font-semibold">التاريخ</th>
                  <th className="text-right py-3 text-gray-600 font-semibold">النوع</th>
                  <th className="text-right py-3 text-gray-600 font-semibold">المبلغ (نقطة)</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-gray-800">{new Date(transaction.created_at).toLocaleDateString('ar-EG')}</td>
                    <td className="py-3 text-gray-800">{transaction.type}</td>
                    <td className={`py-3 font-medium ${
                      transaction.amount > 0 ? 'text-green-600' : transaction.amount < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{Math.round(transaction.amount / 500)} نقطة
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPayments;
