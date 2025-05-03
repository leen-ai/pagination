const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.dbooks.org/api/search/python';

export async function getUsers(params = '') {
    const res = await fetch(`${API_URL}/v1/users?${params}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export async function uploadFile(formData) {
    const res = await fetch(`${API_URL}/v1/upload`, {
        method: 'POST',
        body: formData,
    });
    return res.json();
}