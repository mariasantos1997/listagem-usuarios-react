import React, { useState, useEffect } from 'react';
import { api } from '../server.js';
export function UserList(){
    const[user, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser(){
           try{
            const response = await api.get('/users');

            const userData = response.data.users || response.data;
            setUsers(userData);
        }catch(error){
            setError('Nao foi possivel carregar os usuários')
        }finally{
            setLoading(false);
        }  
        }
       fetchUsers();

    }, []);

    if (loading) return <p>Carregando dados... </p>;
    if(error) return <p style={{color : 'red'}}>{{ error }}</p>

    return(
        <div>
            <h2>Lista de usuários </h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>[user.firstName || user.nome]</strong> ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};