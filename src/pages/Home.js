import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuctionCard from "../components/AuctionCard";
import { FaTruck, FaCar, FaTrailer, FaCog } from "react-icons/fa";
import { MdChevronLeft } from "react-icons/md";
import l1 from "../styles/l1.png";
import l2 from "../styles/l2.png";
import l3 from "../styles/l3.png";
import l4 from "../styles/l4.png";
import l5 from "../styles/l5.png";
import l6 from "../styles/l6.png";
import l7 from "../styles/l7.png";
import l8 from "../styles/l8.png";
import Group1 from "../assets/Group 1.png";
import Group2 from "../assets/Group 2.png";
import { bannerAPI } from "../services/api";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const images = [
    l1,
    l2,
    l3,
    l4,
    l5,
    l6,
    l7,
    l8,
  ];

  const vehicles = [
    {
      id: 1,
      title: "MERCEDES",
      price: "2500000",
      minPrice: "205000",
      serialNumber: "12345",
      model: "BENZ",
      auctionCount: 3,
      remainingTime: "08:15:02",
      image: "/assets/images/trucks/Frame 113.png",
      status: "Opening",
    },
    // ...باقي البيانات
  ];

  const filteredVehicles = vehicles;

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % slides.length), [slides.length]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCardSelection = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const toggleDropdown = (filterName) => {
    setOpenDropdown(openDropdown === filterName ? null : filterName);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const banners = await bannerAPI.getBanners();
        const formattedSlides = banners.map(banner => ({
          image: banner.image_path,
          title: banner.title,
          subtitle: "",
        }));
        setSlides(formattedSlides);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
        // No fallback slides - only show banners from backend
        setSlides([]);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const t = setInterval(nextSlide, 5000);
      return () => clearInterval(t);
    }
  }, [nextSlide, slides.length]);



  return (
    <div dir="rtl" className="flex flex-col bg-gray-50 text-[#0b0b0b]">
      {/* HERO SLIDER */}
      <section className="relative h-[540px] overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="relative w-full h-full flex-shrink-0"
              style={{ minWidth: "100%" }}
            >
              <img
                src={encodeURI(slide.image)}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`انتقل إلى الشريحة ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* BRANDS STRIP (mobile-visible) */}
      <section className="py-6 bg-white">
        <div className=" ">
          <div className="relative w-full overflow-hidden">
            <style>{`
        /* Infinite marquee animation - enter left, exit right, seamless loop */
        @keyframes marquee {
          0% { 
            transform: translateX(50%);
          }
          100% { 
            transform: translateX(0%);
          }
        }

        .marquee-container {
          position: relative;
          width: 100%;
          overflow: visible;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 40px;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-inline: 0;
          padding-top: 0;
          width: 120px;
          height: 80px;
        }

        /* Button background animation */
        @keyframes buttonCycle {
          0%, 100% {
            background-color: red;
            color: white;
            border-color: red;
          }
          50% {
            background-color: white;
            color: red;
            border-color: red;
          }
        }

        .button-animate {
          animation: buttonCycle 2s infinite;
        }

        .group:hover .button-animate {
          animation-play-state: paused;
        }
      `}</style>

            <div className="marquee-container">
              {(() => {
                // Create enough repetitions to ensure seamless infinite scroll
                // Duplicate the images block multiple times, then duplicate the whole block for seamless loop
                const repeatCount = 3; // Repeat images this many times per block
                const block = Array.from({ length: repeatCount }).flatMap(
                  () => images
                );

                // Create two identical halves - when animation moves -50%, it seamlessly loops
                const fullTrack = [...block, ...block];

                return (
                  <div className="marquee-track" aria-hidden="false">
                    {fullTrack.map((img, idx) => (
                      <div key={idx} className="marquee-item">
                        <img
                          src={img}
                          alt={`brand-${idx}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* AUCTIONS GRID */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-right">المزايدات</h2>
            <Link to="/auctions" className="inline-flex items-center">
              <span className="group button-animate inline-flex items-center gap-3 border-2 border-red-500 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-red-500 hover:text-white">
                {/* أيقونة داخل دائرة */}
                <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 group-hover:border-white group-hover:bg-white/20 transition-all">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
                <span className="font-medium">يجري الآن مزايدات</span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
            ].map((vehicle, index) => (
              <AuctionCard key={`${vehicle.id}-${index}`} auction={vehicle} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to="/auctions"
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 font-medium"
            >
              عرض المزيد
              <MdChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* USER TYPES - Figma style with decorations */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* decorative images (placed in src/assets/) */}
        <img
          src={Group1}
          alt="decor-left"
          className="block absolute -left-6 lg:-left-12 top-1/4 -translate-y-1/4 w-60 lg:w-96 pointer-events-none"
        />

        <img
          src={Group2}
          alt="decor-right"
          className="block absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-60 lg:w-96 pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-right mb-8">بنود المزايدات</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Card */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-right min-h-[450px] flex flex-col h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1">Guest</h3>
                  <p className="text-gray-600 mb-6">الدخول كمستخدم زائر</p>
                </div>

                <ul className="space-y-4 text-right mb-5">
                  {[
                    "يمكنك حفظ السيارات التي أعجبتك",
                    "يمكنك تصفح جميع أنواع السيارات",
                    "يمكنك كتابة تعليقات",
                    "يمكنك البحث عن أي نوع سيارة",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-start gap-3"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              
                <Link to="/categories">
                  <button className="flex items-center justify-center mt-12 w-56 mx-auto bg-[#f2b400] hover:bg-[#d19b00] text-[#0b0b0b] font-medium py-3 rounded-lg shadow">
                    الدخول مجانا
                  </button>
                </Link>
              
              </div>
            </div>

            {/* Bidder Card */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-right min-h-[450px] relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1">Bidder</h3>
                  <p className="text-gray-600 mb-6">الدخول كمزايد</p>
                </div>

                <ul className="space-y-4 text-right mb-6">
                  {[
                    "يجب إدخال السعر الأدنى - المحدث للزيادة",
                    "بمجرد الإيداع تبدأ على الفور بالمزايدات",
                    "يمكنك إسترداد المبلغ إذا لم يتم قبول العرض",
                    "الدفع من خلال بطاقات آمنة",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-start gap-3"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <img
                    src="/assets/images/icons/2560px-Mada_Logo.svg 1.png"
                    alt="paypal"
                    className="h-6"
                  />
                  <img
                    src="/assets/images/icons/logos_visa.png"
                    alt="visa"
                    className="h-6"
                  />
                  <img
                    src="/assets/images/icons/Icons.png"
                    alt="mastercard"
                    className="h-6"
                  />
                </div>

                <Link to="/auctions">
                  <button className=" flex items-center justify-center mt-2  w-56 mx-auto bg-[#f2b400] hover:bg-[#d19b00] text-[#0b0b0b] font-medium py-3 rounded-lg shadow ">
                    بدأ التزايد الآن
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">الفئات</h2>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="ابحث عن سيارات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black font-bold"
              />
              <button className="bg-black text-white px-6 py-2 rounded-lg">
                بحث
              </button>
            </div>
          </div>

          {/* category chips */}
          <div className="flex items-center gap-3 flex-wrap mb-6">
            {[
              { name: "شاحنات", icon: FaTruck },
              { name: "سيارات", icon: FaCar },
              { name: "مقطورات", icon: FaTrailer },
              { name: "قطع غيار", icon: FaCog },
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => toggleCategory(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategories.includes(name)
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-[#0b0b0b]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            ))}
          </div>

          {/* filters row */}
          <div className="flex items-center gap-3 flex-wrap mb-8">
            {[
              { name: "المدينة", options: ["الرياض", "جدة", "الدمام", "مكة"] },
              {
                name: "الماركة",
                options: ["مرسيدس", "فولفو", "مان", "سكانيا"],
              },
              { name: "الموديل", options: ["TGS", "FH", "TGX", "R"] },
              { name: "سنة الصنع", options: ["2020", "2021", "2022", "2023"] },
              { name: "حالة السيارة", options: ["جديد", "مستعمل", "مصدوم"] },
            ].map(({ name, options }) => (
              <div key={name} className="relative">
                <button
                  onClick={() => toggleDropdown(name)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#0b0b0b] flex items-center gap-2"
                >
                  {name} ▾
                </button>
                {openDropdown === name && (
                  <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          // Handle selection (e.g., update filter state)
                          setOpenDropdown(null);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">الأكثر شهرة</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
              ...filteredVehicles,
            ].map((v, index) => (
              <div
                key={`${v.id}-${index}`}
                onClick={() => toggleCardSelection(v.id)}
                className={`cursor-pointer transition-all ${
                  selectedCards.includes(v.id)
                    ? "ring-2 ring-blue-500 rounded-2xl"
                    : ""
                }`}
              >
                <AuctionCard auction={v} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* LIVE VIDEO / YOUTUBE */}
      <section id="live-broadcast" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* header with logo + texts */}
          <div className="flex items-center justify-between mb-6 gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/images/logo.jpeg"
                alt="الفريج"
                className="h-16 w-16 rounded-full object-cover shadow-md border-2 border-white"
              />
              <div className="text-right">
                <h3 className="text-xl font-semibold">شركة علي عبدالله الفريج</h3>
                <p className="text-sm text-gray-600">يوجد لدينا حراج كل يوم الخميس والجمعة والسبت</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <a href="https://youtu.be/bKZtjt27AFg?si=SOD54qWDcOt0zcrM" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-gray-600">
                <img
                  src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
                  alt="YouTube"
                  className="w-20 h-6 object-contain"
                />
                youtu.be/bKZtjt27AFg
              </a>
            </div>
          </div>

          {/* video card */}
          <div className="bg-white/95 rounded-2xl shadow-lg p-4">
            <div className="relative rounded-xl overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/bKZtjt27AFg?modestbranding=0"
                title="YouTube Live"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* live badge (top-left) */}
              <div className="absolute left-4 top-4 bg-white/90 text-red-600 rounded-full px-3 py-1 flex items-center gap-2 shadow">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium">بث مباشر</span>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Link to="/payment">
                <button className="bg-[#f2b400] hover:bg-[#d19b00] text-[#0b0b0b] py-3 px-8 rounded-lg font-medium shadow">
                  تسجيل في المزايده
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
