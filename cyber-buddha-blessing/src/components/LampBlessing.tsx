'use client';

import React, { useState, useEffect } from 'react';

const LampBlessing: React.FC = () => {
  const [isLit, setIsLit] = useState(false);
  const [wish, setWish] = useState('');
  const [isWishing, setIsWishing] = useState(false);
  const [wishResult, setWishResult] = useState<string | null>(null);
  // 添香油支付状态
  const [isOfferingOil, setIsOfferingOil] = useState(false);
  const [offeringStatus, setOfferingStatus] = useState<string | null>(null);

  const handleLightLamp = () => {
    setIsLit(true);
  };

  const handleMakeWish = () => {
    if (!wish.trim()) return;
    setIsWishing(true);
    // 模拟祈福过程
    setTimeout(() => {
      setWishResult(wish);
      setIsWishing(false);
    }, 2000);
  };

  const resetLamp = () => {
    setIsLit(false);
    setWish('');
    setWishResult(null);
  };

  // 添香油功能
  const handleOfferOil = async () => {
    setIsOfferingOil(true);
    setOfferingStatus('正在处理添香油支付...');

    try {
      const response = await fetch('http://localhost:3001/api/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '功德主',
          phone: '13800138000',
          templeId: 1,
          amount: 100, // 1美金
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setOfferingStatus('添香油成功！感谢您的功德！');
        // 3秒后清除状态
        setTimeout(() => {
          setOfferingStatus(null);
        }, 3000);
      } else {
        setOfferingStatus(`添香油失败：${result.message}`);
        // 3秒后清除状态
        setTimeout(() => {
          setOfferingStatus(null);
        }, 3000);
      }
    } catch (error) {
      setOfferingStatus(`添香油失败：${error instanceof Error ? error.message : '网络错误'}`);
      // 3秒后清除状态
      setTimeout(() => {
        setOfferingStatus(null);
      }, 3000);
    } finally {
      setIsOfferingOil(false);
    }
  };

  return (
    <div className="bg-[#1D1D1F] border border-[#8676B6]/30 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#F5F5F7]">Lamp Blessing</h2>
      
      <div className="space-y-6">
        {/* Eternal Lamp Display */}
        <div className="border border-[#8676B6]/30 rounded-xl p-8 text-center bg-[#1D1D1F]/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-auto">
            {/* Lamp Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-[#666] to-[#333] rounded-t-lg"></div>
            
            {/* Lamp Post */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-24 bg-gradient-to-t from-[#666] to-[#333]"></div>
            
            {/* Lamp Shade */}
            <div className={`absolute bottom-28 left-1/2 transform -translate-x-1/2 w-24 h-32 border-4 border-[#8676B6]/30 rounded-t-2xl transition-all duration-500 ${isLit ? 'bg-[#FFD700]/20 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-[#1D1D1F]/50'}`}>
              {/* Flame */}
              {isLit && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-20">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-[#FF6B00] via-[#FFD700] to-transparent rounded-t-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-[#FFD700] to-transparent rounded-t-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
            
            {/* Lamp Top */}
            <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#8676B6]/30 rounded-b-lg"></div>
          </div>
          
          <div className="mt-40">
            {!isLit ? (
              <button
                className="bg-[#8676B6] hover:bg-[#8676B6]/90 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={handleLightLamp}
              >
                Light the Eternal Lamp
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-[#FFD700] font-medium">Eternal Lamp is Lit</p>
                <p className="text-sm text-[#F5F5F7]/70">May the light illuminate your future</p>
              </div>
            )}
          </div>
        </div>

        {/* Blessing Area */}
        {isLit && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-[#F5F5F7]">Make Your Wish</h3>
            <div className="space-y-4">
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Please enter your wish..."
                className="w-full h-32 bg-[#1D1D1F]/50 border border-[#8676B6]/30 rounded-xl p-4 text-[#F5F5F7] resize-none focus:outline-none focus:border-[#8676B6] focus:shadow-lg transition-all duration-300"
                maxLength={200}
              ></textarea>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#F5F5F7]/50">{wish.length}/200</span>
                <div className="flex gap-3">
                  <button
                    className="bg-[#1D1D1F]/50 backdrop-blur-sm border border-[#8676B6]/30 hover:border-[#8676B6] text-[#8676B6] px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={resetLamp}
                  >
                    Reset
                  </button>
                  <button
                    className="bg-[#8676B6] hover:bg-[#8676B6]/90 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleMakeWish}
                    disabled={!wish.trim() || isWishing}
                  >
                    {isWishing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Making Wish...
                      </div>
                    ) : (
                      'Make Wish'
                    )}
                  </button>
                </div>
              </div>
              
              {/* Offering Oil Status */}
              {offeringStatus && (
                <div className={`p-3 rounded-lg text-sm font-medium ${offeringStatus.includes('成功') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} animate-pulse`}>
                  {offeringStatus}
                </div>
              )}
              
              {/* Offer Oil Button */}
              <button 
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF6B00] hover:opacity-90 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleOfferOil}
                disabled={isOfferingOil}
              >
                {isOfferingOil ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Offering Oil...
                  </div>
                ) : (
                  'Offer Oil (1 USD)'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Blessing Result */}
        {isWishing ? (
          <div className="border border-[#8676B6]/30 rounded-xl p-8 text-center bg-[#1D1D1F]/50 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-[#8676B6]/30 border-t-[#8676B6] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#F5F5F7]/90">Cyber Buddha is listening to your wish...</p>
            <p className="text-sm text-[#F5F5F7]/70 mt-2">May your wish come true soon</p>
          </div>
        ) : wishResult ? (
          <div className="border border-[#8676B6]/30 rounded-xl p-8 bg-[#1D1D1F]/50 backdrop-blur-sm">
            <h3 className="text-lg font-medium mb-4 text-[#F5F5F7]">Your Wish</h3>
            <div className="bg-[#8676B6]/10 border border-[#8676B6]/30 rounded-xl p-6">
              <p className="text-[#F5F5F7]/90 italic">"{wishResult}"</p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-[#FFD700] font-medium mb-2">Wish Delivered</p>
              <p className="text-sm text-[#F5F5F7]/70">Cyber Buddha has received your wish, may all your dreams come true</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LampBlessing;
