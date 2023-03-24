import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuthContext } from '@/utils/AuthContext';
import { MessageType } from '@/types/db_types';

function MessageInput(): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const { user } = useAuthContext();

    const captureMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.target.value);
    };

    const sendMessage = async (
        _e: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        const { data, error } = await supabase.from('messages').insert({
            msg: message,
            author: user?.email ?? 'Unknown',
        } as MessageType);

        if (error) {
            console.error('error', error);
        }

        setMessage('');
    };

    return (
        <>
            <Grid container spacing={0} alignItems={'stretch'}>
                <Grid item xs={10}>
                    <TextField
                        label='Message...'
                        variant='outlined'
                        margin='none'
                        autoComplete='off'
                        style={{
                            width: '98%',
                        }}
                        onChange={captureMessage}
                        multiline
                        autoFocus
                        value={message}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant='outlined'
                        endIcon={<SendIcon />}
                        aria-label='send'
                        fullWidth
                        type='button'
                        size='large'
                        style={{
                            height: '100%',
                        }}
                        onClick={sendMessage}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default MessageInput;
