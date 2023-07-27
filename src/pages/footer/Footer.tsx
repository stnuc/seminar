import { type ReactNode } from 'react'
import '../../style/Footer.sass'

export const Footer = (): ReactNode => {
  return (
    <section className="footer">
      <div className="footer-content">
        <div className="footer-column footer-column-logo">
          <div className="footer-title">pplicator</div>
          <svg
            className="footer-title-logo"
            width="59"
            height="59"
            viewBox="0 0 59 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.0241 1C35.2013 16.7283 32.6495 47.6334 37.0241 45.4274C42.4922 42.6698 53.1248 24.2861 56.7702 12.643C60.4157 1 19.7083 50.0233 3.91138 50.6361"
              stroke="white"
              strokeWidth="4"
            />
            <path
              d="M3 54.6192C6.24039 59.2152 17.521 54.9256 36.7203 1"
              stroke="white"
              strokeWidth="5"
            />
          </svg>
        </div>
        <div className="footer-column">
          <div className="footer-column-header">Resource</div>
          <div className="footer-column-item">
            <a href="https://github.com/stnuc">Github</a>
          </div>
          <div className="footer-column-item">
            <a href="https://github.com/stnuc/seminars">Seminar</a>
          </div>
          <div className="footer-column-item">
            <a href="https://github.com/stnuc/2023-H1-projects">Project</a>
          </div>
        </div>
        <div className="footer-column">
          <div className="footer-column-header">Contact</div>
          <div className="footer-column-item">
            <a href="mailto: contacttostunc@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </section>
  )
}
