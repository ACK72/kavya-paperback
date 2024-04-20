(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeColor = void 0;
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "default";
    BadgeColor["GREEN"] = "success";
    BadgeColor["GREY"] = "info";
    BadgeColor["YELLOW"] = "warning";
    BadgeColor["RED"] = "danger";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
/**
* @deprecated Use {@link PaperbackExtensionBase}
*/
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = exports.SourceIntents = void 0;
var SourceIntents;
(function (SourceIntents) {
    SourceIntents[SourceIntents["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents[SourceIntents["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
    SourceIntents[SourceIntents["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
    SourceIntents[SourceIntents["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents[SourceIntents["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents[SourceIntents["SETTINGS_UI"] = 32] = "SETTINGS_UI";
})(SourceIntents = exports.SourceIntents || (exports.SourceIntents = {}));
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./ByteArray"), exports);
__exportStar(require("./Badge"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./HomeSectionType"), exports);
__exportStar(require("./PaperbackExtensionBase"), exports);

},{"./Badge":1,"./ByteArray":2,"./HomeSectionType":3,"./PaperbackExtensionBase":4,"./Source":5,"./SourceInfo":6,"./interfaces":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ChapterProviding"), exports);
__exportStar(require("./CloudflareBypassRequestProviding"), exports);
__exportStar(require("./HomePageSectionsProviding"), exports);
__exportStar(require("./MangaProgressProviding"), exports);
__exportStar(require("./MangaProviding"), exports);
__exportStar(require("./RequestManagerProviding"), exports);
__exportStar(require("./SearchResultsProviding"), exports);

},{"./ChapterProviding":8,"./CloudflareBypassRequestProviding":9,"./HomePageSectionsProviding":10,"./MangaProgressProviding":11,"./MangaProviding":12,"./RequestManagerProviding":13,"./SearchResultsProviding":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],60:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DynamicUI/Exports/DUIBinding"), exports);
__exportStar(require("./DynamicUI/Exports/DUIForm"), exports);
__exportStar(require("./DynamicUI/Exports/DUIFormRow"), exports);
__exportStar(require("./DynamicUI/Exports/DUISection"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIHeader"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILink"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIMultilineLabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUINavigationButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIOAuthButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISecureInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISelect"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIStepper"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISwitch"), exports);
__exportStar(require("./Exports/ChapterDetails"), exports);
__exportStar(require("./Exports/Chapter"), exports);
__exportStar(require("./Exports/Cookie"), exports);
__exportStar(require("./Exports/HomeSection"), exports);
__exportStar(require("./Exports/IconText"), exports);
__exportStar(require("./Exports/MangaInfo"), exports);
__exportStar(require("./Exports/MangaProgress"), exports);
__exportStar(require("./Exports/PartialSourceManga"), exports);
__exportStar(require("./Exports/MangaUpdates"), exports);
__exportStar(require("./Exports/PBCanvas"), exports);
__exportStar(require("./Exports/PBImage"), exports);
__exportStar(require("./Exports/PagedResults"), exports);
__exportStar(require("./Exports/RawData"), exports);
__exportStar(require("./Exports/Request"), exports);
__exportStar(require("./Exports/SourceInterceptor"), exports);
__exportStar(require("./Exports/RequestManager"), exports);
__exportStar(require("./Exports/Response"), exports);
__exportStar(require("./Exports/SearchField"), exports);
__exportStar(require("./Exports/SearchRequest"), exports);
__exportStar(require("./Exports/SourceCookieStore"), exports);
__exportStar(require("./Exports/SourceManga"), exports);
__exportStar(require("./Exports/SecureStateManager"), exports);
__exportStar(require("./Exports/SourceStateManager"), exports);
__exportStar(require("./Exports/Tag"), exports);
__exportStar(require("./Exports/TagSection"), exports);
__exportStar(require("./Exports/TrackedMangaChapterReadAction"), exports);
__exportStar(require("./Exports/TrackerActionQueue"), exports);

},{"./DynamicUI/Exports/DUIBinding":17,"./DynamicUI/Exports/DUIForm":18,"./DynamicUI/Exports/DUIFormRow":19,"./DynamicUI/Exports/DUISection":20,"./DynamicUI/Rows/Exports/DUIButton":21,"./DynamicUI/Rows/Exports/DUIHeader":22,"./DynamicUI/Rows/Exports/DUIInputField":23,"./DynamicUI/Rows/Exports/DUILabel":24,"./DynamicUI/Rows/Exports/DUILink":25,"./DynamicUI/Rows/Exports/DUIMultilineLabel":26,"./DynamicUI/Rows/Exports/DUINavigationButton":27,"./DynamicUI/Rows/Exports/DUIOAuthButton":28,"./DynamicUI/Rows/Exports/DUISecureInputField":29,"./DynamicUI/Rows/Exports/DUISelect":30,"./DynamicUI/Rows/Exports/DUIStepper":31,"./DynamicUI/Rows/Exports/DUISwitch":32,"./Exports/Chapter":33,"./Exports/ChapterDetails":34,"./Exports/Cookie":35,"./Exports/HomeSection":36,"./Exports/IconText":37,"./Exports/MangaInfo":38,"./Exports/MangaProgress":39,"./Exports/MangaUpdates":40,"./Exports/PBCanvas":41,"./Exports/PBImage":42,"./Exports/PagedResults":43,"./Exports/PartialSourceManga":44,"./Exports/RawData":45,"./Exports/Request":46,"./Exports/RequestManager":47,"./Exports/Response":48,"./Exports/SearchField":49,"./Exports/SearchRequest":50,"./Exports/SecureStateManager":51,"./Exports/SourceCookieStore":52,"./Exports/SourceInterceptor":53,"./Exports/SourceManga":54,"./Exports/SourceStateManager":55,"./Exports/Tag":56,"./Exports/TagSection":57,"./Exports/TrackedMangaChapterReadAction":58,"./Exports/TrackerActionQueue":59}],61:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./generated/_exports"), exports);
__exportStar(require("./base/index"), exports);
__exportStar(require("./compat/DyamicUI"), exports);

},{"./base/index":7,"./compat/DyamicUI":16,"./generated/_exports":60}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
class CacheManager {
    constructor() {
        this.cachedData = {};
    }
    getHash(str) {
        let hash = 0;
        let chr;
        for (let i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    getCachedData(str) {
        const time = new Date();
        const key = this.getHash(str);
        this.cachedData = Object.fromEntries(Object.entries(this.cachedData).filter(([_, value]) => 0 < (time.getTime() - value.time.getTime()) && (time.getTime() - value.time.getTime()) < 180 * 1000));
        return this.cachedData[key]?.data;
    }
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    setCachedData(str, data) {
        const hash = this.getHash(str);
        let cacheTime = this.cachedData[hash]?.time ?? new Date();
        this.cachedData[hash] = { time: cacheTime, data: data };
    }
}
exports.CacheManager = CacheManager;

},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.getAuthorization = exports.getKavitaAPI = exports.DEFAULT_VALUES = exports.searchRequestToString = exports.reqeustToString = exports.getSeriesDetails = exports.getServerUnavailableMangaTiles = exports.KavitaRequestInterceptor = void 0;
const KAVITA_PUBLICATION_STATUS = {
    0: 'Ongoing',
    1: 'Hiatus',
    2: 'Completed',
    3: 'Cancelled',
    4: 'Ended',
};
//
// Kavya Common Class & Methods
//
class KavitaRequestInterceptor {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.authorization = '';
    }
    async isServerAvailable() {
        await this.getAuthorizationString();
        return this.authorization.startsWith('Bearer ');
    }
    async getAuthorizationString() {
        if (this.authorization === '') {
            this.authorization = await getAuthorization(this.stateManager);
        }
        return this.authorization;
    }
    clearAuthorizationString() {
        this.authorization = '';
    }
    async interceptResponse(response) {
        return response;
    }
    async interceptRequest(request) {
        request.headers = {
            ...request.headers,
            ...(typeof request.data === 'string' ? { 'Content-Type': 'application/json' } : {}),
            'Authorization': await this.getAuthorizationString()
        };
        if (request.url.startsWith('FAKE*')) {
            request.url = request.url.split('*REAL*').pop() ?? '';
        }
        return request;
    }
}
exports.KavitaRequestInterceptor = KavitaRequestInterceptor;
function getServerUnavailableMangaTiles() {
    // This tile is used as a placeholder when the server is unavailable
    return [
        App.createPartialSourceManga({
            title: 'Server',
            image: '',
            mangaId: 'placeholder-id',
            subtitle: 'unavailable',
        }),
    ];
}
exports.getServerUnavailableMangaTiles = getServerUnavailableMangaTiles;
async function getSeriesDetails(mangaId, requestManager, stateManager) {
    const kavitaAPI = await getKavitaAPI(stateManager);
    const seriesRequest = App.createRequest({
        url: `${kavitaAPI.url}/Series/${mangaId}`,
        method: 'GET',
    });
    const metadataRequest = App.createRequest({
        url: `${kavitaAPI.url}/Series/metadata`,
        param: `?seriesId=${mangaId}`,
        method: 'GET',
    });
    const promises = [];
    promises.push(requestManager.schedule(seriesRequest, 1));
    promises.push(requestManager.schedule(metadataRequest, 1));
    const responses = await Promise.all(promises);
    const seriesResult = typeof responses[0]?.data === 'string' ? JSON.parse(responses[0]?.data) : responses[0]?.data;
    const metadataResult = typeof responses[1]?.data === 'string' ? JSON.parse(responses[1]?.data) : responses[1]?.data;
    // exclude people tags for now
    const tagNames = ['genres', 'tags'];
    const tagSections = [];
    for (const tagName of tagNames) {
        const tags = [];
        for (const tag of metadataResult[tagName]) {
            tags.push(App.createTag({
                id: `${tagName}-${tag.id}`,
                label: tag.title
            }));
        }
        tagSections.push(App.createTagSection({
            id: tagName,
            label: tagName,
            tags: tags
        }));
    }
    let artists = [];
    for (const penciller of metadataResult.pencillers) {
        artists.push(penciller.name);
    }
    let authors = [];
    for (const writer of metadataResult.writers) {
        authors.push(writer.name);
    }
    return {
        image: `${kavitaAPI.url}/image/series-cover?seriesId=${mangaId}&apiKey=${kavitaAPI.key}`,
        artist: artists.join(', '),
        author: authors.join(', '),
        desc: metadataResult.summary.replace(/<[^>]+>/g, ''),
        status: KAVITA_PUBLICATION_STATUS[metadataResult.publicationStatus] ?? 'Unknown',
        hentai: false,
        titles: [seriesResult.name],
        rating: seriesResult.userRating,
        tags: tagSections,
        //additionalInfo: Record<string, string>
    };
}
exports.getSeriesDetails = getSeriesDetails;
function reqeustToString(request) {
    return JSON.stringify({
        url: request.url,
        data: request.data,
        method: request.method
    });
}
exports.reqeustToString = reqeustToString;
function searchRequestToString(searchQuery) {
    return JSON.stringify({
        title: searchQuery.title,
        tags: searchQuery.includedTags?.map(tag => tag.id)
    });
}
exports.searchRequestToString = searchRequestToString;
//
// Kavya Setting State Methods
//
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
exports.DEFAULT_VALUES = {
    kavitaAddress: 'https://demo.kavitareader.com',
    kavitaAPIUrl: 'https://demo.kavitareader.com/api',
    kavitaAPIKey: '',
    pageSize: 40,
    showOnDeck: true,
    showRecentlyUpdated: true,
    showNewlyAdded: true,
    excludeBookTypeLibrary: false,
    enableRecursiveSearch: false
};
async function getKavitaAPI(stateManager) {
    const kavitaAPIUrl = await stateManager.retrieve('kavitaAPIUrl') ?? exports.DEFAULT_VALUES.kavitaAPIUrl;
    const kavitaAPIKey = await stateManager.keychain.retrieve('kavitaAPIKey') ?? exports.DEFAULT_VALUES.kavitaAPIKey;
    return { url: kavitaAPIUrl, key: kavitaAPIKey };
}
exports.getKavitaAPI = getKavitaAPI;
async function getAuthorization(stateManager) {
    const kavitaAPI = await getKavitaAPI(stateManager);
    const manager = App.createRequestManager({
        requestsPerSecond: 8,
        requestTimeout: 20000
    });
    const request = App.createRequest({
        url: `${kavitaAPI.url}/Plugin/authenticate`,
        param: `?apiKey=${kavitaAPI.key}&pluginName=Kavya`,
        method: 'POST'
    });
    const response = await manager.schedule(request, 1);
    const token = typeof response.data === 'string' ? JSON.parse(response.data).token : undefined;
    return token ? `Bearer ${token}` : '';
}
exports.getAuthorization = getAuthorization;
async function getOptions(stateManager) {
    const pageSize = await stateManager.retrieve('pageSize') ?? exports.DEFAULT_VALUES.pageSize;
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? exports.DEFAULT_VALUES.showOnDeck;
    const showRecentlyUpdated = await stateManager.retrieve('showRecentlyUpdated') ?? exports.DEFAULT_VALUES.showRecentlyUpdated;
    const showNewlyAdded = await stateManager.retrieve('showNewlyAdded') ?? exports.DEFAULT_VALUES.showNewlyAdded;
    const excludeBookTypeLibrary = await stateManager.retrieve('excludeBookTypeLibrary') ?? exports.DEFAULT_VALUES.excludeBookTypeLibrary;
    const enableRecursiveSearch = await stateManager.retrieve('enableRecursiveSearch') ?? exports.DEFAULT_VALUES.enableRecursiveSearch;
    return { pageSize, showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch };
}
exports.getOptions = getOptions;

},{}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kavya = exports.KavyaInfo = void 0;
const types_1 = require("@paperback/types");
const Settings_1 = require("./Settings");
const Common_1 = require("./Common");
const Search_1 = require("./Search");
const CacheManager_1 = require("./CacheManager");
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const sortHelper = (a, b) => {
    if (a.volume === b.volume)
        return a.chapNum === b.chapNum ? a._index - b._index : a.chapNum - b.chapNum;
    return a.volume === 0 || b.volume === 0 ? b.volume - a.volume : a.volume - b.volume;
};
exports.KavyaInfo = {
    version: '1.3.5',
    name: 'Kavya',
    icon: 'icon.png',
    author: 'ACK72',
    authorWebsite: 'https://github.com/ACK72',
    description: 'Kavita client extension for Paperback',
    contentRating: types_1.ContentRating.EVERYONE,
    websiteBaseURL: 'https://www.kavitareader.com/',
    sourceTags: [
        {
            text: 'Kavita',
            type: types_1.BadgeColor.GREEN,
        },
    ],
    intents: types_1.SourceIntents.COLLECTION_MANAGEMENT | types_1.SourceIntents.HOMEPAGE_SECTIONS | types_1.SourceIntents.MANGA_CHAPTERS | types_1.SourceIntents.MANGA_TRACKING | types_1.SourceIntents.SETTINGS_UI
};
class Kavya {
    constructor() {
        this.stateManager = App.createSourceStateManager();
        this.cacheManager = new CacheManager_1.CacheManager();
        this.interceptor = new Common_1.KavitaRequestInterceptor(this.stateManager);
        this.requestManager = App.createRequestManager({
            requestsPerSecond: 8,
            requestTimeout: 20000,
            interceptor: this.interceptor
        });
    }
    async getSourceMenu() {
        return App.createDUISection({
            id: 'main',
            header: 'Source Settings',
            isHidden: false,
            rows: async () => [
                (0, Settings_1.serverSettingsMenu)(this.stateManager, this.interceptor)
            ],
        });
    }
    async getMangaDetails(mangaId) {
        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                ...(await (0, Common_1.getSeriesDetails)(mangaId, this.requestManager, this.stateManager))
            })
        });
    }
    async getChapters(mangaId) {
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const request = App.createRequest({
            url: `${kavitaAPI.url}/Series/volumes`,
            param: `?seriesId=${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        // rome-ignore lint/style/useSingleVarDeclarator: <explanation>
        const chapters = [], specials = [];
        let i = 0;
        let j = 1;
        for (const volume of result) {
            for (const chapter of volume.chapters) {
                const name = chapter.number === chapter.range ? chapter.titleName ?? '' : `${chapter.range.replace(`${chapter.number}-`, '')}${chapter.titleName ? ` - ${chapter.titleName}` : ''}`;
                const title = chapter.range.endsWith('.epub') ? chapter.range.slice(0, -5) : chapter.range.slice(0, -4);
                const progress = chapter.pagesRead === 0 ? '' : chapter.pages === chapter.pagesRead ? '· Read' : `· Reading ${chapter.pagesRead} page`;
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                const item = {
                    id: `${chapter.id}`,
                    mangaId: mangaId,
                    chapNum: chapter.isSpecial ? j++ : parseFloat(chapter.number),
                    name: chapter.isSpecial ? title : name,
                    time: new Date(chapter.releaseDate === '0001-01-01T00:00:00' ? chapter.created : chapter.releaseDate),
                    volume: parseFloat(volume.name),
                    group: `${(chapter.isSpecial ? 'Specials · ' : '')}${chapter.pages} pages ${progress}`,
                    _index: i++,
                    // sortIndex is unused, as it seems to have an issue when changing the sort order
                };
                if (chapter.isSpecial)
                    specials.push(item);
                else
                    chapters.push(item);
            }
        }
        chapters.sort(sortHelper);
        return chapters.concat(specials).map((item, index) => {
            return App.createChapter({
                ...item,
                sortingIndex: index
            });
        });
    }
    async getChapterDetails(mangaId, chapterId) {
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const request = App.createRequest({
            url: `${kavitaAPI.url}/Series/chapter`,
            param: `?chapterId=${chapterId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const pages = [];
        for (let i = 0; i < result.pages; i++) {
            pages.push(`FAKE*/${i}?*REAL*${kavitaAPI.url}/Reader/image?chapterId=${chapterId}&page=${i}&apiKey=${kavitaAPI.key}&extractPdf=true`);
        }
        return App.createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages
        });
    }
    async getSearchResults(searchQuery, 
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    metadata) {
        return await (0, Search_1.searchRequest)(searchQuery, metadata, this.requestManager, this.interceptor, this.stateManager, this.cacheManager);
    }
    async getSearchTags() {
        // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
        if (!(await this.interceptor.isServerAvailable())) {
            return [];
        }
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const { excludeBookTypeLibrary } = await (0, Common_1.getOptions)(this.stateManager);
        const includeLibraryIds = [];
        const libraryRequest = App.createRequest({
            url: `${kavitaAPI.url}/Library/libraries`,
            method: 'GET',
        });
        const libraryResponse = await this.requestManager.schedule(libraryRequest, 1);
        const libraryResult = JSON.parse(libraryResponse.data ?? '[]');
        for (const library of libraryResult) {
            if (excludeBookTypeLibrary && library.type === 2)
                continue;
            includeLibraryIds.push(library.id);
        }
        const tagNames = ['genres', 'people', 'tags'];
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        const tagSections = [];
        const promises = [];
        for (const tagName of tagNames) {
            const request = App.createRequest({
                url: `${kavitaAPI.url}/Metadata/${tagName}`,
                param: `?libraryIds=${includeLibraryIds.join(',')}`,
                method: 'GET',
            });
            promises.push(this.requestManager.schedule(request, 1).then((response) => {
                const result = JSON.parse(response.data ?? '[]');
                const names = [];
                const tags = [];
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                result.forEach(async (item) => {
                    switch (tagName) {
                        case 'people':
                            if (!names.includes(item.name)) {
                                names.push(item.name);
                                tags.push(App.createTag({ id: `${tagName}-${item.role}.${item.id}`, label: item.name }));
                            }
                            break;
                        default:
                            tags.push(App.createTag({ id: `${tagName}-${item.id}`, label: item.title }));
                    }
                });
                tagSections[tagName] = App.createTagSection({
                    id: tagName,
                    label: tagName,
                    tags: tags
                });
            }));
        }
        await Promise.all(promises);
        return tagNames.map((tag) => tagSections[tag]);
    }
    async getHomePageSections(sectionCallback) {
        // This function is called on the homepage and should not throw if the server is unavailable
        if (!(await this.interceptor.isServerAvailable())) {
            sectionCallback(App.createHomeSection({
                id: 'placeholder-id',
                title: 'Library',
                items: (0, Common_1.getServerUnavailableMangaTiles)(),
                containsMoreItems: false,
                type: 'singleRowNormal'
            }));
            return;
        }
        // We won't use `await this.getKavitaAPI()` as we do not want to throw an error on
        // the homepage when server settings are not set
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const { showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary } = await (0, Common_1.getOptions)(this.stateManager);
        const pageSize = (await (0, Common_1.getOptions)(this.stateManager)).pageSize / 2;
        // The source define two homepage sections: new and latest
        const sections = [];
        if (showOnDeck) {
            sections.push(App.createHomeSection({
                id: 'ondeck',
                title: 'On Deck',
                containsMoreItems: false,
                type: 'singleRowNormal'
            }));
        }
        if (showRecentlyUpdated) {
            sections.push(App.createHomeSection({
                id: 'recentlyupdated',
                title: 'Recently Updated Series',
                containsMoreItems: false,
                type: 'singleRowNormal'
            }));
        }
        if (showNewlyAdded) {
            sections.push(App.createHomeSection({
                id: 'newlyadded',
                title: 'Newly Added Series',
                containsMoreItems: false,
                type: 'singleRowNormal'
            }));
        }
        const request = App.createRequest({
            url: `${kavitaAPI.url}/Library/libraries`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = JSON.parse(response.data ?? '[]');
        const excludeLibraryIds = [];
        for (const library of result) {
            if (excludeBookTypeLibrary && library.type === 2) {
                excludeLibraryIds.push(library.id);
                continue;
            }
            sections.push(App.createHomeSection({
                id: `${library.id}`,
                title: library.name,
                containsMoreItems: false,
                type: 'singleRowNormal'
            }));
        }
        const promises = [];
        for (const section of sections) {
            sectionCallback(section);
        }
        for (const section of sections) {
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            // rome-ignore lint/style/useSingleVarDeclarator: <explanation>
            let apiPath, body = {}, id = 'id', title = 'name';
            switch (section.id) {
                case 'ondeck':
                    apiPath = `${kavitaAPI.url}/Series/on-deck?PageNumber=1&PageSize=${pageSize}`;
                    break;
                case 'recentlyupdated':
                    apiPath = `${kavitaAPI.url}/Series/recently-updated-series`;
                    id = 'seriesId', title = 'seriesName';
                    break;
                case 'newlyadded':
                    apiPath = `${kavitaAPI.url}/Series/recently-added-v2?PageNumber=1&PageSize=${pageSize}`;
                    break;
                default:
                    apiPath = `${kavitaAPI.url}/Series/v2?PageNumber=1&PageSize=${pageSize}`;
                    body = {
                        statements: [{ comparison: 0, field: 19, value: section.id }],
                        combination: 1,
                        sortOptions: { sortField: 1, isAscending: true },
                        limitTo: 0
                    };
                    break;
            }
            const request = App.createRequest({
                url: apiPath,
                data: JSON.stringify(body),
                method: 'POST',
            });
            // Get the section data
            promises.push(this.requestManager.schedule(request, 1).then((response) => {
                const result = JSON.parse(response.data ?? '[]');
                this.cacheManager.setCachedData((0, Common_1.reqeustToString)(request), result);
                const tiles = [];
                for (const series of result) {
                    if (excludeBookTypeLibrary && excludeLibraryIds.includes(series.libraryId))
                        continue;
                    tiles.push(App.createPartialSourceManga({
                        title: series[title],
                        image: `${kavitaAPI.url}/image/series-cover?seriesId=${series[id]}&apiKey=${kavitaAPI.key}`,
                        mangaId: `${series[id]}`,
                        subtitle: undefined
                    }));
                }
                section.items = tiles;
                if (tiles.length === pageSize)
                    section.containsMoreItems = true;
                sectionCallback(section);
            }));
        }
        // Make sure the function completes
        await Promise.all(promises);
    }
    async getViewMoreItems(homepageSectionId, 
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    metadata) {
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const { pageSize, excludeBookTypeLibrary } = await (0, Common_1.getOptions)(this.stateManager);
        const excludeLibraryIds = [];
        const page = (metadata?.page ?? 0) + 1;
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        // rome-ignore lint/style/useSingleVarDeclarator: <explanation>
        let apiPath, body = {}, id = 'id', title = 'name', checkLibraryId = false, useBuiltInCache = false;
        switch (homepageSectionId) {
            case 'ondeck':
                apiPath = `${kavitaAPI.url}/Series/on-deck?PageNumber=${page}&PageSize=${pageSize}`;
                checkLibraryId = true;
                break;
            case 'recentlyupdated':
                apiPath = `${kavitaAPI.url}/Series/recently-updated-series`;
                id = 'seriesId', title = 'seriesName';
                checkLibraryId = true;
                useBuiltInCache = true;
                break;
            case 'newlyadded':
                apiPath = `${kavitaAPI.url}/Series/recently-added-v2?PageNumber=${page}&PageSize=${pageSize}`;
                checkLibraryId = true;
                break;
            default:
                apiPath = `${kavitaAPI.url}/Series/v2?PageNumber=${page}&PageSize=${pageSize}`;
                body = {
                    statements: [{ comparison: 0, field: 19, value: homepageSectionId }],
                    combination: 1,
                    sortOptions: { sortField: 1, isAscending: true },
                    limitTo: 0
                };
                break;
        }
        const request = App.createRequest({
            url: apiPath,
            data: JSON.stringify(body),
            method: 'POST'
        });
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        let result;
        if (useBuiltInCache) {
            result = this.cacheManager.getCachedData((0, Common_1.reqeustToString)(request));
        }
        if (result === undefined) {
            const response = await this.requestManager.schedule(request, 1);
            result = JSON.parse(response.data ?? '[]');
        }
        if (useBuiltInCache) {
            this.cacheManager.setCachedData((0, Common_1.reqeustToString)(request), result);
            result = result.slice((page - 1) * pageSize, page * pageSize);
        }
        if (checkLibraryId) {
            const libraryRequest = App.createRequest({
                url: `${kavitaAPI.url}/Library/libraries`,
                method: 'GET',
            });
            const libraryResponse = await this.requestManager.schedule(libraryRequest, 1);
            const libraryResult = JSON.parse(libraryResponse.data ?? '[]');
            for (const library of libraryResult) {
                if (library.type === 2)
                    excludeLibraryIds.push(library.id);
            }
        }
        const tiles = [];
        for (const series of result) {
            if (checkLibraryId && excludeBookTypeLibrary && excludeLibraryIds.includes(series.libraryId))
                continue;
            tiles.push(App.createPartialSourceManga({
                title: series[title],
                image: `${kavitaAPI.url}/image/series-cover?seriesId=${series[id]}&apiKey=${kavitaAPI.key}`,
                mangaId: `${series[id]}`,
                subtitle: undefined
            }));
        }
        metadata = tiles.length === 0 ? undefined : { page: page };
        return App.createPagedResults({
            results: tiles,
            metadata: metadata
        });
    }
    async getMangaProgress(mangaId) {
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const request = App.createRequest({
            url: `${kavitaAPI.url}/Series/volumes`,
            param: `?seriesId=${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        const chapters = [];
        let i = 0;
        for (const volume of result) {
            for (const chapter of volume.chapters) {
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                const item = {
                    chapNum: parseFloat(chapter.number),
                    volume: volume.number,
                    time: new Date(chapter.lastReadingProgressUtc),
                    read: chapter.pagesRead === chapter.pages,
                    _index: i++,
                };
                if (!chapter.isSpecial)
                    chapters.push(item);
            }
        }
        chapters.sort(sortHelper);
        let lastReadChapterNumber = 0;
        let lastReadVolumeNumber = 0;
        let lastReadTime = new Date(0);
        for (const chapter of chapters) {
            if (chapter.read) {
                lastReadChapterNumber = chapter.chapNum;
                lastReadVolumeNumber = chapter.volume;
                lastReadTime = chapter.time;
            }
            else {
                break;
            }
        }
        return App.createMangaProgress({
            mangaId: mangaId,
            lastReadChapterNumber: lastReadChapterNumber,
            lastReadVolumeNumber: lastReadVolumeNumber,
            trackedListName: 'TEST',
            lastReadTime: lastReadTime
        });
    }
    async getMangaProgressManagementForm(mangaId) {
        return App.createDUIForm({
            sections: async () => {
                const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
                const request = App.createRequest({
                    url: `${kavitaAPI.url}/Series/${mangaId}`,
                    method: 'GET',
                });
                const response = await this.requestManager.schedule(request, 1);
                const result = JSON.parse(response?.data ?? '{}');
                return [
                    App.createDUISection({
                        id: 'seriesInfo',
                        header: 'Info',
                        isHidden: false,
                        rows: async () => [
                            App.createDUILabel({
                                id: 'seriesId',
                                label: 'SeriesID',
                                value: mangaId
                            }),
                            App.createDUILabel({
                                id: 'libraryId',
                                label: 'LibraryID',
                                value: `${result.libraryId}`
                            }),
                            App.createDUILabel({
                                id: 'pagesRead',
                                label: 'Pages Read',
                                value: `${result.pagesRead} / ${result.pages}`
                            })
                        ]
                    }),
                    App.createDUISection({
                        id: 'userReview',
                        header: 'Rating & Review',
                        isHidden: false,
                        rows: async () => [
                            App.createDUIStepper({
                                id: 'rating',
                                label: 'Rating',
                                value: result.userRating ?? 0,
                                min: 0,
                                max: 5,
                                step: 1
                            }),
                            App.createDUIInputField({
                                id: 'review',
                                label: '',
                                value: result.userReview ?? '',
                            })
                        ]
                    })
                ];
            },
            onSubmit: async (values) => {
                const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
                await this.requestManager.schedule(App.createRequest({
                    url: `${kavitaAPI.url}/Series/update-rating`,
                    data: JSON.stringify({ seriesId: mangaId, userRating: values.rating, userReview: values.review }),
                    method: 'POST'
                }), 1);
            }
        });
    }
    async processChapterReadActionQueue(actionQueue) {
        const chapterReadActions = await actionQueue.queuedChapterReadActions();
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        for (const readAction of chapterReadActions) {
            if (!(await this.interceptor.isServerAvailable())) {
                await actionQueue.retryChapterReadAction(readAction);
                continue;
            }
            try {
                const chapterRequest = App.createRequest({
                    url: `${kavitaAPI.url}/Reader/chapter-info`,
                    param: `?chapterId=${readAction.sourceChapterId}`,
                    method: 'GET',
                });
                const chapterResponse = await this.requestManager.schedule(chapterRequest, 1);
                const chapterResult = JSON.parse(chapterResponse?.data ?? '{}');
                const progressRequest = App.createRequest({
                    url: `${kavitaAPI.url}/Reader/progress`,
                    data: JSON.stringify({
                        volumeId: chapterResult.volumeId,
                        chapterId: parseInt(readAction.sourceChapterId),
                        pageNum: chapterResult.pages,
                        seriesId: chapterResult.seriesId,
                        libraryId: chapterResult.libraryId
                    }),
                    method: 'POST',
                });
                const progressResponse = await this.requestManager.schedule(progressRequest, 1);
                if (progressResponse.status < 400) {
                    await actionQueue.discardChapterReadAction(readAction);
                }
                else {
                    await actionQueue.retryChapterReadAction(readAction);
                }
            }
            catch (error) {
                await actionQueue.retryChapterReadAction(readAction);
            }
        }
    }
}
exports.Kavya = Kavya;

},{"./CacheManager":62,"./Common":63,"./Search":65,"./Settings":66,"@paperback/types":61}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRequest = void 0;
const Common_1 = require("./Common");
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const KAVITA_PERSON_ROLES = {
    '1': 'other',
    '2': 'artist',
    '3': 'writers',
    '4': 'penciller',
    '5': 'inker',
    '6': 'colorist',
    '7': 'letterer',
    '8': 'coverArtist',
    '9': 'editor',
    '10': 'publisher',
    '11': 'character',
    '12': 'translators' // KavitaAPI /api/series/all uses 'translators' instead of 'translator'
};
async function searchRequest(searchQuery, 
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
metadata, requestManager, interceptor, stateManager, cacheManager) {
    // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
    if (!(await interceptor.isServerAvailable())) {
        return App.createPagedResults({
            results: (0, Common_1.getServerUnavailableMangaTiles)(),
        });
    }
    const kavitaAPI = await (0, Common_1.getKavitaAPI)(stateManager);
    const { enableRecursiveSearch, excludeBookTypeLibrary, pageSize } = await (0, Common_1.getOptions)(stateManager);
    const page = metadata?.page ?? 0;
    const excludeLibraryIds = [];
    if (excludeBookTypeLibrary) {
        const request = App.createRequest({
            url: `${kavitaAPI.url}/Library`,
            method: 'GET'
        });
        const response = await requestManager.schedule(request, 1);
        const result = JSON.parse(response.data ?? '[]');
        for (const library of result) {
            if (library.type === 2 || library.type === 4) {
                excludeLibraryIds.push(library.id);
            }
        }
    }
    const titleSearchIds = [];
    const tagSearchTiles = [];
    const titleSearchTiles = [];
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    let result = cacheManager.getCachedData((0, Common_1.searchRequestToString)(searchQuery));
    if (result === undefined) {
        if (typeof searchQuery.title === 'string' && searchQuery.title !== '') {
            const titleRequest = App.createRequest({
                url: `${kavitaAPI.url}/Search/search`,
                param: `?queryString=${encodeURIComponent(searchQuery.title)}`,
                method: 'GET'
            });
            // We don't want to throw if the server is unavailable
            const titleResponse = await requestManager.schedule(titleRequest, 1);
            const titleResult = JSON.parse(titleResponse.data ?? '[]');
            for (const manga of titleResult.series) {
                if (excludeLibraryIds.includes(manga.libraryId)) {
                    continue;
                }
                titleSearchIds.push(manga.seriesId);
                titleSearchTiles.push(App.createPartialSourceManga({
                    title: manga.name,
                    image: `${kavitaAPI.url}/image/series-cover?seriesId=${manga.seriesId}&apiKey=${kavitaAPI.key}`,
                    mangaId: `${manga.seriesId}`,
                    subtitle: undefined
                }));
            }
            if (enableRecursiveSearch) {
                const tagNames = ['persons', 'genres', 'tags'];
                for (const tagName of tagNames) {
                    for (const item of titleResult[tagName]) {
                        let titleTagRequest;
                        switch (tagName) {
                            case 'persons':
                                titleTagRequest = App.createRequest({
                                    url: `${kavitaAPI.url}/Series/all`,
                                    data: JSON.stringify({ [KAVITA_PERSON_ROLES[item.role]]: [item.id] }),
                                    method: 'POST'
                                });
                                break;
                            default:
                                titleTagRequest = App.createRequest({
                                    url: `${kavitaAPI.url}/Series/all`,
                                    data: JSON.stringify({ [tagName]: [item.id] }),
                                    method: 'POST'
                                });
                        }
                        const titleTagResponse = await requestManager.schedule(titleTagRequest, 1);
                        const titleTagResult = JSON.parse(titleTagResponse.data ?? '[]');
                        for (const manga of titleTagResult) {
                            if (!titleSearchIds.includes(manga.id)) {
                                titleSearchIds.push(manga.id);
                                titleSearchTiles.push(App.createPartialSourceManga({
                                    title: manga.name,
                                    image: `${kavitaAPI.url}/image/series-cover?seriesId=${manga.id}&apiKey=${kavitaAPI.key}`,
                                    mangaId: `${manga.id}`,
                                    subtitle: undefined
                                }));
                            }
                        }
                    }
                }
            }
        }
        if (typeof searchQuery.includedTags !== 'undefined') {
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            const body = {};
            const peopleTags = [];
            searchQuery.includedTags.forEach(async (tag) => {
                switch (tag.id.split('-')[0]) {
                    case 'people':
                        peopleTags.push(tag.label);
                        break;
                    default:
                        body[tag.id.split('-')[0] ?? ''] = body[tag.id.split('-')[0] ?? ''] ?? [];
                        body[tag.id.split('-')[0] ?? ''].push(parseInt(tag.id.split('-')[1] ?? '0'));
                }
            });
            const peopleRequest = App.createRequest({
                url: `${kavitaAPI.url}/Metadata/people`,
                method: 'GET'
            });
            const peopleResponse = await requestManager.schedule(peopleRequest, 1);
            const peopleResult = JSON.parse(peopleResponse.data ?? '[]');
            for (const people of peopleResult) {
                if (peopleTags.includes(people.name)) {
                    body[KAVITA_PERSON_ROLES[people.role]] = body[KAVITA_PERSON_ROLES[people.role]] ?? [];
                    body[KAVITA_PERSON_ROLES[people.role]].push(people.id);
                }
            }
            const tagRequst = App.createRequest({
                url: `${kavitaAPI.url}/Series/all`,
                data: JSON.stringify(body),
                method: 'POST'
            });
            const tagResponse = await requestManager.schedule(tagRequst, 1);
            const tagResult = JSON.parse(tagResponse.data ?? '[]');
            for (const manga of tagResult) {
                tagSearchTiles.push(App.createPartialSourceManga({
                    title: manga.name,
                    image: `${kavitaAPI.url}/image/series-cover?seriesId=${manga.id}&apiKey=${kavitaAPI.key}`,
                    mangaId: `${manga.id}`,
                    subtitle: undefined
                }));
            }
        }
        result = (tagSearchTiles.length > 0 && titleSearchTiles.length > 0) ? tagSearchTiles.filter((value) => titleSearchTiles.some((target) => target.image === value.image)) : titleSearchTiles.concat(tagSearchTiles);
        cacheManager.setCachedData((0, Common_1.searchRequestToString)(searchQuery), result);
    }
    result = result.slice(page * pageSize, (page + 1) * pageSize);
    metadata = result.length === 0 ? undefined : { page: page + 1 };
    return App.createPagedResults({
        results: result,
        metadata: metadata
    });
}
exports.searchRequest = searchRequest;

},{"./Common":63}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStateData = exports.retrieveStateData = exports.serverSettingsMenu = void 0;
const Common_1 = require("./Common");
/* UI definition */
// NOTE: Submitted data won't be tested
const serverSettingsMenu = (stateManager, interceptor) => {
    return App.createDUINavigationButton({
        id: "server_settings",
        label: "Server Settings",
        form: App.createDUIForm({
            sections: async () => [
                App.createDUISection({
                    id: "information",
                    header: undefined,
                    isHidden: false,
                    rows: async () => [
                        App.createDUIMultilineLabel({
                            label: "Demo Server",
                            value: "Server URL: https://demo.kavitareader.com\nUsername: demouser\nPassword: Demouser64\n\nNote: Values are case-sensitive.",
                            id: "description",
                        }),
                    ],
                }),
                App.createDUISection({
                    id: "serverSettings",
                    header: "Server Settings",
                    isHidden: false,
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        App.createDUIInputField({
                            id: "kavitaAddress",
                            label: "Server URL",
                            value: App.createDUIBinding({
                                async get() {
                                    return values.kavitaAddress;
                                },
                                async set(value) {
                                    values.kavitaAddress = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        }),
                        App.createDUISecureInputField({
                            id: 'kavitaAPIKey',
                            label: 'API Key',
                            value: App.createDUIBinding({
                                async get() {
                                    return values.kavitaAPIKey;
                                },
                                async set(newValue) {
                                    values.kavitaAPIKey = newValue;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        }),
                        App.createDUIInputField({
                            id: 'pageSize',
                            label: 'Page Size',
                            value: App.createDUIBinding({
                                async get() {
                                    return typeof values.pageSize === 'string' ? values.pageSize : values.pageSize.toString();
                                },
                                async set(value) {
                                    values.pageSize = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        })
                    ]),
                }),
                App.createDUISection({
                    id: "sourceOptions",
                    header: "Source Options",
                    isHidden: false,
                    footer: "",
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        App.createDUISwitch({
                            id: 'showOnDeck',
                            label: 'Show On Deck', value: App.createDUIBinding({
                                async get() {
                                    return values.showOnDeck;
                                },
                                async set(value) {
                                    values.showOnDeck = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        }),
                        App.createDUISwitch({
                            id: 'showRecentlyUpdated',
                            label: 'Show Recently Updated',
                            value: App.createDUIBinding({
                                async get() {
                                    return values.showRecentlyUpdated;
                                },
                                async set(value) {
                                    values.showRecentlyUpdated = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        }),
                        App.createDUISwitch({
                            id: 'showNewlyAdded',
                            label: 'Show Newly Added',
                            value: App.createDUIBinding({
                                async get() {
                                    return values.showNewlyAdded;
                                },
                                async set(value) {
                                    values.showNewlyAdded = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        }),
                        App.createDUISwitch({
                            id: 'excludeBookTypeLibrary',
                            label: 'Exclude Book & Novel Type Libraries',
                            value: App.createDUIBinding({
                                async get() {
                                    return values.excludeBookTypeLibrary;
                                },
                                async set(value) {
                                    values.excludeBookTypeLibrary = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        })
                    ]),
                }),
                App.createDUISection({
                    id: "experimentalOptions",
                    header: "Experimental Options",
                    isHidden: false,
                    footer: "",
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        App.createDUISwitch({
                            id: 'enableRecursiveSearch',
                            label: 'Enable Recursive Search',
                            value: App.createDUIBinding({
                                async get() {
                                    return values.enableRecursiveSearch;
                                },
                                async set(value) {
                                    values.enableRecursiveSearch = value;
                                    await setStateData(stateManager, interceptor, values);
                                }
                            })
                        })
                    ]),
                }),
            ],
        }),
    });
};
exports.serverSettingsMenu = serverSettingsMenu;
async function retrieveStateData(stateManager) {
    const kavitaAddress = await stateManager.retrieve('kavitaAddress') ?? Common_1.DEFAULT_VALUES.kavitaAddress;
    const kavitaAPIKey = await stateManager.keychain.retrieve('kavitaAPIKey') ?? Common_1.DEFAULT_VALUES.kavitaAPIKey;
    const pageSize = await stateManager.retrieve('pageSize') ?? Common_1.DEFAULT_VALUES.pageSize;
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? Common_1.DEFAULT_VALUES.showOnDeck;
    const showRecentlyUpdated = await stateManager.retrieve('showRecentlyUpdated') ?? Common_1.DEFAULT_VALUES.showRecentlyUpdated;
    const showNewlyAdded = await stateManager.retrieve('showNewlyAdded') ?? Common_1.DEFAULT_VALUES.showNewlyAdded;
    const excludeBookTypeLibrary = await stateManager.retrieve('excludeBookTypeLibrary') ?? Common_1.DEFAULT_VALUES.excludeBookTypeLibrary;
    const enableRecursiveSearch = await stateManager.retrieve('enableRecursiveSearch') ?? Common_1.DEFAULT_VALUES.enableRecursiveSearch;
    return { kavitaAddress, kavitaAPIKey, pageSize, showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch };
}
exports.retrieveStateData = retrieveStateData;
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
async function setStateData(stateManager, interceptor, data) {
    const promises = [];
    const prevStateData = await retrieveStateData(stateManager);
    let clear = false;
    for (const [key, value] of Object.entries(data)) {
        if (prevStateData[key] !== value) {
            switch (key) {
                case 'kavitaAddress':
                    promises.push(stateManager.store(key, value));
                    promises.push(stateManager.store('kavitaAPIUrl', value + (value.slice(-1) === '/' ? 'api' : '/api')));
                    clear = true;
                    break;
                case 'kavitaAPIKey':
                    promises.push(stateManager.keychain.store(key, value));
                    clear = true;
                    break;
                case 'pageSize':
                    const pageSize = typeof value === 'string' ? parseInt(value) === 0 ? Common_1.DEFAULT_VALUES.pageSize : parseInt(value) : Common_1.DEFAULT_VALUES.pageSize;
                    promises.push(stateManager.store(key, pageSize));
                    break;
                default:
                    promises.push(stateManager.store(key, value));
            }
        }
    }
    await Promise.all(promises);
    if (clear)
        interceptor.clearAuthorizationString();
}
exports.setStateData = setStateData;

},{"./Common":63}]},{},[64])(64)
});
