"use client"


import React from 'react'
import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';
import '../style.css';
export default function sidebar() {
  const pathname = usePathname(); 

  return (
    <div>
      <aside className="sidebar">
        <div className="logo">
          <h2>TownEst</h2>
        </div>
        <nav className="menu">
        <ul>
          <li className={pathname === '/HelloArchitect' ? 'active' : ''}>
            <Link href='/HelloArchitect'>Dashboard</Link>
          </li>
          <li className={pathname === '/HelloArchitect/ManageProjects' ? 'active' : ''}>
            <Link href='/HelloArchitect/ManageProjects'>Projects</Link>
          </li>
          <li className={pathname === '/HelloArchitect/Events' ? 'active' : ''}>
            <Link href='/HelloArchitect/Events'>Events</Link>
          </li>
          <li className={pathname === '/HelloArchitect/Profile' ? 'active' : ''}>
            <Link href='/HelloArchitect/Profile'>Profile</Link>
          </li>
          <li className={pathname === '/HelloArchitect/Portoflio' ? 'active' : ''}>
            <Link href='/HelloArchitect/Portoflio'>Portfolio</Link>
          </li>
        </ul>
        </nav>
        <div className="bird-logo"></div>
      </aside>
    </div>
  )
}
