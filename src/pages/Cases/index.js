import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles.css';
import {FiArrowLeft} from 'react-icons/fi';
//import api from '../../services/api';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export class Cases extends Component {
    constructor () {
        super()
        this.state = {
           initial: 'state',
           showingInfoWindow: false,
           activeMarker: {},
           selectedPlace: {},  
           casesView: {},
        }
      }

      componentDidMount(){
            const { match: { params } } = this.props;
            fetch(`https://ajudeumavida-backend.herokuapp.com/case/${params.id}`)
            .then((response) => response.json())
            .then(res => {
                this.setState({ casesView: res });
                console.log(res);
            });
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
            <div className="case-container">
            <Header />
            <section className="form">
                <div className="section content">
                    <ul className="info case info-texto">
                        <li>
                            <h3 className="title">{casesView.title}</h3>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{casesView.description}</p>
                            <Link className="button btn"  to={`/messages/${casesView.id}`}>Enviar Mensagem</Link>
                            <Link className="button">Entre em contato via Whatsapp</Link>        
                        </li>  
                                           
                    </ul>
                    <Link to="/category/" className="back-link">
                        <FiArrowLeft size='14' color='#e02041'/> 
                        Voltar para home
                    </Link>
                </div>
                    
            </section>
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
            <Footer />
        </div>
        );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: "AIzaSyAiBQ0yLwITZZRlHrozjZfeAA5g29VbStw"
  })(Cases)