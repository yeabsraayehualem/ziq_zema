import type { Course, Package } from '../../lib/public-catalog';

type CoursesSectionProps = {
  courses: Course[];
  packages: Package[];
};

export default function CoursesSection({ courses, packages }: CoursesSectionProps) {
  return (
    <section className="courses-section" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">Courses &amp; Packages</span>
          <h2>Our <span className="ziq-gold-text">Courses</span></h2>
          <p>Choose from our structured learning programs</p>
          <div className="section-divider"></div>
        </div>

        {courses.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => {
              const coursePackages = packages.filter((pkg) => pkg.course === course.id);
              return (
                <div key={course.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="course-card h-full">
                    <div className="course-card-header">
                      {course.icon ? (
                        <img src={course.icon} alt={course.name} />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: 'linear-gradient(135deg, var(--ziq-purple), var(--ziq-purple-dark))' }}>
                          <i className="fas fa-music"></i>
                        </div>
                      )}
                      <h5>{course.name}</h5>
                    </div>

                    <div className="course-card-body">
                      {coursePackages.map((pkg) => (
                        <div className="package-item" key={pkg.id}>
                          <div className="package-info">
                            <h6>{pkg.duration}</h6>
                            <small>{pkg.days_in_week === 'private' ? 'Private Sessions' : `${pkg.days_in_week} days/week`}</small>
                          </div>
                          <div className="package-price">{pkg.price ? `${Math.round(pkg.price)} ETB` : 'Contact'}</div>
                        </div>
                      ))}
                      {!coursePackages.length && <p className="py-3 text-sm opacity-70">Packages will be announced soon.</p>}
                    </div>

                    <div className="course-card-footer">
                      <a href="#contact" className="btn btn-submit w-full text-center" style={{ fontSize: '0.85rem', padding: '0.6rem' }}>
                        <i className="fas fa-paper-plane me-2"></i>Inquire Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-center opacity-70">Course information is temporarily unavailable.</p>
        )}
      </div>
    </section>
  );
}
