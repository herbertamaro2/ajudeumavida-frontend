import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles.css';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export class Home extends Component {
    constructor () {
        super()
        this.state = {
           initial: 'state',
          showingInfoWindow: true,
          showInfoWindow: true,
          activeMarker: {},
          selectedPlace: {},
          cases: [],
          categories: [], 
          activeId: null
        };
      }

      ListCasesHome() {
        fetch(`${process.env.API_URL}/home/`)
        .then((response) => response.json())
        .then(casesList => {
            this.setState({ cases: casesList });
        });
        }

    componentDidMount() {

        //const { match: { params } } = this.props;
        
        fetch(`${process.env.API_URL}/categories`)
        .then((response) => response.json())
        .then(categoriesList => {
            this.setState({ categories: categoriesList });
        });
       this.ListCasesHome();
    }
    
        ListCases(a) {
                const category = a;
                this.setState({ activeId: a })
                fetch(`${process.env.API_URL}/home/category/${category}`)
                .then((response) => response.json())
                .then(casesList => {
                    this.setState({ cases: casesList });
            }); 
        }

        Resolved(a) {
            const resolved = a;
            alert(resolved);
        }

        onMarkerClick = (props, marker, e) => {
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
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
        
        return(
            <div className="index-container">
            <Header />
            <div className="list-links">
                    <ul>
                            <li><a className="button" href="/category/">Todos</a></li>
                            {this.state.categories.map((categories) => (
                            <li>
                                <Link key={categories.id} className={ this.state.activeId === categories.id && 'is-active'} activeClassName="active" onClick={() => this.ListCases(categories.id)}>
                                    {categories.title}</Link>
                            </li>
                            ))}
                      
                    </ul>
                </div>

                <div className="map">
                    <Map google={this.props.google} containerStyle={containerStyle}
                    initialCenter={{
                        lat: -20.854885,
                        lng: 0.081807
                    }}
                    zoom={2}
                    >
                    {this.state.cases.map((cases) => (
                            <Marker
                                key={`${cases.id}`}
                                onClick={this.onMarkerClick}
                                title={cases.title}
                                id={`${cases.id}`}
                                description={`${cases.description}`}
                                position={{lat: `${cases.lat}`, lng: `${cases.lng}`}}
                                draggable={true}
                                >
                                    
                            </Marker>                      
                            ))}

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
            <section className="form">
                <div className="section content">
                {/*<div className="list-links">
                    <ul>
                            <li><button className="button" onClick={() => this.Resolved(0)}>Em aberto</button></li>
                            <li><button className="button" onClick={() => this.Resolved(1)}>Solucinados</button></li>
                      
                    </ul>
                </div>*/}
                    <ul className="info info-texto">
                        
                        {this.state.cases.map((cases) => (
                            <li key={cases.id}>
                            <h3 className="title">{cases.title}</h3>
                            <strong>DESCRIÇÃO:</strong>
                            <p>{cases.description}</p>
            
                            <Link className="button" to={`/cases/${cases.id}`}>Ver Mais</Link>        
                        </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Footer />
        </div>
        );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: "AIzaSyAiBQ0yLwITZZRlHrozjZfeAA5g29VbStw"
  })(Home)