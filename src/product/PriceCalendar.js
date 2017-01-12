/**
 * @author xuweichen@meitu.io
 * @date 12/13/16
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {Calendar,Page,Model,DateUtil,Store} from '../common/lv';

var priceCalendarData = new Store('KEY_PRICE_CALENDAR');
import '../css/product.css';
import '../css/calendar.css';
export default class CalendarPrice extends Page {
    headerview = {
        title: '价格日历'
    }
    componentDidMount(){

        this.getList();
    }
    componentWillMount(){

        this.state = {
            size: 4,
            data: null,
            selectedDays: priceCalendarData.getItem('selectedDay')
        }
    }
    getPeriod(){
        var today = new Date(),
            endDate = new Date(new Date(+today).setMonth(today.getMonth()+this.state.size-1));

        return {
            startDate: DateUtil.toDateStr(today),
            endDate: DateUtil.getLastDateOfMonth(endDate.getFullYear(), endDate.getMonth())
        }
    }
    getList(){
        var period = this.getPeriod();
        Model.post('/sharedline/getlineair',{
            lineid: this.props.params.id,
            ...period
        }).then((rs)=>{
            this.setState({
                data: rs.Data.Infos
            })
        });
    }
    selectDay(daystr){
        if(this.state.data[daystr]){
            var selectedData = {[daystr]:this.state.data[daystr]}
            this.setState({
                selectedDays: selectedData
            });
            this.backward();
            priceCalendarData.setItem('selectedDay',
                selectedData
            );
        }
    }
    onDayRender(dateStr){

        var itemData = this.state.data[dateStr];
        return (
            itemData?<b style={{fontSize:12,fontWeight:'normal'}}>&yen;{itemData.Price}</b>:null
        )
    }
    render(){
        return this.create(
            this.state.data ?
            <Calendar size={this.state.size} data={this.state.data} onItemClick={this.selectDay.bind(this)} 
                      dayRender={this.onDayRender.bind(this)}
                      selected={this.state.selectedDays}/>
              :
            null
        )
    }
}
