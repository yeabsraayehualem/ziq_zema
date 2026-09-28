export default function InstrumentsSection() {
  return (
    <section id="instruments" className="items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="section-header"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="section-label">Our Instruments</span>

          <h2>
            Sacred <span className="ziq-gold-text">Instruments</span>
          </h2>

          <p>Master the traditional instruments of Ethiopian mezmur</p>

          <div className="section-divider"></div>
        </div>

        {/* Instruments */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Kebero */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="instrument-card">
              <div className="instrument-img-wrap">
                <img
                  src="/assets/img/kebero.png"
                  alt="Kebero"
                />
              </div>

              <div className="instrument-body">
                <span className="instrument-tag">Percussion</span>

                <h4>Kebero</h4>

                <p>
                  The kebero is a large traditional Ethiopian drum, essential
                  to mezmur performance. Its deep, resonant beats form the
                  rhythmic foundation of sacred music.
                </p>
              </div>
            </div>
          </div>

          {/* Washent */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="instrument-card">
              <div className="instrument-img-wrap">
                <img
                  src="/assets/img/washent.png"
                  alt="Washent"
                />
              </div>

              <div className="instrument-body">
                <span className="instrument-tag">Wind</span>

                <h4>Washent</h4>

                <p>
                  The washent is a traditional Ethiopian flute with a hauntingly
                  beautiful tone. Its melodic lines weave through mezmur
                  compositions, creating spiritual atmosphere.
                </p>
              </div>
            </div>
          </div>

          {/* Begena */}
          <div data-aos="fade-up" data-aos-delay="300">
            <div className="instrument-card">
              <div className="instrument-img-wrap">
                <img
                  src="/assets/img/begena.png"
                  alt="Begena"
                />
              </div>

              <div className="instrument-body">
                <span className="instrument-tag">String</span>

                <h4>Begena</h4>

                <p>
                  Known as "David's Harp," the begena is a large ten-stringed
                  lyre with deep spiritual significance. Its low, meditative
                  tones calm the soul.
                </p>
              </div>
            </div>
          </div>

          {/* Mesenko */}
          <div data-aos="fade-up" data-aos-delay="400">
            <div className="instrument-card">
              <div className="instrument-img-wrap">
                <img
                  src="/assets/img/mesenko.png"
                  alt="Mesenko"
                />
              </div>

              <div className="instrument-body">
                <span className="instrument-tag">String</span>

                <h4>Mesenko</h4>

                <p>
                  The mesenko is a single-stringed bowed instrument with a
                  distinctive, soulful sound. Played with a horsehair bow, it
                  captures Ethiopian spiritual expression.
                </p>
              </div>
            </div>
          </div>

          {/* Kerar */}
          <div data-aos="fade-up" data-aos-delay="500">
            <div className="instrument-card">
              <div className="instrument-img-wrap">
                <img
                  src="/assets/img/kerar.png"
                  alt="Kerar"
                />
              </div>

              <div className="instrument-body">
                <span className="instrument-tag">String</span>

                <h4>Kerar</h4>

                <p>
                  The kerar is a five to seven-stringed lyre, often called the
                  Ethiopian harp. Its bright, uplifting tones bring joy to
                  mezmur performances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
