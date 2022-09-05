import { Button, Card } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

const ChatCard = ({chat}) => {
    return (
        <Card className="h-100 shadow-sm border-success">
            <Card.Header className="border-0">
                <Card.Title className="text-center">
                    {chat.getName()}
                </Card.Title>
            </Card.Header>

            <Card.Body className="py-1 px-2">
                <Card.Text className="fst-italic">
                    {chat.getDescription()}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="pt-0 bg-body border-0">
                <Button className="shadow-sm float-end" variant="outline-success" >
                    <BoxArrowInRight size={24} />
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default ChatCard;