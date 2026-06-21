

export default function notificationReducer(state = { message: null, type: null }, action) {
    let message = undefined


    switch (action.type) {
        case 'success':
            message = action.payload.message
            return { message, type: 'success' }
        case 'error':
            message = action.payload.message
            return { message, type: 'error' }

        default:
            return state
    }
}


