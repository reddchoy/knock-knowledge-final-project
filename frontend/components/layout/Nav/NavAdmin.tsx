import Link from 'next/link';

const NavAdmin = () => {
  return (
    <>
      <Link href={'/secret'}>
        <i className="bx bxs-castle" />
      </Link>
      <style jsx>{`
        i {
          font-size: 24px;
          padding: 36px 24px;
          cursor: pointer;
        }
        i:hover {
          opacity: 0.75;
        }
      `}</style>
    </>
  );
};

export default NavAdmin;
