import { ReactNode } from 'react';
import styles from '../../styles/Section.module.scss';

interface Props {
  title?: ReactNode;
  padding?: number;
  padding_top?: number;
  padding_bottom?: number;
  children?: ReactNode;
}

const Section = ({ title, padding, padding_top, padding_bottom, children }: Props) => {
  return (
    <>
      <section className={styles.section}>
        <h2>{title}</h2>
        <div className={styles.content}>{children}</div>
      </section>
      <style jsx>{`
        section {
          ${padding ? `padding: ${padding}px 0;` : 'padding: 80px 0;'}
          ${padding_top ? `padding-top: ${padding_top}px;` : ''}
          ${padding_bottom ? `padding-bottom: ${padding_bottom}px;` : ''}
        }

        @media only screen and (max-width: 425px) {
          section {
            padding: 60px 0;
          }
        }
      `}</style>
    </>
  );
};

export default Section;
