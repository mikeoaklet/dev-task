import React from 'react';
import './App.css';
import UserRow from './user-row';
import useUsers from './use-users.hook';

function App() {
    const { setPage, perPage, setPerPage, total, users, resetFilters } =
        useUsers();

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
                    <UserRow key={`user-${user.id}`} user={user} />
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
