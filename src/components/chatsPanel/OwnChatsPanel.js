import { useSelector } from "react-redux";
import appsettings from "../../appsettings.json";
import ChatCard from "./ChatCard";
import { Col, Row  } from "react-bootstrap";

const OwnChatsPanel = () => {

    const ownChats = useSelector(state => state.ownChats.value);

    return (
        <>
        {
            ownChats.length > 0 &&
            <>
            <div className="bg-light my-3 py-1 rounded">
                <h3 className="text-center">Your chats</h3>
            </div>
            
            <Row xs={appsettings.NumberOfChatsPerRow_xs} md={appsettings.NumberOfChatsPerRow_md} className="g-3">
                {ownChats.map((chat, index) => (
                    <Col key={index}>
                        <ChatCard chat={chat} />
                    </Col>
                ))}
            </Row>
            </>
        }
        </>
    );
}

export default OwnChatsPanel;
