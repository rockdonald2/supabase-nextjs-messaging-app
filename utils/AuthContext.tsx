import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { SignInWithPasswordCredentials, User } from '@supabase/supabase-js';
import { IUserContext } from '@/types/types';

const AuthContext = createContext(null);
const useAuthContext = () => useContext<IUserContext>(AuthContext);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            const user: User = session?.data?.session?.user ?? null;
            setUser(user);
            setIsAuthenticated(user !== null);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                switch (event) {
                    case 'TOKEN_REFRESHED':
                    case 'SIGNED_IN': {
                        const user: User = session?.user ?? null;
                        setUser(user);
                        setIsAuthenticated(user !== null);
                        break;
                    }
                    case 'USER_UPDATED':
                    case 'USER_DELETED':
                    case 'SIGNED_OUT': {
                        setUser(null);
                        setIsAuthenticated(false);
                        break;
                    }
                }
            }
        );

        return () => {
            listener?.subscription.unsubscribe();
            setUser(null);
            setIsAuthenticated(false);
        };
    }, []);

    const provided: IUserContext = {
        user,
        isAuthenticated,
        signIn: (credentials: SignInWithPasswordCredentials) =>
            supabase.auth.signInWithPassword(credentials),
        signUp: (credentials: SignInWithPasswordCredentials) =>
            supabase.auth.signUp(credentials),
        signOut: () => supabase.auth.signOut(),
    };

    return (
        <AuthContext.Provider value={provided}>{children}</AuthContext.Provider>
    );
};

export { AuthContext, useAuthContext, AuthContextProvider as default };
