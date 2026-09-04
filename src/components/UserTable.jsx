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
            .then((res) => res.json())
            .then((data) => {
                const books = Array.isArray(data.books) ? data.books : [];
                setUsers(books);
            })
            .catch(() => setUsers([]));
    }, [page, sortBy, order]);

    const filteredUsers = users
        .filter((user) => {
            const title = (user.title || '').toLowerCase();
            const authors = (user.authors || '').toLowerCase();
            return title.includes(search.toLowerCase()) || authors.includes(search.toLowerCase());
        })
        .sort((a, b) => {
            const aValue = String(a[sortBy] || '').toLowerCase();
            const bValue = String(b[sortBy] || '').toLowerCase();

            if (order === 'asc') {
                return aValue.localeCompare(bValue);
            }

            return bValue.localeCompare(aValue);
        });

    const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

    return (
        <div className="user-table-card">
            <div className="table-toolbar">
                <label className="search-wrap" aria-label="Search books">
                    <span className="search-icon">⌕</span>
                    <input
                        type="text"
                        placeholder="Search books or authors..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="search-input"
                    />
                </label>

                <button
                    type="button"
                    className="sort-button"
                    onClick={() => setOrder((current) => (current === 'asc' ? 'desc' : 'asc'))}
                >
                    {order === 'asc' ? 'Ascending' : 'Descending'}
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button
                                    type="button"
                                    className="column-button"
                                    onClick={() => setSortBy('title')}
                                >
                                    Title
                                </button>
                            </th>
                            <th>
                                <button
                                    type="button"
                                    className="column-button"
                                    onClick={() => setSortBy('authors')}
                                >
                                    Authors
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <tr key={`${user.id || user.title}-${user.authors || 'unknown'}`}>
                                    <td>{user.title || 'Untitled'}</td>
                                    <td>{user.authors || 'Unknown author'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="empty-state">
                                    No books match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(current - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span className="page-status">Page {page}</span>

                <button
                    type="button"
                    onClick={() => setPage((current) => current + 1)}
                    disabled={paginatedUsers.length < limit}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserTable;