import React from 'react';
import { Wallet } from 'lucide-react';

/* ── Inline SVG icons (no lucide dependency issues) ─────── */
const GitHubIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t transition-colors duration-300 mt-20"
      style={{
        backgroundColor: 'var(--card-color)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-premium flex items-center justify-center shadow-lg">
                <Wallet size={18} className="text-white" />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ color: 'var(--text-color)' }}
              >
                Velora
              </span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--muted-color)' }}>
              AI-powered expense intelligence for smarter financial decisions.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted-color)' }}>
              © {year} Velora. All rights reserved.
            </p>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--muted-color)' }}
            >
              Connect
            </h3>
            <div className="flex flex-col gap-3">

              {/* GitHub */}
              <a
                href="https://github.com/bishnu-prasad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium transition-all group"
                style={{ color: 'var(--muted-color)' }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 group-hover:text-white group-hover:bg-gray-800 group-hover:border-gray-700"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <GitHubIcon size={16} />
                </span>
                <span className="group-hover:text-[color:var(--text-color)] transition-colors">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/bishnuprasad-tripathy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium transition-all group"
                style={{ color: 'var(--muted-color)' }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <LinkedInIcon size={16} />
                </span>
                <span className="group-hover:text-[color:var(--text-color)] transition-colors">
                  LinkedIn
                </span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
