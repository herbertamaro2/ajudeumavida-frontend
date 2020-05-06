import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

export default function Logon(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:3333/login', {email, password});
            localStorage.setItem('id', response.headers.authorization);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('token', response.headers.token);

            history.push('/profile');
        } catch (err){
            alert('Falha no Login');
        }
    }

    return(
        <div className="logon-container">
            <section className="form"> 
                <img src={logoImg} className="logo" /> 

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    />

                    <input placeholder="Password" type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                    />

                    <button type="submit" className="button">Entrar</button>

                    <Link to="/cases/new" className="back-link">
                        <FiLogIn size='14' color='#e02041'/> 
                        Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}