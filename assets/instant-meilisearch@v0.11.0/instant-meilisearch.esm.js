import { MeiliSearch } from 'meilisearch';

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * @param  {ResponseCacher} cache
 */
function SearchResolver(client, cache) {
    return {
        /**
         * @param  {SearchContext} searchContext
         * @param  {MeiliSearchParams} searchParams
         * @param  {MeiliSearch} client
         * @returns {Promise}
         */
        searchResponse: function (searchContext, searchParams) {
            return __awaiter(this, void 0, void 0, function () {
                var key, cachedResponse, searchResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = cache.formatKey([
                                searchParams,
                                searchContext.indexUid,
                                searchContext.query,
                                searchContext.pagination,
                            ]);
                            cachedResponse = cache.getEntry(key);
                            // Check if specific request is already cached with its associated search response.
                            if (cachedResponse)
                                return [2 /*return*/, cachedResponse
                                    // Make search request
                                ];
                            return [4 /*yield*/, client
                                    .index(searchContext.indexUid)
                                    .search(searchContext.query, searchParams)
                                // Cache response
                            ];
                        case 1:
                            searchResponse = _a.sent();
                            // Cache response
                            cache.setEntry(key, searchResponse);
                            return [2 /*return*/, searchResponse];
                    }
                });
            });
        }
    };
}

/**
 * @param  {number} rad
 * @returns {number}
 */
function rad2degr(rad) {
    return (rad * 180) / Math.PI;
}
/**
 * @param  {number} degr
 * @returns {number}
 */
function degr2rad(degr) {
    return (degr * Math.PI) / 180;
}
/**
 * @param  {number} lat1
 * @param  {number} lng1
 * @param  {number} lat2
 * @param  {number} lng2
 * @returns {string}
 */
function middleGeoPoints(lat1, lng1, lat2, lng2) {
    // convert to radians
    lat1 = degr2rad(lat1);
    lng1 = degr2rad(lng1);
    var x1 = Math.cos(lat1) * Math.cos(lng1);
    var y1 = Math.cos(lat1) * Math.sin(lng1);
    var z1 = Math.sin(lat1);
    // convert to radians
    lat2 = degr2rad(lat2);
    lng2 = degr2rad(lng2);
    var x2 = Math.cos(lat2) * Math.cos(lng2);
    var y2 = Math.cos(lat2) * Math.sin(lng2);
    var z2 = Math.sin(lat2);
    var x = x1 + x2;
    var y = y1 + y2;
    var z = z1 + z2;
    var Hyp = Math.sqrt(x * x + y * y);
    var lng3 = Math.atan2(y, x);
    var lat3 = Math.atan2(z, Hyp);
    if (lng1 < lng2 || (lng1 > lng2 && lng1 > Math.PI && lng2 < -Math.PI)) {
        lat3 = lat3 + Math.PI;
        lng3 = lng3 + Math.PI;
    }
    else {
        lat3 = rad2degr(lat3);
        lng3 = rad2degr(lng3);
    }
    if (Math.abs(x) < Math.pow(10, -9) &&
        Math.abs(y) < Math.pow(10, -9) &&
        Math.abs(z) < Math.pow(10, -9)) {
        lat3 = 0;
        lng3 = 0;
    }
    return "".concat(lat3, ",").concat(lng3);
}
/**
 * @param  {number} lat1
 * @param  {number} lng1
 * @param  {number} lat2
 * @param  {number} lng2
 * @returns {number}
 */
function getDistanceInMeter(lat1, lng1, lat2, lng2) {
    // Haversine Algorithm
    var R = 6371e3; // metres
    var latRad1 = (lat1 * Math.PI) / 180;
    var latRad2 = (lat2 * Math.PI) / 180;
    var latCenterRad = ((lat2 - lat1) * Math.PI) / 180;
    var lngCenterRad = ((lng2 - lng1) * Math.PI) / 180;
    var a = Math.sin(latCenterRad / 2) * Math.sin(latCenterRad / 2) +
        Math.cos(latRad1) *
            Math.cos(latRad2) *
            Math.sin(lngCenterRad / 2) *
            Math.sin(lngCenterRad / 2);
    var bearing = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * bearing; // in metres
    return distance;
}

