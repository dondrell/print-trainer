import React from 'react'
import './Modal.css'


class EndingModal extends React.Component{
	state = {
		value: null,
		input_error: false,
	}

	handleInput = (e) => {
		let value = e.target.value;
		if (value.trim().length != 0)
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
						Вы справились! Теперь введите ник для занесения в список результатов.
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


export default EndingModal;