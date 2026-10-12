"use client";

import { useMemo, useState, type FormEvent } from 'react';
import type { Course, Package } from '../../lib/public-catalog';

type EnrollmentSectionProps = {
  courses: Course[];
  packages: Package[];
};

type EnrollmentResult = { detail?: string; [key: string]: unknown };

export default function EnrollmentSection({ courses, packages }: EnrollmentSectionProps) {
  const [courseId, setCourseId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const availablePackages = useMemo(
    () => packages.filter((pkg) => String(pkg.course) === courseId),
    [courseId, packages],
  );

  async function submitEnrollment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError(false);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch('/api/backend/public/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          phone: form.get('phone'),
          course: Number(courseId),
          package: Number(packageId),
        }),
      });
      const result = await response.json() as EnrollmentResult;
      if (!response.ok) {
        const details = Object.entries(result).map(([field, value]) =>
          `${field}: ${Array.isArray(value) ? value.join(' ') : String(value)}`,
        ).join(' ');
        throw new Error(result.detail ?? details ?? 'Please check your information and try again.');
      }
      formElement.reset();
      setCourseId('');
      setPackageId('');
      setMessage('Thank you. Your enrollment request has been received.');
    } catch (submitError) {
      setError(true);
      setMessage(submitError instanceof Error ? submitError.message : 'Unable to send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="cta-section" id="enroll">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="cta-card overflow-hidden" data-aos="fade-up">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            <div className="p-6 sm:p-8 lg:col-span-7 lg:p-12">
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ziq-gold)]">Start Learning</span>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Begin Your Mezmur Journey</h2>
              <p className="mb-8 max-w-2xl leading-7 opacity-80">
                Whether you&apos;re called to learn the deep tones of the begena, the rhythmic power of the kebero, or the melodic beauty of the washent — your journey starts here. Join ZIQ Zema and become part of a living tradition.
              </p>

              <form onSubmit={submitEnrollment}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="group">
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold">ስም</label>
                    <div className="relative">
                      <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ziq-gold)]"></i>
                      <input id="name" name="name" type="text" required placeholder="ስምዎን ያስገቡ" className="w-full rounded-xl border border-white/15 bg-black/10 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/40 focus:border-[var(--ziq-gold)] focus:ring-1 focus:ring-[var(--ziq-gold)]" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold">ስልክ</label>
                    <div className="relative">
                      <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ziq-gold)]"></i>
                      <input id="phone" name="phone" type="tel" required placeholder="09XXXXXXXX" className="w-full rounded-xl border border-white/15 bg-black/10 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/40 focus:border-[var(--ziq-gold)] focus:ring-1 focus:ring-[var(--ziq-gold)]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="course" className="mb-2 block text-sm font-semibold">ትምህርት</label>
                    <div className="relative">
                      <i className="fas fa-music pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--ziq-gold)]"></i>
                      <select id="course" name="course" required value={courseId} onChange={(event) => { setCourseId(event.target.value); setPackageId(''); }} className="w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-black/10 py-3.5 pl-11 pr-10 text-sm outline-none transition focus:border-[var(--ziq-gold)] focus:ring-1 focus:ring-[var(--ziq-gold)]">
                        <option value="" disabled>Choose an instrument</option>
                        {courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
                      </select>
                      <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--ziq-gold)]"></i>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="package" className="mb-2 block text-sm font-semibold">የትምህርት አማራጭ</label>
                    <div className="relative">
                      <i className="fas fa-calendar-alt pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--ziq-gold)]"></i>
                      <select id="package" name="package" required value={packageId} onChange={(event) => setPackageId(event.target.value)} disabled={!courseId} className="w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-black/10 py-3.5 pl-11 pr-10 text-sm outline-none transition focus:border-[var(--ziq-gold)] focus:ring-1 focus:ring-[var(--ziq-gold)] disabled:cursor-not-allowed disabled:opacity-60">
                        <option value="" disabled>{courseId ? 'Choose a package' : 'Choose an instrument first'}</option>
                        {availablePackages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.duration} · {pkg.days_in_week === 'private' ? 'Private' : `${pkg.days_in_week} days/week`} · {Math.round(pkg.price)} ETB</option>)}
                      </select>
                      <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--ziq-gold)]"></i>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <button type="submit" disabled={submitting || !courses.length || !packages.length} className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ziq-gold)] px-6 py-3.5 font-semibold text-[var(--ziq-purple-dark)] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    <i className="fas fa-paper-plane transition-transform duration-300 group-hover:translate-x-1"></i>
                    {submitting ? 'Sending…' : 'Begin My Journey'}
                  </button>
                  {message && <p role="status" className={`mt-4 text-sm ${error ? 'text-red-300' : 'text-green-200'}`}>{message}</p>}
                </div>
              </form>
            </div>

            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden p-8 lg:col-span-5 lg:min-h-[460px]">
              <div className="absolute h-64 w-64 rounded-full border border-[var(--ziq-gold)]/20"></div>
              <div className="absolute h-48 w-48 rounded-full border border-[var(--ziq-gold)]/20"></div>
              <div className="relative flex flex-wrap items-center justify-center gap-5">
                <img src="/assets/img/kebero.png" alt="Kebero" className="h-[82px] w-[82px] object-contain transition duration-500 hover:-translate-y-2" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }} />
                <img src="/assets/img/kerar.png" alt="Kerar" className="h-[100px] w-[100px] object-contain transition duration-500 hover:-translate-y-2" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }} />
                <img src="/assets/img/washent.png" alt="Washent" className="h-[82px] w-[82px] object-contain transition duration-500 hover:-translate-y-2" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
