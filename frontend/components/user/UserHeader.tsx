/* eslint-disable @next/next/no-img-element */
interface Props {
  title: string;
  image: string;
}

const UserHeader = ({ title, image }: Props) => {
  return (
    <>
      <div className="header">
        <div className="title">{title}</div>
        <img src={image} alt={`${title}-image`} />
      </div>

      <style jsx>{`
        .header {
          margin: -24px -24px 0;
          padding: 48px;

          display: flex;
          justify-content: space-between;
        }

        .header img {
          width: 20%;
          height: auto;
        }

        .title {
          font-size: 48px;
          font-weight: bold;
          color: #264653;
        }

        @media only screen and (max-width: 425px) {
          .header {
            padding: 24px;
          }

          .title {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
};

export default UserHeader;
