import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import appsettings from "../../appsettings.json";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { createNewChat } from "../../services/APIServices";

const NewChatCard = () => {
    
    const authToken = useSelector(state => state.identity.token);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            "name": "",
            "description": ""
        }
    });

    const submit = async (data, e) => {

        e.preventDefault();

        setLoading(true);
        const result = await createNewChat({name: data.name, description: data.description, authToken: authToken});
        setLoading(false);

        setMessage(result.systemMessage);

        if (result.succeeded) {
            setShowModal(false);
            reset();
        }
    }

    return (
        <>

        <Card className="h-100 shadow-sm border-success">

            <Card.Header className="border-0 btn btn-light" onClick={() => setShowModal(true)}>
                <Card.Title className="text-center">
                    New chat...
                </Card.Title>
            </Card.Header>

            <Card.Body className="py-1 px-2">
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => { setShowModal(false); reset(); }}>
            
            <Modal.Header closeButton>
                New chat...
            </Modal.Header>

            <Modal.Body>
                
                <Form onSubmit={handleSubmit(submit)}>

                    {
                        message !== "" &&
                        <div className="mb-3 d-grid mx-auto text-center">
                            <Form.Text className="text-danger">{message}</Form.Text>
                        </div>
                    }

                    <Form.Control type="text" placeholder="Name..."
                        {...register("name", 
                            {
                                required: true,
                                minLength: appsettings.NewChatValidationRules.NameMinLength,
                                maxLength: appsettings.NewChatValidationRules.NameMaxLength
                            })
                        }
                        readOnly={loading} />
                    {
                        errors.name?.type === "required" &&
                        <div className="text-center mt-1">
                            <Form.Text className="text-danger">Name is required</Form.Text>
                        </div>
                    }
                    {
                        errors.name?.type === "minLength" &&
                        <div className="text-center mt-1">
                            <Form.Text className="text-danger">Name must be at least {appsettings.NewChatValidationRules.NameMinLength} characters long</Form.Text>
                        </div>
                    }
                    {
                        errors.name?.type === "maxLength" &&
                        <div className="text-center mt-1">
                            <Form.Text className="text-danger">Name must not be longer than {appsettings.NewChatValidationRules.NameMaxLength} characters</Form.Text>
                        </div>
                    }

                    <Form.Control type="text" as="textarea" placeholder="Description..." className="mt-3"
                        {...register("description", {maxLength: appsettings.NewChatValidationRules.DescriptionMaxLength})}
                        readOnly={loading} />
                    {
                        errors.description?.type === "maxLength" &&
                        <div className="text-center mt-1">
                            <Form.Text className="text-danger">Description must not be longer than {appsettings.NewChatValidationRules.DescriptionMaxLength} characters</Form.Text>
                        </div>
                    }
                    
                    <div className="mt-3 col-6 d-grid mx-auto">
                        <Button type="submit" variant="btn btn-success" size="lg" disabled={loading}>
                            {
                                loading ?
                                <div className="spinner-border" /> :
                                <span>Create</span>
                            }
                        </Button>
                    </div>

                </Form>

            </Modal.Body>

        </Modal>

        </>
    );
}

export default NewChatCard;
