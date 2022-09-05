import NavigationBar from "../components/navigation/NavigationBar";
import ChatsPanel from "../components/chatsPanel/ChatsPanel";
import { Container } from "react-bootstrap";

const HomePage = () => {
    return (
        <div className="d-flex flex-column h-100">

        <NavigationBar />

        <Container className="flex-fill my-3">
            <ChatsPanel />
        </Container>

        </div>
    );
}

export default HomePage;
