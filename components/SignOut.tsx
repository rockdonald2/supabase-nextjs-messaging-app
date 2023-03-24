import LogoutIcon from '@mui/icons-material/Logout';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { QuickActionActionType, QuickActionType } from '@/types/types';
import { useAuthContext } from '@/utils/AuthContext';

const quickActions: QuickActionType[] = [
    { icon: <LogoutIcon />, name: 'Logout', action: 'signout' },
];

export default function QuickActions() {
    const { push } = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { signOut } = useAuthContext();

    const handleAction = async (
        _e: React.MouseEvent<HTMLDivElement>,
        action: QuickActionActionType
    ) => {
        switch (action) {
            case 'signout': {
                await signOut();
                push('/login');
                break;
            }
        }
    };

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel='Quick actions dial'
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {quickActions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                            handleAction(e, action.action)
                        }
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
