import moment from 'moment'



export const getDay = (date) => {
    const day = moment(date).day();

    switch(day) {
        case 0:
            return '일'
        case 1:
            return '월'
        case 2:
            return '화'
        case 3:
            return '수'
        case 4:
            return '목'
        case 5:
            return '금'
        case 6:
            return '토'
    }
}

export const groupByDate = (xs, DatetimecolumnName) => {
    return xs.reduce((rv, x) => {
      (rv[moment(x[DatetimecolumnName]).startOf('day').toISOString()] = rv[moment(x[DatetimecolumnName]).startOf('day').toISOString()] || []).push(x);
      return rv;
    }, {});
};

export const YYYYMMDD_Slash = (date) => {
    return moment(date).format('YYYY/MM/DD')
}

export const YYYYMMDD_korean_day = (date) => {
    return `${moment(date).format('YYYY년 MM월 DD일')} (${getDay(date)})`
}


/* 
*  input   :  2020-02-15T07:57:41.000Z
*  output  :  2020년 02월 15일 (토)  오후 4시 57분
*/
export const YYDDMMDDhmm_Korean = (date) => {
    return `${moment(date).format('YYYY년 MM월 DD일')} (${getDay(date)})  ${Number(moment(date).format('HH')) >= 12 ? '오후' : '오전'} ${moment(date).format('h시 mm분')}`
}
