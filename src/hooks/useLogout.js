import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: workoutDispatch} = useWorkoutsContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type: 'LOGOUT', payload: null})
    };
    return {logout};
};

export default useLogout;
