import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        
        const res = await fetch(process.env.REACT_APP_URI+"/api/user/login", {
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
    return { login, error, isLoading };
};

export default useLogin;
