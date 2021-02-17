import React from 'react'
import './Results.css'

function ResultListItem(props){
	let {name, speed, accuracy, size} = props.result_list_item;

	return (
		<li className='result-list__item'>
			{`Имя: ${name}\nСкорость: ${speed} зн./мин.\nТочность: ${accuracy} %\nДлина текста: ${size}`}
		</li>
	);
}

export default ResultListItem;