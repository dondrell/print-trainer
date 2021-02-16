import React from 'react'
import './Text.css'

class Text extends React.PureComponent{
	state = {
		last_letter_num: 0,
		error: false
	};

	handleKeyPress = event=>{
<<<<<<< Updated upstream
=======
		if (event.key_code == 32) //to prevent scrolling
			event.preventDefault();
		if (this.props.isModalOpen)
			return;

>>>>>>> Stashed changes
		let {last_letter_num, error} = this.state;
		let {text} = this.props;
		if (last_letter_num === 0 && !error)
			this.props.onStartPrinting();

		if (event.key === text[last_letter_num]){
			this.setState({last_letter_num: last_letter_num + 1, error: false});
			this.props.onPrintingLetter();
			if (last_letter_num === text.length - 1)
				this.props.onEndPrinting();
			
		}
		else{
			this.setState({error: true});
			if (!error) this.props.onPrintingError();
		}
	};

	init = () => this.setState({last_letter_num: 0,error: false,})

	componentDidMount(){
		document.addEventListener('keypress', this.handleKeyPress);
		this.props.shareOnRestart(this.init);
	}
	componentWillUnmount(){
		document.removeEventListener('keypress', this.handleKeyPress);
	}


	render(){
		let {last_letter_num,error} = this.state;
		let {text} = this.props;
		return (
			<p className='text' onKeyPress={this.handleKeyPress}>
				{text.split('').map((letter, i) => {
					let className = '';
					if (i < last_letter_num) className = 'text__letter__green';
					else if (i == last_letter_num) 
						className = error? 'text__letter__red':'text__letter__gray';

					return <span key={i} className={className}>{letter}</span>;
				})}
			</p>
		)
	}
}

export default Text;
