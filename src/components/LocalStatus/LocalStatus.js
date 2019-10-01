import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import Loader from '../Loader/Loader';
import { UPDATE_EVENT_NAME } from '../../constants/statusEvent';
import { useSocket } from '../../hooks/useSocketIo';

import './LocalStatus.scss';

const StatusButton = ({ variant, value, children, active, ...props }) => {
  return (
    <ToggleButton
      size="lg"
      value={value}
      variant={`${active ? '' : 'outline-'}${variant}`}
      active={active}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};

const LocalStatus = () => {
  const [localStatus, setLocalStatus] = useState('available');
  const [socket, connected] = useSocket();

  const handleChange = status => {
    setLocalStatus(status);
    if (socket) {
      socket.emit(UPDATE_EVENT_NAME, status);
    }
  };

  if (!connected) {
    return (
      <div className="LocalStatus__container">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="LocalStatus__container">
      <ToggleButtonGroup type="radio" name="localstatus" value={localStatus} onChange={handleChange}>
        <StatusButton variant="success" value="available">Available</StatusButton>
        <StatusButton variant="danger" value="on-air">On Air</StatusButton>
        <StatusButton variant="warning" value="do-not-disturb">Do Not Disturb</StatusButton>
      </ToggleButtonGroup>
    </div>
  );
};

LocalStatus.propTypes = {

};

export default LocalStatus;
