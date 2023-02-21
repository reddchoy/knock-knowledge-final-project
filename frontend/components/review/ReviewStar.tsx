interface Props {
  rating: number;
}

const ReviewStar = ({ rating }: Props) => {
  return (
    <>
      <div className="reviewStar">
        <i className={rating >= 1 ? 'bx bxs-star' : 'bx bx-star'} />
        <i className={rating >= 2 ? 'bx bxs-star' : 'bx bx-star'} />
        <i className={rating >= 3 ? 'bx bxs-star' : 'bx bx-star'} />
        <i className={rating >= 4 ? 'bx bxs-star' : 'bx bx-star'} />
        <i className={rating >= 5 ? 'bx bxs-star' : 'bx bx-star'} />
      </div>

      <style jsx>{`
        .reviewStar {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .bxs-star {
          color: #f4a261;
        }

        .bx-star {
          color: #ccc;
        }
      `}</style>
    </>
  );
};

export default ReviewStar;
