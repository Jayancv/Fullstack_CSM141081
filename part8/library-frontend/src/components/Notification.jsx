const Notification = ({errorMessage, isError}) => {
  if ( !errorMessage ) {
    return null
  }
  const messageStyle = {
			color: "green",
			background: "lightgrey",
			fontSize: "20px",
			borderStyle: "solid",
			width: "25%",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		}
		const errorStyle = {
			color: "red",
			background: "lightgrey",
			fontSize: "20px",
			borderStyle: "solid",
			width: "25%",
			borderRadius: "5px",
			padding: "10px",
			marginBottom: "10px",
		}

  return ( 
  <div style={isError ? errorStyle : messageStyle}>
    {errorMessage}
  </div>
  )}

export default Notification