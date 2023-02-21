/* eslint-disable @next/next/no-img-element */
import UserHeader from '@/components/user/UserHeader';
import { server } from '@/config';
import { useEffect, useState } from 'react';
import styles from '../../../styles/order.module.scss';
import Image from 'next/image';
import UserRouteGuard from '@/components/guard/UserRouteGuard';
import Link from 'next/link';
import NotFound from '@/components/layout/NotFound';
import moment from 'moment';
import Loader from "../../../components/layout/Loader";

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: Date;
  courseOrderDetails: OrderDetail[];
}

interface OrderDetail {
  id: number;
  course_price: number;
  course: Course;
}

interface Course {
  id: number;
  name: string;
  courseImage: string;
}

function Order() {
  const [data, setData] = useState<Order[]>([]);
    const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const getOrders = async () => {
      const resp = await fetch(`${server}/user/order`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const _data: Order[] = await resp.json();
      setData(_data);
    };
    if (data.length === 0) {
      getOrders();
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <Loader/>

  return (
    <UserRouteGuard>
      <>
        <UserHeader title="My Order" image="/image/order.png"></UserHeader>

        {data.length > 0 ? (
          <div className={styles.container}>
            {data
              .sort((a: any, b: any) => (a.id < b.id ? 1 : -1))
              .map((order) => (
                <div key={order.id} className={styles.order}>
                  <Link href={`/orderDetail/${order.id}`} className={styles.date_status}>
                    <div className={styles.date}>
                      <span>Created At</span>
                      <p>|</p>
                      <p>{moment(order.createdAt.toString()).format('LLL')}</p>
                    </div>
                    <div className={styles.status_block}>
                      <span className={styles.status}>Already Paid</span>
                    </div>
                  </Link>
                  {order.courseOrderDetails.map((detail) => (
                    <Link
                      href={`/course/${detail.course.id}`}
                      key={detail.id}
                      id={detail.id.toString()}
                      className={styles.order_list}
                    >
                      <div className={styles.image_name}>
                        <div className={styles.course_image}>
                          <img src={detail.course.courseImage} alt="" />
                        </div>
                        <span className={styles.name}>{detail.course.name}</span>
                      </div>
                      <div className={styles.price}>HKD${detail.course_price}</div>
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        ) : (
          <NotFound name="order" order />
        )}

        {/* <div className={styles.order}>
        <div className={styles.date_status}>
          <div className={styles.date}>Created At: 2023-01-20 | 0900</div>
          <div className={styles.status_block}>
            <span className={styles.status}>Already Paid</span>
          </div>
        </div>
        <div className={styles.order_list}>
          <div className={styles.image_name}>
            <img src="" />
            <span className={styles.name}>it</span>
          </div>
          <div className={styles.price}>HKD$400</div>
        </div>
      </div> */}

        {/* {data.length >= 0 ? (
            <>
              {data.map((e,i) => (

              ))}
            </>
          ) : (
            <></>
          )} */}
      </>
    </UserRouteGuard>
  );
}

export default Order;
