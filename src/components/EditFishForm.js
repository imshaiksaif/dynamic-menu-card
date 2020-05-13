import React from 'react';

class EditFishForm extends React.Component {

	handleChange = event => {
		console.log(event.currentTarget.value)

		const updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value
		}
		// console.log(updatedFish)
		this.props.updateFish(this.props.index, updatedFish); 
	}

	
		render() {
				return (
						<div className="fish-edit">
							 <input name="name" ref={this.nameRef} type="text" onChange={this.handleChange} value={this.props.fish.name} />
							 <input name="price" ref={this.priceRef} type="text" onChange={this.handleChange} value={this.props.fish.price} />
							 <select name="status" ref={this.statusRef} onChange={this.handleChange} value={this.props.fish.status}>
										<option value="available">Fresh!</option>
										<option value="unavailable">Sold Out!</option>
								</select>
							 <textarea name="desc" ref={this.descRef} type="text" onChange={this.handleChange} value={this.props.fish.desc}></textarea>
							 <input name="image" ref={this.imageRef} type="text" onChange={this.handleChange} value={this.props.fish.image} />
								<button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
						</div>
				)
		}
}

export default EditFishForm;