function adaptGeoPointsRules(geoSearchContext) {
    if (!geoSearchContext) {
        return undefined;
    }
    var insideBoundingBox = geoSearchContext.insideBoundingBox, aroundLatLng = geoSearchContext.aroundLatLng, aroundRadius = geoSearchContext.aroundRadius, minimumAroundRadius = geoSearchContext.minimumAroundRadius;
    var middlePoint;
    var radius;
    if (aroundLatLng) {
        middlePoint = aroundLatLng;
    }
    if (aroundRadius != null || minimumAroundRadius != null) {
        if (aroundRadius != null)
            radius = aroundRadius;
        else
            radius = minimumAroundRadius;
    }
    // If insideBoundingBox is provided it takes precedent over all other options
    if (insideBoundingBox && typeof insideBoundingBox === 'string') {
        var _a = insideBoundingBox.split(','), lat1Raw = _a[0], lng1Raw = _a[1], lat2Raw = _a[2], lng2Raw = _a[3];
        var _b = [
            parseFloat(lat1Raw),
            parseFloat(lng1Raw),
            parseFloat(lat2Raw),
            parseFloat(lng2Raw),
        ], lat1 = _b[0], lng1 = _b[1], lat2 = _b[2], lng2 = _b[3];
        radius = getDistanceInMeter(lat1, lng1, lat2, lng2) / 2;
        middlePoint = middleGeoPoints(lat1, lng1, lat2, lng2);
    }
    if (middlePoint != null && radius != null) {
        var _c = middlePoint.split(','), lat3 = _c[0], lng3 = _c[1];
        lat3 = Number.parseFloat(lat3).toFixed(5);
        lng3 = Number.parseFloat(lng3).toFixed(5);
        var filter = "_geoRadius(".concat(lat3, ", ").concat(lng3, ", ").concat(radius, ")");
        return { filter: filter };
    }
    return undefined;
}
function createGeoSearchContext(searchContext) {
    var geoContext = {};
    var aroundLatLng = searchContext.aroundLatLng, aroundLatLngViaIP = searchContext.aroundLatLngViaIP, aroundRadius = searchContext.aroundRadius, aroundPrecision = searchContext.aroundPrecision, minimumAroundRadius = searchContext.minimumAroundRadius, insideBoundingBox = searchContext.insideBoundingBox, insidePolygon = searchContext.insidePolygon;
    if (aroundLatLng) {
        geoContext.aroundLatLng = aroundLatLng;
    }
    if (aroundLatLngViaIP) {
        console.warn('instant-meilisearch: `aroundLatLngViaIP` is not supported.');
    }
    if (aroundRadius) {
        geoContext.aroundRadius = aroundRadius;
    }
    if (aroundPrecision) {
        console.warn("instant-meilisearch: `aroundPrecision` is not supported.\n    See this discussion to track its implementation https://github.com/meilisearch/product/discussions/264");
    }
    if (minimumAroundRadius) {
        geoContext.minimumAroundRadius = minimumAroundRadius;
    }
    if (insideBoundingBox) {
        geoContext.insideBoundingBox = insideBoundingBox;
    }
    // See related issue: https://github.com/meilisearch/instant-meilisearch/issues/555
    if (insidePolygon) {
        console.warn("instant-meilisearch: `insidePolygon` is not implented in instant-meilisearch.");
    }
    return geoContext;
}

/**
 * @param  {any} str
 * @returns {boolean}
 */
/**
 * @param  {string} filter
 * @returns {string}
 */
function replaceColonByEqualSign(filter) {
    // will only change first occurence of `:`
    return filter.replace(/:(.*)/i, '="$1"');
}
/**
 * @param  {any[]} arr
 * @returns {string}
 */
function stringifyArray(arr) {
    return arr.reduce(function (acc, curr) {
        return (acc += JSON.stringify(curr));
    }, '');
}

function isPureObject(data) {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
}

/**
 * apiKey callback definition
 * @callback apiKeyCallback
 * @returns {string} - The apiKey to use
 */
/**
 * Validates host and apiKey parameters, throws if invalid
 * @param hostUrl
 * @param apiKey
 */
