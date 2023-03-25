import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { MessagesType, MessageType } from '@/types/db_types';

let messageListener: RealtimeChannel = null;

export const useMessages = () => {
    const [newMessage, handleNewMessage] = useState<MessageType>(
        null as MessageType
    );
    const [messages, setMessages] = useState<MessagesType>(
        null as MessagesType
    );

    useEffect(() => {
        fetchMessages(setMessages);

        messageListener = supabase.channel('realtime:public:messages');

        messageListener.on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
            },
            (payload) => {
                handleNewMessage(payload.new as MessageType);
            }
        );

        messageListener.subscribe();

        return () => {
            messageListener.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!newMessage) return;

        const handleAsync = async () => {
            setMessages([...messages, newMessage]);
        };

        handleAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage]);

    return {
        messages,
    };
};

const fetchMessages = async (
    setState?: Dispatch<SetStateAction<MessagesType>>
) => {
    let { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('error', error);
    }

    if (setState) {
        setState(data as MessagesType);
    }
};
