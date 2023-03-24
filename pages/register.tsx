import { Avatar, Button, Divider, Stack, TextField } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthContext } from '@/utils/AuthContext';

const EMAIL_REGEXP: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Register() {
    const [emailInput, setEmailInput] = useState<string>(null);
    const [passwordInput, setPasswordInput] = useState<string>(null);
    const [isMalformedEmail, setIsMalformedEmail] = useState<boolean>(false);
    const [isMalformedPassword, setIsMalformedPassword] =
        useState<boolean>(false);
    const { push } = useRouter();
    const { signUp } = useAuthContext();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isPasswordOK: boolean =
            passwordInput && passwordInput.length >= 6;
        const isEmailOK: boolean = emailInput && EMAIL_REGEXP.test(emailInput);

        setIsMalformedPassword(!isPasswordOK);
        setIsMalformedEmail(!isEmailOK);

        if (!isPasswordOK || !isEmailOK) return;

        const { data, error } = await signUp({
            email: emailInput,
            password: passwordInput,
        });

        if (error) {
            return console.error('error', error);
        }

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
                <title>Register Page | SampleApp</title>
            </Head>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                style={{ marginBottom: '2rem' }}
            >
                <Avatar style={{ marginRight: '1rem' }}>U</Avatar>
                <Divider variant='middle' orientation='vertical' flexItem />
                <h1 style={{ marginLeft: '1rem' }}>Register your account</h1>
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
                        error={isMalformedEmail}
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
                        error={isMalformedPassword}
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
                        Register
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
                href='/login'
                LinkComponent={Link}
                variant='text'
                style={{ width: '75%' }}
            >
                Already have an account? Login!
            </Button>
        </Stack>
    );
}

export default Register;
