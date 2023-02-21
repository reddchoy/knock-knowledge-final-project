import Image from 'next/image';
import styles from '../../styles/SectionDichotomize.module.scss';

interface Props {
  title: string;
  description: string;
  description2?: string;
  image: string;
  reverse?: boolean;
}

const SectionDichotomize = ({ title, description,description2, image, reverse }: Props) => {
  return (
    <>
      <div className="container">
        <section className={styles.section_inner}>
          <div className={styles.section_inner_content}>
            <div className={styles.section_inner_title}>{title}</div>
            <div>{description}</div>
            <div>{description2}</div>
          </div>
          <div className={styles.section_inner_image}>
            <Image src={image} width={498} height={407} alt="" />
          </div>
        </section>
      </div>
      <style jsx>
        {`
          section {
            flex-direction: ${reverse ? 'row-reverse' : 'row'};
          }

          @media only screen and (max-width: 425px) {
            section {
              flex-direction: column;
            }
        `}
      </style>
    </>
  );
};

SectionDichotomize.defaultProps = {
  reverse: false,
};

export default SectionDichotomize;
