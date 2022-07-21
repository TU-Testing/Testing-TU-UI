'use strict';

module.exports.webapp = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            value: {
                message: 'Hello OneTUDN',
                INPUT: event,
            },
            replacer: null,
            space: 2
          }),
    };
};
