import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import notification from './reducers/notification'
import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'

const reducer = combineReducers({
  notification: notification,
  blogs: blogsReducer,
  userData: userReducer,
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)
