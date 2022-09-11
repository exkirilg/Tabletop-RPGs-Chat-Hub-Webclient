import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Stack } from "react-bootstrap";
import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";

const ChatMessages = ({chat}) => {

    const messages = useSelector(state => state.messages.value);

    useEffect(() => {
        const el = document.getElementById("overflow-div");
        el.scrollTo(0, el.scrollHeight)
    }, [messages]);

    return (
        <Container id="overflow-div" className="bg-light rounded flex-fill overflow-auto py-3">
            <Stack gap={3}>
            {
                messages
                .filter((msg) => msg.getChatId() === chat.getId())
                .map((msg, index) => {
                    return (
                        <div key={index}>

                        {
                            msg.getAuthor() === null &&
                            <SystemMessage message={msg} />
                        }

                        {
                            msg.getAuthor() !== null &&
                            <UserMessage chat={chat} message={msg} />
                        }

                        </div>
                    )})
            }
            </Stack>
        </Container>
    );
}

export default ChatMessages;
