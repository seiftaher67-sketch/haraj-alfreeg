import React from 'react';
import { useNavigate } from 'react-router-dom';

function LiveBroadcast() {
  const navigate = useNavigate();

  const liveVideos = [
    {
      id: 1,
      title: 'حراج الشاحنات - الخميس',
      description: 'بث مباشر لحراج الشاحنات اليوم',
      videoId: 'gZCagSdmLR4', // رابط حقيقي للبث المباشر
      isLive: true,
      schedule: 'كل خميس الساعة 10:00 صباحاً'
    },
    {
      id: 2,
      title: 'حراج السيارات - الجمعة',
      description: 'بث مباشر لحراج السيارات',
      videoId: 'jLm2ACm5JPA',
      isLive: false,
      schedule: 'كل جمعة الساعة 2:00 مساءً'
    },
    {
      id: 3,
      title: 'حراج المقطورات - السبت',
      description: 'بث مباشر لحراج المقطورات',
      videoId: 'bKZtjt27AFg',
      isLive: false,
      schedule: 'كل سبت الساعة 11:00 صباحاً'
    }
  ];

  const biddingConditions = [
    ' يجب شحن المحفظة',
    ' يجب أن تتم عملية الدفع بنجاح لدخول المزايدة',
    ' في حالة عدم الفوز بالمزايدة يتم استرداد جميع المبلغ المدفوع'
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-[#0b0b0b]">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#f2b400] to-[#d19b00] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                </div>
              </div>
              <h4 className="text-4xl font-bold text-white"> شاهد البث المباشر وشارك في المزايدات على الشاحنات والسيارات والمقطورات  </h4>
            </div>
            
          </div>
        </div>
      </section>

      {/* Schedule Alert */}
      <section className="py-8 bg-[#0b0b0b] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">تنبيه بالمواعيد</h3>
                <svg className="w-6 h-6 text-[#f2b400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <p className="text-white/80">يتم عرض البث المباشر كل خميس وجمعة وسبت من كل اسبوع في المواعيد المحددة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Videos Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {liveVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {video.isLive && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium">مباشر الآن</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white rounded-lg px-3 py-1">
                    <span className="text-sm">{video.schedule}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <button
                    onClick={() => navigate(`/live-broadcast/${video.id}`)}
                    className="w-full bg-[#f2b400] hover:bg-[#d19b00] text-[#0b0b0b] py-3 px-6 rounded-lg font-medium shadow hover:shadow-lg transition-all duration-200"
                  >
                     مشاهده البث المباشر
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bidding Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">شروط المزايدة</h2>
            <p className="text-gray-600">قواعد وشروط المشاركة في المزايدات</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {biddingConditions.map((condition, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#f2b400] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0b0b0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{condition}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src="/assets/images/icons/2560px-Mada_Logo.svg 1.png" alt="paypal" className="h-8 w-auto" />
              <img src="/assets/images/icons/logos_visa.png" alt="visa" className="h-8 w-auto" />
              <img src="/assets/images/icons/Icons.png" alt="mastercard" className="h-8 w-auto" />
             </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default LiveBroadcast;
