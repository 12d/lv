/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';

export default class Index extends Component {
    constructor(){
        super();
    }
    render(){
        require.ensure(['../../css/home.css'],(css)=>{
            console.log(css)
        })
        return <h1>Hello Standard React Project!!!!!</h1>
    }
}