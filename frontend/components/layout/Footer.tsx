import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import styles from '../../styles/layout/Footer.module.scss';
const footer = () => {
  const isBrowser = () => typeof window !== 'undefined';
  return (
    <footer>
      <div className="container">
        <hr />
        <div className={styles.footer}>
          <div className={styles.footer_menu}>
            <div>
              <h2>Share Knowledge</h2>
              <ul>
                <li>
                  <Link href="/openCourse">Open Course</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Get Knowledge</h2>
              <ul>
                <li>
                  <Link href="/course">Find Course</Link>
                </li>
                <li>
                  <Link href="/article">Article</Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Image src="/image/footer_image.png" width={215} height={175} alt="" priority />
          </div>

          <div className={styles.footer_logo}>
            <header>
              <div>
                <i className="bx bxl-facebook" />
                <i className="bx bxl-twitter" />
                <i className="bx bxl-linkedin" />
                <i className="bx bxl-youtube" />
              </div>
              <div className={styles.logo}>
                <span>
                  Knock Knowledge<span className="dot">.</span>
                </span>
                <i className="bx bxs-door-open" />
              </div>
            </header>

            <Button
              txt="top"
              icon="bx-up-arrow-alt"
              onButton={() => {
                if (!isBrowser()) return;
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
