import React, { useEffect, useState } from "react";
import { FaTruck, FaCar, FaTrailer, FaCog } from "react-icons/fa";
import AuctionCard from "../components/AuctionCard";

const API_BASE_URL = "http://localhost:8000"; // عدّل إن كان مختلفاً

const getMediaUrl = (path) => {
  if (!path) return "/assets/images/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}/storage/${path}`;
};

export const categories = [
  { name: "شاحنات", icon: FaTruck },
  { name: "سيارات", icon: FaCar },
  { name: "مقطورات", icon: FaTrailer },
  { name: "قطع غيار", icon: FaCog },
];

export const filters = [
  { name: "المدينة", options: ["الرياض", "جدة", "الدمام", "مكة"] },
  { name: "الماركة", options: ["مرسيدس", "فولفو", "مان", "سكانيا"] },
  { name: "الموديل", options: ["TGS", "FH", "TGX", "R"] },
  { name: "سنة الصنع", options: ["2020", "2021", "2022", "2023"] },
  { name: "حالة السيارة", options: ["جديد", "مستعمل", "مصدوم"] },
];

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/listings`);
        const json = await res.json();
        const payload = Array.isArray(json) ? json : (json.data || json);
        const items = Array.isArray(payload) ? payload : [];
        const approved = items.filter(
          (i) =>
            i.approval_status === "approved" || i.approval_status === "Approved"
        );
        const mapped = approved.map((item) => ({
          id: item.id,
          image:
            item.media && item.media.length
              ? getMediaUrl(item.media[0])
              : "/assets/images/placeholder.png",
          title: item.title || `اعلان ${item.id}`,
          price: item.price_in_sar || item.price || "—",
          minPrice: item.price_in_points || item.min_price || "—",
          model: item.model || "—",
          serialNumber: item.serial_number || item.serial || "—",
          remainingTime: item.remainingTime || "00 : 00 : 00",
          status: "Opening",
          bidsCount: item.bids_count || 0,
        }));
        if (mounted) setListings(mapped);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchListings();
    return () => {
      mounted = false;
    };
  }, []);

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

  if (loading) return <div className="p-6 text-center">جاري التحميل...</div>;
  if (error) return <div className="p-6 text-center text-red-600">خطأ: {error}</div>;
  if (!listings.length) return <div className="p-6 text-center">لا توجد إعلانات موافق عليها</div>;

  return (
    <div dir="rtl" className="flex flex-col bg-gray-50 text-[#0b0b0b]">
      {/* CATEGORIES SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">الفئات</h2>

            <div className="flex items-center gap-3">
              <button className="bg-black text-white px-6 py-2 rounded-lg">بحث</button>
            </div>
          </div>

          {/* category chips */}
          <div className="flex items-center gap-3 flex-wrap mb-6">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => toggleCategory(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategories.includes(name)
                    ? "bg-blue-500 text-white"
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
            {filters.map(({ name, options }) => (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((v) => (
              <div
                key={v.id}
                onClick={() => toggleCardSelection(v.id)}
                className={`cursor-pointer transition-all ${
                  selectedCards.includes(v.id) ? "ring-2 ring-blue-500 rounded-2xl" : ""
                }`}
              >
                <AuctionCard auction={v} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
