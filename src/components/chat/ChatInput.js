import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Col, Container, InputGroup, Form, Stack, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ChatDots } from "react-bootstrap-icons";
import appsettings from "../../appsettings.json";

import d4Icon from "../../icons/d4.svg";
import d6Icon from "../../icons/d6.svg";
import d8Icon from "../../icons/d8.svg";
import d10Icon from "../../icons/d10.svg";
import d12Icon from "../../icons/d12.svg";
import d20Icon from "../../icons/d20.svg";
import d100Icon from "../../icons/d100.svg";

const ChatInput = ({member}) => {

    const connection = useSelector(state => state.connection.value);

    const [text, setText] = useState("");

    const submit = () => {
        if (text === "") {
            return;
        }

        connection.invoke(appsettings.ChatHubMethods.SendMessageRequestMethod, member.getId(), text);

        setText("");
    }

    const handleTextareaKeyPress = (e) => {
        if (e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            setText(text + "\n");
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            submit(text);
        }
    }

    const handleTextareaChange = (e) => {
        setText(e.target.value);
    }

    const handleKeyUp = (e) => {
        e.target.style.height = "auto";
        let scrollHeight = e.target.scrollHeight;
        e.target.style.height = `${scrollHeight + 1}px`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(text);
    }

    const btnsEnabled = () => {
        return text === "" || text.startsWith(appsettings.ChatCommands.RollDicePoolCommand);
    }

    const handleDiceBtn = (value) => {
        if (text.startsWith(appsettings.ChatCommands.RollDicePoolCommand) === false) {
            setText(`${appsettings.ChatCommands.RollDicePoolCommand} d${value}`);
            return;
        }
        else if (text.endsWith(`d${value}`)) {
            let diceIndex = text.lastIndexOf(`d${value}`);
            let countIndex = Math.max(
                text.lastIndexOf(appsettings.ChatCommands.RollDicePoolCommand) + appsettings.ChatCommands.RollDicePoolCommand.length,
                text.lastIndexOf(" ") + 1,
                text.lastIndexOf("/") + 1
            );
            let countAsStr = text.slice(countIndex, diceIndex);
            let count = parseInt(countAsStr) || 1;
            
            setText(
                text.slice(0, countIndex)
                + String(++count)
                + text.slice(countIndex + countAsStr.length)
            );
            return;
        }

        setText(`${text}/d${value}`);
    }

    const getDiceIcon = (value) => {
        switch (value) {
            case 4:
                return d4Icon;
            case 6:
                return d6Icon;
            case 8:
                return d8Icon;
            case 10:
                return d10Icon;
            case 12:
                return d12Icon;
            case 20:
                return d20Icon;
            case 100:
                return d100Icon;
            default:
                return null;
        }
    }

    return (
        <Container className="my-3">

        <Form onSubmit={handleSubmit}>

            {
                <div hidden={!btnsEnabled()}>
                    <InputGroup className="mb-1">
                        <Stack direction="horizontal">
                            {
                                [4, 6, 8, 10, 12, 20, 100].map((value) => (
                                    <Col key={value}>
                                        <OverlayTrigger placement={"top"} overlay={<Tooltip>{`d${value}`}</Tooltip>}>
                                            <Button variant="outline-light" className="border-0" onClick={() => handleDiceBtn(value)}>
                                                <img src={getDiceIcon(value)} alt={`d${value}`} className="w-100" style={{maxWidth: 48}} />
                                            </Button>
                                        </OverlayTrigger>
                                    </Col>
                                ))
                            }
                        </Stack>
                    </InputGroup>
                </div>
            }

            <InputGroup className="shadow-sm">
                <Form.Control id="textarea" as="textarea" wrap="soft" placeholder="Your message..." className="border-success overflow-hidden"
                    rows={1} style={{resize: "none", boxShadow: "none"}}
                    value={text} onKeyUp={handleKeyUp} onKeyPress={handleTextareaKeyPress} onChange={handleTextareaChange} />
                <Button type="submit" variant="success"><ChatDots size={24} /></Button>
            </InputGroup>
        </Form>

        </Container>
    );
}

export default ChatInput;
