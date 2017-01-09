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
            <div id="slider" className="mui-slider">
                <div className="mui-slider-group mui-slider-loop">
                    {
                        this.props.data && this.props.data.length ?
                            <div class="mui-slider-item mui-slider-item-duplicate">
                                <a href="#">
                                    <img src={this.props.data[0].PicturePath} alt={this.props.data[0].PictureName}/>
                                </a>
                            </div> : null
                    }

                    {
                        this.props.data.map((item,index)=>(
                            <div className="mui-slider-item" key={"pic"+index}>
                                <a href="javascript:;">
                                    <img src={item.PicturePath} alt={item.PictureName}/>
                                </a>
                            </div>
                        ))
                    }
                    {
                        this.props.data && this.props.data.length ?
                            <div class="mui-slider-item mui-slider-item-duplicate">
                                <a href="#">
                                    <img src={this.props.data[this.props.data.length-1].PicturePath} alt={this.props.data[this.props.data.length-1].PictureName}/>
                                </a>
                            </div> : null
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
