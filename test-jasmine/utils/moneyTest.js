import { formatCurrency } from "../../scirpts/utils/money.js";
describe('test suit: formatCurrency', ()=>{
  it('convert dollars to cents',()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  });
   it('convert dollars to cents',()=>{
    expect(formatCurrency(0)).toEqual('0.00')
  });
   it('round to next cents',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01')
  });
})