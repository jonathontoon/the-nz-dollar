import Twitter from 'twitter';
import Request from 'request-promise';

import moment from 'moment';
import tz from 'moment-timezone';

const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

const url = 'https://api.fixer.io/latest?base=NZD';

Request(url).then((data) => {
    const parsedData = JSON.parse(data);
    const rates = parsedData.rates;
    const date = moment().tz('Pacific/Auckland').format('MMM Do');
    const time = moment().tz('Pacific/Auckland').format('hh:mm');

    let rateKeys = [];
    let tweet = '🕒 ' + time + ' 🗓️ ' + date + '\n\n';

    for (let rate in rates) {
        if (rate === 'AUD') {
            tweet += '🇦🇺 ' + rate + ': $' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'CAD') {
            tweet += '🇨🇦 ' + rate + ': $' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'CHF') {
            tweet += '🇨🇭 ' + rate + ': Fr' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'CNY') {
            tweet += '🇨🇳 ' + rate + ': ¥' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'EUR') {
            tweet += '🇪🇺 ' + rate + ': €' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'GBP') {
            tweet += '🇬🇧 ' + rate + ': £' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'JPY') {
            tweet += '🇯🇵 ' + rate + ': ¥' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'KRW') {
            tweet += '🇰🇷 ' + rate + ': ₩' + rates[rate].toFixed(2) + ' \n';
        } else if (rate === 'USD') {
            tweet += '🇺🇸 ' + rate + ': $' + rates[rate].toFixed(2) + ' \n'; 
        } else if (rate === 'ZAR') {
            tweet += '🇿🇦 ' + rate + ': R' + rates[rate].toFixed(2) + ' \n'; 
        }
    }

    client.post('statuses/update', {status: tweet});
});