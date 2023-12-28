import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    };

    return (
        <>
            <div className="login-area bg-trans">
                <h2 className="text-white mb-4">Login</h2>
                <Form className="text-light">
                    <Form.Control
                        type="email"
                        id="inputEmail"
                        aria-describedby="inputEmail"
                        placeholder="Email"
                        value={email}
                        className="text-light mb-3 login-form"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        id="inputPassword"
                        aria-describedby="inputPassword"
                        placeholder="Password"
                        value={password}
                        className="text-light mb-3 login-form"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className="add-submit add-submit-btn"
                        variant="success"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                </Form>
                {error && <div className="error">{error}</div>}
                <p className="text-white mt-2">
                    not registered yet?
                    <a className="t-bold" href="/signup">
                        {" "}
                        signup here
                    </a>
                </p>
            </div>
        </>
    );
};

export default Login;
