import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function LiveBroadcastDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [latestBid, setLatestBid] = useState(5000); // Mock latest bid

  const liveVideos = [
    {
      id: 1,
      title: 'حراج الشاحنات - الخميس',
      description: 'بث مباشر لحراج الشاحنات اليوم',
      videoId: 'gZCagSdmLR4',
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

  const video = liveVideos.find(v => v.id === parseInt(id));

  if (!video) {
    return <div className="min-h-screen flex items-center justify-center">Video not found</div>;
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (bidAmount && parseFloat(bidAmount) > latestBid) {
      setLatestBid(parseFloat(bidAmount));
      setBidAmount('');
      alert('تم تقديم المزايدة بنجاح!');
    } else {
      alert('يجب أن تكون المزايدة أعلى من السعر الحالي');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-[#0b0b0b]">
      {/* Back Button */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate('/live-broadcast')}
            className="flex items-center gap-2 text-[#0b0b0b] hover:text-[#f2b400] transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span className="font-medium">العودة إلى البث المباشر</span>
          </button>
        </div>
      </section>

      {/* Header */}
      <section className="bg-gradient-to-r from-[#f2b400] to-[#d19b00] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white text-center">{video.title}</h1>
          <p className="text-white/80 text-center mt-2">{video.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {/* Left Side - Bidding Panel (35%) */}
            <div className="w-2/5 bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">لوحة التحكم بالمزايدة</h2>

              {/* Latest Bid Display */}
              <div className="bg-[#f2b400] text-[#0b0b0b] rounded-lg p-4 mb-6 text-center">
                <h3 className="text-lg font-semibold mb-2">أخر سعر مزايدة</h3>
                <p className="text-3xl font-bold">{latestBid.toLocaleString()} ريال</p>
              </div>

              {/* Bid Form */}
              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">قيمة المزايدة (ريال)</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f2b400] focus:border-transparent"
                    placeholder="أدخل قيمة المزايدة"
                    min={latestBid + 1}
                    step="0.01"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#f2b400] hover:bg-[#d19b00] text-[#0b0b0b] py-3 px-6 rounded-lg font-medium shadow hover:shadow-lg transition-all duration-200"
                >
                  قدم المزايدة
                </button>
              </form>

              {/* Bidding Rules */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">قواعد المزايدة:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• يجب أن تكون المزايدة أعلى من السعر الحالي</li>
                  <li>• المزايدة النهائية ملزمة</li>
                  <li>• يتم التحقق من رصيد المحفظة</li>
                </ul>
              </div>
            </div>

            {/* Right Side - Video Player (65%) */}
            <div className="w-3/5">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {video.streams && video.streams.length > 0 ? (
                  <div className="space-y-4">
                    {video.streams.filter(s => s.is_active).map((stream, index) => (
                      <div key={index} className="bg-white rounded-lg overflow-hidden">
                        <div className="p-3 bg-gray-50 border-b">
                          <span className="font-medium capitalize">{stream.platform}</span>
                        </div>
                        {stream.embed_url ? (
                          <div className="relative aspect-video">
                            <iframe
                              className="w-full h-full"
                              src={stream.embed_url}
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
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-gray-600 mb-2">لا يمكن تضمين هذا البث مباشرة</p>
                              <a
                                href={stream.watch_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#f2b400] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                              >
                                شاهد على {stream.platform}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
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
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{video.schedule}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LiveBroadcastDetail;
