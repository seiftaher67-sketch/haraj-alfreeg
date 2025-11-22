import React, { useState, useEffect } from 'react';
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function AuctionCard({ auction }) {
  const [isSaved, setIsSaved] = useState(false);
  const [remainingTime, setRemainingTime] = useState('00 : 00 : 00');
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedAuctions') || '[]');
    setIsSaved(savedItems.some(item => item.id === auction.id));
  }, [auction.id]);

  // حساب الحالة الفعلية بناءً على buy_now و auction_type
  const getAuctionStatus = () => {
    if (auction.buy_now === 1 || auction.buy_now === true) {
      return 'buy_now'; // شراء فوري
    }
    // للمزادات: live أو schedule
    if (auction.auction_type === 'live' || auction.auction_type === 'schedule') {
      return auction.status || 'Opening'; // Opening, Sold, Upcoming
    }
    return auction.status || 'Opening';
  };

  const auctionStatus = getAuctionStatus();

  useEffect(() => {
    if ((auctionStatus === 'Opening' || auction.status === 'Opening') && auction.remainingTime) {
      const timeStr = typeof auction.remainingTime === 'string' ? auction.remainingTime : '';
      const parts = timeStr.split(' : ').map(Number);
      if (parts.length === 3) {
        const [hours, minutes, seconds] = parts;
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setRemainingSeconds(totalSeconds);
      }
    }
  }, [auction.remainingTime, auctionStatus, auction.status]);

  useEffect(() => {
    if ((auctionStatus === 'Opening' || auction.status === 'Opening') && remainingSeconds > 0) {
      const interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setRemainingTime('00 : 00 : 00');
            return 0;
          }
          const newSeconds = prev - 1;
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const secs = newSeconds % 60;
          const formatted = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
          setRemainingTime(formatted);
          return newSeconds;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingSeconds, auctionStatus, auction.status]);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const savedItems = JSON.parse(localStorage.getItem('savedAuctions') || '[]');
    let updatedItems;

    if (isSaved) {
      updatedItems = savedItems.filter(item => item.id !== auction.id);
    } else {
      updatedItems = [...savedItems, auction];
    }

    localStorage.setItem('savedAuctions', JSON.stringify(updatedItems));
    setIsSaved(!isSaved);
  };

  // خريطة الحالات محدثة
  const statusMap = {
    Opening: {
      label: 'Opening',
      bg: 'bg-green-100 text-green-700',
      dot: 'bg-green-500',
    },
    Sold: {
      label: 'Sold',
      bg: 'bg-gray-100 text-gray-700',
      dot: 'bg-gray-400',
    },
    Upcoming: {
      label: 'Upcoming',
      bg: 'bg-pink-50 text-pink-600',
      dot: 'bg-pink-500',
    },
    buy_now: {
      label: 'شراء فوري',
      bg: 'bg-blue-100 text-blue-700',
      dot: 'bg-blue-500',
    },
  };

  const statusStyle = statusMap[auctionStatus] || statusMap.Opening;

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* صورة المنتج */}
      <div className="relative h-44">
        <img src={auction.image} alt={auction.title} className="w-full h-full object-cover" />

        {/* حالة المزاد */}
        <div
          className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 ${statusStyle.bg}`}
        >
          <span className={`inline-block w-2 h-2 rounded-full ${statusStyle.dot}`}></span>
          {statusStyle.label}
        </div>

        {/* زر الحفظ */}
        <button
          onClick={toggleSave}
          className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-sm hover:bg-gray-50 transition"
        >
          {isSaved ? (
            <BookmarkSolidIcon className="w-5 h-5 text-yellow-500" />
          ) : (
            <BookmarkOutlineIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* التفاصيل */}
      <div className="p-4 flex flex-col gap-3">
        {/* العنوان */}
        <h3 className="font-bold text-[25px] text-gray-900 leading-tight text-center">
          {auction.title}
        </h3>

        {/* السعر */}
        <div className="font-bold text-base flex justify-between items-center">
          <span className="text-gray-600">السعر</span>
          <span className="flex items-center gap-1 text-[#f2b400] font-bold text-lg">
            <CurrencyDollarIcon className="w-4 h-4" />
            {auction.price} ر.س
          </span>
        </div>

        {/* الحد الأدنى */}
        <div className="font-bold text-base flex justify-between items-center">
          <span className="text-gray-600">الحد الأدنى</span>
          <span className="flex items-center gap-1 text-gray-800 font-bold text-lg">
            <CurrencyDollarIcon className="w-4 h-4" />
            {auction.minPrice} ر.س
          </span>
        </div>

        {/* البيانات الإضافية: تختلف حسب نوع المزاد */}
        <div className="grid grid-cols-3 text-sm text-gray-600 border-t border-b border-gray-100 py-3 gap-2">
          <div className="text-right">
            <div className="text-xs text-gray-400">الموديل</div>
            <div className="font-medium text-gray-900">{auction.model || '—'}</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-xs text-gray-400">سنة التسجيل</div>
            <div className="font-medium text-gray-900">{auction.year || auction.registrationYear || '—'}</div>
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-400">
              {auctionStatus === 'buy_now' ? 'الكيلومترات' : 'عدد المزايدات'}
            </div>
            <div className="font-medium text-gray-900">
              {auctionStatus === 'buy_now' ? (auction.kilometers || '—') : (auction.bidsCount || 0)}
            </div>
          </div>
        </div>

        {/* الوقت / حالة إضافية */}
        <div className="flex items-center justify-center text-sm text-gray-600">
          {auctionStatus === 'Opening' ? (
            <div className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 font-medium text-xs flex items-center gap-2">
              <div>الوقت المتبقي</div>
              <div className="text-lg font-bold">
                {remainingTime}
              </div>
            </div>
          ) : auctionStatus === 'Sold' ? (
            <div className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500 font-medium text-xs text-center">
              تم البيع
            </div>
          ) : auctionStatus === 'Upcoming' ? (
            <div className="px-3 py-1.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-100 font-medium text-xs text-center flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              قم بالانتظار
            </div>
          ) : auctionStatus === 'buy_now' ? (
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 font-medium text-xs text-center">
              متاح للشراء الفوري
            </div>
          ) : null}
        </div>

        {/* الزر */}
        <div className="flex justify-center">
          {auctionStatus === 'Opening' || auctionStatus === 'buy_now' ? (
            <Link to="/car-details" state={{ auction }}>
              <button className="bg-[#f2b400] hover:bg-[#d19b00] text-[#0b0b0b] py-2.5 px-6 rounded-lg font-semibold text-sm transition-colors w-full">
                {auctionStatus === 'buy_now' ? 'اشتري الآن' : 'بدأ المزايدة'}
              </button>
            </Link>
          ) : auctionStatus === 'Sold' ? (
            <button
              disabled
              className="bg-gray-100 text-gray-500 py-2.5 px-6 rounded-lg font-semibold text-sm cursor-not-allowed w-full"
            >
              تم البيع
            </button>
          ) : auctionStatus === 'Upcoming' ? (
            <button className="bg-pink-50 border border-pink-200 text-pink-600 py-2.5 px-6 rounded-lg font-semibold text-sm w-full">
              قم بالانتظار
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
