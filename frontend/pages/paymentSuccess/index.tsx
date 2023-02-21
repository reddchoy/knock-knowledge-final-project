/* eslint-disable react-hooks/exhaustive-deps */
import CourseDetail from '@/components/course/CourseDetail';
import NotFound from '@/components/layout/NotFound';
import OrderDetail from '@/components/order/OrderDetail';
import OrderDetailHeader from '@/components/order/OrderDetailHeader';
import UserRouteGuard from '@/components/guard/UserRouteGuard';
import { server } from '@/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from "../../components/layout/Loader";

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

interface Props {
  refreshCounter: (e: boolean) => void;
}

function PaymentSuccess({ refreshCounter }: Props) {
  const [isLoading, setLoading] = useState(false)
  const [_data, setData] = useState<{ message: string; data: any }>();
  const [sessionId, setSessionId] = useState<string | string[] | undefined>('');
  let [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  let [actualPrice, setActualPrice] = useState(0);
  const router = useRouter();
  const { session_id } = router.query;
  useEffect(() => {
    setSessionId(session_id);
    if (!!sessionId) {
      paymentSuccess(sessionId);
    }
  }, [sessionId, session_id]);

  const paymentSuccess = async (query: string | string[] | undefined) => {
    setLoading(true)
    const resp = await fetch(`${server}/user/order/success/?session_id=${query}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await resp.json();
    setData(data);
    const resp2 = await fetch(`${server}/user/order/orderDetail/${data.orderId}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    orderDetail = await resp2.json();
    orderDetail.forEach((e) => {
      e.orderTime = e.orderTime.split('T')[0];
    });
    actualPrice = orderDetail[0].totalAmount + orderDetail[0].discountAmount;
    setActualPrice(actualPrice);
    setOrderDetail(orderDetail);
    refreshCounter(true);
    setLoading(false)
  };

  if (isLoading) return <Loader/>

  return (
    // <span>
    // {!!_data? <div> {JSON.stringify(_data.message)}</div>:<div></div>}
    // </span>
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
            <NotFound name="order detail" full />
          </>
        )}
      </>
    </UserRouteGuard>
  );
}

export default PaymentSuccess;
