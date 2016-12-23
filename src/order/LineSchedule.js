/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';
import {Model, Page, NormalError} from '../common/lv';
export default class Detail extends Page {
    constructor(){
        super()
    }
    componentDidMount(){
        this.showLoading();
        Model.post('/sharedline/getlinedetail',{
            lineid: this.props.params.id
        }).then(rs=>{
            this.hideLoading();
            this.setState({
                data: rs.Data.Infos || {}
            })
        })
    }
    componentWillMount(){
        this.state = {
            data:null
        }
    }
    render(){
        var data = this.state.data;

        return this.create(
            (data && data.TripList) ? data.TripList.map((trip, index)=> {
                return (
                    <div className="item-detail" key={"trip"+index}>
                        <span className="daytour-index">第{index + 1}天</span><span
                        className="daytour-title">{trip.TripTitle}</span>
                        <DayRouter data={trip.TripDetailList}/>
                    </div>
                )
            }) : <NormalError msg="暂时没有数据"/>
        )
    }
}