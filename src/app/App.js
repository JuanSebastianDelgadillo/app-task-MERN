import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

class App extends Component {
    render() {
        return ( 
        <div>
            <nav className='light-blue darken-4'>
                <div className='container'>
                    <a className='brand-logo' href="/">Mean Stack</a>
                </div>
            </nav>
        </div>
        )
    }
}

export default App;