function validateInstantMeiliSearchParams(hostUrl, apiKey) {
    // Validate host url
    if (typeof hostUrl !== 'string') {
        throw new TypeError('Provided hostUrl value (1st parameter) is not a string, expected string');
    }
    // Validate api key
    if (typeof apiKey !== 'string' && typeof apiKey !== 'function') {
        throw new TypeError('Provided apiKey value (2nd parameter) is not a string or a function, expected string or function');
    }
}

/**
 * Transform InstantSearch filter to Meilisearch filter.
 * Change sign from `:` to `=` in nested filter object.
 * example: [`genres:comedy`] becomes [`genres=comedy`]
 *
 * @param  {SearchContext['facetFilters']} filters?
 * @returns {Filter}
 */
function transformFilter(filters) {
    if (typeof filters === 'string') {
        return replaceColonByEqualSign(filters);
    }
    else if (Array.isArray(filters))
        return filters
            .map(function (filter) {
            if (Array.isArray(filter))
                return filter
                    .map(function (nestedFilter) { return replaceColonByEqualSign(nestedFilter); })
                    .filter(function (elem) { return elem; });
            else {
                return replaceColonByEqualSign(filter);
            }
        })
            .filter(function (elem) { return elem; });
    return [];
}
/**
 * Return the filter in an array if it is a string
 * If filter is array, return without change.
 *
 * @param  {Filter} filter
 * @returns {Array}
 */
function filterToArray(filter) {
    // Filter is a string
    if (filter === '')
        return [];
    else if (typeof filter === 'string')
        return [filter];
    // Filter is either an array of strings, or an array of array of strings
    return filter;
}
/**
 * Merge facetFilters, numericFilters and filters together.
 *
 * @param  {Filter} facetFilters
 * @param  {Filter} numericFilters
 * @param  {string} filters
 * @returns {Filter}
 */
function mergeFilters(facetFilters, numericFilters, filters) {
    var adaptedFilters = filters.trim();
    var adaptedFacetFilters = filterToArray(facetFilters);
    var adaptedNumericFilters = filterToArray(numericFilters);
    var adaptedFilter = __spreadArray(__spreadArray(__spreadArray([], adaptedFacetFilters, true), adaptedNumericFilters, true), [
        adaptedFilters,
    ], false);
    var cleanedFilters = adaptedFilter.filter(function (filter) {
        if (Array.isArray(filter)) {
            return filter.length;
        }
        return filter;
    });
    return cleanedFilters;
}
/**
 * Adapt instantsearch.js filters to Meilisearch filters by
 * combining and transforming all provided filters.
 *
 * @param  {string|undefined} filters
 * @param  {SearchContext['numericFilters']} numericFilters
 * @param  {SearchContext['facetFilters']} facetFilters
 * @returns {Filter}
 */
function adaptFilters(filters, numericFilters, facetFilters) {
    var transformedFilter = transformFilter(facetFilters || []);
    var transformedNumericFilter = transformFilter(numericFilters || []);
    return mergeFilters(transformedFilter, transformedNumericFilter, filters || '');
}

function isPaginationRequired(filter, query, placeholderSearch) {
    // To disable pagination:
    // placeholderSearch must be disabled
    // The search query must be empty
    // There must be no filters
    if (!placeholderSearch && !query && (!filter || filter.length === 0)) {
        return false;
    }
    return true;
}
function setScrollPagination(pagination, paginationRequired) {
    var page = pagination.page, hitsPerPage = pagination.hitsPerPage;
    if (!paginationRequired) {
        return {
            limit: 0,
            offset: 0
        };
    }
    return {
        limit: hitsPerPage + 1,
        offset: page * hitsPerPage
    };
}
function setFinitePagination(pagination, paginationRequired) {
    var page = pagination.page, hitsPerPage = pagination.hitsPerPage;
    if (!paginationRequired) {
        return {
            hitsPerPage: 0,
            page: page + 1
        };
    }
    else {
        return {
            hitsPerPage: hitsPerPage,
            page: page + 1
        };
    }
}
/**
 * Adapts instantsearch.js and instant-meilisearch options
 * to meilisearch search query parameters.
 *
 * @param  {SearchContext} searchContext
 *
 * @returns {MeiliSearchParams}
 */
