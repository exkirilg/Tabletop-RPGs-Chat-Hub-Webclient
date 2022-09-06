import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveChat from "../models/Chat";
import { getChatInfo } from "../services/APIServices";
import ChatControls from "../components/chat/ChatControls";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import { Row, Stack } from "react-bootstrap";

const ChatPage = () => {
    
    const navigate = useNavigate();

    const {chatId} = useParams();

    const [chat, setChat] = useState(null);
    
    useEffect(() => {

        const getChat = async () => {
            const result = await getChatInfo(chatId);
            if (result.succeeded === false) throw new Error();
            setChat(new ActiveChat(result.info.id, result.info.name, result.info.author, result.info.description));
        }

        getChat().catch(() => navigate("/"));
        
    }, [chatId])

    return (
        <div className="d-flex flex-column h-100">

        {
            chat === null &&
            <Row className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status" />
            </Row>
        }

        {
            chat !== null &&
            <Stack>
                <ChatControls chat={chat} />
                <ChatMessages />
                <ChatInput />
            </Stack>
        }

        </div>
    );
}

export default ChatPage;
