import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthState {
  user: IUser;
}

interface IAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface IUserInfoGoogle {
  id: string;
  given_name: string;
  email: string;
  picture: string;
}

interface IAuthContextData {
  user: IUser;
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  const signInWithGoogle = useCallback(async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const userInfo = (await response.json()) as IUserInfoGoogle;

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setData({ user: userLogged });
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error('');
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${encodeURI(
          name,
        )}&length=1`;

        const userLogged = {
          id: credential.user,
          name,
          email: credential.email!,
          photo,
        };

        setData({ user: userLogged });
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error('');
    }
  }, []);

  const signOut = useCallback(async () => {
    setData({} as IAuthState);
    await AsyncStorage.removeItem(userStorageKey);
  }, []);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem(userStorageKey);

      if (user) {
        setData({ user: JSON.parse(user) });
      }

      setUserStorageLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
