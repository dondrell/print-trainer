import React from 'react'
import Text from './Text/Text'
import CurrentResult from './CurrentResult/CurrentResult'
// import Modal from '.'


class App extends React.Component{
	state = {
		is_modal_open: true,
		error_counter : 0,
		letter_counter: 0,
		time: 0,
		timer_id: null,
		text: 'Но диаграммы связей освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности способствует подготовке и реализации модели развития. В частности, глубокий уровень погружения выявляет срочную потребность прогресса профессионального сообщества.',
	}

	incErrorCounter = () =>
		this.setState({error_counter:this.state.error_counter+1})

	incLetterCounter = () =>
		this.setState({letter_counter:this.state.letter_counter+1})
	
	

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


	render(){
		return (
			// {is_modal_open && <Modal></Modal>}
			<div className='wrapper'>
				<h1 className='title'>Скоропечатание?</h1>
				<main className='main-area'>
					<Text onPrintingError={this.incErrorCounter} 
						onPrintingLetter={this.incLetterCounter}
						onStartPrinting={this.start}
						onEndPrinting={this.end}
						text={this.state.text}/>
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
