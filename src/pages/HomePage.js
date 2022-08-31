import NavigationBar from "../components/navigation/NavigationBar";
import { Container } from "react-bootstrap";

const HomePage = () => {
    return (
        <div className="d-flex flex-column h-100">

        <NavigationBar />

        <Container className="mt-3 flex-fill">
            
        </Container>

        </div>
    );
}

export default HomePage;
