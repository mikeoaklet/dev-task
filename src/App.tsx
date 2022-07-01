import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [users, setUsers] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    const resetFilters = useCallback(() => {
        setPage(1);
        setPerPage(5);
    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await fetch(
                `https://reqres.in/api/users?per_page=${perPage * page}`,
            );

            if (response.ok) {
                const { total, data } = await response.json();
                setTotal(total);
                setUsers(data);
            } else {
                alert(
                    'There was an error on fetch: ' + (await response.text()),
                );
            }
        };

        loadUsers();
    }, [page, perPage]);

    return (
        <div className="App">
            <header className="header">
                <h1>Users</h1>

                <div>
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                    <button onClick={resetFilters}>Reset filters</button>
                </div>
            </header>

            <div className="users-list">
                {users.map((user) => (
                    <div className="user-item" key={`user-${user.id}`}>
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
                ))}
            </div>

            <div>
                {users.length < total && (
                    <button onClick={() => setPage((prev) => prev + 1)}>
                        Load more
                    </button>
                )}
            </div>

            <small>
                Rendering {users.length} out of total {total}
            </small>
        </div>
    );
}

export default App;
