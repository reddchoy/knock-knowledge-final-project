import styles from '../../styles/OrderDetailHeader.module.scss';
interface Props {
  status: string;
  orderTime: string;
  receiptNum: number;
}

function OrderDetailHeader(props: Props) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.title}>Order Detail</div>
          <div className={styles.status_block}>
            <div className={styles.status}>{props.status}</div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.order_time}>{props.orderTime}</div>
          <div className={styles.receiptNum}>#000000000{props.receiptNum}</div>
          <i className="bx bxs-copy-alt" />
        </div>
      </div>
    </>
  );
}

export default OrderDetailHeader;
