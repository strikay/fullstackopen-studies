const Notification = ({ message, notificationColor}) => {

    const notificationStyle = {
      color: notificationColor,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      margiBottom: 10,
    }
  
    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notificatio