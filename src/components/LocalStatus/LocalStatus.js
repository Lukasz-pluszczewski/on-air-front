import React, { useState, useCallback, useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton, FormControl } from 'react-bootstrap';

import Loader from '../Loader/Loader';
import { UPDATE_EVENT_NAME, UPDATE_NAME_EVENT_NAME } from '../../constants/statusEvent';
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
  const [name, setName] = useState(localStorage.getItem('on-air-name') || '');
  const [socket, connected] = useSocket();

  const handleStatusChange = useCallback(status => setLocalStatus(status), [setLocalStatus]);

  const handleNameChange = event => setName(event.target.value);

  useEffect(() => {
    if (socket && localStatus && connected) {
      socket.emit(UPDATE_EVENT_NAME, localStatus);
    }
  }, [socket, localStatus, connected]);

  useEffect(() => {
    localStorage.setItem('on-air-name', name);
    if (socket) {
      socket.emit(UPDATE_NAME_EVENT_NAME, name);
    }
  }, [socket, name, connected]);

  if (!connected) {
    return (
      <div className="LocalStatus__container">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="LocalStatus__container">
      <div className="LocalStatus__nameInputContainer">
        <FormControl placeholder="Enter name" value={name} onChange={handleNameChange} />
      </div>
      <div className="LocalStatus__statusButtonsContainer">
        <ToggleButtonGroup type="radio" name="localstatus" value={localStatus} onChange={handleStatusChange}>
          <StatusButton variant="success" value="available">Available</StatusButton>
          <StatusButton variant="danger" value="on-air">On Air</StatusButton>
          <StatusButton variant="warning" value="do-not-disturb">Do Not Disturb</StatusButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

LocalStatus.propTypes = {

};

export default LocalStatus;
