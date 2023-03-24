import { Avatar, Container, Divider, Paper, Stack, Badge, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MessageType } from '@/types/db_types';
import { useAuthContext } from '@/utils/AuthContext';
import { usePresenceContext } from '@/utils/PresenceContext';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    lineHeight: '2.5em',
    padding: '.5rem 1rem',
    maxWidth: '100%',
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}));

function Message({ message }: { message: MessageType }): JSX.Element {
    const { user } = useAuthContext();
    const { presenceState } = usePresenceContext();

    return (
        <Container maxWidth={'xl'} style={{ padding: '.75rem 0' }}>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-start'}
            >
                {presenceState && (
                    <StyledBadge
                        overlap='circular'
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant={
                            Object.keys(presenceState).includes(message.author)
                                ? 'dot'
                                : 'standard'
                        }
                    >
                        <Tooltip title={message.author}>
                            <Avatar>
                                {message.author.substring(0, 2).toUpperCase()}
                            </Avatar>
                        </Tooltip>
                    </StyledBadge>
                )}

                <Divider
                    variant='middle'
                    orientation='vertical'
                    flexItem
                    style={{ margin: '0 1rem' }}
                />
                <Item
                    style={{
                        borderBottom:
                            message.author === user?.email
                                ? '2px solid rgb(144, 202, 249)'
                                : '2px solid lightgrey',
                    }}
                >
                    {message.msg}
                </Item>
            </Stack>
        </Container>
    );
}

export default Message;
