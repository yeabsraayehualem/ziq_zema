
export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="section-header"
          data-aos="fade-up"
        >
          <span className="section-label">Testimonials</span>

          <h2>
            What Our <span className="ziq-gold-text">Students</span> Say
          </h2>

          <p>Hear from our community of mezmur learners</p>

          <div className="section-divider"></div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>

              <p className="testimonial-text">
                "Learning the begena at ZIQ Zema has been a transformative
                spiritual experience. The instructors are incredibly
                knowledgeable and patient."
              </p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>

                <div>
                  <div className="testimonial-name">
                    Alemayehu T.
                  </div>

                  <div className="testimonial-role">
                    Begena Student
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>

              <p className="testimonial-text">
                "The kebero classes are amazing! I've learned traditional
                rhythms that I never thought I could master. The small class
                sizes make all the difference."
              </p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">S</div>

                <div>
                  <div className="testimonial-name">
                    Sarah M.
                  </div>

                  <div className="testimonial-role">
                    Kebero Student
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div data-aos="fade-up" data-aos-delay="300">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>

              <p className="testimonial-text">
                "ZIQ Zema perfectly balances traditional teaching methods
                with a comfortable learning environment. I highly recommend
                it to anyone interested in mezmur."
              </p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">D</div>

                <div>
                  <div className="testimonial-name">
                    Daniel K.
                  </div>

                  <div className="testimonial-role">
                    Washent Student
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
