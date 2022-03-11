import React, { createContext, useContext, useState } from 'react';

type AuthUser = {
  userId: number;
};

type OperationType = {
  login: (userId: number) => void;
  logout: () => void;
};

const AuthUserContext = createContext<AuthUser | null>(null);
const AuthOperationContext = createContext<OperationType>({
  login: (_) => console.error('Providerが設定されていません'),
  logout: () => console.error('Providerが設定されていません'),
});

const AuthUserProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const login = async (userId: number) => {
    // await login() //ログイン処理
    setAuthUser({ userId });
  };

  const logout = async () => {
    // await login() //ログアウト処理
    setAuthUser(null);
  };

  return (
    <AuthOperationContext.Provider value={{ login, logout }}>
      <AuthUserContext.Provider value={authUser}>
        {children}
      </AuthUserContext.Provider>
    </AuthOperationContext.Provider>
  );
};

export const useAuthUser = () => useContext(AuthUserContext);
export const useLogin = () => useContext(AuthOperationContext).login;
export const useLogout = () => useContext(AuthOperationContext).logout;

export default AuthUserProvider;
