/**
 * @author xuweichen@meitu.io
 * @date 12/13/16
 */
export default {
    toDateStr(date){
        if(typeof date==='string') return date;

        var nowDate = date || new Date;
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        return year + "-" + month + "-" + day;
    },
    tomorrow(){
        var temp = new Date();//today

        return this.toDateStr(new Date(temp.setDate(temp.getDate()+1)));
    },
    getFirstDateOfMonth(year, month){
        var temp;
    // debugger
        if(typeof month==='undefined'){
            temp = new Date(year);
            year = temp.getFullYear();
            month = temp.getMonth();
        }

        temp = new Date(year,month, 1);
        return this.toDateStr(temp);
    },
    getLastDateOfMonth(year, month){
        var temp;

        if(typeof month==='undefined'){
            temp = new Date(year);
            year = temp.getFullYear();
            month = temp.getMonth();
        }
        temp = new Date(year,month+1, 0);
        return this.toDateStr(temp);
    },
    getDaysCountOfMonth(year, month){
        var temp;

        if(typeof month==='undefined'){
            temp = new Date(year);
            year = temp.getFullYear();
            month = temp.getMonth();
        }
        temp = new Date(year,month+1, 0);
        return temp.getDate(temp);
    },
    addDays(dateStr, addon){
        var temp = new Date(dateStr);


        return this.toDateStr(new Date(temp.setDate(temp.getDate()+addon)))
    },
    isWeekend(date){
        var day = (new Date(date)).getDay();

        return day===0 || day===6
    }
}