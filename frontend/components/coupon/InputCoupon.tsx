// import styles from '../styles/InputCoupon.module.scss';
// import Image from 'next/image';
// import picture from '../public/image/banner_1.jpg';
// import { FormEvent, ReactNode, useState } from 'react';
// import { json } from 'stream/consumers';

interface Props {
  title: String;
  redeemArea?: boolean;
}
function InputCoupon(props: Props) {
  // const [code, setCode] = useState('');
  // const onRedeem = async (event: any) => {
  //   event.preventDefault();
  //   const data = {
  //     promocode: event.target.promocode.value,
  //   };
  //   const data2 = JSON.stringify(data);
    // const resp = await fetch("http://localhost:8080/user/abc", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf8',
    //   },
    //   body: JSON.stringify(data)
    // })
  // };

  return (
    <>
      {/* <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>{props.title}</h1>
          {props.redeemArea ? (
            <form onSubmit={onRedeem}>
              <input
                type="text"
                id="promocode"
                placeholder="Input coupon code"
                name="promocode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <button type="submit" className="redeemBtn">
                REDEEM
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.image}>
          <Image src={picture} alt="" width={150} height={150} />
        </div>
      </div> */}
    </>
  );
}

export default InputCoupon;