function MeiliParamsCreator(searchContext) {
    var meiliSearchParams = {};
    var facets = searchContext.facets, attributesToSnippet = searchContext.attributesToSnippet, snippetEllipsisText = searchContext.snippetEllipsisText, attributesToRetrieve = searchContext.attributesToRetrieve, attributesToHighlight = searchContext.attributesToHighlight, highlightPreTag = searchContext.highlightPreTag, highlightPostTag = searchContext.highlightPostTag, placeholderSearch = searchContext.placeholderSearch, query = searchContext.query, sort = searchContext.sort, pagination = searchContext.pagination, matchingStrategy = searchContext.matchingStrategy, filters = searchContext.filters, numericFilters = searchContext.numericFilters, facetFilters = searchContext.facetFilters;
    var meilisearchFilters = adaptFilters(filters, numericFilters, facetFilters);
    return {
        getParams: function () {
            return meiliSearchParams;
        },
        addFacets: function () {
            if (Array.isArray(facets)) {
                meiliSearchParams.facets = facets;
            }
            else if (typeof facets === 'string') {
                meiliSearchParams.facets = [facets];
            }
        },
        addAttributesToCrop: function () {
            if (attributesToSnippet) {
                meiliSearchParams.attributesToCrop = attributesToSnippet;
            }
        },
        addCropMarker: function () {
            // Attributes To Crop marker
            if (snippetEllipsisText != null) {
                meiliSearchParams.cropMarker = snippetEllipsisText;
            }
        },
        addAttributesToRetrieve: function () {
            if (attributesToRetrieve) {
                meiliSearchParams.attributesToRetrieve = attributesToRetrieve;
            }
        },
        addFilters: function () {
            if (meilisearchFilters.length) {
                meiliSearchParams.filter = meilisearchFilters;
            }
        },
        addAttributesToHighlight: function () {
            meiliSearchParams.attributesToHighlight = attributesToHighlight || ['*'];
        },
        addPreTag: function () {
            if (highlightPreTag) {
                meiliSearchParams.highlightPreTag = highlightPreTag;
            }
            else {
                meiliSearchParams.highlightPreTag = '__ais-highlight__';
            }
        },
        addPostTag: function () {
            if (highlightPostTag) {
                meiliSearchParams.highlightPostTag = highlightPostTag;
            }
            else {
                meiliSearchParams.highlightPostTag = '__/ais-highlight__';
            }
        },
        addPagination: function () {
            var paginationRequired = isPaginationRequired(meilisearchFilters, query, placeholderSearch);
            if (pagination.finite) {
                var _a = setFinitePagination(pagination, paginationRequired), hitsPerPage = _a.hitsPerPage, page = _a.page;
                meiliSearchParams.hitsPerPage = hitsPerPage;
                meiliSearchParams.page = page;
            }
            else {
                var _b = setScrollPagination(pagination, paginationRequired), limit = _b.limit, offset = _b.offset;
                meiliSearchParams.limit = limit;
                meiliSearchParams.offset = offset;
            }
        },
        addSort: function () {
            if (sort === null || sort === void 0 ? void 0 : sort.length) {
                meiliSearchParams.sort = [sort];
            }
        },
        addGeoSearchRules: function () {
            var geoSearchContext = createGeoSearchContext(searchContext);
            var geoRules = adaptGeoPointsRules(geoSearchContext);
            if (geoRules === null || geoRules === void 0 ? void 0 : geoRules.filter) {
                if (meiliSearchParams.filter) {
                    meiliSearchParams.filter.unshift(geoRules.filter);
                }
                else {
                    meiliSearchParams.filter = [geoRules.filter];
                }
            }
        },
        addMatchingStrategy: function () {
            if (matchingStrategy) {
                meiliSearchParams.matchingStrategy = matchingStrategy;
            }
        }
    };
}
/**
 * Adapt search request from instantsearch.js
 * to search request compliant with Meilisearch
 *
 * @param  {SearchContext} searchContext
 * @returns {MeiliSearchParams}
 */
