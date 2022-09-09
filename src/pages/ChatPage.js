import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ActiveChat from "../models/ActiveChat";
import Member from "../models/Member";
import { createNewMember, getChatInfo } from "../services/APIServices";
import Chat from "../components/chat/Chat";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import appsettings from "../appsettings.json";
import { addActiveChat } from "../state/slices/activeChats";

const ChatPage = () => {
    
    const {chatId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeChats = useSelector(state => state.activeChats.value);
    const connection = useSelector(state => state.connection.value);
    const authToken = useSelector(state => state.identity.token);
    const username = useSelector(state => state.identity.name);

    const [chat, setChat] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            "nickname": username
        }
    });

    useEffect(() => {

        const getChat = async () => {

            const aChat = activeChats.filter(chat => chat.getId() === chatId)[0];
            if (aChat) {
                setChat(aChat);
            }
            else {
                const result = await getChatInfo(chatId);
                if (result.succeeded === false) throw new Error();
                setChat(new ActiveChat(result.info.id, result.info.name, result.info.author, result.info.description));
            }
        }

        setLoading(true);
        getChat().catch(() => navigate("/"));
        setLoading(false);
        
    }, [chatId, navigate])

    useEffect(() => {
        if (chat !== null && !chat.getMember()) {
            setShowModal(true);
        }
    }, [chat])

    const submit = async (data, e) => {

        e.preventDefault();

        setLoading(true);
        const result = await createNewMember({chatId: chat.getId(), nickname: data.nickname, authToken: authToken});
        setLoading(false);

        setMessage(result.systemMessage);

        if (result.succeeded) {
            chat.setMember(new Member(result.info.id, result.info.chatId, result.info.username, result.info.nickname));
            connection.invoke(appsettings.ChatHubMethods.JoinChatRequestMethod, chat.getMember().getId());
            dispatch(addActiveChat(chat));

            setShowModal(false);
            reset();
        }
    }

    return (
        <div className="d-flex flex-column h-100">

        {
            chat === null &&
            <Row className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status" />
            </Row>
        }

        {
            chat !== null && chat.getMember() &&
            <Chat chat={chat} />
        }

        {
            chat !== null &&
            <Modal show={showModal} onHide={() => { setShowModal(false); reset(); navigate("/"); }}>
            
                <Modal.Header closeButton>
                    {chat.getName()}
                </Modal.Header>

                <Modal.Body>
                    
                    <Form onSubmit={handleSubmit(submit)}>

                        {
                            message !== "" &&
                            <div className="mb-3 d-grid mx-auto text-center">
                                <Form.Text className="text-danger">{message}</Form.Text>
                            </div>
                        }


                        <Form.Group>
                            <Form.Label>Your nickname</Form.Label>
                            <Form.Control type="text" placeholder="Your nickname..." {...register("nickname", { required: true })} readOnly={loading} />
                            {
                                errors.nickname?.type === "required" &&
                                <div className="text-center mt-1">
                                    <Form.Text className="text-danger">Nickname is required</Form.Text>
                                </div>
                            }
                        </Form.Group>
                        
                        <div className="mt-3 col-6 d-grid mx-auto">
                            <Button type="submit" variant="btn btn-success" size="lg" disabled={loading}>
                                {
                                    loading ?
                                    <div className="spinner-border" /> :
                                    <CheckLg size={32} />
                                }
                            </Button>
                        </div>

                    </Form>

                </Modal.Body>

            </Modal>
        }

        </div>
    );
}

export default ChatPage;
