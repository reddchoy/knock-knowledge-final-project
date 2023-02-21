import Meta from '@/components/layout/Meta';
import SectionDichotomize from '@/components/layout/SectionDichotomize';
import Button from '@/components/layout/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../redux/store';
import { useRouter } from 'next/router';

interface Props {
  openPopup: (e: boolean) => void;
}

const OpenCourse = ({ openPopup }: Props) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const checkLogin = () => {
    if (!isAuthenticated) {
      openPopup(true);
    } else {
      router.push('/openCourse/form');
    }
  };

  return (
    <>
      <Meta title="Open Course | Knock Knowledge" />
      <header>
        <div>
          <Image src="/image/openCourse_header_1.png" width={326} height={262} alt=""></Image>
        </div>
        <div className="header_main">
          <span>Being a teacher. Upload your talent.</span>
          <h1>Open Course</h1>
          <Button onButton={checkLogin} txt="START" color="#2A9D8F" />
        </div>
        <div className="header_right">
          <Image src="/image/openCourse_header_2.png" width={256} height={277} alt=""></Image>
        </div>
      </header>

      <hr />

      <SectionDichotomize
        title="Lectus tincidunt"
        description="Lorem ipsum dolor sit amet arcu duis integer. Blandit erat turpis luctus scelerisque sed iaculis euismod sodales volutpat condimentum dictum curabitur aliquam."
        image="/image/openCourse_1.png"
        reverse={true}
      />
      <SectionDichotomize
        title="Lectus tincidunt"
        description="Lorem ipsum dolor sit amet arcu duis integer. Blandit erat turpis luctus scelerisque sed iaculis euismod sodales volutpat condimentum dictum curabitur aliquam."
        image="/image/openCourse_2.png"
        reverse={false}
      />
      <SectionDichotomize
        title="Lectus tincidunt"
        description="Lorem ipsum dolor sit amet arcu duis integer. Blandit erat turpis luctus scelerisque sed iaculis euismod sodales volutpat condimentum dictum curabitur aliquam."
        image="/image/openCourse_3.png"
        reverse={true}
      />
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          padding: 40px 24px 80px;
        }

        .header_main {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;

          padding: 150px 0;

          font-size: 24px;
        }

        .header_main h1,
        .header_main span {
          color: #264653;
        }

        .header_main h1 {
          font-size: 64px;
        }

        .header_right {
          display: flex;
          align-items: flex-end;
        }

        @media only screen and (max-width: 1024px) {
          .header_main {
            font-size: 18px;
          }

          .header_main h1 {
            font-size: 48px;
          }
        }
        @media only screen and (max-width: 768px) {
          header {
            flex-direction: column;
          }

          .header_main {
            padding: 0;
          }

          .header_right {
            justify-content: flex-end;
          }
        }

        @media only screen and (max-width: 425px) {
          .header_main {
            padding: 48px 0;
            font-size: 16px;
          }

          .header_main h1 {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default OpenCourse;
