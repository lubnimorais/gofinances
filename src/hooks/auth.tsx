import React, { createContext, useContext, useCallback } from 'react';

import * as AuthSession from 'expo-auth-session';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const user = {
    id: '121212',
    name: 'Lubni Morais',
    email: 'lubni.morais@gmail.com',
  };

  const signInWithGoogle = useCallback(async () => {
    try {
      const CLIENT_ID =
        '872108538494-f30f0j2ht0j89v8h8dge8rbprgq59isg.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@lubnimorais/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
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
