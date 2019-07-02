const { responseStatus } = require('../constants');

const HTTP_STATUS_CODE = 200;

const respondSuccess = (res) => {
    res.status(HTTP_STATUS_CODE).json({
        status: responseStatus.RES_STATUS_SUCCESS
    });
};

const respondSuccessData = (res, data) => {
    res.status(HTTP_STATUS_CODE).json({
        status: responseStatus.RES_STATUS_SUCCESS,
        data: data
    });
};

const respondFail = (res) => {
    res.status(HTTP_STATUS_CODE).json({
        status: responseStatus.RES_STATUS_FAIL
    });
};

const respondAuthFail = (res) => {
    res.status(HTTP_STATUS_CODE).json({
        status: responseStatus.RES_STATUS_AUTH_FAIL
    });
};

module.exports = {
    respondSuccess,
    respondSuccessData,
    respondFail,
    respondAuthFail
};