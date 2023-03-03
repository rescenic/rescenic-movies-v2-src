'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('cross-fetch/polyfill');
var crypto = require('crypto');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

// Type definitions for meilisearch
// Project: https://github.com/meilisearch/meilisearch-js
// Definitions by: qdequele <quentin@meilisearch.com> <https://github.com/meilisearch>
// Definitions: https://github.com/meilisearch/meilisearch-js
// TypeScript Version: ^3.8.3
/*
 * SEARCH PARAMETERS
 */
var MatchingStrategies = {
    ALL: 'all',
    LAST: 'last'
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var MeiliSearchCommunicationError = /** @class */ (function (_super) {
    __extends(MeiliSearchCommunicationError, _super);
    function MeiliSearchCommunicationError(message, body, url, stack) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, message) || this;
        // Make errors comparison possible. ex: error instanceof MeiliSearchCommunicationError.
        Object.setPrototypeOf(_this, MeiliSearchCommunicationError.prototype);
        _this.name = 'MeiliSearchCommunicationError';
        if (body instanceof Response) {
            _this.message = body.statusText;
            _this.statusCode = body.status;
        }
        if (body instanceof Error) {
            _this.errno = body.errno;
            _this.code = body.code;
        }
        if (stack) {
            _this.stack = stack;
            _this.stack = (_a = _this.stack) === null || _a === void 0 ? void 0 : _a.replace(/(TypeError|FetchError)/, _this.name);
            _this.stack = (_b = _this.stack) === null || _b === void 0 ? void 0 : _b.replace('Failed to fetch', "request to ".concat(url, " failed, reason: connect ECONNREFUSED"));
            _this.stack = (_c = _this.stack) === null || _c === void 0 ? void 0 : _c.replace('Not Found', "Not Found: ".concat(url));
        }
        else {
            if (Error.captureStackTrace) {
                Error.captureStackTrace(_this, MeiliSearchCommunicationError);
            }
        }
        return _this;
    }
    return MeiliSearchCommunicationError;
}(Error));

var MeiliSearchApiError = /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1(error, status) {
        var _this = _super.call(this, error.message) || this;
        // Make errors comparison possible. ex: error instanceof MeiliSearchApiError.
        Object.setPrototypeOf(_this, MeiliSearchApiError.prototype);
        _this.name = 'MeiliSearchApiError';
        _this.code = error.code;
        _this.type = error.type;
        _this.link = error.link;
        _this.message = error.message;
        _this.httpStatus = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MeiliSearchApiError);
        }
        return _this;
    }
    return class_1;
}(Error));

function httpResponseErrorHandler(response) {
    return __awaiter(this, void 0, void 0, function () {
        var responseBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!response.ok) return [3 /*break*/, 5];
                    responseBody = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, response.json()];
                case 2:
                    // If it is not possible to parse the return body it means there is none
                    // In which case it is a communication error with the Meilisearch instance
                    responseBody = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a.sent();
                    // Not sure on how to test this part of the code.
                    throw new MeiliSearchCommunicationError(response.statusText, response, response.url);
                case 4: 
                // If the body is parsable, then it means Meilisearch returned a body with
                // information on the error.
                throw new MeiliSearchApiError(responseBody, response.status);
                case 5: return [2 /*return*/, response];
            }
        });
    });
}
function httpErrorHandler(response, stack, url) {
    if (response.name !== 'MeiliSearchApiError') {
        throw new MeiliSearchCommunicationError(response.message, response, url, stack);
    }
    throw response;
}

var MeiliSearchError = /** @class */ (function (_super) {
    __extends(MeiliSearchError, _super);
    function MeiliSearchError(message) {
        var _this = _super.call(this, message) || this;
        // Make errors comparison possible. ex: error instanceof MeiliSearchError.
        Object.setPrototypeOf(_this, MeiliSearchError.prototype);
        _this.name = 'MeiliSearchError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MeiliSearchError);
        }
        return _this;
    }
    return MeiliSearchError;
}(Error));

var MeiliSearchTimeOutError = /** @class */ (function (_super) {
    __extends(MeiliSearchTimeOutError, _super);
    function MeiliSearchTimeOutError(message) {
        var _this = _super.call(this, message) || this;
        // Make errors comparison possible. ex: error instanceof MeiliSearchTimeOutError.
        Object.setPrototypeOf(_this, MeiliSearchTimeOutError.prototype);
        _this.name = 'MeiliSearchTimeOutError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, MeiliSearchTimeOutError);
        }
        return _this;
    }
    return MeiliSearchTimeOutError;
}(Error));

