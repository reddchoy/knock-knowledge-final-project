interface Props {
  txt: string;
  hideTxt?: boolean;
  icon?: string;
  color?: string;
  reverse?: boolean;
  onButton?: () => void;
}

const Button = ({ txt, hideTxt, icon, color, onButton, reverse }: Props) => {
  return (
    <>
      <button onClick={onButton}>
        <span className={`txt ${hideTxt ? 'hideTxt' : ''} `}>{txt}</span>

        {icon && <i className={`bx ${icon}`} />}
      </button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: ${reverse ? 'row-reverse' : 'row'};
          padding: ${icon ? '12px 24px' : '16.5px 24px'};
          gap: 6px;

          border: none;
          background-color: ${color ? color : '#000'};

          cursor: pointer;

          ${hideTxt ? 'flex:1; justify-content:center;' : ''};
        }

        .txt {
          color: #fff;
          font-weight: bold;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        button:hover {
          opacity: 0.75;
        }

        i {
          color: #fff;
          font-size: 24px;
        }

        @media only screen and (max-width: 425px) {
          .hideTxt {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Button;
