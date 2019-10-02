import React from 'react';
import classnames from 'classnames';
import onAirImage from '../../assets/on-air.jpg';

import config from '../../config';
import { UPDATE_EVENT_NAME } from '../../constants/statusEvent';
import { useSocketValue, useSocket } from '../../hooks/useSocketIo';
import Loader from "../Loader/Loader";

import './GlobalStatus.scss';

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

  const url = config.apiUrl.split(':')[0];

  return (
    <div className="GlobalStatus__container">
      <div className="GlobalStatus__address">{url}</div>
      <img className={classnames('GlobalStatus__image', { 'GlobalStatus__image--active': status === 'on-air' })} src={onAirImage} />
    </div>
  );
};

GlobalStatus.propTypes = {

};

export default GlobalStatus;
