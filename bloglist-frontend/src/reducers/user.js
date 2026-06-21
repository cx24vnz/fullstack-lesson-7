import { useDispatch, useSelector } from 'react-redux'

export default function userReducer(state = { user: null, username: "", password: "", users: [] }, action) {

    switch (action.type) {
        case 'setUser':

            return { ...state, user: action.payload.value }

        case 'setUsername':

            return { ...state, username: action.payload.value }

        case 'setPassword':

            return { ...state, password: action.payload.value }

        case "setUsers":

            return { ...state, users: action.payload.value }


        default:
            return state
    }
}


function createSetter(name) {

    return (value) => {
        return {
            type: name,
            payload: { value: value },
        }
    }
}

const setUsername = createSetter("setUsername")
const setUser = createSetter("setUser")
const setPassword = createSetter("setPassword")
const setUsers = createSetter("setUsers")

export { setUsername, setUser, setPassword, setUsers }

