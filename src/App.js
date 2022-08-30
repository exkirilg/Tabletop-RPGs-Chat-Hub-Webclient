import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from "react-redux";
import { useEstablishConnection } from "./services/ConnectionServices";

import { Row } from "react-bootstrap";

const App = () => {

    useEstablishConnection();
    const connection = useSelector(state => state.connection.value);
    const connectionFailed = useSelector(state => state.connection.failed);
  
    return (
        <div className="App">
            
            {
                !connection && !connectionFailed &&
                <Row className="d-flex justify-content-center">
                    <div className="spinner-border m-5" role="status" />
                </Row>
            }
            
            {
                connectionFailed &&
                <div className="mt-5 text-center text-muted">
                    <h3>Sorry, connection cannot be established.</h3>
                    <h3>Please try again later.</h3>
                </div>
            }
        
        </div>
    );
}

export default App;
