import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminRouteGuard from '../../components/guard/AdminRouteGuard';
import DataList from '@/components/secret/DataList';
import DataCard from '@/components/secret/DataCard';
import { server } from '@/config';
import NotFound from '@/components/layout/NotFound';
import Loader from "../../components/layout/Loader";

const Secret = () => {
  const [isLoading, setLoading] = useState(false)

  const getCourse = async () => {
    setLoading(true)
    const coursesRes = await fetch(`${server}/admin/course`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (coursesRes.status === 200) {
      const courses = await coursesRes.json();
      setCourses(courses);
      setTable('Course');

      setData(courses.data);
      setLoading(false)
    } else {
      setCourses(null);
      setLoading(false)
    }
  };

  const getArticles = async () => {
    setLoading(true)
    const articlesRes = await fetch(`${server}/admin/article`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (articlesRes.status === 200) {
      const articles = await articlesRes.json();
      setArticles(articles);
      setLoading(false)
    } else {
      setArticles(null);
      setLoading(false)
    }
  };

  const getUsers = async () => {
    setLoading(true)
    const usersRes = await fetch(`${server}/admin/user`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (usersRes.status === 200) {
      const users = await usersRes.json();
      users.data.map((e: any) => delete e.password);
      setUsers(users);
      setLoading(false)
    } else {
      setUsers(null);
      setLoading(false)
    }
  };

  const getOrders = async () => {
    setLoading(true)
    const ordersRes = await fetch(`${server}/admin/order`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (ordersRes.status === 200) {
      const orders = await ordersRes.json();
      setOrders(orders);
      setLoading(false)
    } else {
      setOrders(null);
      setLoading(false)
    }
  };

  const [courses, setCourses] = useState<any>();
  const [articles, setArticles] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [orders, setOrders] = useState<any>();

  const [table, setTable] = useState('');
  const [data, setData] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    switch (table) {
      case 'Course':
        getCourse();
        break;
      case 'Article':
        getArticles();
        break;
      case 'User':
        getUsers();
        break;
      case 'Order':
        getOrders();
        break;
      default:
        getCourse();
        getArticles();
        getUsers();
        getOrders();
        break;
    }
  }, [table, refresh]);

  useEffect(() => {
    switch (table) {
      case 'Article':
        articles && setData(articles !== null ? articles && articles.data : null);
        break;
      case 'User':
        users && setData(users !== null ? users && users.data : null);
        break;
      case 'Order':
        orders && setData(orders !== null ? orders && orders.data : null);
        break;
      default:
        courses && setData(courses !== null ? courses && courses.data : null);
        break;
    }
  }, [table, courses, articles, users, orders]);

  if (isLoading) return <Loader/>

  return (
    <>
      <AdminRouteGuard>
        <header>
          <div className="title">Secret Room</div>
          <div className="board">
            <DataCard
              count={courses !== null ? courses && courses.data.length : 0}
              title="Course"
              icon="bxs-videos"
              color="#264653"
              onClick={() => {
                setTable('Course');
                setData(courses !== null ? courses && courses.data : null);
              }}
            />
            <DataCard
              count={articles !== null ? articles && articles.data.length : 0}
              title="Article"
              icon="bxs-file"
              color="#E76F51"
              onClick={() => {
                setTable('Article');
                setData(articles !== null ? articles && articles.data : null);
              }}
            />
            <DataCard
              count={orders !== null ? orders && orders.data.length : 0}
              title="Order"
              icon="bxs-credit-card"
              color="#2A9D8F"
              onClick={() => {
                setTable('Order');
                setData(orders !== null ? orders && orders.data : null);
              }}
            />
            <DataCard
              count={users !== null ? users && users.data.length : 0}
              title="User"
              icon="bxs-user"
              color="#F4A261"
              onClick={() => {
                setTable('User');
                setData(users !== null ? users && users.data : null);
              }}
            />
          </div>
        </header>
        <section>
          {data ? (
            <DataList
              table={table}
              data={data}
              refresh={(table) => {
                setRefresh(!refresh);
                setTable('');
                setTable(table);
              }}
            />
          ) : (
            <>
              <NotFound name={table} full />
            </>
          )}
        </section>
      </AdminRouteGuard>
      <style jsx>{`
        header {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .title {
          font-size: 48px;
          font-weight: bold;
          color: #264653;
        }

        header .board {
          display: flex;
          justify-content: space-between;
          gap: 24px;
        }

        header ul {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        header ul li {
          padding: 16px 0;
          cursor: pointer;
        }

        header ul li:hover {
          color: #666;
        }

        @media only screen and (max-width: 425px) {
          header {
            gap: 24px;
          }

          .title {
            font-size: 36px;
            font-weight: bold;
          }

          header .board {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
};

export default Secret;
