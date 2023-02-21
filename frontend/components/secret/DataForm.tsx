/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller, FieldValue, FieldValues } from 'react-hook-form';
import { server } from '@/config';
import moment from 'moment';
import Button from '../layout/Button';

import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface Props {
  table: string;
  data: any;
  isCreate?: boolean;
  onClose: () => void;
}

function DataForm({ table, data, onClose, isCreate }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState('');

  const { register, handleSubmit, control, setValue } = useForm();

  const isCourse = table === 'Course';
  const isArticle = table === 'Article';
  const isReview = table === 'Review';
  const isOrder = table === 'Order';
  const isUser = table === 'User';

  const onSubmit = async (submit: FieldValues) => {
    setIsLoading(true);
    switch (action) {
      case 'create':
        switch (table) {
          case 'Course':
            const courseFormData = new FormData();

            courseFormData.append('name', submit.name);
            courseFormData.append('sellingPrice', submit.sellingPrice);
            courseFormData.append('courseTotalDuration', submit.courseTotalDuration);
            courseFormData.append('longDescription', submit.longDescription);
            courseFormData.append('shortDescription', submit.shortDescription);
            courseFormData.append('catrgoryId', submit.catrgoryId);
            courseFormData.append('courseIntroVideo', submit.courseIntroVideo[0]);
            courseFormData.append('courseImage', submit.courseImage[0]);

            const createCourseRes = await fetch(`${server}/admin/course/create`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: courseFormData,
            });

            if (createCourseRes.status === 400 || createCourseRes.status === 500) {
              toast.error('Missing Fields / Type Error !');
            }
            if (createCourseRes.status === 201) {
              toast.success('Create Successfully !');
            }

            const createCourseResult = await createCourseRes.json();

            break;
          case 'Article':
            const articleFormData = new FormData();

            articleFormData.append('title', submit.title);
            articleFormData.append('content', submit.content);
            articleFormData.append('coverImage', submit.coverImage[0]);

            const articleRes = await fetch(`${server}/admin/article/create`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: articleFormData,
            });
            if (articleRes.status === 400 || articleRes.status === 500) {
              toast.error('Missing Fields / Type Error !');
            }
            if (articleRes.status === 201) {
              toast.success('Create Successfully !');
            }
            const createArticleResult = await articleRes.json();
            break;
          default:
            break;
        }

        break;
      case 'update':
        switch (table) {
          case 'Course':
            const courseFormData = new FormData();

            courseFormData.append('name', submit.name);
            courseFormData.append('sellingPrice', submit.sellingPrice);
            courseFormData.append('courseTotalDuration', submit.courseTotalDuration);
            courseFormData.append('longDescription', submit.longDescription);
            courseFormData.append('shortDescription', submit.shortDescription);
            courseFormData.append('catrgoryId', submit.catrgoryId);
            courseFormData.append('courseIntroVideo', submit.courseIntroVideo[0]);
            courseFormData.append('courseImage', submit.courseImage[0]);
            courseFormData.append('status', submit.status);

            const updateCourseRes = await fetch(`${server}/admin/course/edit/${data.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: courseFormData,
            });
            if (updateCourseRes.status === 400 || updateCourseRes.status === 500) {
              toast.error('Missing Fields / Type Error !');
            }
            if (updateCourseRes.status === 200) {
              toast.success('Update Successfully !');
            }
            const updateCourseResult = await updateCourseRes.json();

            break;
          case 'Article':
            const articleFormData = new FormData();

            articleFormData.append('title', submit.title);
            articleFormData.append('content', submit.content);
            articleFormData.append('coverImage', submit.coverImage[0]);
            articleFormData.append('status', submit.status);

            const updateArticleRes = await fetch(`${server}/admin/article/edit/${data.id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: articleFormData,
            });
            if (updateArticleRes.status === 400 || updateArticleRes.status === 500) {
              toast.error('Missing Fields / Type Error !');
            }
            if (updateArticleRes.status === 200) {
              toast.success('Update Successfully !');
            }
            const createArticleResult = await updateArticleRes.json();
            break;
          default:
            break;
        }
        break;
      case 'delete':
        switch (table) {
          case 'Course':
            fetch(`${server}/admin/course/${data.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }).then((res) => res.status === 200 && toast.success('Delete Course Successful !'));
            break;
          case 'Article':
            fetch(`${server}/admin/article/${data.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }).then((res) => res.status === 200 && toast.success('Delete Article Successful !'));
            break;
          case 'User':
            fetch(`${server}/admin/user/${data.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }).then((res) => res.status === 200 && toast.success('Delete User Successful !'));
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    onClose();
    setIsLoading(false);
  };

  const [md, setMD] = useState('');

  useEffect(() => {
    data.longDescription && setMD(data.longDescription);
    data.content && setMD(data.content);
  }, [data]);

  useEffect(() => {
    isCourse && setValue('longDescription', md);
    (isArticle || isReview) && setValue('content', md);
  }, [isCourse, , isArticle, isReview, setValue, md]);

  const onChange = useCallback((value: string) => {
    setMD(value);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <div className="left">
            {(data.title || data.name) && (
              <div className="title">
                <div>
                  {data.title}
                  {data.name}
                </div>
              </div>
            )}

            {isCreate ? (
              <>
                <div className="title">
                  <div>Create {table}</div>
                </div>
                <div className="subTitle">
                  <div>
                    <b>create by now: </b> {moment(new Date()).format('LLL')}
                  </div>
                </div>
              </>
            ) : (
              <div className="subTitle">
                <div>
                  <b>Table: </b> {table}
                </div>
                <div>
                  <b>id: </b> {data.id}
                </div>
                <div>
                  <b>created: </b> {moment(data.createdAt).format('LLL')}
                </div>
                <div>
                  <b>updated: </b> {moment(data.updatedAt).format('LLL')}
                </div>
              </div>
            )}
          </div>

          <i className="bx bx-x" onClick={() => onClose()} />
        </header>

        <main>
          <div className="top">
            <div className="main">
              {isCourse && (
                <div className="rows">
                  <div className="key">Category</div>
                  <div className="input">
                    <div className="select select-category">
                      <select {...register('catrgoryId')}>
                        <option value="1">Entertainment</option>
                        <option value="2">Lifestyle</option>
                        <option value="3">Writing</option>
                        <option value="4">Business</option>
                        <option value="5">Food</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {React.Children.toArray(
                Object.keys(isCreate ? data[0] : data).map((x, i) => {
                  const disable: boolean =
                    x === 'id' ||
                    x === 'status' ||
                    x === 'createdAt' ||
                    x === 'updatedAt' ||
                    x === 'courseImage' ||
                    x === 'courseIntroVideo' ||
                    x === 'longDescription' ||
                    x === 'content' ||
                    x === 'coverImage' ||
                    x === 'categoryId' ||
                    x === 'category' ||
                    x === 'ownerId';

                  return (
                    <>
                      {!disable && (
                        <div className="rows" key={i}>
                          <label className="key">{x}</label>
                          <div className="input">
                            <Controller
                              name={x}
                              control={control}
                              defaultValue={data[x] === 0 ? 0 : data[x] || ''}
                              render={({ field }) => {
                                return <input {...field} />;
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                })
              )}
              {(isCourse || isArticle || isReview) && (
                <div className="bottom">
                  {isCourse && (
                    <>
                      <div className="rows">
                        <div className="key">longDescription</div>
                        <div className="input">
                          <SimpleMDE value={md} onChange={onChange} />
                        </div>
                      </div>
                      <textarea style={{ display: 'none' }} {...register('longDescription')} />
                    </>
                  )}

                  {(isArticle || isReview) && (
                    <>
                      <div className="rows">
                        <div className="key">content</div>
                        <div className="input">
                          <SimpleMDE value={md} onChange={onChange} />
                        </div>
                      </div>
                      <textarea style={{ display: 'none' }} {...register('content')} />
                    </>
                  )}
                </div>
              )}
            </div>

            {(isCourse || isArticle) && (
              <div className="side">
                {isCourse && (
                  <>
                    <div className="rows">
                      <div className="key">courseImage</div>
                      <div className="coverImage">
                        {data.courseImage ? (
                          <img src={data.courseImage} alt="" />
                        ) : (
                          <i className="bx bx-image" />
                        )}
                      </div>
                      <div className="input">
                        <input {...register('courseImage')} type="file" />
                      </div>
                    </div>
                    <div className="rows">
                      <div className="key">courseIntroVideo</div>
                      <div className="introVideo">
                        <video src={data.courseIntroVideo} controls />
                      </div>
                      <div className="input">
                        <input {...register('courseIntroVideo')} type="file" />
                      </div>
                    </div>
                  </>
                )}
                {isArticle && (
                  <>
                    <div className="rows">
                      <div className="key">coverImage</div>
                      <div className="coverImage">
                        {data.coverImage ? (
                          <img src={data.coverImage} alt="" />
                        ) : (
                          <i className="bx bx-image" />
                        )}
                      </div>
                      <div className="input">
                        <input {...register('coverImage')} type="file" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
        <footer>
          {data.status && (
            <div className="rows column">
              <div className="input">
                <div className="select">
                  <select {...register('status')}>
                    <option value="pending">pending</option>
                    <option value="fundraising">fundraising</option>
                    <option value="rejected">rejected</option>
                    <option value="on_Board">on_board</option>
                    <option value="off_board">off_board</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {isCreate ? (
            <Button
              txt="create"
              hideTxt
              color="#2A9D8F"
              icon="bx-plus"
              reverse
              onButton={() => {
                setAction('create');
              }}
            />
          ) : (
            <>
              {(isCourse || isArticle) && (
                <>
                  <Button
                    txt="update"
                    hideTxt
                    color="#2A9D8F"
                    icon="bxs-edit"
                    reverse
                    onButton={() => {
                      setAction('update');
                    }}
                  />
                </>
              )}

              {(isCourse || isArticle || isUser) && (
                <>
                  <Button
                    txt="delete"
                    hideTxt
                    color="#E76F51"
                    icon="bxs-trash"
                    reverse
                    onButton={() => {
                      setAction('delete');
                    }}
                  />
                </>
              )}
            </>
          )}

          <Button
            txt="cancel"
            hideTxt
            color="#264653"
            icon="bx-x"
            reverse
            onButton={() => {
              setAction('cancel');
            }}
          />
        </footer>
      </form>
      {isLoading && <Loader />}
      <style jsx>{`
        header {
          position: sticky;
          top: 0;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 24px;
          margin-bottom: 24px;
          width: 100%;
          background: #fff;
          z-index: 100;
        }

        header .left {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        header i {
          align-self: flex-start;
          font-size: 36px;
          cursor: pointer;
        }

        header i:hover {
          color: #666;
        }

        .title {
          display: flex;
          gap: 24px;
          font-size: 24px;
          font-weight: bold;
        }

        .subTitle {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .subTitle div {
          color: #666;
          text-transform: uppercase;
          font-size: 12px;
        }

        // grid
        main {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 24px;
        }

        .main {
          flex: 1 1 70%;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .side {
          flex: 1 1 30%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .top {
          display: flex;
          gap: 24px;
        }

        .bottom {
          width: 100%;
          margin-top: 12px;
        }

        .rows {
          flex: ${isArticle ? '1 1 100%' : '1 1 40%'};
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .side .rows {
          flex: none;
        }

        .column {
          flex: 1 1 100%;
          flex-direction: row;
          align-items: center;
        }

        .key {
          text-transform: uppercase;
          font-weight: bold;
        }

        .input {
          width: 100%;
          border: 2px solid rgba(0, 0, 0, 0);
        }

        .input input {
          width: 100%;
          padding: 12px;
          font-size: 14px;
          border: 2px solid rgba(0, 0, 0, 0);
          background: rgba(0, 0, 0, 0.03);
          outline: 0;
        }

        .input:hover,
        .input input:focus {
          border: 2px solid #2a9d8f;
        }

        .input .select {
          padding: 18px 16px;
          background: rgba(0, 0, 0, 0.03);
        }

        .input select {
          width: 100%;
          border: 0;
          outline: 0;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
          background: rgba(0, 0, 0, 0);
          cursor: pointer;
        }

        .input .select-category {
          padding: 12px;
        }

        .input .select-category select {
          font-size: 14px;
        }

        .coverImage,
        .introVideo video {
          width: 385px;
          height: 213px;
          text-align: center;
        }

        .coverImage {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.03);
        }

        .coverImage i {
          font-size: 100px;
          color: #fff;
        }

        .coverImage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        footer {
          position: sticky;
          bottom: 0;
          right: 0;
          margin-top: 24px;
          padding: 24px;
          display: flex;
          justify-content: flex-end;
          gap: 24px;
          background: #fff;
        }
        @media only screen and (max-width: 1024px) {
          .coverImage,
          .introVideo video {
            width: 285px;
            height: 158px;
          }
        }

        @media only screen and (max-width: 768px) {
          .top {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .side {
            flex-direction: row;
            gap: 24px;
          }

          .coverImage,
          .introVideo video {
            width: 323px;
            height: 179px;
          }
        }

        @media only screen and (max-width: 425px) {
          header {
            padding: 24px 24px 12px 24px;
          }

          header .left {
            padding: 12px 0;
            overflow-x: scroll;
            gap: 12px;
          }

          .title {
            position: sticky;
            left: 0;
          }

          .subTitle div {
            white-space: nowrap;
          }

          .main {
            flex: 1 1 100%;
            flex-wrap: nowrap;
            flex-direction: column;
          }
          .side {
            flex-direction: column;
            gap: 24px;
          }

          .coverImage,
          .introVideo video {
            width: 100%;
            height: 191px;
          }

          footer {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

export default DataForm;
