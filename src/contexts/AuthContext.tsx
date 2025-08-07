
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'individual' | 'corporate' | 'institution' | 'admin';
  profilePicture?: string;
  provider?: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('taksha_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with your backend API
    if (email === 'admin@taksha.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@taksha.com',
        userType: 'admin' as const,
        provider: 'email' as const
      };
      setUser(adminUser);
      localStorage.setItem('taksha_user', JSON.stringify(adminUser));
      return true;
    } else if (email.includes('@') && password.length >= 6) {
      const regularUser = {
        id: '2',
        name: 'Demo User',
        email,
        userType: 'individual' as const,
        provider: 'email' as const
      };
      setUser(regularUser);
      localStorage.setItem('taksha_user', JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const signup = async (userData: any): Promise<boolean> => {
    // Mock signup - replace with your backend API
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType: userData.userType || 'individual',
      provider: 'email' as const,
      profilePicture: userData.profilePicture || undefined
    };
    setUser(newUser);
    localStorage.setItem('taksha_user', JSON.stringify(newUser));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      // In a real implementation, you would use Google OAuth SDK
      // For now, this is a mock implementation
      console.log('Google OAuth would be triggered here');

      // Mock Google user data
      const googleUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        userType: 'individual' as const,
        provider: 'google' as const,
        profilePicture: 'https://via.placeholder.com/150' // Mock Google profile picture
      };

      setUser(googleUser);
      localStorage.setItem('taksha_user', JSON.stringify(googleUser));
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taksha_user');
  };

  const isAdmin = () => {
    return user?.userType === 'admin';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      loginWithGoogle,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
