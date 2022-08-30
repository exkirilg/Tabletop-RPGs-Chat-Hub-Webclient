import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Chat, ChatDots } from "react-bootstrap-icons";

const QuickLinksMaxNumber = 5;

const NavigationBar = () => {

    const activeChats = useSelector(state => state.activeChats.value);

    const quickLinks = () => {
        let result = [];

        for (let i = 0; i < QuickLinksMaxNumber && i < activeChats.length; i++) {
            result.push(
                <LinkContainer to={`rooms/${activeChats[i].getName()}`} className="text-decoration-none" key={i}>
                    <Nav.Link>
                        <span>{activeChats[i].getName()}</span>
                        {
                            activeChats[i].getHasUnreadMessages() ?
                            <ChatDots className="ms-2 mb-3" /> :
                            <Chat className="ms-2 mb-3" />
                        }
                    </Nav.Link>
                </LinkContainer>
            );
        }

        return result;
    }

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>

            <Link to="/" className="text-decoration-none">
                <Navbar.Brand>Tabletop RPGs Chat-Hub</Navbar.Brand>
            </Link>

            {
                activeChats.length &&
                <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {quickLinks()}
                    </Nav>
                </Navbar.Collapse>
                </>
            }

            <Navbar.Collapse className="text-end">
                <Stack>
                    <Navbar.Text className="p-0">Chats: 0</Navbar.Text>
                    <Navbar.Text className="p-0">Members: 0</Navbar.Text>
                </Stack>
            </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default NavigationBar;
