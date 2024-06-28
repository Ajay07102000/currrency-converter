import { countryList } from "./codes.js";
const base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg = document.querySelector(".msg")

console.log(dropdowns);
  
for (let select of dropdowns) {
    for (let curr in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = curr; 
        newOption.value =curr ;
        if(select.name==="from" && curr==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="to" && curr==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption); 
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag= (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", async (evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtVal=amount.value;
if(amtVal=='' || amtVal<0)
{
    amtVal=1;
    amount.value="1";
}

 console.log( "From curr: " + fromCurr );

const URL=`${base_URL}/${fromCurr.value.toLowerCase()}.json`;
console.log(URL)
let response = await fetch (URL);
let data = await response.json ();

// console.log(data);

const currData = data[fromCurr.value.toLowerCase()];
// console.log(currData);

console.log(currData[toCurr.value.toLowerCase()]);

let changedCurr = amtVal * currData[toCurr.value.toLowerCase()];

msg.innerText = `${amtVal} ${fromCurr.value} = ${Math.round((changedCurr + Number.EPSILON) * 100) / 100
}  ${toCurr.value}`;

});