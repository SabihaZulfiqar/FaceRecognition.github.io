import React from 'react';
import './Form.css';

const Form = ({onInputChange,onButtonSubmit}) => {
	return(

		<div>
			<p className = 'f3 white'>
			{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className = 'form pa4 br3 shadow-5 center' style={{width: '70%'}}>
			   <input className = 'f4 pa2 w-70 center' type = 'text' onChange={onInputChange}/>
		       <button className = 'w-30 grow f4 link ph3 pv2 dib white bg center' onClick={onButtonSubmit}> Detect </button>				
			</div>
		</div>

		);
	
}

export default Form;