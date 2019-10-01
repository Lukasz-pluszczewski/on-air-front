import React from 'react';
import classnames from 'classnames';
import onAirImage from '../../assets/on-air.jpg';

import { UPDATE_EVENT_NAME } from '../../constants/statusEvent';
import { useSocketValue, useSocket } from '../../hooks/useSocketIo';

import './GlobalStatus.scss';
import Loader from "../Loader/Loader";

const GlobalStatus = () => {
  const [socket, connected] = useSocket();
  const status = useSocketValue(UPDATE_EVENT_NAME);

  if (!connected) {
    return (
      <div className="LocalStatus__container">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="GlobalStatus__container">
      <img className={classnames('GlobalStatus__image', { 'GlobalStatus__image--active': status === 'on-air' })} src={onAirImage} />
    </div>
  );
};

GlobalStatus.propTypes = {

};

export default GlobalStatus;
