/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Divider, Stack, TextField } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/utils/AuthContext';

function Register() {
    const [emailInput, setEmailInput] = useState<string>(null);
    const [passwordInput, setPasswordInput] = useState<string>(null);
    const [isBadLogin, setIsBadLogin] = useState<boolean>(false);
    const { push } = useRouter();
    const { signIn } = useAuthContext();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data, error } = await signIn({
            email: emailInput,
            password: passwordInput,
        });

        if (error) {
            setIsBadLogin(true);
            return console.error('error', error);
        }

        setIsBadLogin(false);
        push('/');
    };

    return (
        <Stack
            width={'100%'}
            direction={'column'}
            spacing={2}
            alignItems={'center'}
        >
            <Head>
                <title>Login Page | SampleApp</title>
            </Head>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                style={{ marginBottom: '2rem' }}
            >
                <Avatar style={{ marginRight: '1rem' }}>U</Avatar>
                <Divider variant='middle' orientation='vertical' flexItem />
                <h1 style={{ marginLeft: '1rem' }}>Login with your account</h1>
            </Stack>
            <form
                style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
                onSubmit={handleSubmit}
            >
                <Stack
                    width={'100%'}
                    direction={'column'}
                    spacing={2}
                    alignItems={'center'}
                >
                    <TextField
                        label='E-mail'
                        variant='outlined'
                        margin='none'
                        style={{
                            width: '75%',
                        }}
                        type='text'
                        onChange={handleEmail}
                        helperText='Should be in format of smth@domain.ex'
                        error={isBadLogin}
                    />
                    <TextField
                        id='outlined-password-input'
                        label='Password'
                        type='password'
                        style={{
                            width: '75%',
                        }}
                        onChange={handlePassword}
                        helperText='Should be at least 6 characters'
                        error={isBadLogin}
                    />
                    <Button
                        variant='outlined'
                        aria-label='register'
                        type='submit'
                        size='large'
                        style={{
                            height: '100%',
                            width: '75%',
                        }}
                    >
                        Login
                    </Button>
                </Stack>
            </form>
            <Divider
                flexItem
                style={{
                    width: '75%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            />
            <Button
                href='/register'
                LinkComponent={Link}
                variant='text'
                style={{ width: '75%' }}
            >
                You don't have an account yet? Register now!
            </Button>
        </Stack>
    );
}

export default Register;
