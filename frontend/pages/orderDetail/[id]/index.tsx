import CourseDetail from '@/components/course/CourseDetail';
import NotFound from '@/components/layout/NotFound';
import OrderDetail from '@/components/order/OrderDetail';
import OrderDetailHeader from '@/components/order/OrderDetailHeader';
import UserRouteGuard from '@/components/guard/UserRouteGuard';
import { server } from '@/config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from "../../../components/layout/Loader";

interface OrderDetail {
  id: number;
  classmate: number;
  currentPrice: number;
  discountAmount: number;
  totalAmount: number;
  duration: number;
  image: string;
  name: string;
  orderTime: string;
  receiptNumber: number;
  courseStatus: string;
  orderStatus: string;
  videoNumber: number;
}

function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false)
  const [param, setParm] = useState<string | string[] | undefined>('');
  let [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  let [actualPrice, setActualPrice] = useState(0);

  const getOrderDetails = async () => {
    setLoading(true)
    const resp2 = await fetch(`${server}/user/order/orderDetail/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    orderDetail = await resp2.json();
    if (orderDetail.length !== 0) {
      orderDetail.forEach((e) => {
        e.orderTime = e.orderTime.split('T')[0];
      });
      actualPrice = orderDetail[0].totalAmount + orderDetail[0].discountAmount;
      setActualPrice(actualPrice);
      setOrderDetail(orderDetail);
      setLoading(false)
    }
  };
  useEffect(() => {
    setParm(id);
    if (id) {
      getOrderDetails();
    }
  }, [id]);

  if (isLoading) return <Loader/>
  
  return (
    <UserRouteGuard>
      <>
        {orderDetail[0] ? (
          <>
            <OrderDetailHeader
              status={orderDetail[0].orderStatus}
              receiptNum={orderDetail[0].receiptNumber}
              orderTime={orderDetail[0].orderTime}
            ></OrderDetailHeader>

            <main>
              {orderDetail.map((e) => (
                <CourseDetail
                  key={e.id}
                  image={e.image}
                  status={e.courseStatus}
                  name={e.name}
                  duration={e.duration}
                  videoNumber={e.videoNumber}
                  classmate={e.classmate}
                  currentPrice={e.currentPrice}
                  deleteBtn={false}
                ></CourseDetail>
              ))}
            </main>

            <hr />

            <section>
              <OrderDetail
                discountedPrice={orderDetail[0].totalAmount}
                discount={orderDetail[0].discountAmount}
                totalPrice={actualPrice}
                checkoutBtn={false}
              ></OrderDetail>
            </section>

            <style jsx>{`
              main {
                display: flex;
                flex-direction: column;
                gap: 60px;
              }

              section,
              hr {
                margin-top: 60px;
              }
            `}</style>
          </>
        ) : (
          <>
            <NotFound name="order detail" />
          </>
        )}
      </>
    </UserRouteGuard>
  );
}

export default OrderDetails;
