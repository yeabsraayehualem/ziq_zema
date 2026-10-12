'use client'
import { useEffect, useState } from "react";

export default function AboutSection({packages,students, instruments}) {
  
  return (
    <section className="about-section" id="about">
      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="section-header"
          style={{ marginBottom: "2rem" }}
          data-aos="fade-up"
        >
          <span className="section-label ziq-gold-text">About Us</span>

          <h2 style={{ color: "white" }}>
            Preserving <span className="ziq-gold">Sacred</span> Traditions
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div data-aos="fade-right">
            <p>
              ZIQ Zema is dedicated to preserving and teaching the ancient art
              of Ethiopian mezmur — the sacred music that has been the heartbeat
              of worship for centuries. Our school provides authentic
              instruction in traditional instruments that have accompanied
              prayers, fasting, and celebrations across generations.
            </p>

            <p className="mb-7">
              Our experienced instructors are masters of their craft, bringing
              decades of knowledge from the Ethiopian Orthodox tradition.
              Whether you're a beginner or looking to deepen your skills, we
              offer personalized instruction tailored to your journey.
            </p>

            <a
              href="#contact"
              className="btn btn-hero-primary mt-7"
            >
              <i className="fas fa-phone me-2"></i>
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-number">{ instruments }</div>
                <div className="stat-label">Instruments</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">{ students }</div>
                <div className="stat-label">Students</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">{ packages }</div>
                <div className="stat-label">Packages</div>
              </div>

              <div className="stat-box"></div>

              <div className="stat-box">
                <div className="stat-number">100%</div>
                <div className="stat-label">Passion</div>
              </div>

              <div className="stat-box"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
