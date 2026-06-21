
export default function blogsReducer(state = { list: [], requireUpdateBlogs: true }, action) {

    switch (action.type) {
        case 'setBlogs':

            return { list: action.payload.blogs, requireUpdateBlogs: false }

        case 'setRequireUpdateBlogs':

            return { list: state.list, requireUpdateBlogs: action.payload.requireUpdateBlogs }

        default:
            return state
    }
}
