import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
// import './../css/Styles.css';

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            title: '',
            description:'',
            tasks: [], 
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        e.preventDefault();
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
    
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task Update'});
                this.setState({title:'', description:''});
                this.fecthTask();
            })
            .catch(err => console.log(err));



        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
    
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task Saved'});
                this.setState({title:'', description:''});
                this.fecthTask();
            })
            .catch(err => console.log(err));
        }
        
    }

    componentDidMount(){
        console.log('Componente fué montado');
        this.fecthTask();
    }

    fecthTask(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data.tasks});
            });
        
    }

    deleteTask(id){
      if(confirm('Are you sure you want to delete it?')){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }

        })
        .then(res => res.json())
        .then(data => {
            if(data.status = 205)
                M.toast({html: 'Task Deleted'});
            else
                M.toast({html: 'Task doesnt Deleted'});

            this.fecthTask();
        })
        .catch(err => console.log(err));
      }

    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
           this.setState({
               title: data.resp.title,
               description: data.resp.description,
               _id: data.resp._id
           })
        });
        

    }

    handleChange(e){
        const {name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return ( 
        <div>
            {/* NAVIGATION*/}
            <nav className='light-blue darken-4'>
                <div className='container'>
                    <a className='brand-logo' href="/">Mean Stack</a>
                </div>
            </nav>
            <div className='container' style={{marginTop:'50px'}}>
                   <div className='row'>
                       <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' 
                                                    onChange={this.handleChange} 
                                                    type='text' 
                                                    placeholder='Task Title' 
                                                    value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description'
                                                    onChange={this.handleChange} 
                                                    className='materialize-textarea' 
                                                    placeholder='Description'
                                                    value={this.state.description}/>
                                            </div>
                                        </div>
                                    <button type='submit' className='btn light-blue darken-4'>Enviar</button>
                                    </form>
                                </div>
                            </div>
                       </div>
                       <div className='col s7'>
                           <table>
                               <thead>
                                   <tr>
                                        <th>Title</th>
                                        <th>Descripción</th>
                                    </tr>
                               </thead>
                               <tbody>
                                  {
                                   this.state.tasks.map(task => {
                                    return (
                                        <tr key={task._id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <button className='btn light-blue' onClick={()=>{
                                                    this.editTask(task._id)
                                                }}>
                                                    <i className='material-icons'>edit</i>
                                                </button>
                                                <button className='btn red' onClick={()=>this.deleteTask(task._id)} style={{margin:'4px'}}>
                                                    <i className='material-icons'>delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                   })
                                  }
                               </tbody>
                           </table>
                        </div>
                   </div>
            </div>
        </div>
        )
    }
}

export default App;