/** Removes undefined entries from object */
function removeUndefinedFromObject(obj) {
    return Object.entries(obj).reduce(function (acc, curEntry) {
        var key = curEntry[0], val = curEntry[1];
        if (val !== undefined)
            acc[key] = val;
        return acc;
    }, {});
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addProtocolIfNotPresent(host) {
    if (!(host.startsWith('https://') || host.startsWith('http://'))) {
        return "http://".concat(host);
    }
    return host;
}
function addTrailingSlash(url) {
    if (!url.endsWith('/')) {
        url += '/';
    }
    return url;
}
function validateUuid4(uuid) {
    var regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(uuid);
}

var PACKAGE_VERSION = '0.31.1';

function toQueryParams(parameters) {
    var params = Object.keys(parameters);
    var queryParams = params.reduce(function (acc, key) {
        var _a, _b, _c;
        var value = parameters[key];
        if (value === undefined) {
            return acc;
        }
        else if (Array.isArray(value)) {
            return __assign(__assign({}, acc), (_a = {}, _a[key] = value.join(','), _a));
        }
        else if (value instanceof Date) {
            return __assign(__assign({}, acc), (_b = {}, _b[key] = value.toISOString(), _b));
        }
        return __assign(__assign({}, acc), (_c = {}, _c[key] = value, _c));
    }, {});
    return queryParams;
}
function constructHostURL(host) {
    try {
        host = addProtocolIfNotPresent(host);
        host = addTrailingSlash(host);
        return host;
    }
    catch (e) {
        throw new MeiliSearchError('The provided host is not valid.');
    }
}
function createHeaders(config) {
    var agentHeader = 'X-Meilisearch-Client';
    var packageAgent = "Meilisearch JavaScript (v".concat(PACKAGE_VERSION, ")");
    var contentType = 'Content-Type';
    config.headers = config.headers || {};
    var headers = Object.assign({}, config.headers); // Create a hard copy and not a reference to config.headers
    if (config.apiKey) {
        headers['Authorization'] = "Bearer ".concat(config.apiKey);
    }
    if (!config.headers[contentType]) {
        headers['Content-Type'] = 'application/json';
    }
    // Creates the custom user agent with information on the package used.
    if (config.clientAgents && Array.isArray(config.clientAgents)) {
        var clients = config.clientAgents.concat(packageAgent);
        headers[agentHeader] = clients.join(' ; ');
    }
    else if (config.clientAgents && !Array.isArray(config.clientAgents)) {
        // If the header is defined but not an array
        throw new MeiliSearchError("Meilisearch: The header \"".concat(agentHeader, "\" should be an array of string(s).\n"));
    }
    else {
        headers[agentHeader] = packageAgent;
    }
    return headers;
}
var HttpRequests = /** @class */ (function () {
    function HttpRequests(config) {
        this.headers = createHeaders(config);
        try {
            var host = constructHostURL(config.host);
            this.url = new URL(host);
        }
        catch (e) {
            throw new MeiliSearchError('The provided host is not valid.');
        }
    }
    HttpRequests.prototype.request = function (_a) {
        var method = _a.method, url = _a.url, params = _a.params, body = _a.body, config = _a.config;
        return __awaiter(this, void 0, void 0, function () {
            var constructURL, queryParams_1, response, parsedBody, e_1, stack;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        constructURL = new URL(url, this.url);
                        if (params) {
                            queryParams_1 = new URLSearchParams();
                            Object.keys(params)
                                .filter(function (x) { return params[x] !== null; })
                                .map(function (x) { return queryParams_1.set(x, params[x]); });
                            constructURL.search = queryParams_1.toString();
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(constructURL.toString(), __assign(__assign({}, config), { method: method, body: JSON.stringify(body), headers: this.headers })).then(function (res) { return httpResponseErrorHandler(res); })];
                    case 2:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()["catch"](function () { return undefined; })];
                    case 3:
                        parsedBody = _b.sent();
                        return [2 /*return*/, parsedBody];
                    case 4:
                        e_1 = _b.sent();
                        stack = e_1.stack;
                        httpErrorHandler(e_1, stack, constructURL.toString());
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequests.prototype.get = function (url, params, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'GET',
                            url: url,
                            params: params,
                            config: config
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequests.prototype.post = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'POST',
                            url: url,
                            body: data,
                            params: params,
                            config: config
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequests.prototype.put = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'PUT',
                            url: url,
                            body: data,
                            params: params,
                            config: config
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequests.prototype.patch = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'PATCH',
                            url: url,
                            body: data,
                            params: params,
                            config: config
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequests.prototype["delete"] = function (url, data, params, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({
                            method: 'DELETE',
                            url: url,
                            body: data,
                            params: params,
                            config: config
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return HttpRequests;
}());

var EnqueuedTask = /** @class */ (function () {
    function EnqueuedTask(task) {
        this.taskUid = task.taskUid;
        this.indexUid = task.indexUid;
        this.status = task.status;
        this.type = task.type;
        this.enqueuedAt = new Date(task.enqueuedAt);
    }
    return EnqueuedTask;
}());

var Task = /** @class */ (function () {
    function Task(task) {
        this.indexUid = task.indexUid;
        this.status = task.status;
        this.type = task.type;
        this.uid = task.uid;
        this.details = task.details;
        this.canceledBy = task.canceledBy;
        this.error = task.error;
        this.duration = task.duration;
        this.startedAt = new Date(task.startedAt);
        this.enqueuedAt = new Date(task.enqueuedAt);
        this.finishedAt = new Date(task.finishedAt);
    }
    return Task;
}());
var TaskClient = /** @class */ (function () {
    function TaskClient(config) {
        this.httpRequest = new HttpRequests(config);
    }
    /**
     * Get one task
     *
     * @param uid - Unique identifier of the task
     * @returns
     */
    TaskClient.prototype.getTask = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var url, taskItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "tasks/".concat(uid);
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1:
                        taskItem = _a.sent();
                        return [2 /*return*/, new Task(taskItem)];
                }
            });
        });
    };
    /**
     * Get tasks
     *
     * @param parameters - Parameters to browse the tasks
     * @returns Promise containing all tasks
     */
    TaskClient.prototype.getTasks = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "tasks";
                        return [4 /*yield*/, this.httpRequest.get(url, toQueryParams(parameters))];
                    case 1:
                        tasks = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tasks), { results: tasks.results.map(function (task) { return new Task(task); }) })];
                }
            });
        });
    };
    /**
     * Wait for a task to be processed.
     *
     * @param taskUid - Task identifier
     * @param options - Additional configuration options
     * @returns Promise returning a task after it has been processed
     */
    TaskClient.prototype.waitForTask = function (taskUid, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeOutMs, timeOutMs = _c === void 0 ? 5000 : _c, _d = _b.intervalMs, intervalMs = _d === void 0 ? 50 : _d;
        return __awaiter(this, void 0, void 0, function () {
            var startingTime, response;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        startingTime = Date.now();
                        _e.label = 1;
                    case 1:
                        if (!(Date.now() - startingTime < timeOutMs)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getTask(taskUid)];
                    case 2:
                        response = _e.sent();
                        if (!["enqueued" /* TaskStatus.TASK_ENQUEUED */, "processing" /* TaskStatus.TASK_PROCESSING */].includes(response.status))
                            return [2 /*return*/, response];
                        return [4 /*yield*/, sleep(intervalMs)];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 1];
                    case 4: throw new MeiliSearchTimeOutError("timeout of ".concat(timeOutMs, "ms has exceeded on process ").concat(taskUid, " when waiting a task to be resolved."));
                }
            });
        });
    };
    /**
     * Waits for multiple tasks to be processed
     *
     * @param taskUids - Tasks identifier list
     * @param options - Wait options
     * @returns Promise returning a list of tasks after they have been processed
     */
    TaskClient.prototype.waitForTasks = function (taskUids, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeOutMs, timeOutMs = _c === void 0 ? 5000 : _c, _d = _b.intervalMs, intervalMs = _d === void 0 ? 50 : _d;
        return __awaiter(this, void 0, void 0, function () {
            var tasks, _i, taskUids_1, taskUid, task;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        tasks = [];
                        _i = 0, taskUids_1 = taskUids;
                        _e.label = 1;
                    case 1:
                        if (!(_i < taskUids_1.length)) return [3 /*break*/, 4];
                        taskUid = taskUids_1[_i];
                        return [4 /*yield*/, this.waitForTask(taskUid, {
                                timeOutMs: timeOutMs,
                                intervalMs: intervalMs
                            })];
                    case 2:
                        task = _e.sent();
                        tasks.push(task);
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, tasks];
                }
            });
        });
    };
    /**
     * Cancel a list of enqueued or processing tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    TaskClient.prototype.cancelTasks = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "tasks/cancel";
                        return [4 /*yield*/, this.httpRequest.post(url, {}, toQueryParams(parameters))];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Delete a list tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    TaskClient.prototype.deleteTasks = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "tasks";
                        return [4 /*yield*/, this.httpRequest["delete"](url, {}, toQueryParams(parameters))];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    return TaskClient;
}());

