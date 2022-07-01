import React from 'react';
import { User } from './user.interface';

interface Props {
    user: User;
}

function UserRow({ user }: Props) {
    return (
        <div className="user-item">
            <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}'s Avatar`}
                className="user-item--avatar"
            />
            <span className="user-item--name">
                {user.first_name} {user.last_name}
            </span>
            <span className="user-item--email">({user.email})</span>
        </div>
    );
}

export default UserRow;
