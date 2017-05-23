/**
 * Created by ben on 2017/5/23.
 */
const moment = require('moment');

moment.locale('cn');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