/*
 * Bundle: MeiliSearch / Indexes
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */
var Index = /** @class */ (function () {
    /**
     * @param config - Request configuration options
     * @param uid - UID of the index
     * @param primaryKey - Primary Key of the index
     */
    function Index(config, uid, primaryKey) {
        this.uid = uid;
        this.primaryKey = primaryKey;
        this.httpRequest = new HttpRequests(config);
        this.tasks = new TaskClient(config);
    }
    ///
    /// SEARCH
    ///
    /**
     * Search for documents into an index
     *
     * @param query - Query string
     * @param options - Search options
     * @param config - Additional request configuration options
     * @returns Promise containing the search response
     */
    Index.prototype.search = function (query, options, config) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/search");
                        return [4 /*yield*/, this.httpRequest.post(url, removeUndefinedFromObject(__assign({ q: query }, options)), undefined, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Search for documents into an index using the GET method
     *
     * @param query - Query string
     * @param options - Search options
     * @param config - Additional request configuration options
     * @returns Promise containing the search response
     */
    Index.prototype.searchGet = function (query, options, config) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var url, parseFilter, getParams;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/search");
                        parseFilter = function (filter) {
                            if (typeof filter === 'string')
                                return filter;
                            else if (Array.isArray(filter))
                                throw new MeiliSearchError('The filter query parameter should be in string format when using searchGet');
                            else
                                return undefined;
                        };
                        getParams = __assign(__assign({ q: query }, options), { filter: parseFilter(options === null || options === void 0 ? void 0 : options.filter), sort: (_a = options === null || options === void 0 ? void 0 : options.sort) === null || _a === void 0 ? void 0 : _a.join(','), facets: (_b = options === null || options === void 0 ? void 0 : options.facets) === null || _b === void 0 ? void 0 : _b.join(','), attributesToRetrieve: (_c = options === null || options === void 0 ? void 0 : options.attributesToRetrieve) === null || _c === void 0 ? void 0 : _c.join(','), attributesToCrop: (_d = options === null || options === void 0 ? void 0 : options.attributesToCrop) === null || _d === void 0 ? void 0 : _d.join(','), attributesToHighlight: (_e = options === null || options === void 0 ? void 0 : options.attributesToHighlight) === null || _e === void 0 ? void 0 : _e.join(',') });
                        return [4 /*yield*/, this.httpRequest.get(url, removeUndefinedFromObject(getParams), config)];
                    case 1: return [2 /*return*/, _f.sent()];
                }
            });
        });
    };
    ///
    /// INDEX
    ///
    /**
     * Get index information.
     *
     * @returns Promise containing index information
     */
    Index.prototype.getRawInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid);
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1:
                        res = _a.sent();
                        this.primaryKey = res.primaryKey;
                        this.updatedAt = new Date(res.updatedAt);
                        this.createdAt = new Date(res.createdAt);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Fetch and update Index information.
     *
     * @returns Promise to the current Index object with updated information
     */
    Index.prototype.fetchInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawInfo()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Get Primary Key.
     *
     * @returns Promise containing the Primary Key of the index
     */
    Index.prototype.fetchPrimaryKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.getRawInfo()];
                    case 1:
                        _a.primaryKey = (_b.sent()).primaryKey;
                        return [2 /*return*/, this.primaryKey];
                }
            });
        });
    };
    /**
     * Create an index.
     *
     * @param uid - Unique identifier of the Index
     * @param options - Index options
     * @param config - Request configuration options
     * @returns Newly created Index object
     */
    Index.create = function (uid, options, config) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, req, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes";
                        req = new HttpRequests(config);
                        return [4 /*yield*/, req.post(url, __assign(__assign({}, options), { uid: uid }))];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Update an index.
     *
     * @param data - Data to update
     * @returns Promise to the current Index object with updated information
     */
    Index.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid);
                        return [4 /*yield*/, this.httpRequest.patch(url, data)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    /**
     * Delete an index.
     *
     * @returns Promise which resolves when index is deleted successfully
     */
    Index.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid);
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    ///
    /// TASKS
    ///
    /**
     * Get the list of all the tasks of the index.
     *
     * @param parameters - Parameters to browse the tasks
     * @returns Promise containing all tasks
     */
    Index.prototype.getTasks = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tasks.getTasks(__assign(__assign({}, parameters), { indexUids: [this.uid] }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get one task of the index.
     *
     * @param taskUid - Task identifier
     * @returns Promise containing a task
     */
    Index.prototype.getTask = function (taskUid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tasks.getTask(taskUid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Wait for multiple tasks to be processed.
     *
     * @param taskUids - Tasks identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise containing an array of tasks
     */
    Index.prototype.waitForTasks = function (taskUids, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeOutMs, timeOutMs = _c === void 0 ? 5000 : _c, _d = _b.intervalMs, intervalMs = _d === void 0 ? 50 : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.tasks.waitForTasks(taskUids, {
                            timeOutMs: timeOutMs,
                            intervalMs: intervalMs
                        })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * Wait for a task to be processed.
     *
     * @param taskUid - Task identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise containing an array of tasks
     */
    Index.prototype.waitForTask = function (taskUid, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeOutMs, timeOutMs = _c === void 0 ? 5000 : _c, _d = _b.intervalMs, intervalMs = _d === void 0 ? 50 : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.tasks.waitForTask(taskUid, {
                            timeOutMs: timeOutMs,
                            intervalMs: intervalMs
                        })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    ///
    /// STATS
    ///
    /**
     * Get stats of an index
     *
     * @returns Promise containing object with stats of the index
     */
    Index.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/stats");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///
    /// DOCUMENTS
    ///
    /**
     * Get documents of an index
     *
     * @param parameters - Parameters to browse the documents
     * @returns Promise containing Document responses
     */
    Index.prototype.getDocuments = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents");
                        fields = (function () {
                            var _a;
                            if (Array.isArray(parameters === null || parameters === void 0 ? void 0 : parameters.fields)) {
                                return (_a = parameters === null || parameters === void 0 ? void 0 : parameters.fields) === null || _a === void 0 ? void 0 : _a.join(',');
                            }
                            return undefined;
                        })();
                        return [4 /*yield*/, this.httpRequest.get(url, removeUndefinedFromObject(__assign(__assign({}, parameters), { fields: fields })))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get one document
     *
     * @param documentId - Document ID
     * @param parameters - Parameters applied on a document
     * @returns Promise containing Document response
     */
    Index.prototype.getDocument = function (documentId, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var url, fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents/").concat(documentId);
                        fields = (function () {
                            var _a;
                            if (Array.isArray(parameters === null || parameters === void 0 ? void 0 : parameters.fields)) {
                                return (_a = parameters === null || parameters === void 0 ? void 0 : parameters.fields) === null || _a === void 0 ? void 0 : _a.join(',');
                            }
                            return undefined;
                        })();
                        return [4 /*yield*/, this.httpRequest.get(url, removeUndefinedFromObject(__assign(__assign({}, parameters), { fields: fields })))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Add or replace multiples documents to an index
     *
     * @param documents - Array of Document objects to add/replace
     * @param options - Options on document addition
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.addDocuments = function (documents, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents");
                        return [4 /*yield*/, this.httpRequest.post(url, documents, options)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Add or replace multiples documents to an index in batches
     *
     * @param documents - Array of Document objects to add/replace
     * @param batchSize - Size of the batch
     * @param options - Options on document addition
     * @returns Promise containing array of enqueued task objects for each batch
     */
    Index.prototype.addDocumentsInBatches = function (documents, batchSize, options) {
        if (batchSize === void 0) { batchSize = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var updates, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        updates = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < documents.length)) return [3 /*break*/, 4];
                        _b = (_a = updates).push;
                        return [4 /*yield*/, this.addDocuments(documents.slice(i, i + batchSize), options)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        i += batchSize;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, updates];
                }
            });
        });
    };
    /**
     * Add or update multiples documents to an index
     *
     * @param documents - Array of Document objects to add/update
     * @param options - Options on document update
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateDocuments = function (documents, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents");
                        return [4 /*yield*/, this.httpRequest.put(url, documents, options)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Add or update multiples documents to an index in batches
     *
     * @param documents - Array of Document objects to add/update
     * @param batchSize - Size of the batch
     * @param options - Options on document update
     * @returns Promise containing array of enqueued task objects for each batch
     */
    Index.prototype.updateDocumentsInBatches = function (documents, batchSize, options) {
        if (batchSize === void 0) { batchSize = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var updates, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        updates = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < documents.length)) return [3 /*break*/, 4];
                        _b = (_a = updates).push;
                        return [4 /*yield*/, this.updateDocuments(documents.slice(i, i + batchSize), options)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        i += batchSize;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, updates];
                }
            });
        });
    };
    /**
     * Delete one document
     *
     * @param documentId - Id of Document to delete
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.deleteDocument = function (documentId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents/").concat(documentId);
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    /**
     * Delete multiples documents of an index
     *
     * @param documentsIds - Array of Document Ids to delete
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.deleteDocuments = function (documentsIds) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents/delete-batch");
                        return [4 /*yield*/, this.httpRequest.post(url, documentsIds)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Delete all documents of an index
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.deleteAllDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/documents");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// SETTINGS
    ///
    /**
     * Retrieve all settings
     *
     * @returns Promise containing Settings object
     */
    Index.prototype.getSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update all settings Any parameters not provided will be left unchanged.
     *
     * @param settings - Object containing parameters with their updated values
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings");
                        return [4 /*yield*/, this.httpRequest.patch(url, settings)];
                    case 1:
                        task = _a.sent();
                        task.enqueued = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    /**
     * Reset settings.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// PAGINATION SETTINGS
    ///
    /**
     * Get the pagination settings.
     *
     * @returns Promise containing object of pagination settings
     */
    Index.prototype.getPagination = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/pagination");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the pagination settings.
     *
     * @param pagination - Pagination object
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updatePagination = function (pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/pagination");
                        return [4 /*yield*/, this.httpRequest.patch(url, pagination)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the pagination settings.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetPagination = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/pagination");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    ///
    /// SYNONYMS
    ///
    /**
     * Get the list of all synonyms
     *
     * @returns Promise containing object of synonym mappings
     */
    Index.prototype.getSynonyms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/synonyms");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the list of synonyms. Overwrite the old list.
     *
     * @param synonyms - Mapping of synonyms with their associated words
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateSynonyms = function (synonyms) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/synonyms");
                        return [4 /*yield*/, this.httpRequest.put(url, synonyms)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the synonym list to be empty again
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetSynonyms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/synonyms");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// STOP WORDS
    ///
    /**
     * Get the list of all stop-words
     *
     * @returns Promise containing array of stop-words
     */
    Index.prototype.getStopWords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/stop-words");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the list of stop-words. Overwrite the old list.
     *
     * @param stopWords - Array of strings that contains the stop-words.
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateStopWords = function (stopWords) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/stop-words");
                        return [4 /*yield*/, this.httpRequest.put(url, stopWords)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the stop-words list to be empty again
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetStopWords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/stop-words");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// RANKING RULES
    ///
    /**
     * Get the list of all ranking-rules
     *
     * @returns Promise containing array of ranking-rules
     */
    Index.prototype.getRankingRules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/ranking-rules");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the list of ranking-rules. Overwrite the old list.
     *
     * @param rankingRules - Array that contain ranking rules sorted by order of
     *   importance.
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateRankingRules = function (rankingRules) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/ranking-rules");
                        return [4 /*yield*/, this.httpRequest.put(url, rankingRules)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the ranking rules list to its default value
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetRankingRules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/ranking-rules");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// DISTINCT ATTRIBUTE
    ///
    /**
     * Get the distinct-attribute
     *
     * @returns Promise containing the distinct-attribute of the index
     */
    Index.prototype.getDistinctAttribute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/distinct-attribute");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the distinct-attribute.
     *
     * @param distinctAttribute - Field name of the distinct-attribute
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateDistinctAttribute = function (distinctAttribute) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/distinct-attribute");
                        return [4 /*yield*/, this.httpRequest.put(url, distinctAttribute)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the distinct-attribute.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetDistinctAttribute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/distinct-attribute");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// FILTERABLE ATTRIBUTES
    ///
    /**
     * Get the filterable-attributes
     *
     * @returns Promise containing an array of filterable-attributes
     */
    Index.prototype.getFilterableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/filterable-attributes");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the filterable-attributes.
     *
     * @param filterableAttributes - Array of strings containing the attributes
     *   that can be used as filters at query time
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateFilterableAttributes = function (filterableAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/filterable-attributes");
                        return [4 /*yield*/, this.httpRequest.put(url, filterableAttributes)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the filterable-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetFilterableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/filterable-attributes");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// SORTABLE ATTRIBUTES
    ///
    /**
     * Get the sortable-attributes
     *
     * @returns Promise containing array of sortable-attributes
     */
    Index.prototype.getSortableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/sortable-attributes");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the sortable-attributes.
     *
     * @param sortableAttributes - Array of strings containing the attributes that
     *   can be used to sort search results at query time
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateSortableAttributes = function (sortableAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/sortable-attributes");
                        return [4 /*yield*/, this.httpRequest.put(url, sortableAttributes)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the sortable-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetSortableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/sortable-attributes");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// SEARCHABLE ATTRIBUTE
    ///
    /**
     * Get the searchable-attributes
     *
     * @returns Promise containing array of searchable-attributes
     */
    Index.prototype.getSearchableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/searchable-attributes");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the searchable-attributes.
     *
     * @param searchableAttributes - Array of strings that contains searchable
     *   attributes sorted by order of importance(most to least important)
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateSearchableAttributes = function (searchableAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/searchable-attributes");
                        return [4 /*yield*/, this.httpRequest.put(url, searchableAttributes)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the searchable-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetSearchableAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/searchable-attributes");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// DISPLAYED ATTRIBUTE
    ///
    /**
     * Get the displayed-attributes
     *
     * @returns Promise containing array of displayed-attributes
     */
    Index.prototype.getDisplayedAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/displayed-attributes");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the displayed-attributes.
     *
     * @param displayedAttributes - Array of strings that contains attributes of
     *   an index to display
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateDisplayedAttributes = function (displayedAttributes) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/displayed-attributes");
                        return [4 /*yield*/, this.httpRequest.put(url, displayedAttributes)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the displayed-attributes.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetDisplayedAttributes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/displayed-attributes");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// TYPO TOLERANCE
    ///
    /**
     * Get the typo tolerance settings.
     *
     * @returns Promise containing the typo tolerance settings.
     */
    Index.prototype.getTypoTolerance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/typo-tolerance");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the typo tolerance settings.
     *
     * @param typoTolerance - Object containing the custom typo tolerance
     *   settings.
     * @returns Promise containing object of the enqueued update
     */
    Index.prototype.updateTypoTolerance = function (typoTolerance) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/typo-tolerance");
                        return [4 /*yield*/, this.httpRequest.patch(url, typoTolerance)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    /**
     * Reset the typo tolerance settings.
     *
     * @returns Promise containing object of the enqueued update
     */
    Index.prototype.resetTypoTolerance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/typo-tolerance");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        task.enqueuedAt = new Date(task.enqueuedAt);
                        return [2 /*return*/, task];
                }
            });
        });
    };
    ///
    /// FACETING
    ///
    /**
     * Get the faceting settings.
     *
     * @returns Promise containing object of faceting index settings
     */
    Index.prototype.getFaceting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/faceting");
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update the faceting settings.
     *
     * @param faceting - Faceting index settings object
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.updateFaceting = function (faceting) {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/faceting");
                        return [4 /*yield*/, this.httpRequest.patch(url, faceting)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    /**
     * Reset the faceting settings.
     *
     * @returns Promise containing an EnqueuedTask
     */
    Index.prototype.resetFaceting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes/".concat(this.uid, "/settings/faceting");
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    return Index;
}());

/*
 * Bundle: MeiliSearch
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */
var Client = /** @class */ (function () {
    /**
     * Creates new MeiliSearch instance
     *
     * @param config - Configuration object
     */
    function Client(config) {
        this.config = config;
        this.httpRequest = new HttpRequests(config);
        this.tasks = new TaskClient(config);
    }
    /**
     * Return an Index instance
     *
     * @param indexUid - The index UID
     * @returns Instance of Index
     */
    Client.prototype.index = function (indexUid) {
        return new Index(this.config, indexUid);
    };
    /**
     * Gather information about an index by calling MeiliSearch and return an
     * Index instance with the gathered information
     *
     * @param indexUid - The index UID
     * @returns Promise returning Index instance
     */
    Client.prototype.getIndex = function (indexUid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Index(this.config, indexUid).fetchInfo()];
            });
        });
    };
    /**
     * Gather information about an index by calling MeiliSearch and return the raw
     * JSON response
     *
     * @param indexUid - The index UID
     * @returns Promise returning index information
     */
    Client.prototype.getRawIndex = function (indexUid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Index(this.config, indexUid).getRawInfo()];
            });
        });
    };
    /**
     * Get all the indexes as Index instances.
     *
     * @param parameters - Parameters to browse the indexes
     * @returns Promise returning array of raw index information
     */
    Client.prototype.getIndexes = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var rawIndexes, indexes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawIndexes(parameters)];
                    case 1:
                        rawIndexes = _a.sent();
                        indexes = rawIndexes.results.map(function (index) { return new Index(_this.config, index.uid, index.primaryKey); });
                        return [2 /*return*/, __assign(__assign({}, rawIndexes), { results: indexes })];
                }
            });
        });
    };
    /**
     * Get all the indexes in their raw value (no Index instances).
     *
     * @param parameters - Parameters to browse the indexes
     * @returns Promise returning array of raw index information
     */
    Client.prototype.getRawIndexes = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "indexes";
                        return [4 /*yield*/, this.httpRequest.get(url, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create a new index
     *
     * @param uid - The index UID
     * @param options - Index options
     * @returns Promise returning Index instance
     */
    Client.prototype.createIndex = function (uid, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Index.create(uid, options, this.config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update an index
     *
     * @param uid - The index UID
     * @param options - Index options to update
     * @returns Promise returning Index instance after updating
     */
    Client.prototype.updateIndex = function (uid, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Index(this.config, uid).update(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete an index
     *
     * @param uid - The index UID
     * @returns Promise which resolves when index is deleted successfully
     */
    Client.prototype.deleteIndex = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Index(this.config, uid)["delete"]()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Deletes an index if it already exists.
     *
     * @param uid - The index UID
     * @returns Promise which resolves to true when index exists and is deleted
     *   successfully, otherwise false if it does not exist
     */
    Client.prototype.deleteIndexIfExists = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deleteIndex(uid)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1.code === "index_not_found" /* ErrorStatusCode.INDEX_NOT_FOUND */) {
                            return [2 /*return*/, false];
                        }
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Swaps a list of index tuples.
     *
     * @param params - List of indexes tuples to swap.
     * @returns Promise returning object of the enqueued task
     */
    Client.prototype.swapIndexes = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '/swap-indexes';
                        return [4 /*yield*/, this.httpRequest.post(url, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///
    /// TASKS
    ///
    /**
     * Get the list of all client tasks
     *
     * @param parameters - Parameters to browse the tasks
     * @returns Promise returning all tasks
     */
    Client.prototype.getTasks = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tasks.getTasks(parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get one task on the client scope
     *
     * @param taskUid - Task identifier
     * @returns Promise returning a task
     */
    Client.prototype.getTask = function (taskUid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tasks.getTask(taskUid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Wait for multiple tasks to be finished.
     *
     * @param taskUids - Tasks identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise returning an array of tasks
     */
    Client.prototype.waitForTasks = function (taskUids, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeOutMs, timeOutMs = _c === void 0 ? 5000 : _c, _d = _b.intervalMs, intervalMs = _d === void 0 ? 50 : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.tasks.waitForTasks(taskUids, {
                            timeOutMs: timeOutMs,
                            intervalMs: intervalMs
                        })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * Wait for a task to be finished.
     *
     * @param taskUid - Task identifier
     * @param waitOptions - Options on timeout and interval
     * @returns Promise returning an array of tasks
     */
    Client.prototype.waitForTask = function (taskUid, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeOutMs, timeOutMs = _c === void 0 ? 5000 : _c, _d = _b.intervalMs, intervalMs = _d === void 0 ? 50 : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.tasks.waitForTask(taskUid, {
                            timeOutMs: timeOutMs,
                            intervalMs: intervalMs
                        })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
     * Cancel a list of enqueued or processing tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    Client.prototype.cancelTasks = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tasks.cancelTasks(parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete a list of tasks.
     *
     * @param parameters - Parameters to filter the tasks.
     * @returns Promise containing an EnqueuedTask
     */
    Client.prototype.deleteTasks = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tasks.deleteTasks(parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///
    /// KEYS
    ///
    /**
     * Get all API keys
     *
     * @param parameters - Parameters to browse the indexes
     * @returns Promise returning an object with keys
     */
    Client.prototype.getKeys = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "keys";
                        return [4 /*yield*/, this.httpRequest.get(url, parameters)];
                    case 1:
                        keys = _a.sent();
                        keys.results = keys.results.map(function (key) { return (__assign(__assign({}, key), { createdAt: new Date(key.createdAt), updateAt: new Date(key.updateAt) })); });
                        return [2 /*return*/, keys];
                }
            });
        });
    };
    /**
     * Get one API key
     *
     * @param keyOrUid - Key or uid of the API key
     * @returns Promise returning a key
     */
    Client.prototype.getKey = function (keyOrUid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "keys/".concat(keyOrUid);
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create one API key
     *
     * @param options - Key options
     * @returns Promise returning a key
     */
    Client.prototype.createKey = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "keys";
                        return [4 /*yield*/, this.httpRequest.post(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Update one API key
     *
     * @param keyOrUid - Key
     * @param options - Key options
     * @returns Promise returning a key
     */
    Client.prototype.updateKey = function (keyOrUid, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "keys/".concat(keyOrUid);
                        return [4 /*yield*/, this.httpRequest.patch(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete one API key
     *
     * @param keyOrUid - Key
     * @returns
     */
    Client.prototype.deleteKey = function (keyOrUid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "keys/".concat(keyOrUid);
                        return [4 /*yield*/, this.httpRequest["delete"](url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///
    /// HEALTH
    ///
    /**
     * Checks if the server is healthy, otherwise an error will be thrown.
     *
     * @returns Promise returning an object with health details
     */
    Client.prototype.health = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "health";
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Checks if the server is healthy, return true or false.
     *
     * @returns Promise returning a boolean
     */
    Client.prototype.isHealthy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = "health";
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ///
    /// STATS
    ///
    /**
     * Get the stats of all the database
     *
     * @returns Promise returning object of all the stats
     */
    Client.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "stats";
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///
    /// VERSION
    ///
    /**
     * Get the version of MeiliSearch
     *
     * @returns Promise returning object with version details
     */
    Client.prototype.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "version";
                        return [4 /*yield*/, this.httpRequest.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///
    /// DUMPS
    ///
    /**
     * Creates a dump
     *
     * @returns Promise returning object of the enqueued task
     */
    Client.prototype.createDump = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "dumps";
                        return [4 /*yield*/, this.httpRequest.post(url)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, new EnqueuedTask(task)];
                }
            });
        });
    };
    ///
    /// TOKENS
    ///
    /**
     * Generate a tenant token
     *
     * @param apiKeyUid - The uid of the api key used as issuer of the token.
     * @param searchRules - Search rules that are applied to every search.
     * @param options - Token options to customize some aspect of the token.
     * @returns The token in JWT format.
     */
    Client.prototype.generateTenantToken = function (_apiKeyUid, _searchRules, _options) {
        var error = new Error();
        throw new Error("Meilisearch: failed to generate a tenant token. Generation of a token only works in a node environment \n ".concat(error.stack, "."));
    };
    return Client;
}());

function encode64(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}
/**
 * Create the header of the token.
 *
 * @param apiKey - API key used to sign the token.
 * @param encodedHeader - Header of the token in base64.
 * @param encodedPayload - Payload of the token in base64.
 * @returns The signature of the token in base64.
 */
function sign(apiKey, encodedHeader, encodedPayload) {
    return crypto__default["default"]
        .createHmac('sha256', apiKey)
        .update("".concat(encodedHeader, ".").concat(encodedPayload))
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
/**
 * Create the header of the token.
 *
 * @returns The header encoded in base64.
 */
function createHeader() {
    var header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    return encode64(header).replace(/=/g, '');
}
/**
 * Validate the parameter used for the payload of the token.
 *
 * @param searchRules - Search rules that are applied to every search.
 * @param apiKey - Api key used as issuer of the token.
 * @param uid - The uid of the api key used as issuer of the token.
 * @param expiresAt - Date at which the token expires.
 */
function validateTokenParameters(tokenParams) {
    var searchRules = tokenParams.searchRules, uid = tokenParams.uid, apiKey = tokenParams.apiKey, expiresAt = tokenParams.expiresAt;
    if (expiresAt) {
        if (!(expiresAt instanceof Date)) {
            throw new MeiliSearchError("Meilisearch: The expiredAt field must be an instance of Date.");
        }
        else if (expiresAt.getTime() < Date.now()) {
            throw new MeiliSearchError("Meilisearch: The expiresAt field must be a date in the future.");
        }
    }
    if (searchRules) {
        if (!(typeof searchRules === 'object' || Array.isArray(searchRules))) {
            throw new MeiliSearchError("Meilisearch: The search rules added in the token generation must be of type array or object.");
        }
    }
    if (!apiKey || typeof apiKey !== 'string') {
        throw new MeiliSearchError("Meilisearch: The API key used for the token generation must exist and be of type string.");
    }
    if (!uid || typeof uid !== 'string') {
        throw new MeiliSearchError("Meilisearch: The uid of the api key used for the token generation must exist, be of type string and comply to the uuid4 format.");
    }
    if (!validateUuid4(uid)) {
        throw new MeiliSearchError("Meilisearch: The uid of your key is not a valid uuid4. To find out the uid of your key use getKey().");
    }
}
/**
 * Create the payload of the token.
 *
 * @param searchRules - Search rules that are applied to every search.
 * @param uid - The uid of the api key used as issuer of the token.
 * @param expiresAt - Date at which the token expires.
 * @returns The payload encoded in base64.
 */
function createPayload(payloadParams) {
    var searchRules = payloadParams.searchRules, uid = payloadParams.uid, expiresAt = payloadParams.expiresAt;
    var payload = {
        searchRules: searchRules,
        apiKeyUid: uid,
        exp: expiresAt === null || expiresAt === void 0 ? void 0 : expiresAt.getTime()
    };
    return encode64(payload).replace(/=/g, '');
}
var Token = /** @class */ (function () {
    function Token(config) {
        this.config = config;
    }
    /**
     * Generate a tenant token
     *
     * @param apiKeyUid - The uid of the api key used as issuer of the token.
     * @param searchRules - Search rules that are applied to every search.
     * @param options - Token options to customize some aspect of the token.
     * @returns The token in JWT format.
     */
    Token.prototype.generateTenantToken = function (apiKeyUid, searchRules, options) {
        var apiKey = (options === null || options === void 0 ? void 0 : options.apiKey) || this.config.apiKey || '';
        var uid = apiKeyUid || '';
        var expiresAt = options === null || options === void 0 ? void 0 : options.expiresAt;
        validateTokenParameters({ apiKey: apiKey, uid: uid, expiresAt: expiresAt, searchRules: searchRules });
        var encodedHeader = createHeader();
        var encodedPayload = createPayload({ searchRules: searchRules, uid: uid, expiresAt: expiresAt });
        var signature = sign(apiKey, encodedHeader, encodedPayload);
        return "".concat(encodedHeader, ".").concat(encodedPayload, ".").concat(signature);
    };
    return Token;
}());

var MeiliSearch = /** @class */ (function (_super) {
    __extends(MeiliSearch, _super);
    function MeiliSearch(config) {
        var _this = _super.call(this, config) || this;
        _this.tokens = new Token(config);
        return _this;
    }
    /**
     * Generate a tenant token
     *
     * @param apiKeyUid - The uid of the api key used as issuer of the token.
     * @param searchRules - Search rules that are applied to every search.
     * @param options - Token options to customize some aspect of the token.
     * @returns The token in JWT format.
     */
    MeiliSearch.prototype.generateTenantToken = function (apiKeyUid, searchRules, options) {
        if (typeof window === 'undefined') {
            return this.tokens.generateTenantToken(apiKeyUid, searchRules, options);
        }
        return _super.prototype.generateTenantToken.call(this, apiKeyUid, searchRules, options);
    };
    return MeiliSearch;
}(Client));

exports.EnqueuedTask = EnqueuedTask;
exports.Index = Index;
exports.MatchingStrategies = MatchingStrategies;
exports.MeiliSearch = MeiliSearch;
exports.MeiliSearchApiError = MeiliSearchApiError;
exports.MeiliSearchCommunicationError = MeiliSearchCommunicationError;
exports.MeiliSearchError = MeiliSearchError;
exports.MeiliSearchTimeOutError = MeiliSearchTimeOutError;
exports.Task = Task;
exports.TaskClient = TaskClient;
exports["default"] = MeiliSearch;
exports.httpErrorHandler = httpErrorHandler;
exports.httpResponseErrorHandler = httpResponseErrorHandler;
