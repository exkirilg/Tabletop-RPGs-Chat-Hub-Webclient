import { useSelector } from "react-redux";
import appsettings from "../../appsettings.json";
import ChatsPanelControls from "./ChatsPanelControls";
import ChatCard from "./ChatCard";
import OwnChatCard from "./OwnChatCard";
import { Col, Row  } from "react-bootstrap";

const ChatsPanel = () => {

    const ownChats = useSelector(state => state.ownChats.value);
    const chats = useSelector(state => state.chats.value);

    return (
        <>

        {
            ownChats.length > 0 &&
            <Row xs={appsettings.NumberOfChatsPerRow_xs} md={appsettings.NumberOfChatsPerRow_md} className="g-3">
                {ownChats.map((chat, index) => (
                    <Col key={index}>
                        <OwnChatCard chat={chat} />
                    </Col>
                ))}
            </Row>
        }

        <ChatsPanelControls />

        <Row xs={appsettings.NumberOfChatsPerRow_xs} md={appsettings.NumberOfChatsPerRow_md} className="g-3">
            {chats.map((chat, index) => (
                <Col key={index}>
                    <ChatCard chat={chat} />
                </Col>
            ))}
        </Row>
        
        </>
    );
}

export default ChatsPanel;
