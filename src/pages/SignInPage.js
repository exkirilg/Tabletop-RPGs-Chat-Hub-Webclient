import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { saveIdentity, signin } from "../services/IdentityServices";
import { setIsAuthenticated, setToken, setName } from "../state/slices/identity";
import NavigationBar from "../components/navigation/NavigationBar";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import appsettings from "../appsettings.json";
import { getActiveChats, updateMember } from "../services/APIServices";
import { setActiveChats } from "../state/slices/activeChats";

const SignInPage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);
    const activeChats = useSelector(state => state.activeChats.value);
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            "email": "",
            "password": ""
        }
    });

    const submit = async (data, e) => {
        e.preventDefault();

        setLoading(true);
        const result = await signin(data);
        setLoading(false);

        setMessage(result.systemMessage);

        if (result.succeeded) {
            saveIdentity(result);

            if (activeChats.length > 0) {
                for (const chat of activeChats) {
                    chat.getMember().setUsername(result.username);
                    await updateMember({memberId: chat.getMember().getId(), authToken: result.token});
                }
            }

            dispatch(setActiveChats(await getActiveChats({ authToken: result.token })));

            dispatch(setIsAuthenticated(true));
            dispatch(setToken(result.token));
            dispatch(setName(result.username));
            
            navigate("/");
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="d-flex flex-column h-100">

        <NavigationBar />

        <Container className="mt-5 d-flex flex-fill justify-content-center">
            
            <Form className="col-6" onSubmit={handleSubmit(submit)}>

                {
                    message !== "" &&
                    <div className="mb-3 d-grid mx-auto text-center">
                        <Form.Text className="text-danger">{message}</Form.Text>
                    </div>
                }

                <FloatingLabel label="Email">
                    <Form.Control type="email" placeholder="Enter email" {...register("email", {required: true})} readOnly={loading} />
                </FloatingLabel>
                {
                    errors.email?.type === "required" &&
                    <div className="text-center mt-1">
                        <Form.Text className="text-danger">Email is required</Form.Text>
                    </div>
                }

                <FloatingLabel label="Password" className="mt-3">
                    <Form.Control type="password" placeholder="Enter password"
                        {...register("password", {required: true, minLength: appsettings.IdentityValidationRules.PasswordMinLength})} readOnly={loading} />
                </FloatingLabel>
                {
                    errors.password?.type === "required" &&
                    <div className="text-center mt-1">
                        <Form.Text className="text-danger">Password is required</Form.Text>
                    </div>
                }
                {
                    errors.password?.type === "minLength" &&
                    <div className="text-center mt-1">
                        <Form.Text className="text-danger">Password must be at least {appsettings.IdentityValidationRules.PasswordMinLength} characters long</Form.Text>
                    </div>
                }

                <div className="mt-5 col-6 d-grid mx-auto">
                    <Button type="submit" variant="btn btn-success" size="lg" disabled={loading}>
                        {
                            loading ?
                            <div className="spinner-border" /> :
                            <span>Sign in</span>
                        }
                    </Button>
                </div>

                <div className="mt-3 d-grid mx-auto text-center">
                    <Form.Text>
                        New to Tabletop RPGs Chat-Hub? <Link to="/signup" onClick={(e) => {if (loading) e.preventDefault()} }>Create an account</Link>.
                    </Form.Text>
                </div>
                
            </Form>

        </Container>

        </div>
    );
}

export default SignInPage;
