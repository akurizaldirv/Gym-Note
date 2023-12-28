import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        
        const res = await fetch(process.env.REACT_APP_URI+"/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        const json = await res.json()

        if(!res.ok) {
            setIsLoading(false)
            setError(json.message)
        } else {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({
                type: 'LOGIN',
                payload: json
            })

            setIsLoading(false)
        }
    };
    return { signup, error, isLoading };
};

export default useSignup;
