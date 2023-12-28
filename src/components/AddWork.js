import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

const AddWork = ({ update }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

    const [workoutId, setWorkoutId] = useState("");
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");

    const navigate = useNavigate()

    const params = useParams();
    if (params["workId"] !== workoutId) {
        setWorkoutId(params["workId"]);
    }

    const { state } = useLocation();

    useEffect(() => {
        if (state !== null) {
            setTitle(state["w"]["title"]);
            setLoad(state["w"]["load"]);
            setReps(state["w"]["reps"]);
        }
    }, [state, workoutId]);

    let upd = false;
    if (update === "true") {
        upd = true;
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must logged in");
            return;
        }

        const workout = { title, load, reps };

        const postWorkout = async () => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            };

            try {
                const response = await axios.post(
                    process.env.REACT_APP_URI+"/api/workout/",
                    workout,
                    {
                        headers: headers,
                    }
                );

                dispatch({ type: "ADD_WORKOUT", payload: response.data });

                alert("Data Added Successfully!");
            } catch (error) {
                alert(error.response.data["error"]);
                setEmptyField(error.response.data["emptyField"]);
            }
        };
        postWorkout();
    };

    const handlePatchSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must logged in");
            return;
        }

        const workout = { title, load, reps };

        const patchWorkout = async () => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            };
            try {
                const response = await axios.patch(
                    process.env.REACT_APP_URI+"/api/workout/" +
                        workoutId,
                    workout,
                    {
                        headers: headers,
                    }
                );

                workout["_id"] = workoutId;
                workout["createdAt"] = response.data["createdAt"];

                dispatch({ type: "UPDATE_WORKOUT", payload: workout });

                alert("Data Updated Successfully!");

                setTitle("")
                setReps("")
                setLoad("")
                navigate("/")
                

            } catch (error) {
                alert("Fill it with ur empty brain, dumb!");
            }
        };
        patchWorkout();
    };

    return (
        <div className="t-bold white add-work-area">
            <h2 className="add-title">
                {upd ? "Edit Workout" : "Add Workout"}
            </h2>
            <Form className="text-light">
                <Form.Control
                    type="text"
                    id="inputTitle"
                    aria-describedby="inputTitle"
                    placeholder="Title"
                    value={title}
                    className={
                        emptyField.includes("title")
                            ? "error add-title-form text-light mb-2"
                            : "add-title-form text-light mb-2"
                    }
                    onChange={(e) => setTitle(e.target.value)}
                />
                <InputGroup className=" mb-2">
                    <Form.Control
                        placeholder="Load"
                        aria-label="Load"
                        value={load}
                        aria-describedby="Load"
                        type="number"
                        className={
                            emptyField.includes("load")
                                ? "error add-title-form text-light"
                                : "add-title-form text-light"
                        }
                        onChange={(e) => setLoad(e.target.value)}
                    />
                    <InputGroup.Text
                        id="Load"
                        className={
                            emptyField.includes("load")
                                ? "error add-error-group"
                                : "add-form-group"
                        }
                    >
                        Kg
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className=" mb-2">
                    <Form.Control
                        placeholder="Reps"
                        aria-label="Reps"
                        value={reps}
                        aria-describedby="Reps"
                        type="number"
                        className={
                            emptyField.includes("reps")
                                ? "error add-title-form text-light"
                                : "add-title-form text-light"
                        }
                        onChange={(e) => setReps(e.target.value)}
                    />
                    <InputGroup.Text
                        id="Reps"
                        className={
                            emptyField.includes("reps")
                                ? "error add-error-group"
                                : "add-form-group"
                        }
                    >
                        Reps
                    </InputGroup.Text>
                </InputGroup>
                {upd && (
                    <Button
                        className="add-submit add-submit-btn mb-4"
                        variant="success"
                        onClick={handlePatchSubmit}
                    >
                        Update
                    </Button>
                )}
                {!upd && (
                    <Button
                        className="add-submit add-submit-btn mb-4"
                        variant="success"
                        onClick={handlePostSubmit}
                    >
                        Add
                    </Button>
                )}
            </Form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default AddWork;
