import Meta from '@/components/layout/Meta';
import { Article } from '../../models/Article';
import ArticleList from '@/components/article/ArticleList';
import { server } from '../../config';
import useSWR from 'swr';
import Loader from "../../components/layout/Loader";
import NotFound from "@/components/layout/NotFound";

const fetcher = (...args: [string]) =>
  fetch(...args, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const Article = () => {
  const { data, error } = useSWR<Article[], any>(`${server}/articles`, fetcher);

  if (error) return <NotFound name="Article" />
  if (!data) return <Loader/>

  return (
    <>
      <Meta title="Knock Knowledge - Article" />
      <h1>Article</h1>
      <ArticleList datas={data} />

      <style jsx>{`
        h1 {
          font-size: 48px;
          margin-bottom: 48px;
          color: #264653;
        }

        @media only screen and (max-width: 425px) {
          h1 {
            font-size: 32px;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Article;
