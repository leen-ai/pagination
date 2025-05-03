import React, { useState, useEffect } from 'react';



function UserTable() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const limit = 5; 
    

    useEffect(() => {
        fetch(`https://www.dbooks.org/api/search/python/v1?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(data => {
                const filteredUsers = data.books.filter(user => 
                    user.title.toLowerCase().startsWith(search.toLowerCase())
                );

                const sortedUsers = filteredUsers.sort((a, b) => {
                    if (order === 'asc') {
                        return a[sortBy].localeCompare(b[sortBy]);
                    } else {
                        return b[sortBy].localeCompare(a[sortBy]);
                    }
                });
                setUsers(sortedUsers);
            });
    }, [page, search, sortBy, order]);

    
    return (
        <div className='table'>
            <input
                type="text"
                placeholder="Search users..."
                onChange={e => setSearch(e.target.value)}
                className="border p-1"
            />
            <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                Toggle Order
            </button>
            <table border="0">
                <thead>
                    <tr>
                        <th onClick={() => setSortBy('title')}>Title</th>
                        <th>Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {users.slice((page - 1) * limit, page * limit).map(user => (
                        <tr key={user.id}><td>{user.title}</td><td>{user.authors}</td></tr>
                        
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Previous</button>
                <span> Page {page} </span>
                <button onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
        
    );
}

export default UserTable;