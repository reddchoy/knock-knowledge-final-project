import InputCoupon from '@/components/coupon/InputCoupon';
import Coupon from '@/components/coupon/Coupon';
import UserRouteGuard from '@/components/guard/UserRouteGuard';

function myCoupon() {
  // const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   fetch('http://localhost:8080/user/redeem/coupon')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  // }, [])

  //data for test
  const data = [
    {
      id: 13,
      isUsed: false,
      coupon: {
        id: 17,
        promocode: 'gg',
        name: 'dead',
        discountAmount: 100,
        startAt: '1998-12-31T16:00:00.000Z',
        endAt: '3332-12-31T16:00:00.000Z',
        isActive: true,
      },
    },
    {
      id: 14,
      isUsed: false,
      coupon: {
        id: 18,
        promocode: 'hi',
        name: 'newUser',
        discountAmount: 50,
        startAt: '1998-12-31T16:00:00.000Z',
        endAt: '3332-12-31T16:00:00.000Z',
        isActive: true,
      },
    },
    {
      id: 15,
      isUsed: true,
      coupon: {
        id: 19,
        promocode: '88',
        name: '898',
        discountAmount: 20,
        startAt: '1998-12-31T16:00:00.000Z',
        endAt: '3332-12-31T16:00:00.000Z',
        isActive: false,
      },
    },
  ];
  return (
    <UserRouteGuard>
      <>
        <div className="container">
          <InputCoupon title={'My Coupon'} redeemArea={true}></InputCoupon>
        </div>
        <div className="container2">
          <span>Usable</span>
          <span>Used</span>
          <span>Invalid</span>
        </div>
        <div className="coupons">
          {data.map((e) => (
            <Coupon
              key={e.id}
              name={e.coupon.name}
              price={e.coupon.discountAmount}
              promocode={e.coupon.promocode}
              endDate={e.coupon.endAt}
            ></Coupon>
          ))}
        </div>
      </>
    </UserRouteGuard>
  );
}

export default myCoupon;
