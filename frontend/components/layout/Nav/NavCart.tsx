import Link from 'next/link';

interface Props {
  count?: string;
}

const NavCart = ({ count }: Props) => {
  const showCount = Number(count) !== 0;

  return (
    <>
      <div className="nav_cart">
        <Link href={'/shoppingCart'}>
          <i className="bx bxs-shopping-bags" />
        </Link>
        {showCount && <div className="nav_cart_count">{count}</div>}
      </div>
      <style jsx>{`
        .nav_cart {
          position: relative;
        }

        .nav_cart i {
          font-size: 24px;
          padding: 36px 24px;
          cursor: pointer;
        }

        .nav_cart i:hover {
          opacity: 0.75;
        }

        .nav_cart_count {
          position: absolute;
          bottom: 24px;
          right: 0;

          width: 24px;
          height: 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 8px;
          color: #fff;
          background: #f4a261;
          border-radius: 100%;
        }

        @media only screen and (max-width: 425px) {
          .nav_cart i {
            padding: 36px 0 36px 22px;
          }

          .nav_cart_count {
            bottom: 12px;
            right: 2px;

            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </>
  );
};
export default NavCart;
