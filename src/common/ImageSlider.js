/**
 * @author xuweichen@meitu.io
 * @date 12/12/16
 */

import React, {
    Component,
    PropTypes
} from 'react';


export default class ImageSlider extends Component {
    render(){
        return (
            <div id="slider" className="mui-slider" data-slider="1">
                <div className="mui-slider-group mui-slider-loop" style={{transform: "translate3d(0px, 0px, 0px) translateZ(0px)"}}>
                    {
                        this.props.data.map((item,index)=>(
                            <div className="mui-slider-item" key={"pic"+index}>
                                <a href="javascript:;">
                                    <img src={item.PicturePath} alt={item.PictureName}/>
                                </a>
                            </div>
                        ))
                    }

                </div>
                <div className="mui-slider-indicator">
                    {
                        this.props.data.map((item,index)=>(
                            <div className="mui-indicator" key={"ind"+index}></div>
                        ))
                    }
                </div>
            </div>
        )
    }
    static defaultProps = {
        data: []
    }
}
