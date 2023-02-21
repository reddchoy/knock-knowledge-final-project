import Image from 'next/image';
import Button from '@/components/layout/Button';
import { useForm } from 'react-hook-form';
import { server } from '@/config';
import { useCallback, useEffect, useState } from 'react';
import UserRouteGuard from '@/components/guard/UserRouteGuard';
import Loader from '@/components/layout/Loader';

import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const OpenCourseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit: handleCourseSubmit,
    register: courseReg,
    setError: setCourseError,
    setValue,
    reset,

    formState: { errors: courseErrors, isSubmitSuccessful },
  } = useForm();

  const [md, setMD] = useState('');

  const onChange = useCallback((value: string) => {
    setMD(value);
  }, []);

  useEffect(() => {
    setValue('longDescription', md);
  }, [setValue, md]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserRouteGuard>
      <div>
        <header>
          <h1>Open Course</h1>
          <Image width={200} height={200} src="/image/openCourse_form_1.png" alt="" />
        </header>
        <form
          onSubmit={handleCourseSubmit(async (data) => {
            setIsLoading(true);

            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('sellingPrice', data.sellingPrice);
            formData.append('courseTotalDuration', data.courseTotalDuration);
            formData.append('longDescription', data.longDescription);
            formData.append('shortDescription', data.shortDescription);
            formData.append('catrgoryId', data.catrgoryId);
            formData.append('courseIntroVideo', data.courseIntroVideo[0]);
            formData.append('courseImage', data.courseImage[0]);

            const res = await fetch(`${server}/courses/create`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
            });
            if (res.status === 400) {
              toast.error('You must enter number to selling price or duration !');
              setIsLoading(false);
              return;
            }
            if (res.status !== 201) {
              // setCourseError('courseIntroVideo', { message: 'Fail to submit the form' });
              toast.error('Fail to submit the form !');
            }
            if (res.status === 201) {
              const result = await res.json();
              toast.success('Open Course Success !');
              setIsLoading(false);
              router.push('/');
            }
          })}
        >
          {/* <section>
          <h2>Step 1. Choose the Mode</h2>
          <div className="step1_option">
            <input type="radio" id="step_1" name="step_1" />
            <label htmlFor="step_1">
              <h3>Fundraising</h3>
              <p>
                Components are elements you can reuse across your designs. They help to create and
                manage consistent designs across projects.
              </p>
            </label>
            <input type="radio" id="step_2" name="step_1" />
            <label htmlFor="step_2">
              <h3>Available immediately</h3>
              <p>
                Components are elements you can reuse across your designs. They help to create and
                manage consistent designs across projects.
              </p>
            </label>
          </div>
        </section>
        <hr /> */}
          <section>
            <h2>Step 1. Course Information</h2>
            <div className="step2">
              {/* <div className="courseCard_demo">
              <div className="courseCard_image">
                <i className="bx bx-image-add" />
              </div>
              <div className="courseCard_header">
                <p>Course Title</p>
                <i className="bx bx-bookmark-alt" />
              </div>
              <small>0 videos ・ 0h 0m ・ 0 classmates </small>
              <div className="courseCard_footer">
                <div className="review">
                  <div className="star">
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                    <i className="bx bx-star" />
                  </div>
                  <small>0 reviews</small>
                </div>
                <div className="price">HKD$500.0</div>
              </div>
            </div> */}

              <div className="courseCard_form">
                <div className="input">
                  <label htmlFor="">Category</label>
                  <select {...courseReg('catrgoryId')}>
                    <option value="1">Entertainment</option>
                    <option value="2">Lifestyle</option>
                    <option value="3">Writing</option>
                    <option value="4">Business</option>
                    <option value="5">Food</option>
                  </select>
                  {courseErrors.name && courseErrors.name.type === 'required' && (
                    <span className="error-msg">Category is required to fill !</span>
                  )}
                </div>
                <div className="input">
                  <label htmlFor="">Title</label>
                  <input type="text" {...courseReg('name', { required: true })} />
                  {courseErrors.name && courseErrors.name.type === 'required' && (
                    <span className="error-msg">Title is required to fill !</span>
                  )}
                </div>
                <div className="input-row">
                  <div className="input">
                    <label htmlFor="">Selling Price</label>
                    <input
                      type="text"
                      placeholder="$"
                      {...courseReg('sellingPrice', { required: true, pattern: /^\d+$/ })}
                    />
                    {courseErrors.sellingPrice && courseErrors.sellingPrice.type === 'required' && (
                      <span className="error-msg">Selling Price is required to fill !</span>
                    )}
                    {courseErrors.sellingPrice && courseErrors.sellingPrice.type === 'pattern' && (
                      <span className="error-msg">Selling Price must be a number!</span>
                    )}
                  </div>
                  <div className="input">
                    <label htmlFor="">Estimated Duration</label>
                    <input
                      type="text"
                      {...courseReg('courseTotalDuration', { required: true, pattern: /^\d+$/ })}
                    />
                    {courseErrors.courseTotalDuration &&
                      courseErrors.courseTotalDuration.type === 'required' && (
                        <span className="error-msg">Estimated Duration is required to fill !</span>
                      )}
                    {courseErrors.courseTotalDuration &&
                      courseErrors.courseTotalDuration.type === 'pattern' && (
                        <span className="error-msg">Estimated Duration must be a number!</span>
                      )}
                  </div>
                </div>
                <div className="input-row">
                  <div className="input">
                    <label htmlFor="course_video">Upload Introduction Video</label>
                    <input
                      id="course_video"
                      type="file"
                      accept="video/mp4,video/mkv, video/x-m4v,video/*"
                      {...courseReg('courseIntroVideo', { required: true })}
                    />
                    {courseErrors.courseIntroVideo &&
                      courseErrors.courseIntroVideo.type === 'required' && (
                        <span className="error-msg">Intro video is required to upload !</span>
                      )}
                  </div>
                  <div className="input">
                    <label htmlFor="course_cover">Upload Cover Image</label>
                    <input
                      id="course_cover"
                      type="file"
                      accept="image/*"
                      {...courseReg('courseImage', { required: true })}
                    />
                    {courseErrors.courseImage && courseErrors.courseImage.type === 'required' && (
                      <span className="error-msg">Cover image is required to upload !</span>
                    )}
                  </div>
                </div>

                <div className="input">
                  <label htmlFor="course_intro">Description</label>
                  <textarea
                    id="course_intro"
                    rows={6}
                    cols={50}
                    {...courseReg('shortDescription', { required: true })}
                  ></textarea>
                  {courseErrors.shortDescription &&
                    courseErrors.shortDescription.type === 'required' && (
                      <span className="error-msg">Description is required to fill !</span>
                    )}
                </div>
                {/* <Button txt="next" color="#2A9D8F" /> */}
              </div>
            </div>
          </section>
          <hr />
          {/* <section>
          <h2>Step 3. Fundraising Target</h2>
          <div className="step3">
            <div className="fundraising_image">
              <Image width={266} height={250} src="/image/openCourse_form_2.png" alt="" />
            </div>
            <div className="fundraising_form">
              <div className="input">
                <label htmlFor="">Fundraising Price</label>
                <input type="text" />
              </div>
              <div className="input">
                <label htmlFor="">Target Number Of Students</label>
                <input type="text" />
              </div>
              <div className="input-row">
                <div className="input">
                  <label htmlFor="">Fundraising Start Date</label>
                  <input type="date" />
                </div>
                <div className="input">
                  <label htmlFor="">Fundraising End Date</label>
                  <input type="date" />
                </div>
              </div>
              <Button txt="next" color="#2A9D8F" />
            </div>
          </div>
        </section>
        <hr /> */}
          <section>
            <h2>Step 2. Course Introduction</h2>
            <div className="step4">
              <SimpleMDE value={md} onChange={onChange} />

              <textarea
                style={{ display: 'none' }}
                id="course_content"
                rows={10}
                cols={50}
                {...courseReg('longDescription', { required: true })}
              ></textarea>
              {courseErrors.longDescription && courseErrors.longDescription.type === 'required' && (
                <span className="error-msg">Introduction is required to fill !</span>
              )}
              {/* <Button txt="next" color="#2A9D8F" /> */}
            </div>
          </section>
          <hr />
          <section>
            <h2>Step 3. Term</h2>
            <div className="step5">
              <p>
                Lorem ipsum dolor sit amet tortor suspendisse sagittis. Laoreet a cras consequat
                imperdiet congue curabitur nisl enim neque posuere. Dolore eu risus tristique nisi
                orci habitasse turpis at nisi orci eget semper facilisis. Libero molestie odio
                senectus faucibus lacinia laoreet nisl eleifend senectus facilisis ultricies diam.
                Cras duis facilisis elit aliquet volutpat consequat pulvinar.
              </p>

              <div className="term-input">
                <input type="checkbox" id="term" required />
                <label htmlFor="term">
                  Morbi volutpat rhoncus et fermentum ornare in nullam labore massa consectetur
                  mattis id.
                </label>
              </div>
              <Button txt="submit" color="#2A9D8F" />
            </div>
          </section>
        </form>
        {isLoading && <Loader />}
        <style jsx>{`
          /* header */
          header {
            display: flex;
            justify-content: space-between;
          }

          header h1 {
            font-size: 52px;
            color: #264653;
          }

          section {
            padding: 80px 0;
          }

          section h2 {
            font-size: 36px;
            margin-bottom: 60px;
          }

          /* step1 */

          .step1_option {
            display: flex;
            justify-content: space-between;
            gap: 64px;
          }

          .step1_option input {
            display: none;
          }

          .step1_option label {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            padding: 24px;
            background: #fff;
            border: 4px solid rgba(0, 0, 0, 0.08);
          }

          .step1_option input:checked + label {
            border: 4px solid #2a9d8f;
          }

          /* step2 */

          .step2 {
            display: flex;
            gap: 64px;
          }

          .step2 .courseCard_demo,
          .step2 .courseCard_form {
            flex: 1;
          }

          /* course card */
          .courseCard_image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 240px;
            font-size: 64px;
            background: #fff;
            box-shadow: 0px 64px 50px -32px rgba(6, 7, 37, 0.03);
          }

          .courseCard_image i {
            color: #ccc;
          }

          .courseCard_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 24px 0 18px;
          }

          .courseCard_header p {
            font-size: 40px;
            font-weight: bold;
          }

          .courseCard_header i {
            font-size: 40px;
          }

          .courseCard_demo small {
            font-size: 20px;
            color: #666666;
          }

          .courseCard_footer {
            display: flex;
            justify-content: space-between;
            padding: 24px 0;
          }

          .courseCard_footer .review {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 24px;
          }

          .courseCard_footer .review .star {
            display: flex;
            gap: 8px;
          }

          .courseCard_footer .price {
            color: #e76f51;
            font-size: 36px;
            font-weight: bold;
            font-style: italic;
          }

          .courseCard_form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          input,
          textarea,
          select {
            width: 100%;
            padding: 16px 24px;
            border: 0;
            font-size: 16px;
          }

          input:focus,
          textarea:focus,
          select:focus {
            outline: 3px solid #2a9d8f;
          }

          select {
            appearance: none;
          }

          .input {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .input label {
            font-size: 16px;
            font-weight: bold;
          }

          .input-row {
            display: flex;
            justify-content: space-between;
            gap: 24px;
          }

          .step3 {
            display: flex;
            gap: 64px;
          }

          .fundraising_image,
          .fundraising_form {
            flex: 1;
          }

          .fundraising_image {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .fundraising_form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .step4 {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }

          .step5 {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .step5 .term-input {
            display: flex;
            gap: 24px;
          }

          .step5 .term-input input {
            width: initial;
            outline: none;
          }

          .error-msg {
            color: #e76f51;

            font-weight: bold;
          }

          .success-msg {
            color: #e76f51;
            font-size: 36px;
          }

          @media only screen and (max-width: 768px) {
            .step2,
            .step3 {
              flex-direction: column;
            }
          }

          @media only screen and (max-width: 425px) {
            header h1 {
              font-size: 36px;
            }

            section h2 {
              font-size: 24px;
            }

            .input-row {
              flex-direction: column;
            }

            .step1_option {
              flex-direction: column;
              gap: 36px;
            }

            /* course card */

            .courseCard_header {
              margin: 18px 0 16px;
            }

            .courseCard_header p {
              font-size: 24px;
            }

            .courseCard_header i {
              font-size: 24px;
            }

            .courseCard_demo small {
              font-size: 14px;
            }

            .courseCard_footer {
              flex-direction: column;
              padding: 18px 0;
            }

            .courseCard_footer .review {
              font-size: 18px;
            }

            .courseCard_footer .price {
              display: flex;
              justify-content: flex-end;
              margin-top: 16px;
            }
          }
        `}</style>
      </div>
    </UserRouteGuard>
  );
};

export default OpenCourseForm;
