'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { temples, Temple } from '../../../data/TempleData';

export default function TempleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [temple, setTemple] = useState<Temple | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  
  // 查找匹配的寺庙
  useEffect(() => {
    if (id) {
      const templeId = typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : 0;
      const foundTemple = temples.find(t => t.id === templeId);
      if (foundTemple) {
        setTemple(foundTemple);
      } else {
        // 如果没有找到寺庙，重定向到首页
        router.push('/');
      }
    }
  }, [id, router]);
  
  if (!temple) {
    return (
      <div className="min-h-screen bg-[#1D1D1F] flex items-center justify-center">
        <div className="text-[#F5F5F7]">
          Loading...
        </div>
      </div>
    );
  }
  
  const handleConsultation = async () => {
    console.log('Consultation requested for:', temple.name);
    
    // 防止重复提交
    if (isConsulting) return;
    
    try {
      setIsConsulting(true);
      
      // 模拟 API 调用：创建咨询预约
      console.log('[API] 创建咨询预约:', {
        templeId: temple.id,
        templeName: temple.name,
        timestamp: new Date().toISOString(),
        action: 'consultation_request'
      });
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      console.log('[API] 咨询预约创建成功');
      alert('咨询预约已提交，客服将在24小时内联系您！');
    } catch (error) {
      console.error('咨询预约失败:', error);
      alert('咨询预约提交失败，请稍后重试');
    } finally {
      setIsConsulting(false);
    }
  };
  
  const handlePayment = async () => {
    console.log('Payment requested for:', temple.name);
    
    // 防止重复提交
    if (isPaying) return;
    
    try {
      setIsPaying(true);
      
      // 模拟 API 调用：创建支付订单
      const paymentData = {
        templeId: temple.id,
        templeName: temple.name,
        amount: 10000,
        currency: 'USD',
        description: `${temple.name} 定制行程`,
        timestamp: new Date().toISOString(),
        action: 'payment_request'
      };
      
      console.log('[API] 创建支付订单:', paymentData);
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟支付处理
      console.log('[API] 正在处理支付...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      console.log('[API] 支付成功');
      alert('支付成功！您的定制行程已确认，我们将在3个工作日内发送详细行程安排到您的邮箱。');
    } catch (error) {
      console.error('支付失败:', error);
      alert('支付失败，请稍后重试或联系客服');
    } finally {
      setIsPaying(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#1D1D1F] text-[#F5F5F7] font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#1D1D1F]/80 backdrop-blur-md border-b border-[#8676B6]/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            className="text-[#8676B6] hover:text-[#8676B6]/80 transition-colors duration-300" 
            onClick={() => router.back()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F7] via-[#8676B6] to-[#FFD700]">
            Temple Details
          </h1>
          <div className="w-6"></div> {/* Placeholder to keep title centered */}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Temple Image and Basic Information */}
        <div className="relative w-full h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <NextImage
            src={temple.image}
            alt={temple.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/90 via-[#1D1D1F]/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h2 className="text-4xl font-bold mb-2">{temple.name}</h2>
            <p className="text-lg opacity-90">{temple.location}</p>
            <p className="text-sm mt-2 bg-[#8676B6] inline-block px-3 py-1 rounded-full">{temple.title}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side: Temple Introduction and Features */}
          <div className="md:col-span-2 space-y-8">
            {/* Temple Introduction */}
            <div>
              <h3 className="text-2xl font-semibold text-[#8676B6] mb-4">Temple Introduction</h3>
              <p className="text-[#F5F5F7]/80 leading-relaxed">{temple.description}</p>
            </div>
            
            {/* Tour Features */}
            <div>
              <h3 className="text-2xl font-semibold text-[#8676B6] mb-4">Tour Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {temple.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#F5F5F7]/70">
                    <svg className="w-5 h-5 text-[#8676B6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Route Planning */}
            <div>
              <h3 className="text-2xl font-semibold text-[#8676B6] mb-4">Route Planning</h3>
              <div className="bg-[#1D1D1F]/50 border border-[#8676B6]/30 p-4 rounded-lg">
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-[#8676B6] mb-2">Transportation</h4>
                  <p className="text-[#F5F5F7]/70">{temple.route.transport}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-[#8676B6] mb-2">Itinerary</h4>
                  <p className="text-[#F5F5F7]/70 whitespace-pre-line">{temple.route.itinerary}</p>
                </div>
                {temple.route.combination && (
                  <div>
                    <h4 className="text-lg font-medium text-[#8676B6] mb-2">Combination Attractions</h4>
                    <p className="text-[#F5F5F7]/70">{temple.route.combination}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Cultural Experiences */}
            <div>
              <h3 className="text-2xl font-semibold text-[#8676B6] mb-4">Cultural Experiences</h3>
              <div className="flex flex-wrap gap-3">
                {temple.culture.map((culture, index) => (
                  <span key={index} className="bg-[#8676B6]/10 text-[#8676B6] px-4 py-2 rounded-full text-sm border border-[#8676B6]/30">
                    {culture}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side: Action Buttons */}
          <div className="space-y-6">
            {/* Consultation and Payment Buttons */}
            <div className="bg-[#1D1D1F]/50 border border-[#8676B6]/30 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#8676B6] mb-4">Tour Booking</h3>
              <div className="space-y-3">
                <button
                  className="w-full bg-[#8676B6] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#8676B6]/90 transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#8676B6]"
                  onClick={handleConsultation}
                  disabled={isConsulting || isPaying}
                >
                  {isConsulting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Consult Customer Service to Book'
                  )}
                </button>
                <button
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#1D1D1F] py-4 px-6 rounded-lg font-medium hover:from-[#FFD700]/90 hover:to-[#FF6B00]/90 transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-[#FFD700] disabled:hover:to-[#FF6B00]"
                  onClick={handlePayment}
                  disabled={isPaying || isConsulting}
                >
                  {isPaying ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#1D1D1F]/30 border-t-[#1D1D1F] rounded-full animate-spin"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    'Pay $10,000 USD to Book'
                  )}
                </button>
              </div>
              
              {/* Price Information */}
              <div className="mt-6 pt-4 border-t border-[#8676B6]/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#F5F5F7]/70 text-sm">Tour Price</span>
                  <span className="text-[#FFD700] font-bold text-xl">$10,000</span>
                </div>
                <p className="text-[#F5F5F7]/50 text-xs">
                  Includes tickets, accommodation, meals, and guide services
                </p>
              </div>
            </div>
            
            {/* Temple Highlights */}
            <div className="bg-[#1D1D1F]/50 border border-[#8676B6]/30 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#8676B6] mb-4">Temple Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#8676B6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-[#F5F5F7]/70">{temple.highlights[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#8676B6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-[#F5F5F7]/70">{temple.highlights[1]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#8676B6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-[#F5F5F7]/70">{temple.highlights[2]}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#1D1D1F] border-t border-[#8676B6]/30 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-[#F5F5F7]/50 text-sm">
          <p>© 2026 Cyber Buddha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}