import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNotification } from '../reducers/notificationReducer';

const Notification = (props) => {
  useEffect(() => {
    props.fetchNotification();
  }, [props]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    props.notification.message && (
      <div style={style}>{props.notification.message}</div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  fetchNotification,
};

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
export default ConnectedNotification;
