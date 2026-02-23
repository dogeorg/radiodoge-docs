'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SIDEBAR_TRIGGER_SLOT_ID } from './SidebarTriggerPortal';

export function TopNav() {
  return (
    <nav className="radiodoge-top-nav">
      <div className="radiodoge-top-nav-container">
        <div id={SIDEBAR_TRIGGER_SLOT_ID} className="radiodoge-top-nav-menu-slot" />
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
            title="View source code"
            aria-label="View source on GitHub"
          >
            <span className="material-icons">code</span>
          </a>
          <a
            href="https://github.com/dogeorg/radiodoge-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="radiodoge-top-nav-link"
            title="Edit this site"
            aria-label="Edit documentation"
          >
            <span className="material-icons">edit</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
