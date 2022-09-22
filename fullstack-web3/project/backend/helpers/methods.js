/**
 *
 * @param message
 * @param payload
 * @returns {{package, message, status: boolean}}
 */
exports.successResponse = (message, data) => {
    return {
        status: true,
        message,
        data
    }
}

/**
 *
 * @param message
 * @param payload
 * @returns {{message, status: boolean}}
 */
exports.failResponse = (message) => {
    let response = {
        status: false,
        message
    }

    return response
}
