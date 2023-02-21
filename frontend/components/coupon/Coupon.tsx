import styles from '../styles/Coupon.module.scss';

interface Props {
  name: String;
  price: number;
  promocode: String;
  endDate: String;
}

function Coupon(props: Props) {
  return (
    <></>
    // <div className={styles.coupon}>
    //   <div className={styles.left}>
    //     <h1 className={styles.coupon_name}>{props.name}</h1>
    //     <div className={styles.bottom}>
    //       <div className={styles.nav_logo}>
    //         <i className="bx bxs-door-open" />
    //         <span>
    //           Knock Knowledge<span className="dot">.</span>
    //         </span>
    //       </div>
    //       <h1 className="price">${props.price}</h1>
    //     </div>
    //   </div>
    //   <div className={styles.right}>
    //     <span>CODE</span>
    //     <div id="promocode">{props.promocode}</div>
    //     <span>VALID UNTIL</span>
    //     <div id="end-date">{props.endDate}</div>
    //   </div>
    // </div>
  );
}

export default Coupon;
