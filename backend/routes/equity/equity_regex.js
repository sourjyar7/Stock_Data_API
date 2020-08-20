const pattern1=/^NIFTY[0-9]*/;
const pattern2=/ [0-9]*[A-Z]*/;
const pattern3=/[0-9]*[A-Z]*$/;
let extractPattern=(str,pattern)=>{
    return (str.match(pattern))[0];

}

module.exports={extractPattern,pattern1,pattern2,pattern3};