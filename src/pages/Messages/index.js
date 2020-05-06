import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import './styles.css';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export default class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
          id:'',
          id_case:'',
          telephone:'',
          description:'',
          name: '',
          data: [],
          loading: true,
          error: false,
          casesView: {},

        }

        
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      componentWillMount(){
        const { match: { params } } = this.props;
            fetch(`http://localhost:3333/case/${params.id}`)
            .then((response) => response.json())
            .then(res => {
                this.setState({ casesView: res });
                console.log(res);
            });
      }
    
      handleSendMessage(newSettingsGeneral){
        console.log(newSettingsGeneral);
        const { match: { params } } = this.props;
        api.post('http://localhost:3333/messages', newSettingsGeneral,{
            headers: {
                idcase:`${params.id}`,
            }}).then(response => {
                alert('Mensagem foi enviada! :)');
          this.props.history.push('/category/');
        }).catch(err => console.log(err));
      }
    
      onSubmit(e){
        e.preventDefault();
        const newSettingsGeneral = {
            name:this.refs.name.value,
            telephone:this.refs.telephone.value,
            description:this.refs.description.value,
        }
        this.handleSendMessage(newSettingsGeneral);
        
      }
    
    

      handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }


    
        render() {
        
        const { casesView } = this.state;

        const id_case = casesView.id;
        return (
        <div>
        <Header />

        <div className="new-incident-container editform">
            
            <form onSubmit={this.onSubmit.bind(this)}>
            
            <div className="content">

            <section>
                <div className="section content">
                    <ul className="info case info-texto">
                        <li>
                            <h3 className="title">{casesView.title}</h3>
                            <strong>DESCRIÇÃO:</strong>
                            <p>{casesView.description}</p>
                        </li>               
                    </ul>
                </div>
                    
            </section>



               
                <section className="form">
                    <h2 className="title">Enviar Mensagem</h2>
                    <input 
                    ref="name" 
                    name="name"
                    value={this.state.name} onChange={this.handleInputChange}
                    placeholder="Nome" />
                    <input 
                    ref="telephone" 
                    name="telephone"
                    value={this.state.telephone} onChange={this.handleInputChange}
                    placeholder="Telefone(não obrigatório)" />
                    <textarea
                    ref="description" 
                    name="description"
                    value={this.state.description} onChange={this.handleInputChange}
                    placeholder="Descrição" />

                    <button className="button" type="submit">Enviar</button>

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