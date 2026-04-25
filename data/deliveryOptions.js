import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1/+esm';
export const deliveryOptions=[{
id:"1",
deliveryDays: 7,
priceCents:0
},
{
  id:"2",
deliveryDays: 3,
priceCents:499
},
{
id:"3",
deliveryDays: 1,
priceCents:999
}
];
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption= option;
    }
  });
  return deliveryOption || deliveryOption[0];
}

function isWeekend(date){
  const day = date.day();
  return day === 0 || day === 6;
}

export function calculateDeliveryDate(deliveryOption){
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  return deliveryDate.format('dddd, MMMM D');
}