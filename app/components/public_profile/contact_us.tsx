export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Header */}{" "}
        <div className="section-header" data-aos="fade-up">
          {" "}
          <span className="section-label">Contact</span>{" "}
          <h2>
            {" "}
            Let's Start a <span className="gold">Conversation</span>{" "}
          </h2>{" "}
          <p>
            {" "}
            Have a question about our classes? We'd love to hear from you.{" "}
          </p>{" "}
          <div className="section-divider"></div>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {" "}
          {/* ========================= CONTACT FORM ========================== */}{" "}
          <div className="lg:col-span-7" data-aos="fade-right">
            {" "}
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_15px_50px_rgba(60,27,95,0.08)] sm:p-8 lg:p-10">
              {" "}
              {/* Form Header */}{" "}
              <div className="mb-8">
                {" "}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ziq-purple)] text-white shadow-lg">
                  {" "}
                  <i className="fas fa-paper-plane"></i>{" "}
                </div>{" "}
                <h3 className="text-2xl font-bold text-[var(--ziq-purple-dark)]">
                  {" "}
                  Send us a message{" "}
                </h3>{" "}
                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                  {" "}
                  Tell us what you need and we'll get back to you as soon as
                  possible.{" "}
                </p>{" "}
              </div>{" "}
              <form>
                {" "}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {" "}
                  {/* Name */}{" "}
                  <div>
                    {" "}
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      {" "}
                      Full Name{" "}
                    </label>{" "}
                    <div className="relative">
                      {" "}
                      <i className="fas fa-user pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--ziq-purple)]"></i>{" "}
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[var(--ziq-gold)] focus:bg-white focus:ring-4 focus:ring-[var(--ziq-gold)]/10"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Phone */}{" "}
                  <div>
                    {" "}
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      {" "}
                      Phone Number{" "}
                    </label>{" "}
                    <div className="relative">
                      {" "}
                      <i className="fas fa-phone pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--ziq-purple)]"></i>{" "}
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+251 9XX XXX XXX"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[var(--ziq-gold)] focus:bg-white focus:ring-4 focus:ring-[var(--ziq-gold)]/10"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Email */}{" "}
                  <div className="sm:col-span-2">
                    {" "}
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      {" "}
                      Email Address{" "}
                    </label>{" "}
                    <div className="relative">
                      {" "}
                      <i className="fas fa-envelope pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--ziq-purple)]"></i>{" "}
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[var(--ziq-gold)] focus:bg-white focus:ring-4 focus:ring-[var(--ziq-gold)]/10"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Message */}{" "}
                  <div className="sm:col-span-2">
                    {" "}
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      {" "}
                      Message{" "}
                    </label>{" "}
                    <div className="relative">
                      {" "}
                      <i className="fas fa-comment-alt pointer-events-none absolute left-4 top-4 text-sm text-[var(--ziq-purple)]"></i>{" "}
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[var(--ziq-gold)] focus:bg-white focus:ring-4 focus:ring-[var(--ziq-gold)]/10"
                      ></textarea>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Submit */}{" "}
                  <div className="sm:col-span-2">
                    {" "}
                    <button
                      type="submit"
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--ziq-purple)] px-6 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--ziq-purple-dark)] hover:shadow-lg sm:w-auto"
                    >
                      {" "}
                      Send Message{" "}
                      <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
          {/* ========================= CONTACT INFORMATION ========================== */}{" "}
          <div
            className="lg:col-span-5"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            {" "}
            <div className="relative h-full overflow-hidden rounded-2xl bg-[var(--ziq-purple-dark)] p-7 text-white shadow-[0_15px_50px_rgba(60,27,95,0.18)] sm:p-9">
              {" "}
              {/* Decorative background */}{" "}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[var(--ziq-gold)]/10"></div>{" "}
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[var(--ziq-gold)]/10"></div>{" "}
              <div className="relative z-10">
                {" "}
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ziq-gold)]">
                  {" "}
                  Contact Information{" "}
                </span>{" "}
                <h3 className="mt-3 text-2xl font-bold">
                  {" "}
                  Come and say hello.{" "}
                </h3>{" "}
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {" "}
                  Whether you're ready to learn or simply want to know more
                  about ZIQ Zema, we're here for you.{" "}
                </p>{" "}
                {/* Contact Items */}{" "}
                <div className="mt-9 space-y-6">
                  {" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--ziq-gold)]">
                      {" "}
                      <i className="fas fa-map-marker-alt"></i>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {" "}
                        Visit Us{" "}
                      </p>{" "}
                      <p className="mt-1 text-sm text-white/80">
                        {" "}
                        Addis Ababa, Ethiopia{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--ziq-gold)]">
                      {" "}
                      <i className="fas fa-phone"></i>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {" "}
                        Call Us{" "}
                      </p>{" "}
                      <p className="mt-1 text-sm text-white/80">
                        {" "}
                        +251 9XX XXX XXX{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--ziq-gold)]">
                      {" "}
                      <i className="fas fa-envelope"></i>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {" "}
                        Email{" "}
                      </p>{" "}
                      <p className="mt-1 text-sm text-white/80">
                        {" "}
                        info@ziqzema.com{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--ziq-gold)]">
                      {" "}
                      <i className="fas fa-clock"></i>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {" "}
                        Opening Hours{" "}
                      </p>{" "}
                      <p className="mt-1 text-sm leading-6 text-white/80">
                        {" "}
                        Monday – Saturday <br /> 7:00 AM – 9:00 PM{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                {/* Social */}{" "}
                <div className="mt-9 border-t border-white/10 pt-6">
                  {" "}
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--ziq-gold)]">
                    {" "}
                    Follow Us{" "}
                  </p>{" "}
                  <div className="flex gap-2">
                    {" "}
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-[var(--ziq-gold)] hover:text-[var(--ziq-purple-dark)]"
                    >
                      {" "}
                      <i className="fab fa-facebook-f"></i>{" "}
                    </a>{" "}
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-[var(--ziq-gold)] hover:text-[var(--ziq-purple-dark)]"
                    >
                      {" "}
                      <i className="fab fa-instagram"></i>{" "}
                    </a>{" "}
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-[var(--ziq-gold)] hover:text-[var(--ziq-purple-dark)]"
                    >
                      {" "}
                      <i className="fab fa-youtube"></i>{" "}
                    </a>{" "}
                    <a
                      href="#"
                      aria-label="Telegram"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-[var(--ziq-gold)] hover:text-[var(--ziq-purple-dark)]"
                    >
                      {" "}
                      <i className="fab fa-telegram"></i>{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
