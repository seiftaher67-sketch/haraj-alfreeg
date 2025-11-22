// src/pages/CarDetails.js
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import BIDCard from "../components/BIDCard";
import AuctionCard from "../components/AuctionCard";
import {
  FaPhone,
  FaWhatsapp,
  FaUsers,
  FaDollarSign,
  FaGavel,
  FaRuler,
  FaCog,
  FaCar,
  FaDownload,
} from "react-icons/fa";

const API_BASE_URL = "http://localhost:8000";

const getMediaUrl = (path) => {
  if (!path) return "/assets/images/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}/storage/${path}`;
};

const CarDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  // بيانات من state أو من URL params
  const initialAuction = location.state?.auction;
  const auctionId = id || initialAuction?.id;

  const [auction, setAuction] = useState(initialAuction || null);
  const [loading, setLoading] = useState(!initialAuction);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showBid, setShowBid] = useState(false);
  const [similarAuctions, setSimilarAuctions] = useState([]);

  // Normalize payload helper
  const normalizePayload = (json) => {
    // Common response shapes:
    // 1) { data: { ... } }
    // 2) { data: [...] } (list)
    // 3) { ... } direct object
    if (!json) return null;
    if (json.data && typeof json.data === "object" && !Array.isArray(json.data)) {
      return json.data;
    }
    if (json.data && Array.isArray(json.data) && json.data.length === 1) {
      return json.data[0];
    }
    return json;
  };

  // جلب تفاصيل الشاحنة من الباك‌إند إذا لم تكن موجودة
  useEffect(() => {
    if (initialAuction) {
      // ensure image path normalized
      const init = {
        ...initialAuction,
        image: initialAuction.image ? getMediaUrl(initialAuction.image) : getMediaUrl(initialAuction.media?.[0]),
        media: initialAuction.media || [],
      };
      setAuction(init);
      setMainImage(init.image || getMediaUrl(init.media?.[0]));
      // حساب الوقت المتبقي إن وُجد كحقل auction_end_at أو remainingTime
      const endAt = init.auction_end_at || init.end_at;
      if (init.remainingTime) {
        const parts = String(init.remainingTime).split(" : ").map(Number);
        if (parts.length === 3) {
          const [hours, minutes, seconds] = parts;
          setTimeLeft(hours * 3600 + minutes * 60 + seconds);
        }
      } else if (endAt) {
        const diff = Math.max(0, new Date(endAt) - new Date());
        setTimeLeft(Math.floor(diff / 1000));
      }
      return;
    }

    if (!auctionId) return;

    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/listings/${auctionId}`);
        const json = await res.json();
        const payload = normalizePayload(json);

        console.log("Auction details (normalized):", payload);

        // seller may be an object
        const sellerName = payload.seller_name || payload.seller?.name || payload.seller?.full_name || "—";
        const sellerPhone = payload.seller_phone || payload.seller?.phone || payload.phone || null;

        // تحضير بيانات الشاحنة
        const auctionData = {
          id: payload.id,
          title: payload.title || payload.name || `اعلان ${payload.id}`,
          image: payload.media?.[0] ? getMediaUrl(payload.media[0]) : payload.image ? getMediaUrl(payload.image) : "/assets/images/placeholder.png",
          price: payload.price_in_sar || payload.price || "0",
          minPrice: payload.price_in_points || payload.min_price || payload.minPrice || "0",
          model: payload.model || payload.make || "—",
          serialNumber: payload.serial_number || payload.serial || "—",
          year: payload.registration_year || payload.year || "—",
          kilometers: payload.kilometers || payload.km || "—",
          remainingTime: payload.remainingTime || payload.time_left || "00 : 00 : 00",
          // use approval_status as visible status, but keep original status fields too
          status: payload.approval_status || payload.status || "Opening",
          auction_type: payload.auction_type || payload.type || null,
          buy_now: payload.buy_now,
          cabin_type: payload.cabin_type || "—",
          vehicle_type: payload.vehicle_type || payload.condition || "—",
          engine_capacity: payload.engine_capacity || payload.engine || "—",
          fuel_type: payload.fuel_type || "—",
          transmission: payload.transmission || "—",
          lights_type: payload.lights_type || "—",
          color: payload.color || "—",
          length: payload.length || "—",
          width: payload.width || "—",
          height: payload.height || "—",
          description: payload.description || "—",
          other: payload.other || payload.features || [],
          media: payload.media || [],
          documents: payload.documents || [],
          seller_name: sellerName,
          seller_phone: sellerPhone,
          bidsCount: payload.bids_count || payload.bids || 0,
          auction_end_at: payload.auction_end_at || payload.end_at || null,
          created_at: payload.created_at || payload.date || null,
        };

        setAuction(auctionData);
        setMainImage(auctionData.image);

        // حساب الوقت المتبقي: أفضل مصدر auction_end_at ثم remainingTime
        if (auctionData.auction_end_at) {
          const diff = Math.max(0, new Date(auctionData.auction_end_at) - new Date());
          setTimeLeft(Math.floor(diff / 1000));
        } else if (auctionData.remainingTime) {
          const parts = String(auctionData.remainingTime).split(" : ").map(Number);
          if (parts.length === 3) {
            const [hours, minutes, seconds] = parts;
            setTimeLeft(hours * 3600 + minutes * 60 + seconds);
          }
        }

        // جلب إعلانات مشابهة
        fetchSimilarAuctions();
      } catch (err) {
        console.error(err);
        setError(err.message || "خطأ في جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId, initialAuction]);

  // جلب إعلانات مشابهة
  const fetchSimilarAuctions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/listings?limit=6`);
      const json = await res.json();
      const raw = Array.isArray(json) ? json : (json.data || json);
      const items = Array.isArray(raw) ? raw : [];

      const mapped = items
        .filter(i => i.id !== auctionId && (i.approval_status === 'approved' || i.approval_status === 'Approved'))
        .slice(0, 3)
        .map(item => ({
          id: item.id,
          image: item.media?.[0] ? getMediaUrl(item.media[0]) : (item.image ? getMediaUrl(item.image) : "/assets/images/placeholder.png"),
          title: item.title || item.name || `اعلان ${item.id}`,
          price: item.price_in_sar || item.price || "—",
          minPrice: item.price_in_points || item.min_price || "—",
          model: item.model || "—",
          serialNumber: item.serial_number || "—",
          year: item.registration_year || "—",
          remainingTime: "00 : 00 : 00",
          status: item.approval_status || item.status || "Opening",
          bidsCount: item.bids_count || item.bids || 0,
        }));

      setSimilarAuctions(mapped);
    } catch (err) {
      console.error("خطأ في جلب الإعلانات المشابهة:", err);
    }
  };

  // عداد الوقت التنازلي
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600 text-2xl">خطأ: {error}</div>;
  }

  if (!auction) {
    return <div className="flex items-center justify-center h-screen text-2xl">لم يتم العثور على الإعلان</div>;
  }

  const thumbnails = (auction.media && auction.media.length > 0)
    ? auction.media.map(m => getMediaUrl(m))
    : [auction.image || "/assets/images/placeholder.png"];

  // حساب الضريبة والإجمالي
  const price = parseFloat(String(auction.price || "0")) || 0;
  const minPrice = parseFloat(String(auction.minPrice || "0")) || 0;
  const serviceFee = price * 0.025; // 2.5%
  const tax = price * 0.15; // 15%
  const total = price + serviceFee + tax;

  return (
    <div className="bg-white" dir="rtl">
      <div className="max-w-[1440px] mx-auto px-[72px] py-8">
        {/* Title */}
        <h1 className="text-[40px] font-bold mb-6 text-center">
          {auction.title}
        </h1>

        {/* Seller info */}
        <div className="text-center mb-6 flex justify-center gap-8">
          <div className="text-lg">
            <span className="text-gray-600">بائع الإعلان: </span>
            <span className="font-semibold">{auction.seller_name}</span>
          </div>
          {auction.seller_phone && (
            <div className="text-lg">
              <span className="text-gray-600">الهاتف: </span>
              <a href={`tel:${auction.seller_phone}`} className="font-semibold text-blue-600">
                {auction.seller_phone}
              </a>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div className="flex gap-6 mb-8">
          {/* Main Image */}
          <div className="relative flex-1">
            <img
              src={mainImage}
              alt="main"
              className="rounded-2xl w-[856px] h-[560px] object-cover"
            />
            <span className="absolute top-6 right-6 bg-white rounded-3xl px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38DF3C]"></span>
              <span className="text-[#38DF3C] font-semibold text-xl">
                {auction.status}
              </span>
            </span>
          </div>

          {/* Thumbnails Grid */}
          <div className="w-[418px]">
            <div className="grid grid-cols-2 gap-[26px]">
              {thumbnails.slice(0, 2).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(src)}
                  className="focus:outline-none"
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    className="w-[196px] h-[176px] object-cover rounded-2xl hover:opacity-90"
                  />
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-[26px] mt-4">
              {thumbnails.slice(2, 4).map((src, i) => (
                <button
                  key={i + 2}
                  onClick={() => setMainImage(src)}
                  className="focus:outline-none"
                >
                  <img
                    src={src}
                    alt={`thumb-${i + 2}`}
                    className="w-[196px] h-[176px] object-cover rounded-2xl hover:opacity-90"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Basic Info Row */}
        <div className="flex items-center gap-6 mb-8 border-t border-b border-gray-200 py-4">
          <div className="flex flex-col items-center flex-1 border-l border-gray-300 px-4">
            <span className="text-[#C3C3C3] text-2xl font-semibold mb-1">
              سنة التسجيل
            </span>
            <span className="text-black font-medium text-xl">
              {auction.year}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-gray-300 px-4">
            <span className="text-[#C3C3C3] text-2xl font-semibold mb-1">
              عدد الكيلومترات
            </span>
            <span className="text-black font-medium text-xl">
              {auction.kilometers}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-gray-300 px-4">
            <span className="text-[#C3C3C3] text-2xl font-semibold mb-1">
              رقم التسلسل
            </span>
            <span className="text-black font-medium text-xl">
              {auction.serialNumber}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-gray-300 px-4">
            <span className="text-[#C3C3C3] text-2xl font-semibold mb-1">
              الموديل
            </span>
            <span className="text-black font-medium text-xl">
              {auction.model}
            </span>
          </div>
          <div className="flex flex-col items-center flex-1 px-4">
            <span className="text-[#C3C3C3] text-2xl font-semibold mb-1">
              حالة السيارة
            </span>
            <span className="text-black font-medium text-xl">
              {auction.vehicle_type}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {/* Right Column: Timer, Auction Details, Video, Contacts */}
          <div className="col-span-1 space-y-6 order-2">
            {/* Timer */}
            <div className="bg-black text-white text-3xl font-medium py-4 rounded-lg flex items-center justify-center gap-6">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {formatTime(timeLeft)}
            </div>

            {/* Auction Details Card */}
            <div className="bg-[#F9F9F9] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-black" />
                  <span className="text-black font-semibold text-2xl">
                    عدد المزايدات
                  </span>
                </div>
                <span className="font-semibold text-2xl">{auction.bidsCount || 0}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-[#F8BC06]" />
                  <span className="text-black font-semibold text-2xl">
                    السعر
                  </span>
                </div>
                <span className="font-semibold text-2xl">{auction.price} ر.س</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                    />
                  </svg>
                  <span className="text-black font-semibold text-2xl">
                    الحد الأدنى
                  </span>
                </div>
                <span className="font-semibold text-2xl text-[#EB001B]">
                  {auction.minPrice} ر.س
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FaGavel className="text-black" />
                  <span className="text-black font-semibold text-2xl">
                    قيمة السعي
                  </span>
                </div>
                <span className="font-semibold text-2xl">{serviceFee.toFixed(2)} ر.س</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-black font-medium text-2xl">
                    الضريبة المضافة
                  </span>
                </div>
                <span className="font-semibold text-2xl">{tax.toFixed(2)} ر.س</span>
              </div>

              <div className="bg-[#E9E9E9] my-3 py-4 rounded-lg">
                <div className="flex items-center justify-between px-4">
                  <span className="text-black font-semibold text-3xl">
                    الإجمالي
                  </span>
                  <span className="font-bold text-black text-3xl">
                    {total.toFixed(2)} ر.س
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowBid(true)}
                className="bg-[#F8BC06] hover:bg-[#d19b00] transition text-black w-full py-4 rounded-lg font-semibold text-2xl"
              >
                بدأ التزايد الان
              </button>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <button className="w-full border-2 border-black text-black py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-50">
                <FaPhone className="w-8 h-8" />
                <span className="text-2xl font-medium">أتصل بنا مباشرة</span>
              </button>
              <button className="w-full border-2 border-black text-black py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-50">
                <FaWhatsapp className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-medium">
                  إرسال رسالة عبر واتساب
                </span>
              </button>
            </div>

            {/* Downloadable Files */}
            {auction.documents && auction.documents.length > 0 && (
              <div className="space-y-4">
                {auction.documents.map((doc, idx) => (
                  <a
                    key={idx}
                    href={getMediaUrl(doc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border-2 border-gray-300 rounded-2xl p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-2xl font-medium">الملف {idx + 1}</span>
                    </div>
                    <FaDownload className="text-3xl text-gray-600" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Left Column: Specifications */}
          <div className="col-span-2 space-y-8 order-1">
            {/* الصفات Title */}
            <h2 className="text-3xl font-semibold">الصفات</h2>

            {/* خاصية السيارة */}
            <div className="bg-[#F9F9F9] rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#F8BC06] mb-6 flex items-center">
                <FaRuler className="ml-2" /> خاصية السيارة
              </h3>
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <span className="text-xl text-gray-700">
                      الطول الإجمالي للمركبة
                    </span>
                    <span className="font-bold text-xl">
                      {auction.length} cm
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <span className="text-xl text-gray-700">
                      إجمالي عرض السيارة
                    </span>
                    <span className="font-bold text-xl">
                      {auction.width} cm
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <span className="text-xl text-gray-700">
                      إجمالي ارتفاع المركبة
                    </span>
                    <span className="font-bold text-xl">
                      {auction.height} cm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* مجموعة نقل الحركة */}
            <div className="bg-[#F9F9F9] rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#F8BC06] mb-6 flex items-center">
                <FaCog className="ml-2" /> مجموعة نقل الحركة
              </h3>
              <div className="flex justify-between gap-16 mb-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-medium text-gray-700">
                    سعة المحرك
                  </span>
                  <span className="text-xl font-medium text-gray-700">
                    الوقود
                  </span>
                  <span className="text-xl font-medium text-gray-700">
                    نوع علبة السرعات
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl text-gray-600">
                    {auction.engine_capacity}
                  </span>
                  <span className="text-xl text-gray-600">
                    {auction.fuel_type}
                  </span>
                  <span className="text-xl text-gray-600">
                    {auction.transmission}
                  </span>
                </div>
              </div>
            </div>

            {/* الكابينة */}
            <div className="bg-[#F9F9F9] rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#F8BC06] mb-6 flex items-center">
                <FaCar className="ml-2" /> الكابينة
              </h3>
              <div className="flex justify-between gap-8 mb-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-medium text-gray-700">
                    نوع الكابينة
                  </span>
                  <span className="text-xl font-medium text-gray-700">
                    نوع الإضاءة
                  </span>
                  <span className="text-xl font-medium text-gray-700">
                    اللون
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl text-gray-600">
                    {auction.cabin_type}
                  </span>
                  <span className="text-xl text-gray-600">
                    {auction.lights_type}
                  </span>
                  <span className="text-xl text-gray-600">
                    {auction.color}
                  </span>
                </div>
              </div>

              {/* Cabin Features Grid */}
              {auction.other && auction.other.length > 0 && (
                <div className="grid grid-cols-3 gap-y-4">
                  {auction.other.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-[1.5px] border-black flex items-center justify-center flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-[#F8BC06]"></div>
                      </div>
                      <span className="text-xl text-gray-700 truncate">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similarAuctions.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-semibold mb-6">إختيارات مشابهه</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarAuctions.map((auction, idx) => (
                <AuctionCard key={idx} auction={auction} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BID Modal */}
      {showBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <BIDCard
            image={mainImage}
            price={auction.price}
            min={auction.minPrice}
            onClose={() => setShowBid(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CarDetails;
