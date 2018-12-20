import React from 'react';
import './Facerecognition.css';

const Facerecognition = ({imageUrl , box}) => {
	return(

		<div className='center'>
		<div className='absolute'>

		<img id='inputImage' className='pa3' style = {{width: '500px', height: 'auto'}}alt='' src={imageUrl} />
		<div className='bounding-box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>

		</div>
		</div>


		);
	
}

export default Facerecognition;