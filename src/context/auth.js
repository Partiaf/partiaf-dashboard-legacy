// import { createContext, useReducer } from "react"

// const initialState = {
//     user: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null
// }

// if (localStorage.getItem("userInfo")) {
//     initialState.user = JSON.parse(localStorage.getItem("userInfo"))
//     console.log(initialState.user)
// }

// const AuthContext = createContext({
//     user: null,
//     login: (userData) => {},
//     logout: () => {}
// })

// const authReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN':
//             return {
//                 ...state,
//                 user: action.payload
//             };
//         case 'LOGOUT':
//             return {
//                 ...state,
//                 user: null
//             };
//         default:
//             return state;
//     }
// }

// const AuthProvider = (props) => {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     const login = (userData) => {
//         console.log("AuhtProvider", userData)
//         localStorage.setItem("userInfo", userData)
//         dispatch({type: "LOGIN", payload: userData})
//     }

//     const logout = () => {
//         localStorage.removeItem("userInfo");
//         dispatch({type: "LOGOUT"})
//     }

//     console.log(AuthContext)

//     return (
//         <AuthContext.Provider value={{user: state.user, login, logout}}
//         {...props} />
//     )

// }

// export { AuthContext, AuthProvider };
