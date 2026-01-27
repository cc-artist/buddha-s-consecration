'use client';

import React, { useRef, useEffect, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { Temple } from '../data/TempleData';

interface TempleFilmStripProps {
  temples: Temple[];
  onTempleClick?: (temple: Temple) => void;
}

const TempleFilmStrip: React.FC<TempleFilmStripProps> = ({ temples }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollSpeed = 0.5;
    const interval = 30;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
    };

    const scrollInterval = setInterval(scroll, interval);

    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  // Mouse/touch drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    setAutoScroll(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    setAutoScroll(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-6 px-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {temples.map((temple) => (
          <Link
            key={temple.id}
            href={`/temple/${temple.id}`}
            className="flex-shrink-0 w-[300px] h-[400px] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer group"
          >
            <div className="relative w-full h-[200px] overflow-hidden">
              <NextImage
                src={temple.image}
                alt={temple.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold">{temple.name}</h3>
                <p className="text-sm opacity-90">{temple.location}</p>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-purple-900 mb-2">{temple.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{temple.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Custom Tour
                </span>
                <span className="font-medium text-purple-600">Learn More →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors duration-300">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors duration-300">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
    </div>
  );
};

export default TempleFilmStrip;
