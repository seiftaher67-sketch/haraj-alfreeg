import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@tanstack/react-query';
import { walletAPI } from '../../services/api';

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [expiryDate, setExpiryDate] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [saveCardData, setSaveCardData] = useState(false);

  const methods = [
    { id: 1, title: "Visa", img: "/assets/images/icons/logos_visa.png" },
    { id: 2, title: "MasterCard", img: "/assets/images/icons/Icons.png" },
    { id: 3, title: "Mada", img: "/assets/images/icons/2560px-Mada_Logo.svg 1.png" },
  ];

  const isFormComplete = cardData.name && cardData.number && cardData.expiry && cardData.cvv;

  const topupMutation = useMutation({
    mutationFn: walletAPI.topup,
    onSuccess: (data) => {
      alert('تم شحن المحفظة بنجاح!');
      setCardData({ name: "", number: "", expiry: "", cvv: "" });
      setExpiryDate(null);
      setSelectedMethod(null);
      setIsSuccessModalOpen(true);
    },
    onError: (error) => {
      alert('حدث خطأ أثناء شحن المحفظة: ' + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      // Calculate points from amount (1 point per 500 SAR)
      const points = Math.floor(parseInt(amount) / 500);

      const topupData = {
        points: points,
        card_number: cardData.number.replace(/\s/g, ''), // Remove spaces
        expiry_month: expiryDate ? (expiryDate.getMonth() + 1).toString().padStart(2, '0') : '',
        expiry_year: expiryDate ? expiryDate.getFullYear().toString() : '',
        cvv: cardData.cvv,
        cardholder_name: cardData.name,
        save_card: saveCardData
      };

      topupMutation.mutate(topupData);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-right">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">شحن المحفظة</h1>

      {/* إدخال مبلغ الشحن */}
      <section className="mb-12">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            أدخل مبلغ الشحن
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                المبلغ (ريال سعودي)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none text-right"
                placeholder="أدخل المبلغ"
                min="1"
                required
              />
              {amount && (
                <p className="text-sm text-gray-600 mt-2">
                  سيتم إضافة {Math.floor(parseInt(amount) / 500)} نقطة إلى محفظتك
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* اختيار طريقة الدفع */}
      {amount && parseInt(amount) > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            اختر طريقة الدفع
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {methods.map((m) => (
              <motion.div
                key={m.id}
                className={`cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center justify-center transition shadow-sm hover:shadow-md ${
                  selectedMethod === m.id
                    ? "border-[#f2b400] bg-yellow-50"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => setSelectedMethod(m.id)}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={m.img}
                  alt={m.title}
                  className="w-20 h-12 object-contain mb-4"
                />
                <h4 className="font-semibold text-gray-800 text-lg">
                  {m.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ===== بيانات الفيزا ===== */}
      {(selectedMethod === 1 || selectedMethod === 2 || selectedMethod === 3) && (
        <motion.section
          className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* صورة البطاقة */}
          <img
            src="/assets/images/images/creditcard svg 1.png"
            alt="Credit Card"
            className="w-full h-auto object-contain mx-auto"
          />

          {/* نموذج بيانات البطاقة */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <h4 className="text-2xl font-bold text-gray-800 mb-6">
              أدخل بيانات البطاقة
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                اسم حامل البطاقة
              </label>
              <input
                type="text"
                placeholder="الاسم كما هو مكتوب على البطاقة"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                رقم البطاقة
              </label>
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  تاريخ الانتهاء
                </label>
                <DatePicker
                  selected={expiryDate}
                  onChange={(date) => {
                    setExpiryDate(date);
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear().toString().slice(-2);
                    setCardData({ ...cardData, expiry: `${month} / ${year}` });
                  }}
                  dateFormat="MM / yy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholderText="MM / YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="•••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                />
              </div>
            </div>

            {/* Checkbox لحفظ بيانات البطاقة */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="saveCardData"
                checked={saveCardData}
                onChange={(e) => setSaveCardData(e.target.checked)}
                className="w-4 h-4 text-[#f2b400] bg-gray-100 border-gray-300 rounded focus:ring-[#f2b400] focus:ring-2"
              />
              <label htmlFor="saveCardData" className="text-sm text-gray-600">
                هل تريد حفظ بيانات البطاقة الخاصة بك؟
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormComplete || topupMutation.isPending}
              className={`w-full bg-[#f2b400] text-black font-bold py-3 rounded-lg transition ${
                isFormComplete ? 'hover:bg-[#d4a200]' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {topupMutation.isPending ? 'جاري الدفع...' : 'ادفع الآن'}
            </button>
          </form>
        </motion.section>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            {/* Images */}
            <div className="flex justify-center space-x-4 mb-6">
              <img
                src="/assets/images/images/Group-1.png"
                alt="Group-1"
                className="w-20 h-20 object-contain"
              />
              <img
                src="/assets/images/images/Group-2.png"
                alt="Group-2"
                className="w-20 h-20 object-contain"
              />
              <img
                src="/assets/images/images/Group.png"
                alt="Group"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">تم الدفع بنجاح!</h3>
              <p className="text-gray-600 mb-6">
                تم شحن محفظتك بنجاح. سيتم تحديث رصيدك خلال دقائق قليلة.
              </p>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="bg-[#f2b400] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#d4a200] transition"
              >
                حسناً
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Recharge;
