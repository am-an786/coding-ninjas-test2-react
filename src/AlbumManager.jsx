import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumManager = () => {
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState({ title: '' });
    const [updateAlbum, setUpdateAlbum] = useState({ id: '', title: '' });

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        setAlbums(response.data);
    };

    const addAlbum = async () => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/albums', {
            title: newAlbum.title,
            userId: 1, // Example userId
        });
        setAlbums([...albums, response.data]);
        setNewAlbum({ title: '' });
    };

    const updateAlbumRequest = async () => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/${updateAlbum.id}`, {
            title: updateAlbum.title,
        });
        setAlbums(albums.map(album => (album.id === response.data.id ? response.data : album)));
        setUpdateAlbum({ id: '', title: '' });
    };

    const deleteAlbum = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
        setAlbums(albums.filter(album => album.id !== id));
    };

    return (
        <div>
            <h1>Album Manager</h1>
            <h2>Add Album</h2>
            <input 
                type="text" 
                value={newAlbum.title} 
                onChange={(e) => setNewAlbum({ title: e.target.value })} 
            />
            <button onClick={addAlbum}>Add Album</button>

            <h2>Update Album</h2>
            <input 
                type="number" 
                placeholder="Album ID" 
                value={updateAlbum.id} 
                onChange={(e) => setUpdateAlbum({ ...updateAlbum, id: e.target.value })} 
            />
            <input 
                type="text" 
                value={updateAlbum.title} 
                onChange={(e) => setUpdateAlbum({ ...updateAlbum, title: e.target.value })} 
            />
            <button onClick={updateAlbumRequest}>Update Album</button>

            <h2>Albums List</h2>
            <ul>
                {albums.map(album => (
                    <li key={album.id}>
                        {album.title} 
                        <button onClick={() => deleteAlbum(album.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumManager;
