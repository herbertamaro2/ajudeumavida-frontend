import React from 'react';
import { Link} from 'react-router-dom';
import './styles.css';

export default function Footer(){
    return(
        <div className="footer"><Link to="/policy">Politica de Privacidade</Link></div>
    );
};