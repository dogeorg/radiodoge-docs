'use client';

import Link from 'next/link';
import Image from 'next/image';

export function TopNav() {
  return (
    <nav className="radiodoge-top-nav">
      <div className="radiodoge-top-nav-container">
        <div className="radiodoge-top-nav-logo">
          <Link href="/" className="radiodoge-top-nav-logo-link">
            <Image
              src="/img/radiodoge-logo-light1.png"
              alt="RadioDoge"
              width={40}
              height={40}
              className="radiodoge-logo-icon"
            />
            <span className="radiodoge-logo-text">RadioÐoge</span>
          </Link>
        </div>
        <div className="radiodoge-top-nav-actions">
          <a
            href="https://github.com/dogecoinfoundation/radiodoge"
            target="_blank"
            rel="noopener noreferrer"
            className="radiodoge-top-nav-link"
            title="View Source Code"
            aria-label="View Source Code on GitHub"
          >
            <img src="/img/icons/github-icon.svg" alt="" width={24} height={24} aria-hidden />
          </a>
          <a
            href="https://github.com/dogeorg/radiodoge-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="radiodoge-top-nav-link"
            title="Edit This Site"
            aria-label="Edit documentation on GitHub"
          >
            <img src="/img/icons/edit-icon.svg" alt="" width={24} height={24} aria-hidden />
          </a>
        </div>
      </div>
    </nav>
  );
}
