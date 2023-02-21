/* eslint-disable react-hooks/exhaustive-deps */
import CourseDetail from '@/components/course/CourseDetail';
import styles from '../../styles/shoppingCart.module.scss';
import OrderDetail from '@/components/order/OrderDetail';
import { FormEvent, useEffect, useState } from 'react';
import { server } from '../../config';
import UserRouteGuard from '@/components/guard/UserRouteGuard';
import NotFound from '@/components/layout/NotFound';
import Button from '@/components/layout/Button';
import UserHeader from '@/components/user/UserHeader';
import { toast } from 'react-hot-toast';
import Loader from '../../components/layout/Loader';

interface orderDetails {
  id: number;
  username: string;
}
interface cart {
  id: string;
  courseId: number;
  image: string;
  status: string;
  name: string;
  currentPrice: number;
  duration: number;
  videoNumber: number;
  classmate: number;
}

interface Props {
  refreshCounter: (e: boolean) => void;
}

function ShoppingCart({ refreshCounter }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  let [promocode, setPromoCode] = useState('');
  let [cart, setCart] = useState<cart[]>([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [discountedPrice, setDiscountedPrice] = useState(0);
  const [promoMsg, setPromoMsg] = useState<string>();

  const delFalseRedeemCoupon = async () => {
    const resp = await fetch(`${server}/user/redeem/coupon`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await resp.json();
  };

  const onDelete = async (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const resp = await fetch(`${server}/user/shoppingCart/delete/${target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await resp.json();

    const resp2 = await fetch(`${server}/user/cart/courses`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    cart = await resp2.json();

    if (cart) {
      setCart(cart);
      getOrderDetails(cart);
      refreshCounter(true);
    }
  };

  const onCheckout = async () => {
    const coupon = {
      promocode: promocode,
    };
    const resp = await fetch(`${server}/user/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(coupon),
    });
    const data = await resp.json();
    if (data.statusCode === 400) {
      toast.error(data.message);
      return;
    }
    window.location = data.paymentUrl;
  };

  const useCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coupon = {
      promocode: code,
    };
    const resp = await fetch(`${server}/user/redeem/coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(coupon),
    });
    const data = await resp.json();
    if (data.statusCode === 400) {
      return setPromoMsg(data.message);
    }
    setPromoCode(data.coupon.promocode);
    setDiscount(data.coupon.discountAmount);
    setDiscountedPrice(totalPrice - data.coupon.discountAmount);
    setPromoMsg('');
  };

  const getCart = async () => {
    setLoading(true);
    const resp = await fetch(`${server}/user/cart/courses`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    cart = await resp.json();
    setCart(cart);
    setLoading(false);
    getOrderDetails(cart);
  };

  const getOrderDetails = async (cart: any[]) => {
    if (cart.length === 0) {
      setTotalPrice(0);
      setDiscountedPrice(0);
    } else if (!!cart && cart.length > 0) {
      totalPrice = 0;
      cart.forEach((e) => {
        totalPrice += e.currentPrice;
        setTotalPrice(totalPrice);
      });
      setDiscountedPrice(totalPrice - discount);
    }
    // setDiscountedPrice(totalPrice - discount);
  };

  useEffect(() => {
    getCart();
    delFalseRedeemCoupon();
  }, []);

  useEffect(() => {}, [cart]);

  if (isLoading) return <Loader />;

  return (
    <UserRouteGuard>
      <div className={styles.cart}>
        <UserHeader title="Shopping Cart" image="/image/cart.png" />

        <div>
          {!!cart && cart.length > 0 ? (
            <>
              <div className={styles.courses}>
                {cart.map((e) => (
                  <CourseDetail
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    classmate={e.classmate}
                    videoNumber={e.videoNumber}
                    duration={e.duration}
                    currentPrice={e.currentPrice}
                    status={e.status}
                    image={e.image}
                    courseId={e.courseId}
                    onDelete={onDelete}
                    deleteBtn={true}
                  ></CourseDetail>
                ))}
              </div>

              <hr />

              <section>
                <div className={styles.discount}>
                  <div className={styles.discount_title}>
                    <i className="bx bxs-purchase-tag-alt"></i>
                    <p>Discount / Promo Code</p>
                  </div>
                  <form onSubmit={useCoupon} className={styles.discount_code}>
                    <div>
                      <input
                        type="text"
                        value={code}
                        name="promocode"
                        placeholder="promo code"
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <Button txt="enter" color="#2A9D8F" />
                    </div>
                    {promoMsg && <p>{promoMsg}</p>}
                  </form>
                </div>
              </section>

              <hr />

              <section>
                <OrderDetail
                  totalPrice={totalPrice}
                  discountedPrice={discountedPrice}
                  discount={discount}
                  onCheckout={onCheckout}
                  checkoutBtn={true}
                ></OrderDetail>
              </section>
            </>
          ) : (
            <NotFound name="course" cart />
          )}
        </div>
      </div>
    </UserRouteGuard>
  );
}

export default ShoppingCart;
