import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'
const Notification = () => {
  const notificationObj = useSelector((data) => {
    return data.notification
  })

  let { message, type } = notificationObj

  if (message === null) {
    return null
  }

  let alertType = ''
  if (type == 'success') {
    alertType = 'success'
  }
  if (type == 'error') {
    alertType = 'danger'
  }

  return <Alert variant={alertType}>{message}</Alert>
}

export default Notification
