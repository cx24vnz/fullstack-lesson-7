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
import { Table } from 'react-bootstrap'

function UserList(props) {
  const { users, user } = props

  if (!user) {
    return null
  }

  return (
    <div>
      <h1> Users </h1>

      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            return (
              <tr key={'row' + user.id}>
                <td key={'tdName' + user.id}>
                  <Link to={'/users/' + user.id}>{user.username}</Link>
                </td>
                <td key={'tdBlogs' + user.id}> {user.blogs?.length ?? 0}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
