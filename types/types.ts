import {
    AuthError,
    AuthResponse,
    SignInWithPasswordCredentials,
    User,
} from '@supabase/supabase-js';

interface IUserContext {
    user: User;
    isAuthenticated: boolean;
    signUp: (
        credentials: SignInWithPasswordCredentials
    ) => Promise<AuthResponse>;
    signIn: (
        credentials: SignInWithPasswordCredentials
    ) => Promise<AuthResponse>;
    signOut: () => Promise<{ error: AuthError }>;
}

type QuickActionActionType = 'signout';

type QuickActionType = {
    icon: any;
    name: string;
    action: QuickActionActionType;
};

export { type IUserContext, type QuickActionType, type QuickActionActionType };
