'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/styles/hero.css';
import { HERO_WORLD_PATH_D } from '@/lib/hero-world-path';

export function Hero() {
  return (
    <section className="radiodoge-hero">
      <div className="hero-globe" aria-hidden>
        <svg width="547" height="70" viewBox="0 0 1094 140" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="world-path" d={HERO_WORLD_PATH_D} stroke="#FFE42B" strokeWidth="2" fill="none" fillRule="evenodd" />
          </defs>
          <g>
            <use href="#world-path" />
            <use href="#world-path" transform="translate(547, 0)" />
          </g>
        </svg>
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
              className="inline-flex items-center justify-center rounded-md bg-[#151515] px-5 py-2.5 text-sm font-semibold text-[#ffe42b] hover:bg-[#252525]"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/dogecoinfoundation/radiodoge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border-2 border-[#151515] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#151515] hover:bg-[#151515]/10"
            >
              View Source
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
