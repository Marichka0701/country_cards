async function fetchCountry(country) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    return response.json();
}

const input = document.getElementsByName('search')[0];
const button = document.getElementsByClassName('btn')[0];

const container = document.getElementById('container');

button.addEventListener('click', async (e) => {
    e.preventDefault();
    const countryName = input.value;
    input.value = '';

    const countryData = await fetchCountry(countryName);
    console.log(countryData);

    if (countryData.status === 404) {
        alert('Такої країни не існує :( ');
    }

    const country_card = document.createElement('div');
    country_card.classList.add('country_card');

    const info = document.createElement('div')
    info.classList.add('info');

    const flag = document.createElement('div');
    flag.classList.add('flag');

    const flag_img = document.createElement('img');
    flag_img.classList.add('flag_img');
    flag_img.src = `${countryData[0].flags.png}`
    flag_img.alt = `Flag's country: ${countryData[0].name.official}`;

    flag.appendChild(flag_img);

    const name_and_capital = document.createElement('div');
    name_and_capital.classList.add('name_and_capital');

    const country_name = document.createElement('h2');
    country_name.classList.add('country_name');
    country_name.innerText = `${countryData[0].name.official}`;

    const country_capital = document.createElement('p');
    country_capital.classList.add('country_capital');
    country_capital.innerText = `${countryData[0].capital[0]}`;

    name_and_capital.append(country_name, country_capital);

    const country_languages = document.createElement('div');
    country_languages.classList.add('country_languages');
    const span_emoji_lang = document.createElement('span');
    span_emoji_lang.innerText = `🗣`;
    const span_text_lang = document.createElement('span');
    for (const key in countryData[0].languages) {
        span_text_lang.innerText = `${countryData[0].languages[key]}`
    }

    country_languages.append(span_emoji_lang, span_text_lang);

    const country_population = document.createElement('div');
    country_population.classList.add('country_population');
    const span_emoji_population = document.createElement('span');
    span_emoji_population.innerText = `👫`;
    const span_text_population = document.createElement('span');
    span_text_population.innerText = `${countryData[0].population}`

    country_population.append(span_emoji_population, span_text_population);


    const country_currency = document.createElement('div');
    country_currency.classList.add('country_currency');
    const span_emoji_currency = document.createElement('span');
    span_emoji_currency.innerText = `💰`;
    const span_text_currency = document.createElement('span');
    for (const key in countryData[0].currencies) {
        span_text_currency.innerText = `${countryData[0].currencies[key].name}`;
    }

    country_currency.append(span_emoji_currency, span_text_currency);

    info.append(name_and_capital, country_languages, country_population, country_currency);
    country_card.append(flag, info)
    container.appendChild(country_card);
})
