import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const storeId = this.props.match.params.storeId;
        const localStorageRef = localStorage.getItem(storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)})
        } 
        this.ref = base.syncState(`${storeId}/fishes`, {
            context: this,
            state: "fishes"
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref); 
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    addFish = fish => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    addToOrder = key => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order })
    }

    removeFromOrder = key => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order })
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    }


    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        console.log(key)
        this.setState({ fishes }); 
    }

    deleteFish = key => {
        // take a copy of state 
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes })
        this.removeFromOrder(key)
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                    {
                        Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
                    }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} fishes={this.state.fishes} loadSampleFishes={this.loadSampleFishes} storeId={this.props.match.params.storeId}/>
            </div>
        )
    }
}


export default App;