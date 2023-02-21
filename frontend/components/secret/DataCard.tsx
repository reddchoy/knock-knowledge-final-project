interface Props {
  count: number;
  title: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const DataCard = ({ count, title, icon, color, onClick }: Props) => {
  return (
    <>
      <div onClick={onClick}>
        <header>{count}</header>
        <footer>
          <i className={`bx ${icon}`} />
          {title}
        </footer>
      </div>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          width: 100%;
          height: 240px;
          padding: 24px;

          background: ${color ? color : '#fff'};
          cursor: pointer;
        }

        div:hover {
          opacity: 0.75;
        }

        header {
          color: #fff;
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        footer {
          display: flex;
          flex-direction: column;
          gap: 12px;

          color: #fff;
          font-size: 24px;
          font-weight: bold;
        }

        footer i {
          align-self: flex-start;
          padding: 12px;
          font-size: 24px;
          background: #fff;
          border-radius: 100%;
        }

        @media only screen and (max-width: 425px) {
          div {
            flex: 1 1 40%;
            flex-direction: column-reverse;
            gap: 12px;
            height: auto;
          }

          header {
            font-size: 28px;
            text-align: center;
          }

          footer {
            flex-direction: row;
            align-items: center;
            font-size: 18px;
          }

          footer i {
            padding: 8px;
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default DataCard;
