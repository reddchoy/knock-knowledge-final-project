import UserHeader from '@/components/user/UserHeader';
import Button from '@/components/layout/Button';
import UserRouteGuard from '../../components/guard/UserRouteGuard';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { server } from '@/config';
import { User } from '@/models/User';
import { toast } from 'react-hot-toast';

const UserSetting = () => {
  const [userData, setUserData] = useState<User>();
  const [reset, setReset] = useState(false);
  const [update, setUpdate] = useState(false);

  const {
    handleSubmit: handleProfileSubmit,
    register: profileReg,
    setError: setProfileError,
    reset: profileReset,
    formState: { errors: profileErrors, isSubmitSuccessful: profileSubmit },
  } = useForm();

  const {
    handleSubmit: handlePasswordSubmit,
    register: passwordReg,
    setError: setPasswordError,
    reset: passwordReset,
    formState: { errors: passwordErrors, isSubmitSuccessful: passwordSubmit },
  } = useForm();

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await fetch(`${server}/user/getCurrentUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data: User = await res.json();
      setUserData(data);
    };
    if (!userData) {
      getCurrentUser();
    }
  }, [userData]);

  useEffect(() => {
    profileReset();
  }, [profileSubmit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    passwordReset();
  }, [passwordSubmit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserRouteGuard>
      <>
        <UserHeader title="Setting" image="/image/user_setting.png" />
        <section>
          <div>
            <p>Reset password</p>
            <form
              onSubmit={handlePasswordSubmit(async (data) => {
                if (data.password !== data.repeatPassword) {
                  setPasswordError('password', {
                    message: 'Password & repeat password are not the same !',
                    type: 'passwordError',
                  });
                  return;
                }

                const res = await fetch(`${server}/user/password/reset`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                  body: JSON.stringify(data),
                });
                if (res.status === 403) {
                  toast.error('Error Submission !');
                }

                const json = await res.json();
                if (res.status === 200) {
                  setReset(true);
                  toast.success('Reset Success !');
                }
              })}
            >
              <span className="input-group">
                <i className="bx bx-envelope" />
                <input type="txt" placeholder={userData?.email} disabled />
              </span>

              <span className="input-group">
                <i className="bx bxs-key" />
                <input
                  type="password"
                  placeholder="Password"
                  {...passwordReg('password', { required: true })}
                />
              </span>

              <span className="input-group">
                <i className="bx bxs-key" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...passwordReg('repeatPassword', { required: true })}
                />
              </span>
              {passwordErrors.password && passwordErrors.password.type === 'required' && (
                <span className="error-msg">password is required to fill !</span>
              )}
              {passwordErrors.password && passwordErrors.password.type === 'passwordError' && (
                <span className="error-msg">{passwordErrors.password.message + ''}</span>
              )}

              {reset ? (
                <Button
                  txt="reset"
                  icon="bx-check-double"
                  color="#2A9D8F"
                  onButton={() => setReset(!reset)}
                />
              ) : (
                <Button txt="reset" color="#264653" />
              )}
            </form>
          </div>
          <hr />
          <div>
            <p>Profile</p>
            <form
              onSubmit={handleProfileSubmit(async (data) => {
                const formData = new FormData();

                formData.append('icon', data.icon[0]);
                formData.append('username', data.username);
                formData.append('description', data.description);

                const res = await fetch(`${server}/user/profile/edit`, {
                  method: 'PATCH',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                  body: formData,
                });
                if (res.status !== 200) {
                  setProfileError('username', {
                    message: 'Username has already been used!',
                    type: 'usernameExist',
                  });
                  toast.error('Submit Error !');
                } else {
                  toast.success('Profile Updated Success !');
                  setUpdate(true);
                }

                const result = await res.json();
              })}
            >
              <span className="input-group">
                <label htmlFor="user-icon">
                  <i className="bx bxs-user-account" />
                </label>
                <input
                  id="user-icon"
                  type="file"
                  accept="image/png, image/jpeg"
                  {...profileReg('icon')}
                />
              </span>
              <span className="input-group">
                <i className="bx bx-user" />
                <input
                  type="text"
                  placeholder="Username"
                  {...profileReg('username', { required: true })}
                />
              </span>
              {profileErrors.username && profileErrors.username.type === 'required' && (
                <span className="error-msg">Username is required to fill !</span>
              )}
              {profileErrors.username && profileErrors.username.type === 'usernameExist' && (
                <span className="error-msg">{profileErrors.username.message + ''}</span>
              )}
              <span className="input-group textarea">
                <i className="bx bx-pencil" />
                <textarea
                  rows={10}
                  placeholder="Description"
                  {...profileReg('description', { required: true })}
                />
              </span>
              {profileErrors.description && profileErrors.description.type === 'required' && (
                <span className="error-msg">Description is required to fill !</span>
              )}
              {update ? (
                <Button
                  txt="update"
                  icon="bx-check-double"
                  color="#2A9D8F"
                  onButton={() => setUpdate(!update)}
                />
              ) : (
                <Button txt="update" color="#264653" />
              )}
            </form>
          </div>
        </section>

        <style jsx>{`
          section {
            display: flex;
            padding: 48px 0;
          }

          section div {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 0 24px;
            gap: 24px;
          }

          section div p {
            font-size: 32px;
            font-weight: bold;
          }

          section div form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .input-group {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 0px 24px;
            background: #fff;
          }

          .input-group i {
            font-size: 18px;
          }

          .textarea {
            align-items: flex-start;
          }

          .textarea i {
            margin-top: 8px;
          }

          .input-group input,
          .input-group textarea {
            padding: 18px 12px;
            width: 100%;
            font-size: 14px;
            border: 0;
            outline: 0;
            resize: none;
            background: none;
          }
          .error-msg {
            color: #e76f51;
            font-weight: bold;
          }
          @media only screen and (max-width: 425px) {
            section {
              padding: 0;
              flex-direction: column;
              gap: 48px;
            }

            section div {
              padding: 0;
            }

            section div p {
              font-size: 24px;
            }
          }
        `}</style>
      </>
    </UserRouteGuard>
  );
};

export default UserSetting;
