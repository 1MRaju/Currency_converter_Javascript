const BASE_URL = "https://open.er-api.com/v6/latest";
// const BASE_URl =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".countries__container select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".countries__selector__from select");
const toCurr = document.querySelector(".countries__selector__to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = `${currCode} - ${countryList[currCode].countryName}`;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    console.log(evt.target.value);
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".input__container input");
  let amtVal = amount.value;

  console.log(amtVal);
 
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    // amount.value = "1";
  }


  try {
    let fromVal = fromCurr.value;
  
    const URL =  `${BASE_URL}/${fromVal}`;

    let response = await fetch(URL);

    let data = await response.json();

    const rates1 = data.rates;  //copy of currency object related to 'from coutries'
    console.log(rates1);

    const toVal = toCurr.value;  //selected currency code from 'to countries'
  
    console.log(rates1[fromVal]); 
    console.log(rates1[toVal]);  //obtaining exchange rate for right(to country) according to left(from country) value 1;

    let fromCal = amtVal * rates1[fromVal]
    let toCal = amtVal * rates1[toVal]

    msg.innerText = `${fromCal} [${fromVal}] = ${parseFloat(toCal.toFixed(2))} [${toVal}]`;
    
  } catch (error) {
    console.log(error)
  }
}


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode].countryCode;
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


