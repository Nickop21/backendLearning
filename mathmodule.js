function add(a,b){
console.log(a+b);

}
function sub(a,b){
console.log(a-b);

}
//other way to export by using anonymous fun
// exports.add=(a,b)=>{
//     console.log(a+b);
    
// }

module.exports={add,sub}