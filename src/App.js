import React from 'react'
import Text from './Text/Text'
import CurrentResult from './CurrentResult/CurrentResult'
<<<<<<< Updated upstream
// import Modal from '.'

=======
import StartingModal from './Modal/StartingModal'
import EndingModal from './Modal/EndingModal'
>>>>>>> Stashed changes

class App extends React.Component{
	state = {
		is_modal_open: true,
		error_counter : 0,
		letter_counter: 0,
		time: 0,
		timer_id: null,
<<<<<<< Updated upstream
		text: 'Но диаграммы связей освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности способствует подготовке и реализации модели развития. В частности, глубокий уровень погружения выявляет срочную потребность прогресса профессионального сообщества.',
=======
		sentence_amount: null,
		text: 'Ожидание получения текста...',
		end_of_typing: false
>>>>>>> Stashed changes
	}

	incErrorCounter = () =>
		this.setState({error_counter:this.state.error_counter+1})

	incLetterCounter = () =>
		this.setState({letter_counter:this.state.letter_counter+1})
<<<<<<< Updated upstream
=======

	closeStartingModal = (value) => {
		fetch('https://fish-text.ru/get?number='+parseInt(value))
			.then(res=>res.json())
			.then(res=>{
				this.setState({text:(res.status === 'success'?res.text:'Что-то пошло не так.')});
			})
			.catch(res=>this.setState({text:'Что-то пошло не так.'}));
		this.setState({sentence_amount: value,is_modal_open: false});

	}

	closeEndingModal = (value) => {
		this.restart();
	}
>>>>>>> Stashed changes
	
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
		this.setState({end_of_typing: true, is_modal_open: true});
	}

<<<<<<< Updated upstream
=======
	restart = () => {
		if (this.state.timer_id)
			clearInterval(this.state.timer_id);
		this.onRestart();
		this.setState({
			is_modal_open: true,
			error_counter : 0,
			letter_counter: 0,
			time: 0,
			timer_id: null,
			sentence_amount: null,
			end_of_typing: false
		});
	}
>>>>>>> Stashed changes

	render(){
		return (
			// {is_modal_open && <Modal></Modal>}
			<div className='wrapper'>
<<<<<<< Updated upstream
=======
				{this.state.is_modal_open &&
					(this.state.end_of_typing?
						<EndingModal onButtonClick={this.closeEndingModal}/>:
						<StartingModal onButtonClick={this.closeStartingModal}/>)
				}
>>>>>>> Stashed changes
				<h1 className='title'>Скоропечатание?</h1>
				<main className='main-area'>
					<Text onPrintingError={this.incErrorCounter} 
						onPrintingLetter={this.incLetterCounter}
						onStartPrinting={this.start}
						onEndPrinting={this.end}
<<<<<<< Updated upstream
						text={this.state.text}/>
=======
						text={this.state.text}
						shareOnRestart={this.getOnRestart}
						isModalOpen={this.state.is_modal_open}/>
>>>>>>> Stashed changes
					<CurrentResult letter_counter={this.state.letter_counter}
						time={this.state.time}
						error_counter={this.state.error_counter}
						size={this.state.text.length}/>
				</main>
			</div>
		);
	}

}

export default App;
