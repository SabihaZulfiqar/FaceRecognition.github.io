import React from 'react';
import './Facerecognition.css';

const Facerecognition = ({imageUrl , box}) => {
	return(

		<div className='center'>

		<img id='inputimage' className='pa3' style = {{width: '50%', height: '50%'}}alt='' src={imageUrl} />
		<div className='bounding-box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>

		</div>


		);
	
}

export default Facerecognition;