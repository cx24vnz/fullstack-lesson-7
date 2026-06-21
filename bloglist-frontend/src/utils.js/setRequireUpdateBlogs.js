export default function setRequireUpdateBlogs(value, dispatch) {
  dispatch({
    type: 'setRequireUpdateBlogs',
    payload: { requireUpdateBlogs: value }
  })
}