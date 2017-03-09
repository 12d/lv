/**
 * @author xuweichen@meitu.io
 * @date 12/14/16
 */
import React,{
    Component
} from 'react';
import {HTMLText} from '../common/lv';
export default class DayRouter extends Component {
    /**
     * <div className="route-item" data-travelitemid="2048"><label>09:30</label>
     <div className="route-content"><span className="item-name">游玩景点：</span> <span>宜良九乡风景区</span>
     <div className="item-tip">活动时间：约2小时30分钟</div>
     </div>
     </div>
     */
    render(){
        return (
            <div className="route-list daytour-route-list">
                <div className="route-item-wrap">
                    {
                        this.props.data.map((item, index)=>{
                            return (
                                <div className="route-item" key={"route"+index}><label>{item.DetailTime}</label>
                                    <div className="route-content"><span className="item-name">主要景点：</span>
                                        {
                                            item.POIList.map((poi,key)=>(
                                                <span key={"poi"+key} className="mui-badge mui-badge-default">{poi.POIName}</span>
                                            ))
                                        }
                                        <div className="item-desc"><HTMLText html={item.TripDesc}/></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
