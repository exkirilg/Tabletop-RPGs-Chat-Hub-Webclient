import { Card, Col, Row, Stack } from "react-bootstrap";

const UserMessage = ({chat, message}) => {

    const isOwnMessage = () => {
        return chat.getMember().getId() === message.getAuthorId();
    }

    const getCardClassName = () => {
        if (isOwnMessage()) {
            return "d-flex ms-auto w-50";
        }
        else {
            return "d-flex me-auto w-50";
        }
    }

    const getCardBgColor = () => {
        if (isOwnMessage()) {
            return "#cee5d0";
        }
        else {
            return "#daeaf1";
        }
    }
    
    return (
        <div className="d-flex">

            <Stack>

            {
                isOwnMessage() === false &&
                <h6 className="ms-3">
                    {message.getAuthor()}
                </h6>
            }

            <Card className={getCardClassName()} style={{minHeight: "6em"}}>

                <Card.Body className="py-1 px-3 text-break" style={{background: getCardBgColor()}}>
                    {message.getTextContent()}
                    <Row className="g-2">
                        {
                            message.getDicePoolRoll().map((roll) => (
                            <Col key={roll.getPosition()}>
                                <div className="text-center bg-light p-2 rounded">
                                    <h6>{roll.getDice()}</h6>
                                    <hr className="my-1" />
                                    {roll.getResult()}
                                </div>
                            </Col>  
                            ))
                        }
                    </Row>
                </Card.Body>

                <Card.Footer className="text-muted d-flex justify-content-end p-1" style={{fontSize: "0.8em"}}>
                    {message.getDateTimeCreated().toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                </Card.Footer>

            </Card>

            </Stack>
        </div>
    );
}

export default UserMessage;
