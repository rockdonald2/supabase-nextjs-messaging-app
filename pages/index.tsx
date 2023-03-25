import Head from 'next/head';
import MessageInput from '@/components/MessageInput';
import { Stack } from '@mui/material';
import Messages from '@/components/Messages';
import { useMessages } from '@/utils/UseMessages';
import SignOut from '@/components/SignOut';
import { useAuthContext } from '@/utils/AuthContext';
import { PresenceContextProvider } from '@/utils/PresenceContext';

function Home(): JSX.Element {
    const { user } = useAuthContext();
    const { messages } = useMessages();
    const uniqueKey = user?.email;

    return (
        <>
            <Head>
                <title>Messaging Page | SampleApp</title>
            </Head>
            <PresenceContextProvider uniqueKey={uniqueKey}>
                <main>
                    <Stack direction={'column'} spacing={2} width={'100%'}>
                        <Messages messages={messages} />
                        <MessageInput />
                    </Stack>
                </main>
            </PresenceContextProvider>
            <SignOut />
        </>
    );
}

export default Home;
