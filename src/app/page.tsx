"use client";

import { useEffect } from "react";

export default function Home() {
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
      // Exclude the text block from the translation reveal if needed, but original did it to all .grid-item
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

  // Dynamic Product Data array makes it easy to add/change items and content
  // Allows the site to be "dynamic" for the user to manage
  const products = [
    {
      id: 1,
      type: 'large',
      title: 'Pendant 001',
      weight: '0.13g — 99% Ag',
      image: '/assets/charm_1.png',
      alt: 'Silver Charm 01'
    },
    {
      id: 2,
      type: 'medium offset-up',
      title: 'Ring Charm 002',
      weight: '0.09g — 99% Ag',
      image: '/assets/charm_2.png',
      alt: 'Silver Ring Charm 02'
    }
  ];

  return (
    <>
      <div className="custom-cursor"></div>

      <nav className="navbar">
        <div className="nav-left">KVR OBJECTS</div>
        <div className="nav-right">
          <span>TANGERANG, ID</span>
          <span>INDEX</span>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="reveal-text">KVR</h1>
            <h1 className="reveal-text offset">OBJECTS</h1>
          </div>
          
          <div className="hero-image-wrapper" id="work-link">
            <img src="/assets/hero_bg.png" alt="Raw Silver Clay Texture" className="parallax-img" />
          </div>

          <div className="hero-meta">
            <p>(01)</p>
            <p>EXPLORE THE ARCHIVE. <br/>99% PURE SILVER CLAY CHARMS.</p>
            <p>BY IVAN AFFRIANDI.</p>
          </div>
        </section>

        <section className="content-break">
          <h2 className="section-title">COLLECTION</h2>
          <p className="section-desc">Handcrafted through a meticulous process, bridging crude earth and refined metal.</p>
        </section>

        <section className="product-grid">
          <div className="grid-container">
            {/* Dynamic Product Loop (currently mapped explicitly to preserve the asymmetric layout) */}
            <div className={`grid-item ${products[0].type}`}>
              <div className="img-container">
                <img src={products[0].image} alt={products[0].alt} />
              </div>
              <div className="item-meta">
                <span>{products[0].title}</span>
                <span>{products[0].weight}</span>
              </div>
            </div>
            
            {/* Center Text Block */}
            <div className="grid-item empty text-block">
              <p>EMBRACING THE WABI-SABI AESTHETIC.<br/>IMPERFECT PERFECTION IN EVERY PIECE.</p>
            </div>
            
            <div className={`grid-item ${products[1].type}`}>
              <div className="img-container">
                <img src={products[1].image} alt={products[1].alt} />
              </div>
              <div className="item-meta">
                <span>{products[1].title}</span>
                <span>{products[1].weight}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="process-content">
            <h2>PROCESS.</h2>
            <p>Crafted from 99% pure silver clay. Each piece undergoes a rigorous combustion process at extreme temperatures, transforming raw, malleable earth into refined, solid silver. The result is an object of permanent weight, striking texture, and character.</p>
          </div>
          <div className="process-specs">
            <div className="spec-row">
              <span>MATERIAL</span>
              <span>99% SILVER CLAY</span>
            </div>
            <div className="spec-row">
              <span>ORIGIN</span>
              <span>TANGERANG, INDONESIA</span>
            </div>
            <div className="spec-row">
              <span>ARTISAN</span>
              <span>IVAN AFFRIANDI</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-col">
          <span>KVR OBJECTS © 2026</span>
        </div>
        <div className="footer-col align-right">
          <span>ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </>
  );
}
