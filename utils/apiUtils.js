module.exports = function responseBuilder(response, context) {
    response.status(200).json(context);
};
