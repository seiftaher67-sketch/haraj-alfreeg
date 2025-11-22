import React, { useState, useEffect } from 'react';
import AuctionCard from '../components/AuctionCard';
import { auctionAPI } from '../services/api';

export default function Auctions() {
  const [activeTab, setActiveTab] = useState('all');
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const response = await auctionAPI.getAuctions();
        // Transform API data to match component expectations
        const transformedAuctions = response.data.map(auction => ({
          id: auction.id,
          image: auction.listing?.media?.[0] || '/assets/images/trucks/default.png',
          title: auction.listing?.title || 'Unknown Auction',
          price: auction.current_price || auction.starting_price,
          minPrice: auction.min_increment || '0',
          model: auction.listing?.model || 'N/A',
          serialNumber: auction.listing?.serial_number || 'N/A',
          bidsCount: auction.bids?.length || 0,
          year: auction.listing?.registration_year || 'N/A',
          remainingTime: '00 : 00 : 00', // Placeholder, calculate if needed
          status: auction.status,
          auction_type: auction.type,
          buy_now: auction.listing?.buy_now,
          kilometers: auction.listing?.kilometers,
        }));
        setAuctions(transformedAuctions);
      } catch (err) {
        setError('Failed to load auctions');
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const filteredAuctions = activeTab === 'all' ? auctions : auctions.filter(auction => auction.status === 'upcoming');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2b400] mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل المزادات...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المزادات</h1>
          <p className="text-gray-600">استكشف المزادات المتاحة</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#f2b400] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              جميع المزادات
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-[#f2b400] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              المزادات القادمة
            </button>
          </div>
        </div>

        {/* Auctions Grid */}
        {filteredAuctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">لا توجد مزادات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

