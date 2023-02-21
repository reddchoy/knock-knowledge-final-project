import { User } from '../../models/User';
import { AppDispatch } from '../store';
import { server } from '../../config';

export function login(user: User, token: string) {
  return {
    type: '@@auth/LOGIN' as const,
    user: user,
    token: token,
  };
}

export function logout() {
  return {
    type: '@@auth/LOGOUT' as const,
  };
}

export function restoreLogin(token: string) {
  return async (dispatch: AppDispatch) => {
    const currentUserRes = await fetch(`${server}/user/getCurrentUser`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (currentUserRes.status !== 200) {
      dispatch(logout());
      return;
    }

    const currentUserJson = await currentUserRes.json();
    dispatch(login(currentUserJson, token));
    localStorage.setItem('token', token);
  };
}

export type AuthActions = ReturnType<typeof login> | ReturnType<typeof logout>;
