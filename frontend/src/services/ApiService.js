import axios from "axios";
import NetworkService from "./NetworkService";
import {
    ERR_NETWORK_SERVICE,
    ERR_NO_INTERNET,
    ERR_API_FAIL,
    ERR_API_FAIL_ALT,
    ERR_API_SUCCESS,
} from "../constants/ApiConstants";

var resp;

// [Aditya 21-01-2023]
// API service
const ApiService = {
    // apiPath - path to API (will be sent by user)
    // apiName - name of API
    getRequest: (apiPath, apiName, params) => {
        // Promise added to handle async calls
        return new Promise((resolve, reject) => {
            NetworkService.getConnectivityStatus().then(
                (isOnline) => {
                    console.log("User is online? ", isOnline);

                    if (isOnline === true) {
                        axios
                            .get(apiPath + apiName, params)
                            .then(function (response) {
                                console.log(
                                    apiName + " API Response: ",
                                    response
                                );

                                if (response.status === 200) {
                                    resp = {
                                        success: true,
                                        data: response.data,
                                        message: ERR_API_SUCCESS,
                                    };
                                    resolve(resp);
                                } else {
                                    console.log(
                                        apiName + " API Error: ",
                                        response
                                    );

                                    resp = {
                                        success: false,
                                        data: "",
                                        message: apiName + ERR_API_FAIL_ALT,
                                    };
                                    resolve(resp);
                                }
                            })
                            .catch(function (error) {
                                console.log(apiName + " API Error: ", error);

                                resp = {
                                    success: false,
                                    data: "",
                                    message: ERR_API_FAIL + apiName,
                                };
                                resolve(resp);
                            });
                    } else {
                        resp = {
                            success: false,
                            data: "",
                            message: ERR_NO_INTERNET,
                        };
                        resolve(resp);
                    }
                },
                (error) => {
                    console.log("Network service error: ", error);

                    resp = {
                        success: false,
                        data: "",
                        message: ERR_NETWORK_SERVICE,
                    };
                    resolve(resp);
                }
            );
        });
    },

    postRequest: (apiPath, apiName, params, userToken) => {
        // Promise added to handle async calls
        return new Promise((resolve, reject) => {
            NetworkService.getConnectivityStatus().then(
                (isOnline) => {
                    console.log("User is online? ", isOnline);

                    if (isOnline === true) {
                        var config = {};
                        if (userToken !== "") {
                            config.headers = {
                                Authorization: "Bearer " + userToken,
                            };
                        }
                        console.log("inside post ", params);
                        axios
                            .post(apiPath + apiName, params, config)
                            .then(function (response) {
                                console.log(
                                    apiName + " API Response: ",
                                    response
                                );

                                if (response.status === 200) {
                                    resp = {
                                        success: true,
                                        data: response.data,
                                        message: ERR_API_SUCCESS,
                                    };
                                    resolve(resp);
                                } else {
                                    console.log(
                                        apiName + " API Error: ",
                                        response
                                    );

                                    resp = {
                                        success: false,
                                        data: "",
                                        message: apiName + ERR_API_FAIL_ALT,
                                    };
                                    resolve(resp);
                                }
                            })
                            .catch(function (error) {
                                console.log(apiName + " API Error: ", error);

                                resp = {
                                    success: false,
                                    data: "",
                                    message: ERR_API_FAIL + apiName,
                                };
                                resolve(resp);
                            });
                    } else {
                        resp = {
                            success: false,
                            data: "",
                            message: ERR_NO_INTERNET,
                        };
                        resolve(resp);
                    }
                },
                (error) => {
                    console.log("Network service error: ", error);

                    resp = {
                        success: false,
                        data: "",
                        message: ERR_NETWORK_SERVICE,
                    };
                    resolve(resp);
                }
            );
        });
    },
};

export default ApiService;
