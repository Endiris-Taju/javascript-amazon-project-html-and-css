import {formatCurrency} from '../.././scirpts/utils/money.js'
 console.log('test suite');
 
console.log('convert cents in to dollars');
if(formatCurrency(2095) === '20.95'){
  console.log('passed');
  
}else{
  console.log("failed");
  
}
console.log('work with round with  Zero');
if(formatCurrency(0) === '0.00'){
  console.log('passed');
  
}else{
  console.log("failed");
  
}
console.log('work with round with next cents');

if(formatCurrency(2000.5) === '20.01'){
  console.log('passed');
  
}else{
  console.log("failed");
  
}