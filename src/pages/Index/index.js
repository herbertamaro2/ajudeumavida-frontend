import React from 'react';
import { Link} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Index(){
    return(
        <div className="logon-container">
            <section className="form"> 
                <img src={logoImg} className="logo" /> 

                    <h1>Faça seu logon</h1>

                    <Link to="/category" className="button">Eu vou Ajudar</Link>
                    <Link to="/cases/new" className="button">Preciso de Ajuda</Link>

            </section>
            <div class="box-img-home">
            </div>            
        </div>
    );
}