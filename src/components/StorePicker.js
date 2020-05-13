import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    constructor(){
        super();
        this.state = {
            storeName: ''
        }
    }

    myInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        const storeName = this.myInput.current.value; 
        this.props.history.push(`/store/${storeName}`) ;
    }   


    render() {
        return(
          <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter A Store</h2>
            <input type="text" name="store" placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput} required/>
            <button type="submit">Visit Store -></button>
          </form>  
        )
    }
}

export default StorePicker;
