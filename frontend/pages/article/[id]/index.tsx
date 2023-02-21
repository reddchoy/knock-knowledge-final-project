/* eslint-disable @next/next/no-img-element */
import Meta from '../../../components/layout/Meta';
import styles from '../../../styles/ArticleDetails.module.scss';
import { server, url } from '../../../config';
import { Article } from '../../../models/Article';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NotFound from '../../../components/layout/NotFound';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Loader from "../../../components/layout/Loader";

const fetcher = (...args: [string]) =>
  fetch(...args, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const ArticleDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: articleData, error } = useSWR<Article, any>(
    id ? `${server}/articles/details/${id}` : null,
    fetcher
  );
  if (error) return <NotFound name="Article" />
  if (!articleData) return <Loader/>

  // const [articleData, setArticleData] = useState<Article>();

  // useEffect(() => {
  //   const getArticleData = async () => {
  //     const res = await fetch(`${server}/articles/details/${id}`);

  //     const data = await res.json();
  //     if (data) {
  //       setArticleData(data);

  //     }
  //   };
  //   if (id) {
  //     getArticleData();
  //   }
  // }, [id]);

  return (
    <>
      {articleData ? (
        <>
          <Meta title={`Knock Knowledge - Article #${articleData.id}`} />

          <div>
            <div className={styles.detailsContailer}>
              <div className={styles.detailsInfo}>
                <div className={styles.postDate}>{articleData.createdAt.slice(0, 10)}</div>
                <div className={styles.articleTitle}>{articleData.title}</div>
                <div className={styles.ownerContainer}>
                  <div className={styles.ownerIcon}>
                    {articleData.owner.userProfiles ? (
                      <img
                        src={articleData.owner.userProfiles[0].icon}
                        alt=""
                        className={styles.iconResize}
                      />
                    ) : (
                      <i className="bx bx-user" id={styles.defaultIcon} />
                    )}
                  </div>
                  <div className={styles.ownerName}>{articleData.owner.username}</div>
                </div>
              </div>
              <div className={styles.imgContainer}>
                <div className={styles.articleImg}>
                  <img
                    src={articleData.coverImage}
                    alt={articleData.coverImage}
                    className={styles.imgResize}
                  />
                </div>
              </div>
            </div>

            <div className={styles.articleContent}>
              <ReactMarkdown className="reactMarkDown" remarkPlugins={[remarkGfm]}>
                {articleData.content}
              </ReactMarkdown>
            </div>

            <div className={styles.sharingContainer}>
              <div className={styles.sharingText}>Share this article</div>
              <div className={styles.btnContainer}>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url + router.asPath}`}
                  target="_blank"
                >
                  <i className="bx bxl-facebook" id={styles.actionBtn} />
                </Link>
                <Link
                  href={`https://wa.me/?text=I want to share Knock Knowledge. for you.
                  ${url + router.asPath}`}
                  target="_blank"
                >
                  <i className="bx bxl-whatsapp" id={styles.actionBtn} />
                </Link>
                <Link
                  href={`https://telegram.me/share/url?url=I want to share Knock Knowledge. for you.
                  ${url + router.asPath}`}
                  target="_blank"
                >
                  <i className="bx bxl-telegram" id={styles.actionBtn} />
                </Link>

                {/* <i className="bx bx-bookmark-alt" id={styles.actionBtn}></i> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotFound name="article" full />
      )}
    </>
  );
};

export default ArticleDetails;
