/* eslint-disable @next/next/no-img-element */

interface Props {
  title?: string | string[] | undefined;
  image: string;
}

const CourseListHeader = ({ title, image }: Props) => {
  return (
    <>
      <div className="CourseListHeader">
        <div>
          <div className="image">
            {image ? <img src={image} alt="" /> : <i className="bx bx-image" />}
          </div>
        </div>
        <div className="content">
          <p className="title">{title}</p>
          <p>
            Lorem ipsum dolor sit amet arcu duis integer. Blandit erat turpis luctus scelerisque sed
            iaculis euismod sodales volutpat condimentum dictum curabitur aliquam.
          </p>
        </div>
      </div>
      <style jsx>{`
        .CourseListHeader {
          display: flex;
          gap: 48px;
        }

        .CourseListHeader div {
          flex: 1;
        }

        .CourseListHeader .image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100px;
          font-size: 64px;
          background: #fff;
          box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
        }

        .CourseListHeader .image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: bottom;
        }

        .CourseListHeader .image i {
          color: #ccc;
        }

        .CourseListHeader .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 24px;
        }

        .CourseListHeader .content .title {
          color: #264653;
          font-size: 48px;
          font-weight: bold;
        }

        @media only screen and (max-width: 1024px) {
          .CourseListHeader .image {
            height: 138px;
          }
        }

        @media only screen and (max-width: 425px) {
          .CourseListHeader {
            flex-direction: column;
          }

          .CourseListHeader .content .title {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
};

export default CourseListHeader;
