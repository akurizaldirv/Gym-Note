
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import CardInfo from "../components/CardInfo";
import AddWork from "../components/AddWork";
import { BounceLoader } from "react-spinners";

import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext"

const Home = ({ update }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const { workouts, dispatch } = useWorkoutsContext();
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_URI+"/api/workout/", {
                      headers: {
                        'Authorization': `Bearer ${user.token}`
                      }
                    }
                );
                if (response.status) {
                    dispatch({ type: "SET_WORKOUTS", payload: response.data });
                    setIsLoaded(true);
                }
            } catch (error) {
                alert(error.message);
            }
        };

        if (user){
          fetchWorkouts()
        }
    }, [dispatch, user]);

    return (
        <div>
            <Row>
                <Col className="col-md-8 col-sm-12 col-12 order-sm-2 order-md-1 order-2">
                    {!isLoaded && (
                        <div className="load-space">
                            <BounceLoader
                                color="#03c945"
                                className="spinner align-middle"
                            />
                        </div>
                    )}
                    {isLoaded && (
                        <div>
                            {workouts &&
                                workouts.map((workout) => (
                                    <CardInfo
                                        key={workout._id}
                                        workout={workout}
                                    />
                                ))}
                        </div>
                    )}
                </Col>
                <Col className="col-md-4 col-sm-12 col-12 order-sm-1 order-md-2 order-1">
                    <AddWork update={update} />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
