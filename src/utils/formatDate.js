// 个位数前+0
function formatTime(d){
    return d > 10 ? d : `0${d}`
}
// 日期格式化y/m/d h:m:s
export function formatedDate(){
    const date = new Date();
    const y = date.getFullYear();
    const m = formatTime(date.getMonth() + 1);
    const d =  formatTime(date.getDate());
    const h = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const s = formatTime(date.getSeconds());
    return `${y}/${m}/${d} ${h}:${minutes}:${s}`
}