function adaptSearchParams(searchContext) {
    var meilisearchParams = MeiliParamsCreator(searchContext);
    meilisearchParams.addFacets();
    meilisearchParams.addAttributesToHighlight();
    meilisearchParams.addPreTag();
    meilisearchParams.addPostTag();
    meilisearchParams.addAttributesToRetrieve();
    meilisearchParams.addAttributesToCrop();
    meilisearchParams.addCropMarker();
    meilisearchParams.addPagination();
    meilisearchParams.addFilters();
    meilisearchParams.addSort();
    meilisearchParams.addGeoSearchRules();
    meilisearchParams.addMatchingStrategy();
    return meilisearchParams.getParams();
}

/**
 * Stringify values following instantsearch practices.
 *
 * @param  {any} value - value that needs to be stringified
 */
function stringifyValue(value) {
    if (typeof value === 'string') {
        // String
        return value;
    }
    else if (value === undefined) {
        // undefined
        return JSON.stringify(null);
    }
    else {
        return JSON.stringify(value);
    }
}
/**
 * Recursif function wrap the deepest possible value
 * the following way: { value: "xx" }.
 *
 * For example:
 *
 * {
 * "rootField": { "value": "x" }
 * "nestedField": { child: { value: "y" } }
 * }
 *
 * recursivity continues until the value is not an array or an object.
 *
 * @param  {any} value - value of a field
 *
 * @returns Record<string, any>
 */
function wrapValue(value) {
    if (Array.isArray(value)) {
        // Array
        return value.map(function (elem) { return wrapValue(elem); });
    }
    else if (isPureObject(value)) {
        // Object
        return Object.keys(value).reduce(function (nested, key) {
            nested[key] = wrapValue(value[key]);
            return nested;
        }, {});
    }
    else {
        return { value: stringifyValue(value) };
    }
}
/**
 * Adapt Meilisearch formatted fields to a format compliant to instantsearch.js.
 *
 * @param  {Record<string} formattedHit
 * @param  {SearchContext} searchContext
 * @returns {Record}
 */
function adaptFormattedFields(hit) {
    if (!hit)
        return {};
    var _formattedResult = wrapValue(hit);
    var highlightedHit = {
        // We could not determine what the differences are between those two fields.
        _highlightResult: _formattedResult,
        _snippetResult: _formattedResult
    };
    return highlightedHit;
}

/**
 * @param  {any[]} hits
 * @returns {Array<Record<string, any>>}
 */
function adaptGeoResponse(hits) {
    var _a;
    for (var i = 0; i < hits.length; i++) {
        var objectID = "".concat(i + Math.random() * 1000000);
        if (hits[i]._geo) {
            hits[i]._geoloc = hits[i]._geo;
            hits[i].objectID = objectID;
        }
        if ((_a = hits[i]._formatted) === null || _a === void 0 ? void 0 : _a._geo) {
            hits[i]._formatted._geoloc = hits[i]._formatted._geo;
            hits[i]._formatted.objectID = objectID;
        }
    }
    return hits;
}

/**
 * @param  {MeiliSearchResponse<Record<string, any>>} searchResponse
 * @param  {SearchContext} searchContext
 * @returns {Array<Record<string, any>>}
 */
function adaptHits(searchResponse, searchContext) {
    var primaryKey = searchContext.primaryKey;
    var hits = searchResponse.hits;
    var _a = searchContext.pagination, finite = _a.finite, hitsPerPage = _a.hitsPerPage;
    // if the length of the hits is bigger than the hitsPerPage
    // It means that there is still pages to come as we append limit by hitsPerPage + 1
    // In which case we still need to remove the additional hit returned by Meilisearch
    if (!finite && hits.length > hitsPerPage) {
        hits.splice(hits.length - 1, 1);
    }
    var adaptedHits = hits.map(function (hit) {
        // Creates Hit object compliant with InstantSearch
        if (Object.keys(hit).length > 0) {
            var formattedHit = hit._formatted; hit._matchesPosition; var documentFields = __rest(hit, ["_formatted", "_matchesPosition"]);
            var adaptedHit = Object.assign(documentFields, adaptFormattedFields(formattedHit));
            if (primaryKey) {
                adaptedHit.objectID = hit[primaryKey];
            }
            return adaptedHit;
        }
        return hit;
    });
    adaptedHits = adaptGeoResponse(adaptedHits);
    return adaptedHits;
}

