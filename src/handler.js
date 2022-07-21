module.exports.webapp = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            value: {
                message: 'Hello OneTUDN',
                INPUT: Event,
            },
            replacer: null,
            space: 2
        ),
    };
};
