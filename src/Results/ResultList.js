// функция
// принимает массив объектов {ник, скорость, точность, кол-во символов} из App
// составляет сортированный по скорости список из ResultListItem

// shouldComponentUpdate проверяет разницу в длине массивов

import React from 'react'
import ResultListItem from './ResultListItem'
import './Results.css'

const ResultList = React.memo ((props)=>{
	
	let {result_list} = props;
	return(
		<ul className='result-list'>
			{result_list.map((item,i) => 
				<ResultListItem key={i}
					result_list_item={item}/>)
			}
		</ul>
	)
}, (prev_props, next_props)=>prev_props.result_list.length == next_props.result_list.length);

export default ResultList;