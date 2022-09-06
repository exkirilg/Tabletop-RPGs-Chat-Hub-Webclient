import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ChatCard = ({chat}) => {

    return (
        <Card className="h-100 shadow-sm border-primary">

            <LinkContainer to={`/chat/${chat.getId()}`} className="btn btn-light">
                <Card.Header className="border-0">
                    <Card.Title className="text-center">
                        {chat.getName()}
                    </Card.Title>

                    <div className="text-muted text-end">
                        {`by ${chat.getAuthor()}`}
                    </div>
                </Card.Header>
            </LinkContainer>

            <Card.Body className="p-3">
                <Card.Text className="fst-italic">
                    {chat.getDescription()}
                </Card.Text>
            </Card.Body>

        </Card>
    );
}

export default ChatCard;
