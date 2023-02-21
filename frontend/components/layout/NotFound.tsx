import router from 'next/router';
import Button from './Button';

interface Props {
  name: string;
  full?: boolean;
  cart?: boolean;
  order?: boolean;
  review?: boolean;
}

const NotFound = ({ name, full, cart, order, review }: Props) => {
  return (
    <>
      <div className="empty">
        {cart ? (
          <div className="cart">
            <p>shopping cart is empty</p>
            <Button txt="continue shopping" color="#F4A261" onButton={() => router.push('/')} />
          </div>
        ) : order || review ? (
          <>no {name} record</>
        ) : (
          <>can&apos;t find {name} data</>
        )}
      </div>
      <style jsx>{`
        .empty {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: ${cart ? '72px 0 120px' : '120px 0'};
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          height: ${full ? '60vh' : 'auto'};
        }

        .cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cart p {
          color: #999;
        }
      `}</style>
    </>
  );
};

export default NotFound;
