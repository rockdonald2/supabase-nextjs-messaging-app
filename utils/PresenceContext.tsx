import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';
import { RealtimeChannel, RealtimePresenceState } from '@supabase/supabase-js';

const PresenceContext = createContext(null);
const usePresenceContext = () =>
    useContext<{
        presenceState: RealtimePresenceState<{}>;
    }>(PresenceContext);

let presenceListener: RealtimeChannel = null;

const PresenceContextProvider = ({ children, uniqueKey }) => {
    const [presenceState, setPresenceState] =
        useState<RealtimePresenceState<{}>>();

    useEffect(() => {
        presenceListener = supabase.channel('realtime:presence', {
            config: {
                presence: {
                    key: uniqueKey,
                },
            },
        });

        presenceListener
            .on('presence', { event: 'sync' }, () => {
                setPresenceState({...presenceListener.presenceState()}); // returns the current state of the presence
            })
            .on('presence', { event: 'join' }, ({ key, newPresences }) => {
                setPresenceState({...presenceListener.presenceState()}); // we need to create a new object because otherwise the component won't rerender
            })
            .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
                setPresenceState({...presenceListener.presenceState()});
            });

        presenceListener.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await presenceListener.track({
                    user: uniqueKey,
                    online_at: new Date().toISOString(),
                });
            }
        });

        return () => {
            presenceListener.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uniqueKey]);

    const provided: {
        presenceState: RealtimePresenceState<{}>;
    } = {
        presenceState,
    };

    return (
        <PresenceContext.Provider value={provided}>
            {children}
        </PresenceContext.Provider>
    );
};

export { PresenceContext, usePresenceContext, PresenceContextProvider };
