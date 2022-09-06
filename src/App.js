import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from "react-redux";
import { useRestoreIdentity } from "./services/IdentityServices";
import { useEstablishConnection } from "./services/ConnectionServices";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import NotFoundPage from "./pages/NotFoundPage";

import { Row } from "react-bootstrap";

const App = () => {

    useRestoreIdentity();
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
                <div className="mt-5 text-center">
                    <h3>Sorry, connection cannot be established.</h3>
                    <h3>Please try again later.</h3>
                </div>
            }
            
            {
                connection &&
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/chat/:chatId" element={<ChatPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            }
        
        </div>
    );
}

export default App;
