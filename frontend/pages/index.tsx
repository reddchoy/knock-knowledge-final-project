/* eslint-disable @next/next/no-img-element */
import Section from '@/components/layout/Section';
import CourseList from '@/components/course/CourseList';
import SectionDichotomize from '@/components/layout/SectionDichotomize';
import CSReviewList from '@/components/review/CSReviewList';
import styles from '../styles/index.module.scss';
import { server } from '..//config';
import { Course } from '../models/Course';
import { useEffect, useState } from 'react';
import NotFound from '@/components/layout/NotFound';
import router from 'next/router';
import Button from '@/components/layout/Button';
import Loader from "../components/layout/Loader";

export default function Home() {
  let [data, setData] = useState<Course[]>([]);
  const [isLoading, setLoading] = useState(false)
  const [active, setActive] = useState('all');
  const [reviewData, setReviewData] = useState([]);
  let reviewsData;
  const [input, setInput] = useState('');
  const [globalData, setGlobalData] = useState<Course[]>([]);

  useEffect(() => {
    setLoading(true)
    fetch(`${server}/courses/homepage/course/detail`)
      .then((res) => res.json())
      .then((data: Course[]) => {
        setGlobalData(data);
        setLoading(false)
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    fetch(`${server}/courses/homepage/course/detail`)
      .then((res) => res.json())
      .then((data: Course[]) => {
        const catData = data.filter((e, i) => i < 3);
        setData(catData);
        setLoading(false)
      });
  }, []);

  // useEffect(() => {
  //   const getCategoryData = (data: Course[]) => {
  //     data = courses.filter((e, i) => i < 3);
  //     setData(data);
  //   };
  //   setData(courses);
  //   getCategoryData(data);
  // }, [courses]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true)
    fetch(`${server}/courses/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((reviewsData) => {
        setReviewData(reviewsData);
        setLoading(false)
      });
  }, [reviewsData]);

  if (isLoading) return <Loader/>
  
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.banner_main}>
          <div className={styles.banner_main_slogan}>
            <div>
              Open <br />
              the Door of
              <br /> Knowledge
            </div>
            <img src="/image/banner_4.png" alt="" />
          </div>
          <div className={styles.banner_main_search}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!input) {
                  router.push(`/course/`);
                }
                router.push(`/course/?id=${input}`);
              }}
            >
              <div className={styles.banner_main_search_bar}>
                <i className="bx bx-search"></i>
                <input
                  type="text"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  value={input}
                  placeholder="Find your passion"
                />
                <Button txt="search" color="#2a9d8f" />
              </div>
            </form>
          </div>
        </div>

        <div className={styles.banner_image}>
          <div
            className={styles.banner_image_item}
            style={{
              backgroundImage: `url('/image/banner_3.jpg')`,
              backgroundPosition: 'bottom',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div
            className={styles.banner_image_item}
            style={{
              backgroundImage: `url('/image/banner_2.jpg')`,
              backgroundPosition: 'bottom',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div
            className={styles.banner_image_item}
            style={{
              backgroundImage: `url('/image/banner_1.jpg')`,
              backgroundPosition: 'bottom',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
      </div>
      <Section
        title={
          <>
            Stay hungry<span className="dot">.</span> Stay foolish<span className="dot">.</span>
          </>
        }
      >
        <ul className={styles.category_list}>
          <li
            className={active === 'all' ? styles.category_list_active : ''}
            onClick={(event) => {
              const data = globalData.filter((e, i) => i < 3);
              setActive('all');
              setData(data);
            }}
          >
            All_Categories
          </li>
          <li
            className={active === 'entertainment' ? styles.category_list_active : ''}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              const data = globalData
                .filter((e, i) => e.category[0]?.catrgory.name === target.textContent)
                .filter((e, i) => i < 3);
              setActive('entertainment');
              setData(data);
            }}
          >
            Entertainment
          </li>
          <li
            className={active === 'lifestyle' ? styles.category_list_active : ''}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              const data = globalData
                .filter((e, i) => e.category[0]?.catrgory.name === target.textContent)
                .filter((e, i) => i < 3);
              setActive('lifestyle');
              setData(data);
            }}
          >
            Lifestyle
          </li>
          <li
            className={active === 'writing' ? styles.category_list_active : ''}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              const data = globalData
                .filter((e, i) => e.category[0]?.catrgory.name === target.textContent)
                .filter((e, i) => i < 3);
              setActive('writing');
              setData(data);
            }}
          >
            Writing
          </li>
          <li
            className={active === 'business' ? styles.category_list_active : ''}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              const data = globalData
                .filter((e, i) => e.category[0]?.catrgory.name === target.textContent)
                .filter((e, i) => i < 3);
              setActive('business');
              setData(data);
            }}
          >
            Business
          </li>
          <li
            className={active === 'food' ? styles.category_list_active : ''}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              const data = globalData
                .filter((e, i) => e.category[0]?.catrgory.name === target.textContent)
                .filter((e, i) => i < 3);
              setActive('food');
              setData(data);
            }}
          >
            Food
          </li>
        </ul>
        <CourseList data={data} />
      </Section>

      <SectionDichotomize
        title="Knock to Learn & Share"
        description="Learn anything you want at anytime, anywhere. Share anything you are passionate about."
        description2="Knock Knock Knock... Open your knowledge door now!"
        image="/image/section_image.png"
        // reverse={true}
      />
      <hr />
      <Section
        title={
          <>
            What our customer say<span className="dot">.</span>
          </>
        }
        padding_top={80}
        padding_bottom={32}
      >
        {reviewData.length !== 0 ? <CSReviewList datas={reviewData} /> : <NotFound name="review" />}
      </Section>
    </>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch(`${server}/courses/homepage/course/detail`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const courses: Course[] = await res.json();

//   return {
//     props: {
//       courses,
//     },
//   };
// };
