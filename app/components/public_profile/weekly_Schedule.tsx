import type { Schedule } from '../../lib/public-catalog';

type ScheduleSectionProps = { schedules: Schedule[] };

function formatDay(day: string) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export default function ScheduleSection({ schedules }: ScheduleSectionProps) {
  return (
    <section className="schedule-section" id="schedule">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">Class Schedule</span>
          <h2>Weekly <span className="ziq-gold-text">Schedule</span></h2>
          <p>Find the perfect time slot for your learning</p>
          <div className="section-divider"></div>
        </div>

        <div className="schedule-table-wrapper overflow-x-auto" data-aos="fade-up" data-aos-delay="200">
          {schedules.length ? (
            <table className="schedule-table w-full">
              <thead><tr><th>Course</th><th>Package</th><th>Days</th><th>Time</th></tr></thead>
              <tbody>
                {schedules.map((schedule) => {
                  const pkg = schedule.package_detail;
                  return (
                    <tr key={schedule.id}>
                      <td><strong>{pkg.course_name}</strong></td>
                      <td>
                        <span style={{ color: 'var(--ziq-purple)', fontWeight: 600 }}>{pkg.duration}</span>
                        <br />
                        <small style={{ color: 'var(--ziq-text-muted)' }}>
                          {pkg.days_in_week === 'private' ? 'Private' : `${pkg.days_in_week} days/week`}
                          {' · '}{Math.round(pkg.price)} ETB
                        </small>
                      </td>
                      <td><div className="flex flex-wrap gap-1">
                        {schedule.days_names.map((day) => <span className="day-badge" key={day}>{formatDay(day)}</span>)}
                      </div></td>
                      <td><div className="time-display"><i className="fas fa-clock"></i>{schedule.start_time} — {schedule.end_time}</div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="py-8 text-center opacity-70">Class schedules are temporarily unavailable.</p>
          )}
        </div>
      </div>
    </section>
  );
}
