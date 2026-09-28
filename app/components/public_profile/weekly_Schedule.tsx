
type Course = {
  id: number;
  name: string;
};

type Package = {
  id: number;
  course: Course;
  duration: string;
  days_in_week: string;
  price: number;
};

type Day = {
  id: number;
  name: string;
};

type Schedule = {
  id: number;
  package: Package;
  days: Day[];
  start_time: string;
  end_time: string;
};

const schedules: Schedule[] = [
  {
    id: 1,
    package: {
      id: 1,
      course: {
        id: 1,
        name: "Begena",
      },
      duration: "1 Month",
      days_in_week: "2",
      price: 1500,
    },
    days: [
      { id: 1, name: "Monday" },
      { id: 2, name: "Wednesday" },
    ],
    start_time: "5:00 PM",
    end_time: "6:30 PM",
  },
  {
    id: 2,
    package: {
      id: 3,
      course: {
        id: 2,
        name: "Kerar",
      },
      duration: "1 Month",
      days_in_week: "2",
      price: 1200,
    },
    days: [
      { id: 3, name: "Tuesday" },
      { id: 4, name: "Thursday" },
    ],
    start_time: "4:00 PM",
    end_time: "5:30 PM",
  },
  {
    id: 3,
    package: {
      id: 5,
      course: {
        id: 3,
        name: "Mesenko",
      },
      duration: "1 Month",
      days_in_week: "2",
      price: 1500,
    },
    days: [
      { id: 5, name: "Saturday" },
      { id: 6, name: "Sunday" },
    ],
    start_time: "10:00 AM",
    end_time: "11:30 AM",
  },
  {
    id: 4,
    package: {
      id: 4,
      course: {
        id: 2,
        name: "Kerar",
      },
      duration: "Private",
      days_in_week: "private",
      price: 2500,
    },
    days: [
      { id: 1, name: "Monday" },
      { id: 3, name: "Tuesday" },
    ],
    start_time: "6:00 PM",
    end_time: "7:00 PM",
  },
];

export default function ScheduleSection() {
  return (
    <section className="schedule-section" id="schedule">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">Class Schedule</span>

          <h2>
            Weekly <span className="ziq-gold-text">Schedule</span>
          </h2>

          <p>Find the perfect time slot for your learning</p>

          <div className="section-divider"></div>
        </div>

        {/* Schedule */}
        <div
          className="schedule-table-wrapper overflow-x-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <table className="schedule-table w-full">
            <thead>
              <tr>
                <th>Course</th>
                <th>Package</th>
                <th>Days</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>
                    <strong>{schedule.package.course.name}</strong>
                  </td>

                  <td>
                    <span
                      style={{
                        color: "var(--ziq-purple)",
                        fontWeight: 600,
                      }}
                    >
                      {schedule.package.duration}
                    </span>

                    <br />

                    <small
                      style={{
                        color: "var(--ziq-text-muted)",
                      }}
                    >
                      {schedule.package.days_in_week === "private"
                        ? "Private"
                        : `${schedule.package.days_in_week} days/week`}
                      {" · "}
                      {Math.round(schedule.package.price)} ETB
                    </small>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-1">
                      {schedule.days.map((day) => (
                        <span className="day-badge" key={day.id}>
                          {day.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div className="time-display">
                      <i className="fas fa-clock"></i>
                      {schedule.start_time} — {schedule.end_time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
