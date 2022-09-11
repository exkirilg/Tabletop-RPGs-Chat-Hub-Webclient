import ChatControls from "./ChatControls";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = ({chat}) => {
    return (
        <>

        <ChatControls chat={chat} />
        <ChatMessages chat={chat} />
        <ChatInput chat={chat} member={chat.getMember()} />

        </>
    );
}

export default Chat;