function adaptTotalHits(searchResponse) {
    var _a = searchResponse.hitsPerPage, hitsPerPage = _a === void 0 ? 0 : _a, _b = searchResponse.totalPages, totalPages = _b === void 0 ? 0 : _b, estimatedTotalHits = searchResponse.estimatedTotalHits, totalHits = searchResponse.totalHits;
    if (estimatedTotalHits != null) {
        return estimatedTotalHits;
    }
    else if (totalHits != null) {
        return totalHits;
    }
    // Should not happen but safeguarding just in case
    return hitsPerPage * totalPages;
}

function adaptNbPages(searchResponse, hitsPerPage) {
    if (searchResponse.totalPages != null) {
        return searchResponse.totalPages;
    }
    // Avoid dividing by 0
    if (hitsPerPage === 0) {
        return 0;
    }
    var _a = searchResponse.limit, limit = _a === void 0 ? 20 : _a, _b = searchResponse.offset, offset = _b === void 0 ? 0 : _b, hits = searchResponse.hits;
    var additionalPage = hits.length >= limit ? 1 : 0;
    return offset / hitsPerPage + 1 + additionalPage;
}
function adaptPaginationParameters(searchResponse, paginationState) {
    var hitsPerPage = paginationState.hitsPerPage, page = paginationState.page;
    var nbPages = adaptNbPages(searchResponse, hitsPerPage);
    return {
        page: page,
        nbPages: nbPages,
        hitsPerPage: hitsPerPage
    };
}

function getFacetNames(facets) {
    if (!facets)
        return [];
    else if (typeof facets === 'string')
        return [facets];
    return facets;
}
// Fills the missing facetValue in the current facet distribution if `keepZeroFacet` is true
// using the initial facet distribution. Ex:
//
// Initial distribution: { genres: { horror: 10, comedy: 4 } }
// Current distribution: { genres: { horror: 3 }}
// Returned distribution: { genres: { horror: 3, comedy: 0 }}
function fillMissingFacetValues(facets, initialFacetDistribution, facetDistribution) {
    var facetNames = getFacetNames(facets);
    var filledDistribution = {};
    for (var _i = 0, facetNames_1 = facetNames; _i < facetNames_1.length; _i++) {
        var facet = facetNames_1[_i];
        for (var facetValue in initialFacetDistribution[facet]) {
            if (!filledDistribution[facet]) {
                // initialize sub object
                filledDistribution[facet] = facetDistribution[facet] || {};
            }
            if (!filledDistribution[facet][facetValue]) {
                filledDistribution[facet][facetValue] = 0;
            }
            else {
                filledDistribution[facet][facetValue] =
                    facetDistribution[facet][facetValue];
            }
        }
    }
    return filledDistribution;
}
function adaptFacetDistribution(keepZeroFacets, facets, initialFacetDistribution, facetDistribution) {
    if (keepZeroFacets) {
        facetDistribution = facetDistribution || {};
        return fillMissingFacetValues(facets, initialFacetDistribution, facetDistribution);
    }
    return facetDistribution;
}

/**
 * Adapt search response from Meilisearch
 * to search response compliant with instantsearch.js
 *
 * @param  {MeiliSearchResponse<Record<string>>} searchResponse
 * @param  {SearchContext} searchContext
 * @returns {{ results: Array<AlgoliaSearchResponse<T>> }}
 */
function adaptSearchResponse(searchResponse, searchContext, initialFacetDistribution) {
    var searchResponseOptionals = {};
    var processingTimeMs = searchResponse.processingTimeMs, query = searchResponse.query, responseFacetDistribution = searchResponse.facetDistribution;
    var keepZeroFacets = searchContext.keepZeroFacets, facets = searchContext.facets;
    var _a = adaptPaginationParameters(searchResponse, searchContext.pagination), hitsPerPage = _a.hitsPerPage, page = _a.page, nbPages = _a.nbPages;
    var hits = adaptHits(searchResponse, searchContext);
    var nbHits = adaptTotalHits(searchResponse);
    var facetDistribution = adaptFacetDistribution(keepZeroFacets, facets, initialFacetDistribution, responseFacetDistribution);
    // Create response object compliant with InstantSearch
    var adaptedSearchResponse = __assign({ index: searchContext.indexUid, hitsPerPage: hitsPerPage, page: page, facets: facetDistribution, nbPages: nbPages, nbHits: nbHits, processingTimeMS: processingTimeMs, query: query, hits: hits, params: '', exhaustiveNbHits: false }, searchResponseOptionals);
    return adaptedSearchResponse;
}

