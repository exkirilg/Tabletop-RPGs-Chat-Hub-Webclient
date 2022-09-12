import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../state/slices/chats";
import { Button, Form, InputGroup, Stack, } from "react-bootstrap";
import { Search, } from "react-bootstrap-icons";

const ChatsPanelControls = () => {
    
    const dispatch = useDispatch();

    const [currentSearch, setCurrentSearch] = useState("");

    const search = useSelector(state => state.chats.search);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearch(currentSearch));
    }
    
    return (
        <Form className="my-3 shadow-sm" onSubmit={handleSearchSubmit}>
            <Stack direction="horizontal" gap={4}>
                <InputGroup>
                    <Form.Control className="border-primary" placeholder="Search..." defaultValue={search} onChange={(e) => setCurrentSearch(e.target.value)} />
                    <Button type="submit" variant="outline-primary">
                        <Search size={24} />
                    </Button>
                </InputGroup>
            </Stack>
        </Form>
    );
}

export default ChatsPanelControls;
