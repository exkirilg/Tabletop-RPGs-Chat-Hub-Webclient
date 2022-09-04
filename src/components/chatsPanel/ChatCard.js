import { Button, Card } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

const ChatCard = ({chat}) => {
    return (
        <Card className="h-100 mb-3 shadow-sm">
            <Card.Header>
                <Card.Title>
                    {chat.getName()}
                </Card.Title>

                <div className="text-muted text-end">
                    {`by ${chat.getAuthor()}`}
                </div>
            </Card.Header>

            <Card.Body>
                <Card.Text>
                    {chat.getDescription()}
                </Card.Text>
            </Card.Body>

            <Card.Footer>
                <Button className="shadow-sm float-end" variant="outline-primary" >
                    <BoxArrowInRight size={24} />
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default ChatCard;
