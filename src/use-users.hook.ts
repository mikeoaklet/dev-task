import { useCallback, useEffect, useState } from 'react';
import { User } from './user.interface';
import { ListUsersResponseInterface } from './list-users-response.interface';

function useUsers() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);

    const resetFilters = useCallback(() => {
        setPage(1);
        setPerPage(5);
    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users?per_page=${
                    perPage * page
                }`,
            );

            if (response.ok) {
                const { total, data } =
                    (await response.json()) as ListUsersResponseInterface;
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

    return { page, perPage, total, users, resetFilters, setPage, setPerPage };
}

export default useUsers;
