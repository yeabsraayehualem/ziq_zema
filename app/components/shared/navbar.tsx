"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 start-0 z-20 w-full border-b border-default bg-neutral-primary navbar-nav navbar-ziq">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/assets/img/logo.png"
            alt="Ziq Zema logo"
            className="w-12"
          />

          <div className="brand-text">
            <span className="ziq block">ዚቅ ዜማ</span>
            <span className="zema block">
              የዝማሬ መሳሪያዎች ማሰልጠኛ ትምህርት ቤት
            </span>
          </div>
        </Link>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center rounded-lg p-2 text-md md:hidden navbar-toggler-icon "
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >

        </button>


        <div
          className={`${isOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
        >
          <ul className="mt-4 flex flex-col items-center gap-2 md:mt-0 md:flex-row md:gap-6">
            <li>
              <a className="nav-link active" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="nav-link" href="#about">
                ስለ እኛ
              </a>
            </li>

            <li>
              <a className="nav-link" href="#instruments">
                መሳሪያዎች
              </a>
            </li>

            <li>
              <a className="nav-link" href="#courses">
                ትምህርቶች
              </a>
            </li>

            <li>
              <a className="nav-link" href="#contact">
                ያናግሩን
              </a>
            </li>

            <li>
              <a className="nav-link btn-enroll-nav" href="#enroll">
                ይመዝገቡ
              </a>
            </li>
            <li>
              <a className="nav-link" href="/admin/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