/**
 * Create the current state of the pagination
 *
 * @param  {boolean} [finite]
 * @param  {number} [hitsPerPage]
 * @param  {number} [page]
 * @returns {SearchContext}
 */
function createPaginationState(finite, hitsPerPage, page) {
    return {
        hitsPerPage: hitsPerPage === undefined ? 20 : hitsPerPage,
        page: page || 0,
        finite: !!finite
    };
}

/**
 * @param  {AlgoliaMultipleQueriesQuery} searchRequest
 * @param  {Context} options
 * @returns {SearchContext}
 */
function createSearchContext(searchRequest, options) {
    // Split index name and possible sorting rules
    var _a = searchRequest.indexName.split(':'), indexUid = _a[0], sortByArray = _a.slice(1);
    var instantSearchParams = searchRequest.params;
    var paginationState = createPaginationState(options.finitePagination, instantSearchParams === null || instantSearchParams === void 0 ? void 0 : instantSearchParams.hitsPerPage, instantSearchParams === null || instantSearchParams === void 0 ? void 0 : instantSearchParams.page);
    var searchContext = __assign(__assign(__assign({}, options), instantSearchParams), { sort: sortByArray.join(':') || '', indexUid: indexUid, pagination: paginationState, placeholderSearch: options.placeholderSearch !== false, keepZeroFacets: !!options.keepZeroFacets });
    return searchContext;
}

/**
 * @param  {Record<string} cache
 * @returns {SearchCache}
 */
function SearchCache(cache) {
    if (cache === void 0) { cache = {}; }
    var searchCache = cache;
    return {
        getEntry: function (key) {
            if (searchCache[key]) {
                try {
                    return JSON.parse(searchCache[key]);
                }
                catch (_) {
                    return searchCache[key];
                }
            }
            return undefined;
        },
        formatKey: function (components) {
            return stringifyArray(components);
        },
        setEntry: function (key, searchResponse) {
            searchCache[key] = JSON.stringify(searchResponse);
        },
        clearCache: function () {
            searchCache = {};
        }
    };
}

function getIndexFacetDistribution(searchResolver, searchContext) {
    return __awaiter(this, void 0, void 0, function () {
        var defaultSearchContext, meilisearchParams, searchResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultSearchContext = __assign(__assign({}, searchContext), { 
                        // placeholdersearch true to ensure a request is made
                        placeholderSearch: true, 
                        // query set to empty to ensure retrieving the default facetdistribution
                        query: '' });
                    meilisearchParams = MeiliParamsCreator(defaultSearchContext);
                    meilisearchParams.addFacets();
                    meilisearchParams.addPagination();
                    return [4 /*yield*/, searchResolver.searchResponse(defaultSearchContext, meilisearchParams.getParams())];
                case 1:
                    searchResponse = _a.sent();
                    return [2 /*return*/, searchResponse.facetDistribution || {}];
            }
        });
    });
}
function initFacetDistribution(searchResolver, searchContext, initialFacetDistribution) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!initialFacetDistribution[searchContext.indexUid]) return [3 /*break*/, 2];
                    _a = initialFacetDistribution;
                    _b = searchContext.indexUid;
                    return [4 /*yield*/, getIndexFacetDistribution(searchResolver, searchContext)];
                case 1:
                    _a[_b] =
                        _c.sent();
                    _c.label = 2;
                case 2: return [2 /*return*/, initialFacetDistribution];
            }
        });
    });
}

var PACKAGE_VERSION = '0.11.0';

