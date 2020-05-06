import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.png';
import {FiPower} from 'react-icons/fi';


export default function Header(){
const history = useHistory();
function HandleLogout(){
        localStorage.clear();
        history.push('/');
}
const logged = localStorage.getItem('id');
return(
<section className="form head">
                <div className="header">
                    <div className="logo">
                        <Link to="/category/">
                            <img src={logoImg} alt="Be the Hero" className="logoImg" /> 
                        </Link>
                    </div>
                    <div className="menu">
                        
                        {logged ? (
                        <div>
                        <Link className="button btn" to="/profile">Profile</Link>
                        <button className="button btn white" onClick={HandleLogout}><FiPower size={14} color="#e02041" /></button>
                        </div>
                        ) : (
                        <div>
                        <Link className="button btn" to="/cases/new">Preciso de Ajuda</Link>
                        <Link className="button btn white" to="/login">Login</Link> 
                        </div>
                        )}
                    </div>
                </div>
               
            </section>
            );

}