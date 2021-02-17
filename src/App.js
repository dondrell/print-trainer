import React from 'react'
import Text from './Text/Text'
import CurrentResult from './Results/CurrentResult'
import ResultList from './Results/ResultList'
import StartingModal from './Modal/StartingModal'
import EndingModal from './Modal/EndingModal'

class App extends React.Component{
	state = {
		is_modal_open: true,
		ready: false,
		error_counter : 0,
		letter_counter: 0,
		time: 0,
		timer_id: null,
		sentence_amount: null,
		text: 'Ожидание получения текста...',
		end_of_typing: false,
		result_list:[]
	}

	incErrorCounter = () =>
		this.setState({error_counter:this.state.error_counter+1})

	incLetterCounter = () =>
		this.setState({letter_counter:this.state.letter_counter+1})

	closeModal = () =>
		this.setState({is_modal_open:false})

	getTextFromFetch = (value) => {
		fetch('https://fish-text.ru/get?number='+parseInt(value))
			.then(res=>res.json())
			.then(res=>{
				if (res.status === 'success')
					this.setState({ready: true,text:res.text});
				else
					this.setState({text:'Что-то пошло не так. Обновите страницу.'})
			})
			.catch(res=>this.setState({text:'Что-то пошло не так. Обновите страницу.'}));
		this.setState({sentence_amount: value,is_modal_open: false});

	}

	saveResult = (value) => {
		let {result_list, letter_counter, error_counter, time} = this.state;
		let size = this.state.text.length;
		let speed = Math.round(letter_counter / (time?time:1) * 60);
		let accuracy = 100 - Math.round(error_counter / size * 100 * 100)/100;

		let result = {name: value, 
			speed: speed, 
			accuracy: accuracy, 
			size: size};

		let new_result_list = result_list.concat(result).sort((a,b)=>b.speed-a.speed);

		this.setState({is_modal_open: false,result_list: new_result_list})
	}
	
	// функция getOnRestart передаётся в Text
	// Text вызывает функцию при монтировании и передаёт аргументом свою функцию init
	// функция init сохраняется в App и вызывается в restart
	// всё это нужно, чтобы сбросить Text в начальное состояние
	getOnRestart = (onRestart) =>{
		this.onRestart = onRestart;
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
		this.setState({ready: false,end_of_typing: true, is_modal_open: true});
	}

	restart = () => {
		if (this.state.timer_id)
			clearInterval(this.state.timer_id);
		this.onRestart();
		this.setState({
			text: "Ожидание получения текста...",
			is_modal_open: true,
			ready: false,
			error_counter : 0,
			letter_counter: 0,
			time: 0,
			timer_id: null,
			sentence_amount: null,
			end_of_typing: false
		});
	}

	render(){
		return (
			<div className='wrapper'>
				{this.state.is_modal_open &&
					(this.state.end_of_typing?
						<EndingModal onSaveButtonClick={this.saveResult}
							onCancelButtonClick={this.closeModal}/>:
						<StartingModal onButtonClick={this.getTextFromFetch}/>)
				}
				<h1 className='title'>Скоропечатание?</h1>
				<main className='main-area'>
					<Text onPrintingError={this.incErrorCounter} 
						onPrintingLetter={this.incLetterCounter}
						onStartPrinting={this.start}
						onEndPrinting={this.end}
						text={this.state.text}
						shareOnRestart={this.getOnRestart}
						is_ready={this.state.ready}/>
					<div className='result-section'>
						<CurrentResult letter_counter={this.state.letter_counter}
							time={this.state.time}
							error_counter={this.state.error_counter}
							size={this.state.text.length}/>
						<ResultList result_list={this.state.result_list}/>
					</div>
					<button className='restart-button' onClick={this.restart}>restart</button>
				</main>
			</div>
		);
	}

}

export default App;
