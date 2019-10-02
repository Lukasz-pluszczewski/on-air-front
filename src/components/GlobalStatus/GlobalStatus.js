import React from 'react';
import classnames from 'classnames';
import onAirImage from '../../assets/on-air.jpg';

import config from '../../config';
import { UPDATE_EVENT_NAME, USERS_UPDATE_EVENT_NAME } from '../../constants/statusEvent';
import { useSocketValue, useSocket } from '../../hooks/useSocketIo';
import Loader from "../Loader/Loader";

import './GlobalStatus.scss';

const UserListItem = ({ user }) => {
  return (
    <div
      className={classnames('GlobalStatus__userListItem', `GlobalStatus__userListItem--status-${user.status || ''}`)}
    >
      {user.name}
    </div>
  );
};

const UserList = ({ users }) => {
  return (
    <div className="GlobalStatus__userList">
      {users.map(user => (
        <UserListItem key={user.id} user={user}/>
      ))}
    </div>
  );
};

const GlobalStatus = () => {
  const [socket, connected] = useSocket();
  const status = useSocketValue(UPDATE_EVENT_NAME);
  const users = useSocketValue(USERS_UPDATE_EVENT_NAME, []);

  if (!connected) {
    return (
      <div className="GlobalStatus__container">
        <Loader/>
      </div>
    );
  }

  const url = config.apiUrl.split(':')[0];

  // const fakeUsers = [
  //   { id: '1', name: 'Zbigniew', status: 'on-air'},
  //   { id: '2', name: 'Andrzej', status: 'available'},
  //   { id: '3', name: 'Włodzimierz', status: 'on-air'},
  //   { id: '4', name: 'Władysław', status: 'do-not-disturb'},
  // ];

  return (
    <div className="GlobalStatus__container">
      <div className="GlobalStatus__address">{url}</div>
      <div className="GlobalStatus__imageContainer">
        <img className={classnames('GlobalStatus__image', { 'GlobalStatus__image--active': status === 'on-air' })} src={onAirImage} />
      </div>
      <div className="GlobalStatus__usersContainer">
        <UserList users={users}/>
      </div>
    </div>
  );
};

GlobalStatus.propTypes = {

};

export default GlobalStatus;
