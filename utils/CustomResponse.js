exports.makeResponse = function (response, data, message, api_status, status_code = 0) {

    console.log('------SENDING RESPONSE------', data)
    console.log('------RESPONSE MESSAGE', message)

    response.json({
        result: data,
        message: message,
        status: api_status,
        status_code: status_code
    });
}
