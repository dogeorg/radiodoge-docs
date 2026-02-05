'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/styles/hero.css';

export function Hero() {
  return (
    <section className="radiodoge-hero">
      <div className="hero-globe" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/hero-world.svg" alt="" className="hero-globe-img" width={547} height={70} />
      </div>
      <div className="hero-satellite hero-satellite-1" aria-hidden />
      <div className="hero-satellite hero-satellite-2" aria-hidden />
      <div className="hero-satellite hero-satellite-3" aria-hidden />
      <div className="hero-satellite hero-satellite-4" aria-hidden />
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">RadioÐoge</h1>
          <p className="hero-subtitle">
            <strong>Bridging the Gap to Financial Inclusion.</strong>
            <br /><br />
            Such Learn! Complete guide to installing, using, and developing with RadioDoge. Much education for developers of all ages!
          </p>
          <div className="hero-buttons">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#151515] px-5 py-2.5 text-sm font-semibold text-[#ffe42b] hover:bg-[#252525]"
            >
              <span className="material-icons" aria-hidden>rocket_launch</span>
              Get Started
            </Link>
            <Link
              href="https://github.com/dogecoinfoundation/radiodoge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#151515] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#151515] hover:bg-[#151515]/10"
            >
              <span className="material-icons" aria-hidden>code</span>
              Get Code
            </Link>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image
            src="/img/back-phone-radiodoge.png"
            alt="RadioDoge on Mobile Phone"
            className="hero-img"
            width={480}
            height={360}
          />
        </div>
      </div>
    </section>
  );
}
