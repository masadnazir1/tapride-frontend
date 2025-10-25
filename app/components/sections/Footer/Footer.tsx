import React, { JSX } from "react";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

type SocialIcon = "facebook" | "twitter" | "linkedin" | "instagram";

interface FooterProps {
  logo?: string;
  links?: { label: string; href: string }[];
  socials?: { type: SocialIcon; show: boolean; href: string }[];
  showCopyright?: boolean;
  buttons?: { label: string; type?: "filled" | "outline"; href?: string }[];
}

const iconMap: Record<SocialIcon, JSX.Element> = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedinIn />,
  instagram: <FaInstagram />,
};

const Footer: React.FC<FooterProps> = ({
  logo = "Scyco",
  links = [],
  socials = [],
  showCopyright = true,
  buttons = [],
}) => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.logo}>{logo}</div>

      {links.length > 0 && (
        <nav className={styles.nav} aria-label="Footer Navigation">
          {links.map((link, idx) => (
            <a key={idx} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {buttons.length > 0 && (
        <div className={styles.buttons}>
          {buttons.map((btn, idx) => (
            <a
              key={idx}
              href={btn.href || "#"}
              className={`${styles.button} ${
                btn.type === "outline" ? styles.outline : ""
              }`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      )}

      {socials.length > 0 && (
        <div className={styles.socials} aria-label="Social Media Links">
          {socials.map(
            (s, idx) =>
              s.show && (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {iconMap[s.type]}
                </a>
              )
          )}
        </div>
      )}

      {showCopyright && (
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} {logo}. All rights reserved.
        </div>
      )}
    </footer>
  );
};

export default Footer;
