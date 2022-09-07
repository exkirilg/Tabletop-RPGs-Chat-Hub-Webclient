import ChatControls from "./ChatControls";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = ({chat}) => {
    return (
        <>

        <ChatControls chat={chat} />
        <ChatMessages />
        <ChatInput />

        </>
    );
}

export default Chat;
