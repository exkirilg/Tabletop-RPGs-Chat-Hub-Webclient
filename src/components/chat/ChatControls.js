import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { BoxArrowInLeft, Link45deg, PersonFill } from "react-bootstrap-icons";
import { removeMember } from "../../services/APIServices";
import appsettings from "../../appsettings.json";
import { removeActiveChat } from "../../state/slices/activeChats";

const ChatControls = ({chat}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const connection = useSelector(state => state.connection.value);
    const authToken = useSelector(state => state.identity.token);

    const handleLeave = async () => {
        const result = await removeMember({memberId: chat.getMember().getId(), authToken: authToken});
        if (result.succeeded) {
            connection.invoke(appsettings.ChatHubMethods.LeaveChatRequestMethod, chat.getMember().getId());
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

                <Stack>
                    <span className="ms-auto"><PersonFill size={24} /> You have joined as <b>{chat.getMember().getNickname()}</b>.</span>
                    <Button className="ms-auto" variant="btn btn-outline-danger" size="sm" onClick={handleLeave}>
                        <BoxArrowInLeft size={24} /> Leave
                    </Button>
                </Stack>

            </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default ChatControls;
