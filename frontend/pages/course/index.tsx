import { server } from '../../config';
import Meta from '@/components/layout/Meta';
import styles from '../../styles/course/course.module.scss';
import { Course } from '@/models/Course';
import CourseList from '@/components/course/CourseList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from "../../components/layout/Loader";

const AllCourse = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false)
  const newArray: Course[] = [];
  const [displayData, setDisplayData] = useState<Course[]>([]);

  const filterDataByQuery = async () => {
    setLoading(true)
    const res = await fetch(`${server}/courses/homepage/course/detail`);
    const courses: Course[] = await res.json();

    const query = id as string;
    let filteredData;
    if (!isNaN(parseInt(query))) {
      filteredData = courses.filter((e) => e.price <= parseInt(query));
    } else {
      filteredData = courses.filter((e) => (e.name).toLowerCase() === query.toLowerCase());
    }
    setDisplayData(filteredData);
    setLoading(false)
    if (filteredData.length === 0) {
      const splitQuery = (query.toLocaleLowerCase()).split('');
      splitQuery.forEach((e) => {
        courses.forEach((course) => {
          const splitCourseName = (course.name).toLocaleLowerCase().split('');
          if (splitCourseName.includes(e)) {
            newArray.push(course);
          }
        });
      });
      const noDuplicateArray = newArray.filter(
        (value, index, self) => index === self.findIndex((t) => t.id === value.id)
      );
      setDisplayData(noDuplicateArray);
      setLoading(false)
    }
  };

  useEffect(() => {
    if (id) {
      filterDataByQuery();
    }
    if (!id) {
      setLoading(true)
      fetch(`${server}/courses/homepage/course/detail`)
        .then((res) => res.json())
        .then((data: Course[]) => {
          setDisplayData(data);
          setLoading(false)
        });
    }
  }, [id]);

  if (isLoading) return <Loader/>
  
  return (
    <>
      {!!id ? (
        <>
          <Meta title={`Search Result : ${id} | Knock Knowledge`} />
          <h1 className={styles.title}>Search Result : {id}</h1>
        </>
      ) : (
        <>
          <Meta title="All Course | Knock Knowledge" />
          <h1 className={styles.title}>All Course</h1>
        </>
      )}

      <CourseList data={displayData} />
    </>
  );
};

export default AllCourse;

// export const getServerSideProps = async () => {
//   const res = await fetch(`${server}/courses/homepage/course/detail`);
//   const courses: Course[] = await res.json();

//   return {
//     props: {
//       courses,
//     },
//   };
// };
