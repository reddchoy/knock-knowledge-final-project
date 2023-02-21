/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '../../styles/CourseDetail.module.scss';

interface Props {
  id?: string;
  courseId?: number;
  image: string;
  status: string;
  name: string;
  currentPrice: number;
  duration: number;
  videoNumber: number;
  classmate: number;
  onDelete?: (e: React.MouseEvent<HTMLInputElement>) => void;
  deleteBtn: boolean;
}

function CourseDetail(props: Props) {
  // const hour = Math.floor(props.duration / 60);
  // const minute = props.duration % 60;
  return (
    <>
      <div className={styles.course_detail} id={props.id}>
        <div className={styles.course_img}>
          <img src={props.image} alt="" />
        </div>
        <div className={styles.course_info}>
          <header>
            <Link href={`/course/${props.courseId}`}>
              <span>{props.name}</span>
            </Link>
            <p>HKD${props.currentPrice}</p>
          </header>
          <footer>
            <span>
              {props.videoNumber} videos{/* ・ {hour}h {minute}m*/} ・ {props.classmate} classmates
            </span>
            {props.deleteBtn && (
              <i className="bx bx-trash" id={props.id} onClick={props.onDelete}></i>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
