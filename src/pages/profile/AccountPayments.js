import React, { useState } from "react";

const AccountPayments = () => {
  const balance = {
    total: 1500,
    main: 1200,
    deposit: 300,
  };

  const transactions = [
    { id: 1, type: "إيداع", amount: 500, date: "2023-10-01", status: "payments" },
    { id: 2, type: "سحب", amount: -200, date: "2023-10-02", status: "refunds" },
    { id: 3, type: "مزايدة", amount: -100, date: "2023-10-03", status: "rejected" },
    { id: 4, type: "إيداع", amount: 300, date: "2023-10-04", status: "payments" },
    { id: 5, type: "مرفوض", amount: 0, date: "2023-10-05", status: "rejected" },
  ];

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
        <div className="bg-black shadow-lg rounded-lg p-6 border border-black hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-bold text-white text-center ml-[500px] -mt-2">إ جمالى رصيد المحفظه</h2>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold text-white"><span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent font-bold text-lg drop-shadow-lg">{balance.total}</span> ريال سعودي</p>
            <p className="text-lg font-bold text-white -mt-5">عدد النقاط: <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent font-bold text-lg drop-shadow-lg">{balance.total}</span> نقطة</p>
          </div>
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
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 text-gray-600 font-semibold">التاريخ</th>
                <th className="text-right py-3 text-gray-600 font-semibold">النوع</th>
                <th className="text-right py-3 text-gray-600 font-semibold">المبلغ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-gray-800">{transaction.date}</td>
                  <td className="py-3 text-gray-800">{transaction.type}</td>
                  <td className={`py-3 font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : transaction.amount < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} نقطة
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountPayments;
