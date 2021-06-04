import React from 'react'
import Img1C from '../assets/buttons/img1C.png'
import Img2C from '../assets/buttons/img2C.png'
import Img3C from '../assets/buttons/img3C.png'
import Img4C from '../assets/buttons/img4C.png'
import Img5C from '../assets/buttons/img5C.png'
import Img6C from '../assets/buttons/img6C.png'

import Img2N from '../assets/buttons/img2N.png'
import Img3N from '../assets/buttons/img3N.png'
import Img4N from '../assets/buttons/img4N.png'
import Img5N from '../assets/buttons/img5N.png'
import Img6N from '../assets/buttons/img6N.png'

import ImgChecked from '../assets/buttons/imgChecked.png'

const arrayImgs = [
   [Img1C , Img1C],
   [Img2N , Img2C],
   [Img3N , Img3C],
   [Img4N , Img4C],
   [Img5N , Img5C],
   [Img6N , Img6C],
]
  


function getStatePicture ( position , state ) {
    if (state == null) {
        state = 0 ;
    }
    if (state > 1) {
        return ImgChecked ;
    } else {
        return arrayImgs[position][0] ;
    }
   
}

export default function status(props) {
    const  values  = props;
    
    const Img1 = getStatePicture(0 , values.form01) ;
    const Img2 = getStatePicture(1 , values.form01) ;
    const Img3 = getStatePicture(2 , values.form03) ;
    const Img4 = getStatePicture(3 , values.form04) ;
    const Img5 = getStatePicture(4 , values.form05) ;
    const Img6 = getStatePicture(5 , values.form06) ;

    return (
     <>
            <img src={Img1} width="128" height='128' alt='status01'></img> 
            <img src={Img2} width="128" height='128'  alt='status02'></img> 
            <img src={Img3} width="128" height='128' alt='status03'></img> 
            <img src={Img4} width="128" height='128'  alt='status04'></img> 
            <img src={Img5} width="128" height='128' alt='status05'></img> 
            <img src={Img6} width="128" height='128'  alt='status06'></img> 
    </>
    
      
    )
}

 