import { server } from '@/config';
import { useForm } from 'react-hook-form';
import Button from '../layout/Button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CSReviewForm = () => {
  const router = useRouter();
  const courseId = router.query.id;

  const {
    handleSubmit: handleReviewSubmit,
    register: reviewReg,
    setError: setReviewError,
    reset,
    formState: { errors: reviewErrors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <>
      <form
        onSubmit={handleReviewSubmit(async (data) => {
          const res = await fetch(`${server}/courses/review/create/${courseId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
          });

          if (res.status !== 201) {
            setReviewError('content', { message: '"Can not post to server"' });
            return;
          }

          const result = await res.json();
          router.reload();
          return { message: 'created!!!' };
        })}
      >
        <div className="review-form">
          <div className="review-form-title">
            <p>
              <i className="bx bxs-edit-alt" />
              Leave Your Review
            </p>
            <div className="review-form-star">
              <input
                {...reviewReg('courseRating', { required: true })}
                type="radio"
                value="5"
                id="review-rating-5"
              />
              <label htmlFor="review-rating-5"></label>
              <input
                {...reviewReg('courseRating', { required: true })}
                type="radio"
                value="4"
                id="review-rating-4"
              />
              <label htmlFor="review-rating-4"></label>
              <input
                {...reviewReg('courseRating', { required: true })}
                type="radio"
                value="3"
                id="review-rating-3"
              />
              <label htmlFor="review-rating-3"></label>
              <input
                {...reviewReg('courseRating', { required: true })}
                type="radio"
                value="2"
                id="review-rating-2"
              />
              <label htmlFor="review-rating-2"></label>
              <input
                {...reviewReg('courseRating', { required: true })}
                type="radio"
                value="1"
                id="review-rating-1"
              />
              <label htmlFor="review-rating-1"></label>
            </div>
          </div>

          <textarea
            id="review-content"
            className="review-form-input"
            rows={5}
            cols={100}
            {...reviewReg('content', { required: true })}
          />
          {reviewErrors.content && reviewErrors.content.type === 'required' && (
            <span className="error-msg">Content is required to fill!</span>
          )}  

          {reviewErrors.courseRating && reviewErrors.courseRating.type === 'required' && (
            <span className="error-msg">Rating star is required to select!</span>
          )}
          <Button txt="submit" />
        </div>

        {/* <label htmlFor="review-rating" className="rating-select">
            Rating:
          </label>

          <select id="review-rating" {...reviewReg('courseRating', { required: true })}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> */}
      </form>

      <style jsx>{`
        .review-form {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 36px;
        }

        .review-form-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .review-form-title p {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: bold;
          gap: 12px;
        }

        .review-form-star {
          float: left;
        }
        .review-form-star:not(:checked) > input {
          display: none;
        }
        .review-form-star:not(:checked) > label {
          float: right;
          width: 1em;
          margin: 0 4px;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          font-size: 18px;
          color: #ccc;
        }
        .review-form-star:not(:checked) > label:before {
          content: '☆';
        }

        .review-form-star > input:checked ~ label:before {
          content: '★';
        }

        .review-form-star > input:checked ~ label {
          color: #f4a261;
        }
        .review-form-star:not(:checked) > label:hover:before,
        .review-form-star:not(:checked) > label:hover ~ label:before {
          content: '★';
        }

        .review-form-star:not(:checked) > label:hover,
        .review-form-star:not(:checked) > label:hover ~ label {
          color: #f4a261;
        }
        .review-form-star > input:checked + label:hover,
        .review-form-star > input:checked + label:hover ~ label,
        .review-form-star > input:checked ~ label:hover,
        .review-form-star > input:checked ~ label:hover ~ label,
        .review-form-star > label:hover ~ input:checked ~ label {
          color: #f4a261;
        }

        .review-form-input {
          width: 100%;
          outline: none;
          border: 0;
          padding: 24px;
          font-size: 16px;
        }

        .error-msg {
          color: #e76f51;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default CSReviewForm;
