/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../Button';
import styles from '../../../styles/layout/Nav.module.scss';
import { useForm } from 'react-hook-form';
import { server } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { login, logout, restoreLogin } from '@/redux/auth/actions';
import { useRouter } from 'next/router';
// import useSWR from 'swr';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import NavCart from './NavCart';
import NavAdmin from './NavAdmin';

interface Props {
  openPopup: boolean;
  setOpenPopup: (e: boolean) => void;
  refreshCounter: boolean;
  setRefreshCounter: (e: boolean) => void;
}

// const fetcher = (...args: [string]) =>
//   fetch(...args, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   }).then((res) => res.json());

const Nav = ({ openPopup, setOpenPopup, refreshCounter, setRefreshCounter }: Props) => {
  useEffect(() => {
    openPopup && setPopup(openPopup);
  }, [openPopup]);

  const {
    handleSubmit: handleLoginSubmit,
    register: loginReg,
    setError: setLoginError,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    handleSubmit: handleRegisterSubmit,
    register: registerReg,
    setError: setRegisterError,
    formState: { errors: registerErrors },
  } = useForm();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [tab, setTab] = useState(true);
  const [popup, setPopup] = useState(false);
  const [courseInCart, setCourseInCart] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // const { data: profileData, error } = useSWR<{
  //   message: { courseInCart: string; icon: string; isAdmin: boolean };
  // }>(isAuthenticated ? `${server}/user/getUserAndCart` : null, fetcher);

  // if (error) return <div>Failed to load</div>;

  useEffect(() => {
    if (refreshCounter) {
      getProfileData();
      setRefreshCounter(false);
    }
  }, [refreshCounter, setRefreshCounter]);

  const getProfileData = async () => {
    const resp = await fetch(`${server}/user/getUserAndCart`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const _data = await resp.json();

    if (_data) {
      setProfileData(_data);
      setCourseInCart(_data.message.courseInCart);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfileData();
    }
  }, [isAuthenticated]);

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" onClick={() => setDropDownMenu(false)}>
          <div className={styles.nav_logo}>
            <i className="bx bxs-door-open" />
            <span>
              Knock Knowledge<span className="dot">.</span>
            </span>
          </div>
        </Link>

        <main style={{ left: dropDownMenu ? '0' : '-100%' }}>
          <div className={styles.main_left}>
            <ul>
              <li className={styles.nav_dropdown}>
                <Link href="/course" onClick={() => setDropDownMenu(false)}>
                  <div>
                    Find Course
                    <i className="bx bx-chevron-down" />
                  </div>
                </Link>
                <ul className={styles.nav_dropdown_menu}>
                  <Link href="/category/Entertainment" onClick={() => setDropDownMenu(false)}>
                    <li>Entertainment</li>
                  </Link>
                  <Link href="/category/Lifestyle" onClick={() => setDropDownMenu(false)}>
                    <li>Lifestyle</li>
                  </Link>
                  <Link href="/category/Writing" onClick={() => setDropDownMenu(false)}>
                    <li>Writing</li>
                  </Link>
                  <Link href="/category/Business" onClick={() => setDropDownMenu(false)}>
                    <li>Business</li>
                  </Link>
                  <Link href="/category/Food" onClick={() => setDropDownMenu(false)}>
                    <li>Food</li>
                  </Link>
                </ul>
              </li>

              <Link href="/article" onClick={() => setDropDownMenu(false)}>
                <li className={styles.nav_item}>Article</li>
              </Link>
            </ul>
          </div>

          {isAuthenticated && (
            <div className={styles.main_right}>
              <div className={styles.hide_lg} onClick={() => setDropDownMenu(false)}>
                <NavCart count={courseInCart} />

                {profileData?.message.isAdmin && (
                  <div>
                    <NavAdmin />
                  </div>
                )}
              </div>

              <div className={styles.nav_user}>
                <div className={styles.nav_user_icon}>
                  {profileData && profileData.message.icon ? (
                    <img src={profileData?.message.icon} alt="" />
                  ) : (
                    <i className="bx bx-user" />
                  )}
                </div>

                <ul className={styles.nav_user_menu}>
                  <Link href={'/user'} onClick={() => setDropDownMenu(false)}>
                    <li>
                      <i className="bx bxs-videos" />
                      Profile
                    </li>
                  </Link>
                  <Link href={'/user/order'} onClick={() => setDropDownMenu(false)}>
                    <li>
                      <i className="bx bxs-credit-card" />
                      Order
                    </li>
                  </Link>
                  <Link href={'/user/setting'} onClick={() => setDropDownMenu(false)}>
                    <li>
                      <i className="bx bxs-cog" />
                      Setting
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch(logout());
                      setDropDownMenu(false);
                      router.push('/');
                    }}
                  >
                    <i className="bx bx-log-out-circle" />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>

        {!isAuthenticated && (
          <li onClick={() => setPopup(!popup)}>
            <Button txt="Login" />
          </li>
        )}

        <div className={styles.show_sm}>
          {isAuthenticated && (
            <>
              <div onClick={() => setDropDownMenu(false)}>
                <NavCart count={courseInCart} />
              </div>

              {profileData?.message.isAdmin && (
                <div onClick={() => setDropDownMenu(false)}>
                  <NavAdmin />
                </div>
              )}
            </>
          )}

          <div className={styles.nav_toggle} onClick={() => setDropDownMenu(!dropDownMenu)}>
            <i className={`bx ${dropDownMenu ? 'bx-x' : 'bx-menu'} `} />
          </div>
        </div>
      </nav>

      {popup && (
        <div className={styles.popup_bg}>
          <div className={styles.popupTab}>
            <div className={styles.popupContent}>
              <i
                className="bx bx-x"
                onClick={() => {
                  setOpenPopup(false);
                  setPopup(false);
                }}
              />

              <div>
                <header>
                  <div className={tab ? styles.bold : ''} onClick={() => setTab(true)}>
                    Login
                  </div>
                  <div className={!tab ? styles.bold : ''} onClick={() => setTab(false)}>
                    Register
                  </div>
                </header>
                {tab ? (
                  <section>
                    <form
                      id="login-from"
                      onSubmit={handleLoginSubmit(async (data) => {
                        const res = await fetch(`${server}/auth/login`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data),
                        });
                        if (res.status !== 200) {
                          setLoginError('password', { message: 'Invalid Email / Password !' });
                          return;
                        }

                        const json = await res.json();

                        const currentUserRes = await fetch(`${server}/user/getCurrentUser`, {
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${json.access_token}`,
                          },
                        });

                        if (currentUserRes.status !== 200) {
                          dispatch(logout());
                          return;
                        }

                        const currentUserJson = await currentUserRes.json();
                        dispatch(login(currentUserJson, `${json.access_token}`));
                        localStorage.setItem('token', `${json.access_token}`);

                        if (currentUserJson.isAdmin) {
                          router.push('/secret');
                        }
                        setPopup(false);
                      })}
                    >
                      <input
                        type="email"
                        placeholder="Email"
                        {...loginReg('email', { required: true })}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        {...loginReg('password', { required: true })}
                      />
                      {((loginErrors.email && loginErrors.email.type === 'required') ||
                        (loginErrors.password && loginErrors.password.type === 'required')) && (
                        <span className={styles.loginError}>Email & Password are required !</span>
                      )}
                      {loginErrors.password && loginErrors.password?.type !== 'required' && (
                        <span className={styles.loginError}>
                          {loginErrors.password?.message + ''}
                        </span>
                      )}
                      <Button txt="login" />
                    </form>
                  </section>
                ) : (
                  <section>
                    <form
                      id="register-form"
                      onSubmit={handleRegisterSubmit(async (data) => {
                        if (data.password !== data.repeatPassword) {
                          setRegisterError('password', {
                            message: 'Password & repeat password are not the same !',
                            type: 'passwordError',
                          });
                          return;
                        }

                        const res = await fetch(`${server}/auth/register`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data),
                        });
                        if (res.status === 403) {
                          setRegisterError('email', {
                            message: 'Email / Username / Phone No. has already been registered !',
                            type: 'invalid',
                          });
                          return;
                        }

                        const json = await res.json();

                        await dispatch(restoreLogin(json.access_token));
                        setPopup(false);
                      })}
                    >
                      <input
                        type="email"
                        placeholder="Email"
                        {...registerReg('email', {
                          required: true,
                          pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        {...registerReg('password', { required: true })}
                      />
                      <input
                        type="password"
                        placeholder="Repeat Password"
                        {...registerReg('repeatPassword', { required: true })}
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        {...registerReg('username', { required: true })}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        {...registerReg('phoneNumber', {
                          required: true,
                          maxLength: 8,
                          minLength: 8,
                          pattern: /^\d+$/,
                        })}
                      />
                      {((registerErrors.email && registerErrors.email.type === 'required') ||
                        (registerErrors.password && registerErrors.password.type === 'required') ||
                        (registerErrors.repeatPassword &&
                          registerErrors.repeatPassword.type === 'required') ||
                        (registerErrors.username && registerErrors.username.type === 'required') ||
                        (registerErrors.phoneNumber &&
                          registerErrors.phoneNumber.type === 'required')) && (
                        <span className={styles.loginError}>Please fill all the fields !</span>
                      )}
                      {registerErrors.password &&
                        registerErrors.password.type === 'passwordError' && (
                          <span className={styles.loginError}>
                            {registerErrors.password.message + ''}
                          </span>
                        )}
                      {registerErrors.email && registerErrors.email.type === 'invalid' && (
                        <span className={styles.loginError}>
                          {registerErrors.email.message + ''}
                        </span>
                      )}
                      {registerErrors.email && registerErrors.email.type === 'pattern' && (
                        <span className={styles.loginError}>
                          Invaild Email format!
                        </span>
                      )}
                      {registerErrors.phoneNumber &&
                        registerErrors.phoneNumber.type === 'pattern' && (
                          <span className={styles.loginError}>
                            Phone number must be 8 digit number !
                          </span>
                        )}
                      {registerErrors.phoneNumber &&
                        registerErrors.phoneNumber.type === 'maxLength' && (
                          <span className={styles.loginError}>
                            Phone number must be 8 digit number !
                          </span>
                        )}
                      {registerErrors.phoneNumber &&
                        registerErrors.phoneNumber.type === 'minLength' && (
                          <span className={styles.loginError}>
                            Phone number must be 8 digit number !
                          </span>
                        )}
                      <Button txt="register" />
                    </form>
                  </section>
                )}
              </div>
            </div>
            <div className={styles.googleLogin}>
              <GoogleOAuthProvider clientId="933105210976-ns26suhm62r9nss78al115m69m6jvs4o.apps.googleusercontent.com">
                <GoogleLogin
                  type="standard"
                  width="315px"
                  onSuccess={async (credentialResponse) => {
                    const res = await fetch(`${server}/auth/login/google`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        token: credentialResponse.credential,
                      }),
                    });
                    const json = await res.json();

                    dispatch(restoreLogin(json.access_token));
                    setPopup(false);
                  }}
                  onError={() => {}}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