var constructClientAgents = function (clientAgents) {
    if (clientAgents === void 0) { clientAgents = []; }
    var instantMeilisearchAgent = "Meilisearch instant-meilisearch (v".concat(PACKAGE_VERSION, ")");
    return clientAgents.concat(instantMeilisearchAgent);
};

/**
 * apiKey callback definition
 * @callback apiKeyCallback
 * @returns {string} - The apiKey to use
 */
/**
 * Instantiate SearchClient required by instantsearch.js.
 * @param  {string} hostUrl
 * @param  {string | apiKeyCallback} apiKey
 * @param  {InstantMeiliSearchOptions={}} meiliSearchOptions
 * @returns {InstantMeiliSearchInstance}
 */
function instantMeiliSearch(hostUrl, apiKey, instantMeiliSearchOptions) {
    if (apiKey === void 0) { apiKey = ''; }
    if (instantMeiliSearchOptions === void 0) { instantMeiliSearchOptions = {}; }
    // Validate parameters
    validateInstantMeiliSearchParams(hostUrl, apiKey);
    // Resolve possible function to get apiKey
    apiKey = getApiKey(apiKey);
    var clientAgents = constructClientAgents(instantMeiliSearchOptions.clientAgents);
    var meilisearchClient = new MeiliSearch({
        host: hostUrl,
        apiKey: apiKey,
        clientAgents: clientAgents
    });
    var searchCache = SearchCache();
    // create search resolver with included cache
    var searchResolver = SearchResolver(meilisearchClient, searchCache);
    var initialFacetDistribution = {};
    return {
        clearCache: function () { return searchCache.clearCache(); },
        /**
         * @param  {readonlyAlgoliaMultipleQueriesQuery[]} instantSearchRequests
         * @returns {Array}
         */
        search: function (instantSearchRequests) {
            return __awaiter(this, void 0, void 0, function () {
                var searchResponses, requests, _i, requests_1, searchRequest, searchContext, adaptedSearchRequest, searchResponse, adaptedSearchResponse, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            searchResponses = {
                                results: []
                            };
                            requests = instantSearchRequests;
                            _i = 0, requests_1 = requests;
                            _a.label = 1;
                        case 1:
                            if (!(_i < requests_1.length)) return [3 /*break*/, 5];
                            searchRequest = requests_1[_i];
                            searchContext = createSearchContext(searchRequest, instantMeiliSearchOptions);
                            adaptedSearchRequest = adaptSearchParams(searchContext);
                            return [4 /*yield*/, initFacetDistribution(searchResolver, searchContext, initialFacetDistribution)
                                // Search response from Meilisearch
                            ];
                        case 2:
                            initialFacetDistribution = _a.sent();
                            return [4 /*yield*/, searchResolver.searchResponse(searchContext, adaptedSearchRequest)
                                // Adapt the Meilisearch response to a compliant instantsearch.js response
                            ];
                        case 3:
                            searchResponse = _a.sent();
                            adaptedSearchResponse = adaptSearchResponse(searchResponse, searchContext, initialFacetDistribution[searchRequest.indexName]);
                            searchResponses.results.push(adaptedSearchResponse);
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, searchResponses];
                        case 6:
                            e_1 = _a.sent();
                            console.error(e_1);
                            throw new Error(e_1);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        searchForFacetValues: function (_) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                reject(new Error('SearchForFacetValues is not compatible with Meilisearch'));
                                resolve([]); // added here to avoid compilation error
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
    };
}
/**
 * Resolves apiKey if it is a function
 * @param  {string | apiKeyCallback} apiKey
 * @returns {string} api key value
 */
function getApiKey(apiKey) {
    // If apiKey is function, call it to get the apiKey
    if (typeof apiKey === 'function') {
        var apiKeyFnValue = apiKey();
        if (typeof apiKeyFnValue !== 'string') {
            throw new TypeError('Provided apiKey function (2nd parameter) did not return a string, expected string');
        }
        return apiKeyFnValue;
    }
    return apiKey;
}

var MatchingStrategies;
(function (MatchingStrategies) {
    MatchingStrategies["ALL"] = "all";
    MatchingStrategies["LAST"] = "last";
})(MatchingStrategies || (MatchingStrategies = {}));

export { MatchingStrategies, instantMeiliSearch };
