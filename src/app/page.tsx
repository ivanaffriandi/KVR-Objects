import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";

export const dynamic = 'force-dynamic'

// GROQ query to fetch products
const PRODUCTS_QUERY = `*[_type == "product"]{
  _id,
  title,
  weight,
  "image": image.asset->url,
  type,
  alt
}`;

export default async function Home() {
  const products = await client.fetch(PRODUCTS_QUERY, {}, { cache: 'no-store' });

  return (
    <HomeClient>
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
            {products.length > 0 ? (
              products.map((product: any, index: number) => (
                <div key={product._id} className={`grid-item ${product.type || 'large'}`}>
                  <div className="img-container">
                    <img src={product.image} alt={product.alt || product.title} />
                  </div>
                  <div className="item-meta">
                    <span>{product.title}</span>
                    <span>{product.weight}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="grid-item text-block">
                <p>No products found. Start adding them in the <a href="/admin">Sanity Studio</a>.</p>
              </div>
            )}
            
            {/* Center Text Block - Keep it hardcoded for aesthetics if no items or between items */}
            {products.length > 0 && products.length < 2 && (
              <div className="grid-item empty text-block">
                <p>EMBRACING THE WABI-SABI AESTHETIC.<br/>IMPERFECT PERFECTION IN EVERY PIECE.</p>
              </div>
            )}
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
    </HomeClient>
  );
}
