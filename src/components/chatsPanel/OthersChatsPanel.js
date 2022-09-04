import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import appsettings from "../../appsettings.json";
import ChatCard from "./ChatCard";
import { setSearch } from "../../state/slices/chats";
import { Button, Col, Form, InputGroup, Stack, Row  } from "react-bootstrap";
import { Search, } from "react-bootstrap-icons";

const OthersChatsPanel = () => {
    
    const dispatch = useDispatch();

    const [currentSearch, setCurrentSearch] = useState("");

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);
    const ownChats = useSelector(state => state.ownChats.value);
    const chats = useSelector(state => state.chats.value);
    const search = useSelector(state => state.chats.search);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearch(currentSearch));
    }

    const createNewChat = () => {
        console.log("New chat");
    }

    return (
        <>

        <div className="bg-light my-3 py-1 rounded">
            <h3 className="text-center">Other chats</h3>
        </div>

        <Form className="my-3" onSubmit={handleSearchSubmit}>
            <Stack direction="horizontal" gap={4}>

                {
                    isAuthenticated && ownChats.length < appsettings.MaxNumberOfOwnChats &&
                    <Button variant="outline-success" onClick={createNewChat}>
                        New chat...
                    </Button>
                }   

                <InputGroup>
                    <Form.Control className="" placeholder="Search..." defaultValue={search} onChange={(e) => setCurrentSearch(e.target.value)} />
                    <Button type="submit" variant="outline-primary">
                        <Search size={24} />
                    </Button>
                </InputGroup>
            </Stack>
        </Form>

        <Row xs={appsettings.NumberOfChatsPerRow_xs} md={appsettings.NumberOfChatsPerRow_md} className="g-3">
            {chats.map((chat, index) => (
                <Col key={index}>
                    <ChatCard chat={chat} />
                </Col>
            ))}
        </Row>

        </>
    );
}

export default OthersChatsPanel;
