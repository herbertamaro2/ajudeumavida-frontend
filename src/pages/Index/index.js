import React from 'react';
import { Link} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Index(){
    return(
        <div className="logon-container">
            <section className="form"> 
                <img src={logoImg} className="logo" /> 
             
                <h1>Escolhe uma das opções abaixo:</h1>
                <p>Faça sua parte ajudando a quem precisa, doe seu tempo, seja com apoio emocional, doações materiais, alimentos etc...</p>

                <Link to="/category" className="button">Eu vou Ajudar</Link>
                <Link to="/cases/new" className="button btn-yellow">Preciso de Ajuda</Link>

            </section>
            <div class="box-img-home">
            </div>            
        </div>
    );
}