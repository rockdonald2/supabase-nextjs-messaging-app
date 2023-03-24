type MessageType = {
    author: string;
    msg: string;
    id: number;
};

type MessagesType = MessageType[];

export { type MessageType, type MessagesType };
