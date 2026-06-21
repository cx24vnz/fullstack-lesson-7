export default function activateNotification(message, type, dispatch) {
    dispatch({
        type: type,
        payload: {
            message: message,
        },
    })

    setTimeout(() => {
        dispatch({
            type: type,
            payload: {
                message: null,
            },
        })
    }, 5000)
}