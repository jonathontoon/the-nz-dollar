'use strict';

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _twitter2.default({
    consumer_key: 'mMSgYtVaFEeXP30NSLcAxfVgw',
    consumer_secret: 'DOTGq6pjPgavNp5joTsMC9PIQa5aN88gc2a6OYOyzqiV0hkogj',
    access_token_key: '752120176431149056-eANwroB1IbQucpNFZXPGdrJaAu4l8aI',
    access_token_secret: 'WaXVMrItxsE9oD4wEC2kOwZ6aAbbx0MWPk5YQMUHDobRF'
});

var url = 'https://api.fixer.io/latest?base=NZD';

(0, _requestPromise2.default)(url).then(function (data) {
    var parsedData = JSON.parse(data);
    var rates = parsedData.rates;
    var date = (0, _moment2.default)().tz('Pacific/Auckland').format('MMM Do');
    var time = (0, _moment2.default)().tz('Pacific/Auckland').format('hh:mm');

    var rateKeys = [];
    var tweet = '🕒 ' + time + ' 🗓️ ' + date + '\n\n';

    for (var rate in rates) {
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

    client.post('statuses/update', { status: tweet });
});