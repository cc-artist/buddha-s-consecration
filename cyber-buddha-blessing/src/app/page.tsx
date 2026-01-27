'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import TempleFilmStrip from '../components/TempleFilmStrip';
import TempleDetailModal from '../components/TempleDetailModal';
import Consecration from '../components/Consecration';
import DharmaForm from '../components/DharmaForm';
import LampBlessing from '../components/LampBlessing';
import { temples, Temple } from '../data/TempleData';

export default function Home() {
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('blessing');
  const [audioPlaying, setAudioPlaying] = useState(true);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
    // 这里可以添加音频控制逻辑
  };

  const handleTempleClick = (temple: Temple) => {
    setSelectedTemple(temple);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedTemple(null);
    }, 300);
  };

  const handleConsultation = async () => {
    console.log('Consultation requested for:', selectedTemple?.name);
    
    // 防止重复提交
    if (isConsulting) return;
    
    // 咨询客服预约行程 - 后端相关功能实现
    try {
      setIsConsulting(true);
      
      // 模拟 API 调用：创建咨询预约
      console.log('[API] 创建咨询预约:', {
        templeId: selectedTemple?.id,
        templeName: selectedTemple?.name,
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
    console.log('Payment requested for:', selectedTemple?.name);
    
    // 防止重复提交
    if (isPaying) return;
    
    // 支付1万美金订购行程 - 后端相关功能实现
    try {
      setIsPaying(true);
      
      // 模拟 API 调用：创建支付订单
      const paymentData = {
        templeId: selectedTemple?.id,
        templeName: selectedTemple?.name,
        amount: 10000,
        currency: 'USD',
        description: `${selectedTemple?.name} 定制行程`,
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
    <div className="min-h-screen bg-[#1D1D1F] text-[#F5F5F7] font-sans overflow-x-hidden">
      {/* 背景音乐控制 */}
      <button
        className="fixed top-4 right-4 bg-[#8676B6]/20 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-[#8676B6]/30 transition-all duration-300 z-50"
        onClick={toggleAudio}
        aria-label={audioPlaying ? '暂停音乐' : '播放音乐'}
      >
        <svg
          className={`w-6 h-6 text-[#8676B6] transition-all duration-300 ${audioPlaying ? 'animate-pulse' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {audioPlaying ? (
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          ) : (
            <path
              fillRule="evenodd"
              d="M6 2a.75.75 0 01.75.75v12.5c0 .414-.336.75-.75.75A.75.75 0 015 15.25v-12.5A.75.75 0 016 2zm4.5 0A.75.75 0 0111.25 2.75v12.5c0 .414-.336.75-.75.75a.75.75 0 01-.75-.75v-12.5A.75.75 0 0110.5 2z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Golden Particle Halo Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#FFD700]/10 via-[#8676B6]/10 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-[#FFD700]/10 via-[#8676B6]/10 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-[#FFD700]/20 via-[#8676B6]/20 to-transparent animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
        </div>

        {/* Cyber Buddha Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <NextImage
            src="/temple-images/赛博佛祖背景图.png"
            alt="Cyber Buddha"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F7] via-[#8676B6] to-[#FFD700] animate-pulse">
            Cyber Buddha
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-[#F5F5F7]/90">
            Cyber Buddha Consecration · Dharma Form · Lamp Blessing · Custom Tours of Famous Chinese Temples
          </p>

        </div>
      </section>

      {/* Core Features Module */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Function Tabs */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#F5F5F7]">Core Features</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'blessing' ? 'bg-[#8676B6] text-white shadow-lg' : 'bg-[#1D1D1F]/50 border border-[#8676B6]/30 text-[#8676B6] hover:border-[#8676B6]/60'}`}
                onClick={() => setActiveTab('blessing')}
              >
                Cyber Buddha Consecration
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'dharma' ? 'bg-[#8676B6] text-white shadow-lg' : 'bg-[#1D1D1F]/50 border border-[#8676B6]/30 text-[#8676B6] hover:border-[#8676B6]/60'}`}
                onClick={() => setActiveTab('dharma')}
              >
                Request Dharma Form
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'lamp' ? 'bg-[#8676B6] text-white shadow-lg' : 'bg-[#1D1D1F]/50 border border-[#8676B6]/30 text-[#8676B6] hover:border-[#8676B6]/60'}`}
                onClick={() => setActiveTab('lamp')}
              >
                Lamp Blessing
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'temple' ? 'bg-[#8676B6] text-white shadow-lg' : 'bg-[#1D1D1F]/50 border border-[#8676B6]/30 text-[#8676B6] hover:border-[#8676B6]/60'}`}
                onClick={() => setActiveTab('temple')}
              >
                Custom Temple Tours
              </button>
            </div>
          </div>

          {/* Feature Content */}
          <div className="space-y-10">
            {activeTab === 'blessing' && <Consecration />}
            {activeTab === 'dharma' && <DharmaForm />}
            {activeTab === 'lamp' && <LampBlessing />}
            {activeTab === 'temple' && (
              <div>
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold mb-2 text-[#F5F5F7]">Custom Tours of Famous Chinese Temples</h3>
                  <p className="text-[#F5F5F7]/70">Explore Chinese Buddhist cultural sites and customize your exclusive meditation journey</p>
                </div>
                <TempleFilmStrip 
                  temples={temples} 
                  onTempleClick={handleTempleClick} 
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D1D1F] border-t border-[#8676B6]/30 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-[#8676B6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold">Cyber Buddha</h3>
              </div>
              <p className="text-[#F5F5F7]/70">
                Blending traditional culture with modern technology to bring you a unique digital meditation experience
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F5F5F7]">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#F5F5F7]/70 hover:text-[#8676B6] transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-[#F5F5F7]/70 hover:text-[#8676B6] transition-colors duration-300">Cyber Buddha Consecration</a></li>
                <li><a href="#" className="text-[#F5F5F7]/70 hover:text-[#8676B6] transition-colors duration-300">Request Dharma Form</a></li>
                <li><a href="#" className="text-[#F5F5F7]/70 hover:text-[#8676B6] transition-colors duration-300">Lamp Blessing</a></li>
                <li><a href="#" className="text-[#F5F5F7]/70 hover:text-[#8676B6] transition-colors duration-300">Custom Temple Tours</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F5F5F7]">Contact Us</h3>
              <p className="text-[#F5F5F7]/70 mb-2">Email: info@cyberbuddha.com</p>
              <p className="text-[#F5F5F7]/70">Phone: +86 400-123-4567</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#8676B6]/30 text-center text-[#F5F5F7]/50 text-sm">
            <p>© 2026 Cyber Buddha. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Temple Detail Modal */}
      <TempleDetailModal 
        temple={selectedTemple} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConsultation={handleConsultation} 
        onPayment={handlePayment} 
        isConsulting={isConsulting}
        isPaying={isPaying}
      />
    </div>
  );
}
