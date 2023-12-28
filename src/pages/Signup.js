import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useSignup from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup(email, password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password)
    };

    return (
        <>
            <div className="signup-area bg-trans">
                <h2 className="text-white mb-4">Signup</h2>
                <Form className="text-light">
                    <Form.Control
                        type="email"
                        id="inputEmail"
                        aria-describedby="inputEmail"
                        placeholder="Email"
                        value={email}
                        className="text-light mb-3 signup-form"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        id="inputPassword"
                        aria-describedby="inputPassword"
                        placeholder="Password"
                        value={password}
                        className="text-light mb-3 signup-form"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        disabled={isLoading}
                        className="add-submit add-submit-btn"
                        variant="success"
                        onClick={handleSubmit}
                    >
                        Signup
                    </Button>
                </Form>
                {error && <div className="error">{error}</div>}
                <p className="text-white mt-2">
                    already have account?{" "}
                    <a className="t-bold" href="/login">
                        {" "}
                        login here
                    </a>
                </p>
            </div>
        </>
    );
};

export default Signup;
