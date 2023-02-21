import styles from '../../styles/OrderDetail.module.scss';
import Button from '../layout/Button';

interface Props {
  totalPrice: number;
  discountedPrice: number;
  discount: number;
  onCheckout?: () => void;
  checkoutBtn: boolean;
}

function OrderDetail(props: Props) {
  return (
    <>
      <div className={styles.order_detail}>
        <div className={styles.left}>
          <i className="bx bxs-cart-alt" />
          <div className={styles.content}>
            <p>Order Details</p>
            <div>
              <span>Order</span>
              <span>${props.totalPrice}</span>
            </div>
            {props.discount > 0 && (
              <div className={styles.discount}>
                <span>Discount</span>
                <span>-${props.discount}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <p>Total</p>
          {!!props.discountedPrice && !isNaN(props.discountedPrice) ? (
            <div className={styles.price}>HKD${props.discountedPrice}</div>
          ) : (
            <div className={styles.price}>HKD$ 0</div>
          )}
          {props.checkoutBtn ? (
            <Button
              txt="checkout"
              icon="bx-right-arrow-alt"
              color="#264653"
              onButton={props.onCheckout}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
export default OrderDetail;
