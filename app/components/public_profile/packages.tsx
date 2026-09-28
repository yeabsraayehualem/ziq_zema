
type Course = {
  id: number;
  name: string;
  icon?: string | null;
};

type Package = {
  id: number;
  course_id: number;
  duration: string;
  days_in_week: string;
  price?: number | null;
};

const courses: Course[] = [
  {
    id: 1,
    name: "Begena",
    icon: "/assets/img/begena.png",
  },
  {
    id: 2,
    name: "Kerar",
    icon: "/assets/img/kerar.png",
  },
  {
    id: 3,
    name: "Mesenko",
    icon: "/assets/img/mesenko.png",
  },
  {
    id: 4,
    name: "Washent",
    icon: "/assets/img/washent.png",
  },
  {
    id: 5,
    name: "Kebero",
    icon: "/assets/img/kebero.png",
  },
];

const packages: Package[] = [
  {
    id: 1,
    course_id: 1,
    duration: "1 Month",
    days_in_week: "2",
    price: 1500,
  },
  {
    id: 2,
    course_id: 1,
    duration: "3 Months",
    days_in_week: "3",
    price: 4000,
  },
  {
    id: 3,
    course_id: 2,
    duration: "1 Month",
    days_in_week: "2",
    price: 1200,
  },
  {
    id: 4,
    course_id: 2,
    duration: "Private",
    days_in_week: "private",
    price: 2500,
  },
  {
    id: 5,
    course_id: 3,
    duration: "1 Month",
    days_in_week: "2",
    price: 1500,
  },
  {
    id: 6,
    course_id: 4,
    duration: "2 Months",
    days_in_week: "2",
    price: 2500,
  },
  {
    id: 7,
    course_id: 5,
    duration: "1 Month",
    days_in_week: "3",
    price: 1800,
  },
];

export default function CoursesSection() {
  return (
    <section className="courses-section" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">Courses & Packages</span>

          <h2>
            Our <span className="ziq-gold-text">Courses</span>
          </h2>

          <p>Choose from our structured learning programs</p>

          <div className="section-divider"></div>
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const coursePackages = packages.filter(
              (pkg) => pkg.course_id === course.id
            );

            return (
              <div
                key={course.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="course-card h-full">
                  {/* Header */}
                  <div className="course-card-header">
                    {course.icon ? (
                      <img
                        src={course.icon}
                        alt={course.name}
                      />
                    ) : (
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--ziq-purple), var(--ziq-purple-dark))",
                        }}
                      >
                        <i className="fas fa-music"></i>
                      </div>
                    )}

                    <h5>{course.name}</h5>
                  </div>

                  {/* Packages */}
                  <div className="course-card-body">
                    {coursePackages.map((pkg) => (
                      <div
                        className="package-item"
                        key={pkg.id}
                      >
                        <div className="package-info">
                          <h6>{pkg.duration}</h6>

                          <small>
                            {pkg.days_in_week === "private"
                              ? "Private Sessions"
                              : `${pkg.days_in_week} days/week`}
                          </small>
                        </div>

                        <div className="package-price">
                          {pkg.price
                            ? `${Math.round(pkg.price)} ETB`
                            : "Contact"}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="course-card-footer">
                    <a
                      href="#contact"
                      className="btn btn-submit w-full text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.6rem",
                      }}
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      Inquire Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

