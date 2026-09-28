"use client";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">

            {/* Brand */}
            <div className="md:col-span-2 lg:col-span-4">
              <div className="mb-3 flex items-center gap-3">
                <img
                  src="/assets/img/logo.png"
                  alt="ZIQ Zema"
                  className="h-[50px] w-[50px] rounded-full border-2 border-[var(--ziq-gold)]"
                />

                <div>
                  <h5
                    className="mb-0"
                    style={{
                      letterSpacing: "2px",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    ZIQ ZEMA
                  </h5>

                  <small
                    style={{
                      color: "var(--ziq-gold)",
                      letterSpacing: "3px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    MEZMUR SCHOOL
                  </small>
                </div>
              </div>

              <p style={{ lineHeight: 1.8 }}>
                Preserving the sacred tradition of Ethiopian mezmur through
                authentic instrument education. Learn the ancient sounds that
                have echoed through generations of worship.
              </p>

              <div className="mt-3 flex gap-3">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>

                <a href="#" className="social-link">
                  <i className="fab fa-youtube"></i>
                </a>

                <a href="#" className="social-link">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h5>Quick Links</h5>

              <div className="flex flex-col">
                <a href="#home">Home</a>
                <a href="#about">About Us</a>
                <a href="#instruments">Instruments</a>
                <a href="#courses">Courses</a>
                <a href="#why-us">Why Choose Us</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            {/* Instruments */}
            <div className="lg:col-span-3">
              <h5>Instruments</h5>

              <div className="flex flex-col">
                <a href="#instruments">Kebero</a>
                <a href="#instruments">Washent</a>
                <a href="#instruments">Begena</a>
                <a href="#instruments">Mesenko</a>
                <a href="#instruments">Kerar</a>
              </div>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h5>Contact Info</h5>

              <div className="flex flex-col gap-2">
                <p className="text-[0.9rem]">
                  <i
                    className="fas fa-map-marker-alt me-2"
                    style={{ color: "var(--ziq-gold)" }}
                  ></i>
                  Addis Ababa, Ethiopia
                </p>

                <p className="text-[0.9rem]">
                  <i
                    className="fas fa-phone me-2"
                    style={{ color: "var(--ziq-gold)" }}
                  ></i>
                  +251 9XX XXX XXX
                </p>

                <p className="text-[0.9rem]">
                  <i
                    className="fas fa-envelope me-2"
                    style={{ color: "var(--ziq-gold)" }}
                  ></i>
                  info@ziqzema.com
                </p>

                <p className="text-[0.9rem]">
                  <i
                    className="fas fa-clock me-2"
                    style={{ color: "var(--ziq-gold)" }}
                  ></i>
                  Mon - Sat: 7AM - 9PM
                </p>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom mt-8 border-t border-white/10 pt-5 text-center">
            <p className="mb-0 text-[0.85rem]">
              &copy; 2026 ZIQ Zema. All rights reserved. | Crafted with{" "}
              <i
                className="fas fa-heart"
                style={{ color: "var(--ziq-gold)" }}
              ></i>{" "}
              for mezmur
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        className="scroll-top"
        id="scrollTop"
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}