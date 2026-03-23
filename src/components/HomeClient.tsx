"use client";

import { useEffect, ReactNode } from "react";

interface HomeClientProps {
  children: ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  useEffect(() => {
    // Custom Cursor tracking
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    const hoverElements = document.querySelectorAll('a, .grid-item, button, .hero-image-wrapper');

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', moveCursor);

    const addHover = () => cursor?.classList.add('hover');
    const removeHover = () => cursor?.classList.remove('hover');

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    // Simple Parallax & Scroll Reveal
    const parallaxImg = document.querySelector('.parallax-img') as HTMLElement;
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    
    // Set initial state for reveal items
    const revealItems = document.querySelectorAll('.grid-item');
    revealItems.forEach(item => {
      const el = item as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(80px)';
      el.style.transition = 'opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const scrollHandler = () => {
      const scrolled = window.scrollY;
      
      // Parallax
      if (parallaxImg && heroSection) {
        if (scrolled < heroSection.offsetHeight) {
          parallaxImg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
      }
      
      // Reveal elements
      revealItems.forEach(item => {
        const el = item as HTMLElement;
        const itemTop = el.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 100) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    const onScroll = () => {
      window.requestAnimationFrame(scrollHandler);
    };

    window.addEventListener('scroll', onScroll);
    
    // Trigger once on load
    scrollHandler();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <>{children}</>;
}
