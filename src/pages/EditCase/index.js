import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import './styles.css';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
//import Geocode from 'react-geocode';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export default class EditCase extends Component {
    constructor(props){
        super(props);
        this.state = {
          id:'',
          title:'',
          category:'',
          telefone:'',
          description:'',
          name: '',
          country:'',
          region:'',
          city:'',
          address:'',
          lat:'',
          lng:'',
          data: [],
          loading: true,
          error: false,
        }

        
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      componentWillMount(){
        this.getSettingsGeneralDetails();
      }
    
      getSettingsGeneralDetails(){
        const id_user = localStorage.getItem('id');
        api.get(`${process.env.API_URL}/profile`, {
            headers: {
                authorization: id_user,
            }})
        .then(response => {
            const data = response.data; // get the data array instead of object
          this.setState({ data, loading: false });
          this.setState({
            title:response.data.title,
            category:response.data.category,
            telefone:response.data.telefone,
            description:response.data.description,
            name: response.data.name,
            country:response.data.country,
            region:response.data.region,
            city:response.data.city,
            address:response.data.address,
            lat:response.data.lat,
            lng:response.data.lng,
          }, () => {
            console.log(this.state);
          });
        })
        .catch(err => console.log(err));
        
        }
    
      handleEditCase(newSettingsGeneral){
        const id_user = localStorage.getItem('id');
        console.log(newSettingsGeneral);
        api.put(`${process.env.API_URL}/case/edit`, newSettingsGeneral, {
            headers: {
                authorization: id_user,
            }}).then(response => {
          this.props.history.push('/profile/');
        }).catch(err => console.log(err));
      }
    
      onSubmit(e){
        e.preventDefault();
        const newSettingsGeneral = {
            title:this.refs.title.value,
            category:this.refs.category.value,
            telefone:this.refs.telefone.value,
            description:this.refs.description.value,
            //name: this.refs.name.value,
            //email: this.refs.email.value,
            //password:this.refs.password.value,
            //country:this.refs.country.value,
            //region:this.refs.region.value,
            //city:this.refs.city.value,
            //address:this.refs.address.value,
            //lat:this.refs.lat.value,
            //lng:this.refs.lng.value,
        }
        this.handleEditCase(newSettingsGeneral);
        
      }
    
    

      selectCountry (val) {
        this.setState({ country: val });
      }
     
      selectRegion (val) {
        this.setState({ region: val });
      }

      setLat(val){
        this.setState({ lat: val }); 
      }

      setLong(val){
        this.setState({ lng: val }); 
      }

      handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    
      /* Geocode.setApiKey("AIzaSyAiBQ0yLwITZZRlHrozjZfeAA5g29VbStw");
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
            }*/

    
        render() {
    
        const {category, country, region } = this.state;
       
      return (
        <div>
        <Header />

        <div className="new-incident-container editform">
            
            <form onSubmit={this.onSubmit.bind(this)}>
            
            <div className="content">
               
                <section className="form">
                
                <select
                    ref="category"
                    name="category"
                    value={this.state.category}
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
                    ref="title" 
                    name="title"
                    value={this.state.title} onChange={this.handleInputChange}
                    placeholder="Titulo do caso" />
                    <input 
                    ref="telefone" 
                    name="telefone"
                    value={this.state.telefone} onChange={this.handleInputChange}
                    placeholder="Telefone Whatsapp" />
                    <textarea
                    ref="description" 
                    name="description"
                    value={this.state.description} onChange={this.handleInputChange}
                    placeholder="Descrição" />

                    <button className="button" type="submit">Editar</button>

                    <Link to="/category" className="back-link">
                        <FiArrowLeft size='14' color='#e02041'/> 
                        Voltar para home
                    </Link>
                </section>


                  
                
            </div>
            </form>
        </div>
        <Footer />
        </div>
    );
}
}