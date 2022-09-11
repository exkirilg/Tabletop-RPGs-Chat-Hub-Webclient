import { Col, Row } from "react-bootstrap";

const SystemMessage = ({message}) => {
    return (
        <>
        <Row className="justify-content-center">
            <Col className="col-auto">
                <h6>{message.getTextContent()}</h6>
            </Col>
        </Row>

        <Row className="justify-content-center">
            <hr className="m-0 w-50" />
        </Row>

        <Row className="justify-content-end w-50 mx-auto">
            <Col className="col-auto text-muted" style={{fontSize: "0.8em"}}>
                {message.getDateTimeCreated().toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"})}
            </Col>
        </Row>
        </>
    );
}

export default SystemMessage;
