import { Container } from '@mui/material';
import { MessagesType } from '@/types/db_types';
import Message from './Message';
import LinearLoading from './LinearLoading';
import { useEffect, useRef } from 'react';

const Messages = ({ messages }: { messages: MessagesType }): JSX.Element => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottomOfMessages = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottomOfMessages();
    }, [messages]);

    return (
        <Container
            maxWidth={'xl'}
            style={{ padding: 0, maxHeight: '65vh', overflow: 'auto' }}
        >
            {messages ? (
                messages.map((message, idx) => (
                    <Message key={idx} message={message} />
                ))
            ) : (
                <LinearLoading />
            )}
            <div ref={messagesEndRef} />
        </Container>
    );
};

export default Messages;
