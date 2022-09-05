import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import appsettings from "../../appsettings.json";
import { setSearch } from "../../state/slices/chats";
import { Button, Form, InputGroup, Stack, } from "react-bootstrap";
import { Search, } from "react-bootstrap-icons";

const ChatsPanelControls = () => {
    
    const dispatch = useDispatch();

    const [currentSearch, setCurrentSearch] = useState("");

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);
    const search = useSelector(state => state.chats.search);
    const ownChats = useSelector(state => state.ownChats.value);

    const createNewChat = () => {
        console.log("New chat");
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearch(currentSearch));
    }
    
    return (
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
    );
}

export default ChatsPanelControls;
