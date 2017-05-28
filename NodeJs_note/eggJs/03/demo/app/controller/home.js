'use strict';

exports.index = function *(ctx) {
    const userId = ctx.params.id;
    const user = yield ctx.service.home.find(1);
    ctx.body = user;
}
