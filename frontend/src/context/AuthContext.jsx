import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

function getInitialState() {
  try {
    const stored = JSON.parse(localStorage.getItem('nihara_auth') || 'null');
    if (stored?.token && stored?.user) return stored;
  } catch (error) {
    console.warn('Could not restore the saved sign-in session:', error.message);
  }
  return { user: null, isAuthenticated: false, token: null };
}

function saveState(user, isAuthenticated, token) {
  try {
    if (token && user) {
      localStorage.setItem('nihara_auth', JSON.stringify({ user, isAuthenticated, token }));
    } else {
      localStorage.removeItem('nihara_auth');
    }
  } catch (error) {
    console.warn('Could not persist the sign-in session:', error.message);
  }
}

export function AuthProvider({ children }) {
  const [initial] = useState(getInitialState);
  const [user, setUser] = useState(initial.user);
  const [isAuthenticated, setIsAuthenticated] = useState(initial.isAuthenticated);
  const [token, setToken] = useState(initial.token);

  useEffect(() => {
    let active = true;
    if (!token) return undefined;
    api.getCurrentUser().then((res) => {
      if (!active) return;
      if (res?.success && res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
        saveState(res.user, true, token);
      } else if (res?.status === 401 || res?.status === 403) {
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
        saveState(null, false, null);
      } else {
        console.warn('Could not refresh the sign-in profile; keeping the verified session.');
      }
    }).catch((error) => {
      if (!active) return;
      console.error('Could not validate the saved sign-in session:', error.message);
      if (error.status === 401 || error.status === 403) {
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
        saveState(null, false, null);
      }
    });
    return () => { active = false; };
  }, [token]);

  const login = useCallback((verifiedUser, authToken) => {
    if (!verifiedUser || !authToken) return { success: false, message: 'A valid server session is required' };
    setUser(verifiedUser);
    setIsAuthenticated(true);
    setToken(authToken);
    saveState(verifiedUser, true, authToken);
    return { success: true, role: verifiedUser.role, user: verifiedUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    saveState(null, false, null);
  }, []);

  const updateProfile = useCallback(async (updatedData) => {
    const result = await api.updateProfile(updatedData);
    if (!result?.success || !result.user) throw new Error(result?.message || 'Profile update failed');
    setUser(result.user);
    saveState(result.user, true, token);
    return result.user;
  }, [token]);

  const isAdmin = isAuthenticated && user?.role === 'admin';
  const isCustomer = isAuthenticated && user?.role === 'user';
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isAdmin,
    isCustomer,
    token,
    login,
    logout,
    updateProfile
  }), [user, isAuthenticated, isAdmin, isCustomer, token, login, logout, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
