document.querySelector("#country-btn").addEventListener("click",()=>{
    
    let countryValue=document.querySelector("#country-input").value;
    
    getCountry(countryValue);

})

getCountry=(countryValue)=>
    {
        const data=new XMLHttpRequest();
        data.open("GET","https://restcountries.com/v3.1/name/"+countryValue)
        data.send();

        data.addEventListener("load",()=>{
            let dataPlus=JSON.parse(data.responseText)

            displayCountry(dataPlus[0]);
            console.log(dataPlus[0])


//komşu ülkeleri yükleme
            const countryies=dataPlus[0].borders.toString();

            const data2=new XMLHttpRequest();
            data2.open("GET","https://restcountries.com/v3.1/alpha?codes="+countryies)
            data2.send();

            data2.addEventListener("load",()=>{

                let data2Plus=JSON.parse(data2.responseText);
                neighboringCountries(data2Plus);
                console.log(data2Plus)
            })
        })
        
    }

    displayCountry=(dataPlus_1)=>
        {
            let html=
            `
                <div class="col-md-4">
                <div class="bayrak-kapsayici">
                    <img id="ulkeBayragi" src="${dataPlus_1.flags.png}" alt="Ülke Bayrağı" class="bayrak">
                </div>
            </div>
            <div class="col-md-8">
                <div class="bilgi-kapsayici">
                    <h4 id="ulkeIsmi">${dataPlus_1.altSpellings[1]}</h4>
                    <p><strong>Capital City:</strong> <span id="ulkeBaskenti">${dataPlus_1.capital}</span></p>
                    <p><strong>Population:</strong> <span id="ulkeNufusu">${(dataPlus_1.population/1000000).toFixed(1)}</span></p>
                    <p><strong>Continent:</strong> <span id="ulkeKitasi">${dataPlus_1.continents[0]} ${dataPlus_1.continents[1] ?","+dataPlus_1.continents[1] : ""}</span></p>
                    <p><strong>Language:</strong> <span id="countryLanguage">${Object.values(dataPlus_1.languages)}</span></p>
                    <p><strong>Currencies:</strong> <span id="countryCurrencies">${Object.values(dataPlus_1.currencies)[0].name}  (${Object.values(dataPlus_1.currencies)[0].symbol})</span></p>

                </div>
            </div>
            `
            document.querySelector(".countryDetails").innerHTML=html;
        }
    
    neighboringCountries=(data2Plus)=>
        {
            let html2=""
            for (let country of data2Plus) {
                
               html2+=
        `
            <div class="komsu-ulke">
                <img src="${country.flags.png}" alt="Neighbor Country 1" class="komsu-bayrak">
                <p>${country.name.common}</p>
            </div>
        `
        document.querySelector(".komsu-ulke-listesi").innerHTML=html2;
            }

           
            
        }    
        