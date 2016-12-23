/**
 * @author xuweichen@meitu.io
 * @date 12/13/16
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {DateUtil} from './lv';
var selfRender = (origin)=>{return origin}
const NOOP = ()=>{}
export default class Calendar extends Component {
    render(){
        var self = this;

        return (
            <div className="cal-container">
                <ul className="cal-weeks">
                    {this.props.weeks.map((label,index)=>{
                        return (
                            <li className="cal-week" key={'week'+index}>
                                {self.props.weekRender.call(self, label)}
                            </li>
                        )
                    })}
                </ul>
                <section className="cal-views">
                    {
                        this._getMonthViews().map((view,index)=>(
                            <div className="cal-view" key={"month"+index}>
                                <h1 className="cal-title">{view[0]}&nbsp;{this.props.months[view[1]]}</h1>
                                {this.renderDays.apply(this,view)}
                            </div>
                        ))
                    }
                </section>
            </div>
        )
    }
    nextMonth(){

    }
    prevMonth(){

    }
    _getMonthViews(){
        var viewsCount = this.props.size || 1,
            start = new Date(this._getStartDate()),
            temp,
            months = [];

        for(let i=0;i<viewsCount; i++){

            temp = new Date((new Date(+start)).setMonth(start.getMonth()+i));
            months.push([temp.getFullYear(),temp.getMonth()])
        }

        return months;

    }
    _getStartDate(){
        var self = this,
            month = self.props.month,
            year = self.props.year;

        if(typeof month==='undefined' || typeof year==='undefined'){
            return DateUtil.getFirstDateOfMonth(self.props.current)
        }else{
            return DateUtil.toDateStr(new Date(year, month, 1));
        }

    }
    renderDays(year, month){
        var self = this,
            current = new Date(this.props.current),
            start = DateUtil.getFirstDateOfMonth(year, month),
            daysCount = DateUtil.getDaysCountOfMonth(year,month),
            paddingDays = (new Date(start)).getDay(),
            daystr = '',
            days = [];
        // console.log(daysCount+'-'+paddingDays+'start'+start+year+','+month);
        for(let i = -paddingDays;i<daysCount;i++){
            daystr = DateUtil.addDays(start, i);
            days.push(
                <li
                    onClick={self.props.onItemClick.bind(self, daystr)}
                    className={
                "cal-day"
                    +(self.props.selected[daystr]?' selected': '')
                    +(i<0 ? ' cal-day-padding' : '')
                    +(DateUtil.isWeekend(daystr)?' cal-weekend':'')
                    +((daystr==this.props.current)?' '+(self.props.currentDayCls):'')
                }
                    data-date={daystr} key={"day"+i}>
                    <div>
                        <span className="cal-day-text">{daystr.split('-')[2]}</span>
                        <br/>
                        {self.props.dayRender.call(self, DateUtil.addDays(start, i))}

                    </div>
                </li>
            )
        }

        return (
            <ul className="cal-days">
                {days}
            </ul>
        )
    }
    static propTypes = {
        weeks: PropTypes.array
    }
    static defaultProps = {
        selected:{},
        current: DateUtil.toDateStr(new Date()),
        year: (new Date).getFullYear(),
        month: (new Date).getMonth(),
        weekRender: selfRender,
        dayRender: NOOP,
        currentDayCls: 'cal-day-current',
        weeks: ['日','一','二','三','四','五','六'],
        months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        size: 5,
        onItemClick: NOOP
    }
}
