import React , { Component } from 'react';
import axios from 'axios';
import "../index.css";

class Persona extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            personas: []
        };
    }

    componentDidMount() {
        axios.get("http://persona5api.azurewebsites.net/api/personas")
            .then(result => this.setState({
                isLoaded: true,
                personas: result.data
            }))
            .catch(error => this.setState({
                error,
                isLoaded: true
            }));
    }

    render() {
        const { error, isLoaded, personas } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {personas.map(persona => (
                        <li key={persona.id}>
                        <ul className="persona-details">
                            <li>Name: {persona.name}</li>
                            <li>Level: {persona.level}</li>
                            <li>Arcana: {persona.arcana}</li>
                            <li>Description: {persona.description}</li>
                        </ul>
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Persona;