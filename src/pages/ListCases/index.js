import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import api from '../../services/api';

export default class ListCases extends Component {
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

      ListDesactive() {
        fetch(`https://ajudeumavida-backend.herokuapp.com/caseinactive/`)
        .then((response) => response.json())
        .then(casesList => {
            this.setState({ cases: casesList });
        });
        }

    componentDidMount() {
       this.ListDesactive();
    }
    

        Aprovar(a){
            
            const id = a;
            api.put(`https://ajudeumavida-backend.herokuapp.com/active/case/${id}`)
            .then(casesList => {
                this.setState({ cases: casesList });
            });
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
                   
                </div>

                
            <section className="form">
                <div className="section content">
                
                    <ul className="info info-texto">
                        
                        {this.state.cases.map((cases) => (
                            <li key={cases.id}>
                            <h3 className="title">{cases.title}</h3>
                            <strong>DESCRIÇÃO:</strong>
                            <p>{cases.description}</p>
                            <strong>Categoria: {cases.category}</strong>
            
                            <Link className="btn button" to="/listcases" onClick={() => this.Aprovar(cases.id)}>Aprovar</Link>        
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