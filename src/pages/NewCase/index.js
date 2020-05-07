import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import {FiArrowLeft} from 'react-icons/fi';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import api from '../../services/api';
import Geocode from 'react-geocode';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [telefone, setTelefone] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLong] = useState('');
    const history = useHistory();
    

    async function handleNewIncident(e){
        e.preventDefault();
        
        const data ={
            title,
            category,
            telefone,
            description,
            name,
            email,
            password,
            country,
            region,
            city,
            address, 
            lat,
            lng     
        };
        
        try{
            await api.post('https://ajudeumavida-backend.herokuapp.com/cases/insert', data, {
                headers: {

                }
            });
            history.push('/category');
            } catch (err) {
            alert('Erro no cadastro, tente novamente.');
            }
        }
        Geocode.setApiKey("AIzaSyAiBQ0yLwITZZRlHrozjZfeAA5g29VbStw");
        Geocode.setLanguage("en");
        Geocode.setRegion("BR");

        async function GeoLat(e){
        Geocode.enableDebug();
            await Geocode.fromAddress(e).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              setLat(lat);
              setLong(lng);
            },
            error => {
              console.error(error);
            }
          );
        }
        
    return(
        <div>
        <Header />
        <div class="text info">
                <h1>Realize o cadastro da sua solicitação</h1>
                <p>O seu pedido de ajuda, será processado, até ser ativado em nosso site.</p>
            </div>
        <div className="new-incident-container">
            
            <form onSubmit={handleNewIncident}>
            <div className="content">
            
                <section className="form">
                <input 
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                     />
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder="Tipo de ajuda">
                        <option value="">Tipo de ajuda</option>
                        <option value="1">Apoio emocional</option>
                        <option value="2">Ir as compras</option>
                        <option value="3">Farmácia</option>
                        <option value="4">Doação (produto, comida,roupa)</option>
                        <option value="5">Doação (luva e máscara)</option>
                        <option value="6">Animais</option>
                        <option value="7">Transporte</option>
                        <option value="8">Outro</option>
                    </select>
                    <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Titulo do caso" />
                    <input 
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    placeholder="5511948105671" />
                    <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descrição" />

                 

                    <Link to="/category" className="back-link">
                        <FiArrowLeft size='14' color='#e02041'/> 
                        Voltar para home
                    </Link>
                </section>


                    <div className="form">
                    
                    <input type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                    <input type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                    
                     <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} />
                    <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)} />
                    <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)} 
                        />
                    <input 
                    placeholder="Endereço"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    onBlur={e => GeoLat(e.target.value)}
                     />

                    <button className="button" type="submit">Cadastrar</button>
                    </div>

                  
                
            </div>
            </form>
        </div>
        <Footer />
        </div>
    );
}