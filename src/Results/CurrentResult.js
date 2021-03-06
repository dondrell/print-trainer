import React from 'react'
import './Results.css'

//вычисление скорости: количество знаков / количество секунд * 60

function CurrentResult({time, letter_counter, error_counter, size}){
	let speed = Math.round(letter_counter / (time?time:1) * 60);
	let accuracy = 100 - Math.round(error_counter / size * 100 * 100)/100;

	return (
		<div className='current-result'>
			<p>Скорость: <span className='current-result__value'>{speed}</span> зн./мин.</p>
			<p>Точность: <span className='current-result__value'>{accuracy}</span> %</p>
		</div>
	)
}

export default CurrentResult;
