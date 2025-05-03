import React, { useState, useEffect } from 'react';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const usersPerPage = 5;

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
        const aField = String(a[sortBy].toLowerCase);
        const bField = String(b[sortBy].toLowerCase);

        if (order === "asc") return aField.localeCompare(bField);
        return bField.localeCompare(aField)
    })

    const startIndex = (page - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

    return (
        <div>
            <input
                type="text"
                placeholder="Search users..."
                onChange={e => {
                    setSearch(e.target.value);
                    setPage(1); 
                }}
                className="border p-1"
            />
            <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                Toggle Order ({order})
            </button>
            <table border="1">
                <thead>
                    <tr>
                        <th onClick={() => setSortBy('title')}>title</th>
                        <th onClick={() => setSortBy('authors')}>authors</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map(user => (
                        <tr key={user.id}><td>{user.title}</td><td>{user.authors}</td></tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} </span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={startIndex + usersPerPage >= filteredUsers.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserTable;