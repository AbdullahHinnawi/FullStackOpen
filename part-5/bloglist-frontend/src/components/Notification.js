import React from 'react';

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }
  return (
    <div id="message" style={success ? successStyles : errorStyles}>
      {message}
    </div>
  );
};

const successStyles = {
  color: 'green',
  border: '1px solid green',
  background: '#DEF1DD',
  borderRadius: 5,
  marginBottom: 16,
  padding: 10,
  width: 600,
};

const errorStyles = {
  color: '#731C23',
  border: '1px solid #731C23',
  background: '#F8D7D9',
  borderRadius: 5,
  marginBottom: 16,
  padding: 10,
  width: 600,
};

export default Notification;
