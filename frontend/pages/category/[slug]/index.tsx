import { useRouter } from 'next/router';
import Meta from '@/components/layout/Meta';

import CourseListHeader from '@/components/course/CourseListHeader';
import CourseList from '@/components/course/CourseList';
import { useEffect, useState } from 'react';
import { server } from '../../../config/index';
import { Course } from '@/models/Course';
import NotFound from '@/components/layout/NotFound';
import Loader from "../../../components/layout/Loader";

const CourseCategory = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setLoading] = useState(false)
  const [courses, setCourses] = useState<any[]>([]);
  const [freeCourses, setFreeCourses] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true)
    const getCourse = async () => {
      const resp = await fetch(`${server}/courses/course/category/${slug}`);
      const data: any[] = await resp.json();
      setCourses(data);
      const _freeCourses = data.filter((e) => e.price === 0);
      setFreeCourses(_freeCourses);
      setLoading(false)
    };
    if (slug) {
      getCourse();
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <Meta title={`${slug} Course | Knock Knowledge`} />
     
      {courses.length > 0 ? (
        <>
          <CourseListHeader
            title={courses[0].category.name}
            image={courses[0].category.coverImage}
          />

          <hr />

          {freeCourses.length > 0 && (
            <>
              <p className="title">{`Explore for free`}</p>
              <CourseList data={freeCourses} />
              <hr />
            </>
          )}
          
          <CourseList data={courses} />
        </>
      ) : (
        isLoading ? (<Loader/>) : (  <NotFound name="course" full />)
      
      )}
     
      <style jsx>{`
        hr {
          margin: 80px 0;
        }

        .title {
          color: #264653;
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 60px;
        }
      `}</style>
    </>
  );
};

export default CourseCategory;
