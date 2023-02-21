/* eslint-disable @next/next/no-img-element */
import { Article } from '../../models/Article';
import styles from '../../styles/ArticleList.module.scss';
import Link from 'next/link';

interface Props {
  datas: Article[];
}


const ArticleList = (props: Props) => {


  return (
    <div className={styles.articleList}>
      {props.datas.map((article: Article) => (
        <div className={styles.articleCard} key={article.id}>
          <div className={styles.cardContainer}>
            <Link href={`/article/${article.id}`}>
              <div className={styles.imgContainer}>
                <div className={styles.articleImg}>
                  <img
                    src={article.coverImage}
                    alt={article.coverImage}
                    className={styles.imgResize}
                  />
                </div>
              </div>
            </Link>
            <div className={styles.nameBookmarkContainer}>
              <div className={styles.articleName}>{article.title}</div>
              {/* <div className={styles.bookmarkContainer}>
                <i className="bx bx-bookmark-alt" id={styles.bookmarkBtn} />
              </div> */}
            </div>
            <div className={styles.ownerDateContainer}>
              <div className={styles.ownerIconContainer}>
                <div className={styles.ownerIcon}>
                  {article.owner.userProfiles[0].icon ? (
                    <img
                      className={styles.iconResize}
                      src={article.owner.userProfiles[0].icon}
                      alt=""
                    />
                  ) : (
                    <i className="bx bx-user" id={styles.defaultIcon} />
                  )}
                </div>
                <div className={styles.ownerName}>
                  {article.owner.userProfiles[0].name
                    ? article.owner.userProfiles[0].name
                    : article.owner.username}
                </div>
              </div>

              <div className="post-date">
                <small className={styles.postDate}>{article.createdAt.slice(0, 10)}</small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
