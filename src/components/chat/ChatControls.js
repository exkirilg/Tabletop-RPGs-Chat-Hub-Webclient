import { Link } from "react-router-dom";
import { Button, Container, Navbar, Stack } from "react-bootstrap";
import { BoxArrowInLeft, PersonFill } from "react-bootstrap-icons";

const ChatControls = ({chat}) => {

    const handleLeave = () => {
        console.log("Leave");
    }

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
            <Container>

            <Stack>
                <Link to="/" className="text-decoration-none">
                    <Navbar.Brand>Tabletop RPGs Chat-Hub</Navbar.Brand>
                </Link>
                <Navbar.Brand>{chat.getName()}</Navbar.Brand>
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
