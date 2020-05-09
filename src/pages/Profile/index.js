import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles.css';
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export class Profile extends Component {

    constructor () {
        super()
        this.state = {
           initial: 'state',
           showingInfoWindow: false,
           activeMarker: {},
           selectedPlace: {},  
           casesView: {},
           messages: []
        }
      }
    componentDidMount(){
        const id = localStorage.getItem('id');
        fetch('https://ajudeumavida-backend.herokuapp.com/profile', {
            headers: {
                authorization:id,
            }})
        .then((res) => res.json())
        .then(res => {
            this.setState({ casesView: res });
            console.log(res);
        });

            fetch(`https://ajudeumavida-backend.herokuapp.com/messages/${id}`)
            .then((responsemes) => responsemes.json())
            .then(messagesList => {
                this.setState({ messages: messagesList });
                console.log(messagesList);
        }).then(() => this.setState({ isLoading: false })); 
        } 

    onMarkerClick = (props, marker, e) => {
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        });
    }
    
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };
    render() {
        
        const containerStyle = {
                position: 'relative',  
                width: '100%',
                height: '100%'
        }
        const { casesView } = this.state;

        
    return(

        <div>
        <div className="profile-container">
            <Header />
        </div>

        <div className="case-container">
            <div className="form">
                <div className="section content">
                        <ul className="info case info-texto">
                            <li>
                                <h3 className="title">{casesView.title}</h3>

                                <strong>DESCRIÇÃO:</strong>
                                <p>{casesView.description}</p>
                        
                                <Link className="button" to={`/cases/edit/${casesView.id}`}><FiEdit /> Editar</Link>        
                            </li>  
                                            
                        </ul>
                        <Link to="/category/" className="back-link">
                            <FiArrowLeft size='14' color='#e02041'/> 
                            Voltar para home
                        </Link>
                    
                </div>

                    <div className="section content">
                        <ul className="info case info-texto msg-list">
                            <h3 className="title">Mensagens Recebidas</h3>
                            {this.state.messages.map((messages) => (
                            <li key={messages.id}>
                                <strong>TITULO DA MENSAGEM:</strong>
                                <p>{messages.titlemsg}</p>
                                <strong>TELEFONE:</strong>
                                <p>{messages.telephone}</p>
                                <strong>DESCRIÇÃO:</strong>
                                <p>{messages.description}</p>        
                            </li>
                            ))}             
                        </ul>
                        <Link to="/category/" className="back-link">
                            <FiArrowLeft size='14' color='#e02041'/> 
                            Voltar para home
                        </Link>
                    </div>       
            </div>
         
            <div className="map">
                <Map google={this.props.google} containerStyle={containerStyle}
                center={{
                    lat: `${casesView.lat}`,
                    lng: `${casesView.lng}`
                  }}
                zoom={14}>
                
                    <Marker
                        onClick={this.onMarkerClick}
                        title={casesView.title}
                        id={`${casesView.id}`}
                        description={`${casesView.description}`}
                        position={{lat: `${casesView.lat}`, lng: `${casesView.lng}`}}
                        draggable={false}
                        >
                            
                    </Marker>                      
                   

                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>{this.state.selectedPlace.title}</h4>
                        <p>{this.state.selectedPlace.description}</p>
                    </div>
                    </InfoWindow>
                </Map>
            </div>
        </div>
        <Footer />
    </div>
    );
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyAiBQ0yLwITZZRlHrozjZfeAA5g29VbStw"
  })(Profile)