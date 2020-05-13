import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Loading from '../../assets/loading.gif';
import './styles.css';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export class Home extends Component {
    constructor () {
        super()
        this.state = {
           initial: 'state',
           isLoading: false,
           isLoadingCat: false,
          showingInfoWindow: true,
          showInfoWindow: true,
          activeMarker: {},
          selectedPlace: {},
          cases: [],
          currentPage: 1,
          todosPerPage: 6,
          categories: [], 
          activeId: null
        };
        this.handleClick = this.handleClick.bind(this);
      }
      
      ListCasesHome() {
        this.setState({ isLoading: true }); 
        fetch(`https://ajudeumavida-backend.herokuapp.com/home/`)
        .then((response) => response.json())
        .then(casesList => {
            this.setState({ cases: casesList });
        }).then(() => this.setState({ isLoading: false }));
        }

    componentDidMount() {
        //const { match: { params } } = this.props;
        fetch(`https://ajudeumavida-backend.herokuapp.com/home/categories`)
        .then((response) => response.json())
        .then(categoriesList => {
            this.setState({ categories: categoriesList });
        });
       this.ListCasesHome();
    }
    
        ListCases(a) {
                const category = a;
                this.setState({ activeId: a })
                this.setState({ isLoading: true }); 
                fetch(`https://ajudeumavida-backend.herokuapp.com/home/category/${category}`)
                .then((response) => response.json())
                .then(casesList => {
                    this.setState({ cases: casesList });
            }).then(() => this.setState({ isLoading: false })); 
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

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    
    render() {
        const containerStyle = {
            position: 'relative',  
            width: '100%',
            height: '100%'
          }

          const { cases, todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = cases.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((cases, index) => {
          return(
            //Description
            <li key={cases.id}>
            <span class="cat">{cases.titlecategory}</span>
            <h3 className="title">{cases.title}</h3>
            <strong>DESCRIÇÃO:</strong>
            <p>{cases.description}</p>

            <Link className="button" to={`/cases/${cases.id}`}>QUERO AJUDAR</Link></li>
          );
        });
        
        

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(cases.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
        
        return(
            <div className="index-container">
            <Header />
            <div className="list-links">
                    <ul>
                    
                            <li><a className="button" href="/category/">Todos</a></li>
                            {this.state.categories.map((categories) => (
                            <li>
                                <Link key={categories.id} className={ this.state.activeId === categories.id && 'is-active'} activeClassName="active" onClick={() => this.ListCases(categories.id)}>
                                    {categories.titlecategory}</Link>
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
                <div class="text">
                    <h1>Escolha uma opção abaixo, e entre em contato com a pessoa que você quer ajudar</h1>
                    <h3>Faça sua parte ajudando a quem precisa, doe seu tempo, seja com apoio emocional, doações materiais, alimentos etc...<br />
                        O mundo está passando por momentos dificeis, se cada um fazer sua parte, passaremos dessa, de uma forma mais tranquila.
                        </h3>
                </div>
                    {this.state.isLoading ? <div className="loading"><img src={Loading} /></div> : null}
                    <ul className="info info-texto">
                        {renderTodos}
                    </ul>
                    <ul id="page-numbers">
                    {renderPageNumbers}
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