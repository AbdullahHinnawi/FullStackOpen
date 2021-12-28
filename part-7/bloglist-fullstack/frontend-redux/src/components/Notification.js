import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  return (
    <div>
      {notification.message && (
        <div>
          <Alert
            style={alertStyles}
            variant={notification.success ? 'success' : 'danger'}
          >
            {notification.message}
          </Alert>
        </div>
      )}
    </div>
  );
};

const alertStyles = {
  borderRadius: 5,
  marginBottom: 16,
  padding: 10,
  width: 600,
};

export default Notification;
