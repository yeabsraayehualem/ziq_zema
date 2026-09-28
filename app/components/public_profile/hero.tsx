

export default function HeroSection() {
  return (
    <>

      <section className="hero-section" id="home">
      
        {/* Floating particles */}
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hero-content">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
      
            {/* Hero Content */}
            <div className="text-center lg:col-span-7 lg:text-left">
      
              <img
                src="/assets/img/logo.png"
                alt="ZIQ Zema Logo"
                className="hero-logo"
              />
      
              <h1 className="hero-title">
                ዚቅ <span className="gold">ዜማ</span>
              </h1>
      
              <p className="hero-subtitle">
                የዝማሬ መሳሪያ ማሰልጠኛ
              </p>
      
              <div className="hero-desc">
                <div className="scripture">
                  <i>
                    "ሰብህዎ ለእግዚአብሔር በቃለ ቀርን፣ ሰብህዎ በመዝሙር
                    ወበመሰንቆ፣ ሰብህዎ በከበሮ ወበትፍሥሕት፣ ሰብህዎ
                    በአውታር ወበዕንዚራ"
                  </i>
      
                  <br />
      
                  <span
                    style={{
                      fontStyle: "normal",
                      fontSize: "0.88rem",
                    }}
                  >
                    እግዚአብሐርን በመለከት ድምጽ አመስግኑ፣ በበገናና በመሰንቆ
                    አመስግኑ፣ በከበሮና በመዝሙር አመስግኑ፣ በአውታርና
                    በእንዝራ አመስግኑት
                  </span>
                </div>
      
                <span className="ref">መዝ 150</span>
              </div>
      
              {/* Buttons */}
              <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#courses" className="btn btn-hero-primary">
                  <i className="fas fa-graduation-cap me-2"></i>
                  View Courses
                </a>
      
                <a href="#instruments" className="btn btn-hero-secondary">
                  <i className="fas fa-music me-2"></i>
                  Explore Instruments
                </a>
              </div>
      
              {/* Instruments */}
              <div className="hero-instruments">
                <div className="inst-icon">
                  <img
                    src="/assets/img/kebero.png"
                    alt="Kebero"
                  />
                </div>
      
                <div className="inst-icon">
                  <img
                    src="/assets/img/washent.png"
                    alt="Washent"
                  />
                </div>
      
                <div className="inst-icon">
                  <img
                    src="/assets/img/begena.png"
                    alt="Begena"
                  />
                </div>
      
                <div className="inst-icon">
                  <img
                    src="/assets/img/mesenko.png"
                    alt="Mesenko"
                  />
                </div>
      
                <div className="inst-icon">
                  <img
                    src="/assets/img/kerar.png"
                    alt="Kerar"
                  />
                </div>
              </div>
            </div>
      
            {/* Large Begena */}
            <div className="hidden text-center lg:col-span-5 lg:block">
              <div className="relative">
                <img
                  src="/assets/img/begena.png"
                  alt="Begena"
                  className="mx-auto max-w-[80%]"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
      
          </div>
        </div>
      </section>
    </>
  )
}