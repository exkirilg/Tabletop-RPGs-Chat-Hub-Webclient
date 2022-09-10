import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { BoxArrowInLeft, Link45deg, PersonFill, XLg } from "react-bootstrap-icons";
import { removeChat, removeMember } from "../../services/APIServices";
import appsettings from "../../appsettings.json";
import { removeActiveChat } from "../../state/slices/activeChats";
import { useState } from "react";

const ChatControls = ({chat}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const connection = useSelector(state => state.connection.value);
    const authToken = useSelector(state => state.identity.token);
    const username = useSelector(state => state.identity.username);

    const [loading, setLoading] = useState(false);

    const handleLeave = async () => {
        const result = await removeMember({memberId: chat.getMember().getId(), authToken: authToken});
        if (result.succeeded) {
            connection.invoke(appsettings.ChatHubMethods.LeaveChatRequestMethod, chat.getMember().getId());
            dispatch(removeActiveChat(chat.getId()));

            navigate("/");
        }
    }

    const handleDeleteChat = async () => {
        setLoading(true);
        const result = await removeChat({chatId: chat.getId(), authToken: authToken});
        setLoading(false);

        if (result.systemMessage) alert(result.systemMessage);

        if (result.succeeded) {
            dispatch(removeActiveChat(chat.getId()));
            navigate("/");
        }
    }

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
            <Container>

            <Stack>
                <Link to="/" className="text-decoration-none">
                    <Navbar.Brand>Tabletop RPGs Chat-Hub</Navbar.Brand>
                </Link>
                <Navbar.Brand>
                    {chat.getName()}
                    <Button variant="link" style={{boxShadow: "none"}} onClick={() => navigator.clipboard.writeText(window.location.href)}>
                        <Link45deg size={24} />
                    </Button>
                </Navbar.Brand>
            </Stack>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse className="ms-auto">

                <Stack gap={1}>
                    <span className="ms-auto"><PersonFill size={24} /> You have joined as <b>{chat.getMember().getNickname()}</b>.</span>
                    <Stack direction="horizontal" gap={2} className="ms-auto">
                        <Button variant="btn btn-outline-primary" size="sm" onClick={handleLeave} readOnly={loading}>
                            <BoxArrowInLeft size={24} /> Leave
                        </Button>
                        {
                            chat.getAuthor() === username &&
                            <Button variant="btn btn-outline-danger" size="sm" onClick={handleDeleteChat} readOnly={loading}>
                                <XLg size={24} /> Delete chat
                            </Button>
                        }
                    </Stack>
                </Stack>

            </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default ChatControls;
