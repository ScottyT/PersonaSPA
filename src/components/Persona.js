import React , { Component } from 'react';
import "../index.css";

const API = "http://persona5api.azurewebsites.net/api/personas";

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
        fetch(API)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                isLoaded: true,
                personas: data
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
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
                            {persona.name}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default Persona;