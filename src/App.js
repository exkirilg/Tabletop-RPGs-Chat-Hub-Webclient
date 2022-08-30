import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import establishConnection from "./services/ConnectionServices";
import { setConnection } from "./state/slices/connection";

import { Row } from "react-bootstrap";

const App = () => {
  
  const dispatch = useDispatch();

  const connection = useSelector(state => state.connection.value);
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {

    const tryConnect = async () => {
      try {
        dispatch(setConnection(await establishConnection()));
      }
      catch (e) {
        setConnectionFailed(true);
        console.log(e);
      }
    }

    if (!connection) {
        tryConnect();
    }

  }, [connection, dispatch])

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
