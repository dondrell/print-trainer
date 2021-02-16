import React from 'react'
import Text from './Text/Text'
import CurrentResult from './CurrentResult/CurrentResult'
import Modal from './Modal/Modal'


class App extends React.Component{
	state = {
		is_modal_open: true,
		error_counter : 0,
		letter_counter: 0,
		time: 0,
		timer_id: null,
		sentence_amount: null,
		text: 'Ожидание получения текста...',
	}

	incErrorCounter = () =>
		this.setState({error_counter:this.state.error_counter+1})

	incLetterCounter = () =>
		this.setState({letter_counter:this.state.letter_counter+1})

	closeModal = (value) => {
		let text = 'Подождите';
		fetch('https://fish-text.ru/get?number='+(+value))
			.then(res=>res.json())
			.then(res=>{
				this.setState({text:(res.status === 'success'?res.text:'Что-то пошло не так.')});
			})
			.catch(res=>this.setState({text:'Что-то пошло не так.'}));
		this.setState({sentence_amount: value,is_modal_open: false});

	}
	
	

	start = () =>{
		console.log('start printing');
		this.setState({timer_id:
			setInterval(()=>this.setState({time:this.state.time+1}), 1000)
		});
	}
	

	end = () => {
		console.log('end printing');
		clearInterval(this.state.timer_id);
	}

	restart = () => {
		if (this.state.timer_id)
			clearInterval(this.state.timer_id);
		this.setState({
			is_modal_open: true,
			error_counter : 0,
			letter_counter: 0,
			time: 0,
			timer_id: null,
			sentence_amount: null,
			text: 'Ожидание получения текста...',
		});
	}

	render(){
		return (
			<div className='wrapper'>
				{this.state.is_modal_open && <Modal onButtonClick={this.closeModal}/>}
				<h1 className='title'>Скоропечатание?</h1>
				<main className='main-area'>
					<Text onPrintingError={this.incErrorCounter} 
						onPrintingLetter={this.incLetterCounter}
						onStartPrinting={this.start}
						onEndPrinting={this.end}
						text={this.state.text}
						isModalOpen={this.state.is_modal_open}/>
					<CurrentResult letter_counter={this.state.letter_counter}
						time={this.state.time}
						error_counter={this.state.error_counter}
						size={this.state.text.length}/>
					<button onClick={this.restart}>restart</button>
				</main>
			</div>
		);
	}

}

export default App;
