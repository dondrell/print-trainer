import React from 'react'
import './Modal.css'


class StartingModal extends React.Component{
	state = {
		value: null,
		input_error: false,
	}

	handleInput = (e) => {
		let value = e.target.value;
		if (parseInt(value) <= 10 && parseInt(value) > 0)
			this.setState({value: value, input_error: false});
		else
			this.setState({input_error: true});
	}

	render(){
		let {input_error, value} = this.state;
		return(
			<div className='modal'>
				<div className='modal__window window'>
					<p className='window__text'>
						Выберите количество предложений (до 10). 
						Таймер запустится, как только вы наберёте первую букву.
					</p>
					<input onChange={this.handleInput} 
						className={'window__input' + (input_error? ' window__input__error':'')}
						type='input'></input>
					<button onClick={!input_error&&value?
						()=>this.props.onButtonClick(value):
						()=>this.setState({input_error: true})}
						className='window__button'>Готово</button>
				</div>
			</div>
		)
	}

}


export default StartingModal;