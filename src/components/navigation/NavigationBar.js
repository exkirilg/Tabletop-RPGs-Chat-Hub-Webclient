import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appsettings from "../../appsettings.json";
import { setIsAuthenticated, setToken, setName } from "../../state/slices/identity";
import { Button, Container, Nav, Navbar, NavDropdown, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Chat, ChatDots, PersonCircle } from "react-bootstrap-icons";

const NavigationBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);
    const username = useSelector(state => state.identity.name);
    const activeChats = useSelector(state => state.activeChats.value);

    const links = (quickLinks = false) => {
        let result = [];

        let i = quickLinks ? 0 : appsettings.MaxNumberOfQuickLinksInNavBar;
        let count = quickLinks ? Math.min(appsettings.MaxNumberOfQuickLinksInNavBar, activeChats.length) : activeChats.length;

        for (i; i < count; i++) {
            result.push(
                <LinkContainer to={`rooms/${activeChats[i].getName()}`} className="text-decoration-none px-3" key={i}>
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

    const handleSignout = () => {
        dispatch(setIsAuthenticated(false));
        dispatch(setToken(""));
        dispatch(setName(""));

        localStorage.removeItem("identity");

        navigate("/");
    }

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>

            <Link to="/" className="text-decoration-none">
                <Stack>
                    <Navbar.Brand className="p-0">Tabletop RPGs Chat-Hub</Navbar.Brand>

                    <Stack direction="horizontal" gap={3}>
                        <Navbar.Text className="p-0">Chats: 0</Navbar.Text>
                        <Navbar.Text className="p-0">Users: 0</Navbar.Text>
                    </Stack>
                </Stack>
            </Link>

            {
                activeChats.length > 0 &&
                <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {links(true)}

                        {
                            activeChats.length > appsettings.MaxNumberOfQuickLinksInNavBar &&
                            <NavDropdown title="other..." className="px-3 mb-3">
                                {links()}
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
                </>
            }

            <Navbar.Collapse className="justify-content-end">

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                {
                    isAuthenticated ?
                    (
                        <>
                            <Navbar.Text>
                                <PersonCircle className="me-2 mb-1" size={24} />Hi, <span className="link-dark">{username}</span>
                            </Navbar.Text>
                            <Button variant="btn btn-outline-danger" onClick={handleSignout}>Sign out</Button>
                        </>
                    )
                    :
                    (
                        <>
                            <Link to="/signup">
                                <span className="btn btn-outline-primary">Sign up</span>
                            </Link>
                            <Link to="/signin">
                                <span className="btn btn-outline-primary">Sign in</span>
                            </Link>
                        </>
                    )
                }
                </Stack>

                
            </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default NavigationBar;
