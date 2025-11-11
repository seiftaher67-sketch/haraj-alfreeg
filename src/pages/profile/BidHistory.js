import React, { useState } from "react";
import AuctionCard from "../../components/AuctionCard";
import { ClockIcon, CheckCircleIcon, PlayIcon } from "@heroicons/react/24/outline";

const BidHistory = () => {
  const [filter, setFilter] = useState("all");

  const bids = [
    {
      id: 1,
      image: "/assets/images/trucks/Frame 112.png",
      title: "شاحنة فولفو",
      price: "5000",
      minPrice: "500",
      model: "TGS",
      serialNumber: "12346",
      bidsCount: "25",
      year: "2022",
      status: "Sold", // ناجحة -> Sold
      date: "2023-10-01"
    },
    {
      id: 2,
      image: "/assets/images/trucks/Frame 112.png",
      title: "شاحنة سكانيا",
      price: "4500",
      minPrice: "500",
      model: "R500",
      serialNumber: "12347",
      bidsCount: "20",
      year: "2021",
      status: "Upcoming", // مرفوضة -> Upcoming (معلقة)
      date: "2023-10-02"
    },
    {
      id: 3,
      image: "/assets/images/trucks/Frame 112.png",
      title: "شاحنة مرسيدس",
      price: "6000",
      minPrice: "500",
      model: "Actros",
      serialNumber: "12348",
      bidsCount: "30",
      year: "2023",
      status: "Sold", // ناجحة -> Sold
      date: "2023-10-03"
    },
    {
      id: 4,
      image: "/assets/images/trucks/Frame 112.png",
      title: "شاحنة فولفو",
      price: "5500",
      minPrice: "500",
      model: "TGS",
      serialNumber: "12349",
      bidsCount: "15",
      year: "2020",
      status: "Opening", // مرفوضة -> Opening (لايف)
      date: "2023-10-04"
    },
  ];

  const filteredBids = filter === "all" ? bids : bids.filter(bid => {
    if (filter === "ناجحة") return bid.status === "Sold";
    if (filter === "مرفوضة") return bid.status === "Upcoming";
    return true;
  });

  // Dummy data for auction cards
  const pendingAuctions = [
    {
      id: 101,
      image: "https://images.unsplash.com/photo-1605100804763-247f57d3c6b8?q=80&w=600",
      title: "شاحنة فولفو معلقة",
      price: "4000",
      minPrice: "500",
      model: "TGS",
      serialNumber: "12346",
      bidsCount: "25",
      year: "2022",
      remainingTime: "07 : 15 : 01",
      status: "Upcoming",
    },
  ];

  const acceptedAuctions = [
    {
      id: 102,
      image: "https://images.unsplash.com/photo-1605100804763-247f57d3c6b8?q=80&w=600",
      title: "شاحنة مرسيدس مقبولة",
      price: "6000",
      minPrice: "500",
      model: "Actros",
      serialNumber: "12347",
      bidsCount: "30",
      year: "2023",
      status: "Sold",
    },
  ];

  const liveAuctions = [
    {
      id: 103,
      image: "https://images.unsplash.com/photo-1605100804763-247f57d3c6b8?q=80&w=600",
      title: "شاحنة سكانيا لايف",
      price: "5500",
      minPrice: "500",
      model: "R500",
      serialNumber: "12348",
      bidsCount: "20",
      year: "2021",
      remainingTime: "05 : 30 : 45",
      status: "Opening",
    },
  ];

  // الإحصائيات الثلاثة (الكروت في أعلى الصفحة)
  const stats = [
    { title: "مزايدات معلقة", value: 3, icon: ClockIcon, color: "text-orange-500" },
    { title: "مزايدات مقبولة", value: 8, icon: CheckCircleIcon, color: "text-green-500" },
    { title: "مزايدات لايف", value: 2, icon: PlayIcon, color: "text-red-500" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-right">
     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={i}
              className="bg-gradient-to-bl from-yellow-300 to-gray-300 shadow-xl rounded-br-3xl rounded-tl-3xl p-8 border border-gray-100 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-center mb-4">
               
              </div>
              <h2 className="text-xl font-bold text-black mb-2 flex items-center justify-center gap-2">
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
                {stat.title}
              </h2>
              <p className="text-4xl font-extrabold text-black">{stat.value}</p>
            </div>
          );
        })}
      </div>
      
       {/* فلترة */}
      <div className="mb-6 flex justify-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full ${
            filter === "all" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          جميع المزايدات
        </button>
        <button
          onClick={() => setFilter("ناجحة")}
          className={`px-4 py-2 rounded-full ${
            filter === "ناجحة" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          الناجحة
        </button>
        <button
          onClick={() => setFilter("مرفوضة")}
          className={`px-4 py-2 rounded-full ${
            filter === "مرفوضة" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          المرفوضة
        </button>
      </div>

     
     

      {/* عرض المزايدات ككروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBids.map((bid) => (
          <AuctionCard key={bid.id} auction={bid} />
        ))}
      </div>
    </div>
  );
};

export default BidHistory;
