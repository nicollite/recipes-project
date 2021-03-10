import { IUser } from "shared";
import { auth } from "src/firebase/firebase";
import firebase from "firebase/app";
import { api } from "src/services/api";
import { UserLoginData } from "src/store/types";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

export const signInSub = new Subject<boolean>();
export const signIn$ = signInSub.asObservable();

/**
 * Login the user in authenticator
 * @param email The user email
 * @param password The user password
 * @returns A object with the user data, authenticator User object and the authenticator JWT token
 */
export const login = async (email?: string, password?: string): Promise<UserLoginData> => {
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const authUser = auth.currentUser
    ? auth.currentUser
    : await auth.signInWithEmailAndPassword(email, password).then(userCred => userCred.user);
  const uid = authUser.uid;
  const token = await authUser?.getIdToken();
  const user = await api
    .get<IUser>("/user", {
      params: { uid: authUser?.uid },
      headers: { authorization: `AuthFire ${token}` },
    })
    .then(res => res.data);

  return {
    user,
    uid,
    jwt: {
      token,
      timestamp: Date.now(),
      expiration: 3600 * 1000,
    },
  };
};

/**
 * Sign up user with email and password
 * @param email The user email
 * @param password The user password
 * @param username The user username
 * @returns A object with the user data, authenticator User object and the authenticator JWT token
 */
export const signUp = async (
  email: string,
  password: string,
  username: string,
): Promise<UserLoginData> => {
  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const authUser = await auth.createUserWithEmailAndPassword(email, password);
  const uid = authUser.user.uid;

  const token = await authUser.user?.getIdToken();
  const user = await api
    .post<IUser>(
      "/user",
      { email, uid, username },
      {
        params: { uid: authUser.user?.uid },
        headers: { authorization: `AuthFire ${token}` },
      },
    )
    .then(res => res.data);

  return {
    user,
    uid,
    jwt: {
      token,
      timestamp: Date.now(),
      expiration: 3600 * 1000,
    },
  };
};

export const signOut = async () => {
  await auth.signOut();
};

export const persistentLogin = (): Promise<UserLoginData> => {
  const persistenceSub = new Subject<UserLoginData>();
  // Will return the user or null, if the user do the login and emit the user data else emit null
  auth.onAuthStateChanged(async user => {
    if (user) persistenceSub.next(await login());
    else persistenceSub.next(null);
    persistenceSub.complete();
  });
  return persistenceSub.pipe(take(1)).toPromise();
};
