(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":47}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);
__exportStar(require("./SearchFilter"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchFilter":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
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
        this.cachedData[this.getHash(str)] = { time: new Date(), data: data };
    }
}
exports.CacheManager = CacheManager;

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.getOptions = exports.getAuthorizationString = exports.getKavitaAPIUrl = exports.DEFAULT_VALUES = exports.searchRequestToString = exports.reqeustToString = exports.getSeriesDetails = exports.getServerUnavailableMangaTiles = exports.KavitaRequestInterceptor = exports.KAVITA_PUBLICATION_STATUS = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
//
// Kavya Common Class & Methods
//
exports.KAVITA_PUBLICATION_STATUS = [
    paperback_extensions_common_1.MangaStatus.ONGOING,
    paperback_extensions_common_1.MangaStatus.HIATUS,
    paperback_extensions_common_1.MangaStatus.COMPLETED,
    paperback_extensions_common_1.MangaStatus.ABANDONED,
    paperback_extensions_common_1.MangaStatus.COMPLETED
];
class KavitaRequestInterceptor {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.authorization = '';
    }
    async isServerAvailable() {
        if (this.authorization === '') {
            await this.updateAuthorization();
        }
        return this.authorization.startsWith('Bearer ');
    }
    async updateAuthorization() {
        this.authorization = await getAuthorizationString(this.stateManager);
    }
    async interceptResponse(response) {
        return response;
    }
    async interceptRequest(request) {
        request.headers = {
            'Authorization': this.authorization,
            'Content-Type': typeof request.data === 'string' ? 'application/json' : 'text/html'
        };
        return request;
    }
}
exports.KavitaRequestInterceptor = KavitaRequestInterceptor;
function getServerUnavailableMangaTiles() {
    // This tile is used as a placeholder when the server is unavailable
    return [
        createMangaTile({
            id: 'placeholder-id',
            title: createIconText({ text: 'Server' }),
            image: '',
            subtitleText: createIconText({ text: 'unavailable' }),
        }),
    ];
}
exports.getServerUnavailableMangaTiles = getServerUnavailableMangaTiles;
async function getSeriesDetails(mangaId, requestManager, stateManager) {
    const kavitaAPIUrl = await getKavitaAPIUrl(stateManager);
    const seriesRequest = createRequestObject({
        url: `${kavitaAPIUrl}/Series/${mangaId}`,
        method: 'GET',
    });
    const metadataRequest = createRequestObject({
        url: `${kavitaAPIUrl}/Series/metadata`,
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
            tags.push(createTag({
                id: `${tagName}-${tag.id}`,
                label: tag.title
            }));
        }
        tagSections.push(createTagSection({
            id: tagName,
            label: tagName,
            tags: tags
        }));
    }
    return {
        id: mangaId,
        titles: [seriesResult.name],
        image: `${kavitaAPIUrl}/image/series-cover?seriesId=${mangaId}`,
        rating: seriesResult.userRating,
        status: exports.KAVITA_PUBLICATION_STATUS[metadataResult.publicationStatus] ?? paperback_extensions_common_1.MangaStatus.UNKNOWN,
        artist: typeof metadataResult.pencillers[0] === 'undefined' ? '' : metadataResult.pencillers[0].name,
        author: typeof metadataResult.writers[0] === 'undefined' ? '' : metadataResult.writers[0].name,
        desc: metadataResult.summary.replace(/<[^>]+>/g, ''),
        tags: tagSections,
        lastUpdate: new Date(seriesResult.lastChapterAdded)
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
    showOnDeck: true,
    showRecentlyUpdated: true,
    showNewlyAdded: true,
    excludeBookTypeLibrary: false,
    enableRecursiveSearch: false,
    displayReadInstedOfUnread: true,
    pageSize: 40
};
async function getKavitaAPIUrl(stateManager) {
    return await stateManager.retrieve('kavitaAPIUrl') ?? exports.DEFAULT_VALUES.kavitaAPIUrl;
}
exports.getKavitaAPIUrl = getKavitaAPIUrl;
async function getAuthorizationString(stateManager) {
    const apiUri = await stateManager.retrieve('kavitaAPIUrl') ?? exports.DEFAULT_VALUES.kavitaAPIUrl;
    const apiKey = await stateManager.keychain.retrieve('kavitaAPIKey') ?? exports.DEFAULT_VALUES.kavitaAPIKey;
    const manager = createRequestManager({
        requestsPerSecond: 4,
        requestTimeout: 20000
    });
    const request = createRequestObject({
        url: `${apiUri}/Plugin/authenticate`,
        param: `?apiKey=${apiKey}&pluginName=Kavya`,
        method: 'POST',
    });
    const response = await manager.schedule(request, 1);
    const token = typeof response.data === 'string' ? JSON.parse(response.data).token : undefined;
    return token ? `Bearer ${token}` : '';
}
exports.getAuthorizationString = getAuthorizationString;
async function getOptions(stateManager) {
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? exports.DEFAULT_VALUES.showOnDeck;
    const showRecentlyUpdated = await stateManager.retrieve('showRecentlyUpdated') ?? exports.DEFAULT_VALUES.showRecentlyUpdated;
    const showNewlyAdded = await stateManager.retrieve('showNewlyAdded') ?? exports.DEFAULT_VALUES.showNewlyAdded;
    const excludeBookTypeLibrary = await stateManager.retrieve('excludeBookTypeLibrary') ?? exports.DEFAULT_VALUES.excludeBookTypeLibrary;
    const enableRecursiveSearch = await stateManager.retrieve('enableRecursiveSearch') ?? exports.DEFAULT_VALUES.enableRecursiveSearch;
    const displayReadInstedOfUnread = await stateManager.retrieve('displayReadInstedOfUnread') ?? exports.DEFAULT_VALUES.displayReadInstedOfUnread;
    const pageSize = await stateManager.retrieve('pageSize') ?? exports.DEFAULT_VALUES.pageSize;
    return { showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch, displayReadInstedOfUnread, pageSize };
}
exports.getOptions = getOptions;
//
// Kavya Logging Methods
//
function log(message) {
    console.log(`[Kavya] ${message}`);
}
exports.log = log;

},{"paperback-extensions-common":4}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kavya = exports.KavyaInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Settings_1 = require("./Settings");
const Common_1 = require("./Common");
const Search_1 = require("./Search");
const CacheManager_1 = require("./CacheManager");
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const sortHelper = (a, b) => {
    if (a.volume === b.volume)
        return a.chapNum === b.chapNum ? a._index - b._index : a.chapNum - b.chapNum;
    return a.volume - b.volume;
};
exports.KavyaInfo = {
    version: '1.2.4',
    name: 'Kavya',
    icon: 'icon.png',
    author: 'ACK72',
    authorWebsite: 'https://github.com/ACK72',
    description: 'Kavita client extension for Paperback',
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: 'https://www.kavitareader.com/',
    sourceTags: [
        {
            text: 'Kavita',
            type: paperback_extensions_common_1.TagType.GREEN,
        },
    ],
};
class Kavya extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.stateManager = createSourceStateManager({});
        this.cacheManager = new CacheManager_1.CacheManager();
        this.interceptor = new Common_1.KavitaRequestInterceptor(this.stateManager);
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 20000,
            interceptor: this.interceptor
        });
    }
    async getSourceMenu() {
        return createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => [
                (0, Settings_1.serverSettingsMenu)(this.stateManager, this.interceptor)
            ],
        });
    }
    async getMangaDetails(mangaId) {
        return createManga({
            ...(await (0, Common_1.getSeriesDetails)(mangaId, this.requestManager, this.stateManager))
        });
    }
    async getChapters(mangaId) {
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const { displayReadInstedOfUnread } = await (0, Common_1.getOptions)(this.stateManager);
        const request = createRequestObject({
            url: `${kavitaAPIUrl}/Series/volumes`,
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
                const name = chapter.number === chapter.range ? chapter.titleName || '' : `${chapter.range.replace(`${chapter.number}-`, '')}${chapter.titleName ? ` - ${chapter.titleName}` : ''}`;
                const title = chapter.range.endsWith('.epub') ? chapter.range.slice(0, -5) : chapter.range.slice(0, -4);
                const progress = displayReadInstedOfUnread ? (chapter.pagesRead === 0 ? '' : chapter.pages === chapter.pagesRead ? '· Read' : `· Reading ${chapter.pagesRead} page`)
                    : (chapter.pagesRead === 0 ? '· Unread' : chapter.pages === chapter.pagesRead ? '' : `· Reading ${chapter.pagesRead} page`);
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                const item = {
                    id: `${chapter.id}`,
                    mangaId: mangaId,
                    chapNum: chapter.isSpecial ? j++ : parseInt(chapter.number),
                    name: chapter.isSpecial ? title : name,
                    time: new Date(chapter.releaseDate === '0001-01-01T00:00:00' ? chapter.lastModified : chapter.releaseDate),
                    volume: volume.number,
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
            const chapter = createChapter({
                ...item,
                chapNum: index // paperback sorts by chapNum when chapter is created, so we need to set it as index
            });
            chapter.chapNum = item.chapNum; // revert to the original chapNum, to display it correctly
            return chapter;
        });
    }
    async getChapterDetails(mangaId, chapterId) {
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const request = createRequestObject({
            url: `${kavitaAPIUrl}/Series/chapter`,
            param: `?chapterId=${chapterId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const pages = [];
        for (let i = 0; i < result.pages; i++) {
            pages.push(`${kavitaAPIUrl}/Reader/image?chapterId=${chapterId}&page=${i}&extractPdf=true`);
        }
        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages,
            longStrip: false,
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
            (0, Common_1.log)('getSearchTags failed because server settings are invalid');
            return [];
        }
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const { excludeBookTypeLibrary } = await (0, Common_1.getOptions)(this.stateManager);
        const includeLibraryIds = [];
        const libraryRequest = createRequestObject({
            url: `${kavitaAPIUrl}/Library`,
            method: 'GET',
        });
        const libraryResponse = await this.requestManager.schedule(libraryRequest, 1);
        const libraryResult = JSON.parse(libraryResponse.data);
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
            const request = createRequestObject({
                url: `${kavitaAPIUrl}/Metadata/${tagName}`,
                param: `?libraryIds=${includeLibraryIds.join(',')}`,
                method: 'GET',
            });
            promises.push(this.requestManager.schedule(request, 1).then((response) => {
                const result = JSON.parse(response.data);
                const names = [];
                const tags = [];
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                result.forEach(async (item) => {
                    switch (tagName) {
                        case 'people':
                            if (!names.includes(item.name)) {
                                names.push(item.name);
                                tags.push(createTag({ id: `${tagName}-${item.role}.${item.id}`, label: item.name }));
                            }
                            break;
                        default:
                            tags.push(createTag({ id: `${tagName}-${item.id}`, label: item.title }));
                    }
                });
                tagSections[tagName] = createTagSection({
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
            (0, Common_1.log)('getHomePageSections failed because server settings are invalid');
            sectionCallback(createHomeSection({
                id: 'placeholder-id',
                title: 'Library',
                items: (0, Common_1.getServerUnavailableMangaTiles)(),
                view_more: false
            }));
            return;
        }
        // We won't use `await this.getKavitaAPIUrl()` as we do not want to throw an error on
        // the homepage when server settings are not set
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const { showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary } = await (0, Common_1.getOptions)(this.stateManager);
        const pageSize = (await (0, Common_1.getOptions)(this.stateManager)).pageSize / 2;
        // The source define two homepage sections: new and latest
        const sections = [];
        if (showOnDeck) {
            sections.push(createHomeSection({
                id: 'ondeck',
                title: 'On Deck',
                view_more: false,
            }));
        }
        if (showRecentlyUpdated) {
            sections.push(createHomeSection({
                id: 'recentlyupdated',
                title: 'Recently Updated Series',
                view_more: true,
            }));
        }
        if (showNewlyAdded) {
            sections.push(createHomeSection({
                id: 'newlyadded',
                title: 'Newly Added Series',
                view_more: true,
            }));
        }
        const request = createRequestObject({
            url: `${kavitaAPIUrl}/Library`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = JSON.parse(response.data);
        const excludeLibraryIds = [];
        for (const library of result) {
            if (excludeBookTypeLibrary && library.type === 2) {
                excludeLibraryIds.push(library.id);
                continue;
            }
            sections.push(createHomeSection({
                id: `${library.id}`,
                title: library.name,
                view_more: true,
            }));
        }
        const promises = [];
        for (const section of sections) {
            sectionCallback(section);
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            // rome-ignore lint/style/useSingleVarDeclarator: <explanation>
            let apiPath, body = {}, id = 'id', title = 'name';
            switch (section.id) {
                case 'ondeck':
                    apiPath = `${kavitaAPIUrl}/Series/on-deck`;
                    break;
                case 'recentlyupdated':
                    apiPath = `${kavitaAPIUrl}/Series/recently-updated-series`;
                    id = 'seriesId', title = 'seriesName';
                    break;
                case 'newlyadded':
                    apiPath = `${kavitaAPIUrl}/Series/recently-added`;
                    break;
                default:
                    apiPath = `${kavitaAPIUrl}/Series/all`;
                    body = { 'libraries': [parseInt(section.id)] };
                    break;
            }
            const request = createRequestObject({
                url: apiPath,
                data: JSON.stringify(body),
                method: 'POST',
            });
            // Get the section data
            promises.push(this.requestManager.schedule(request, 1).then((response) => {
                let result = JSON.parse(response.data);
                this.cacheManager.setCachedData((0, Common_1.reqeustToString)(request), result);
                const tiles = [];
                for (const series of result.slice(0, pageSize)) {
                    if (excludeBookTypeLibrary && excludeLibraryIds.includes(series.libraryId)) {
                        continue;
                    }
                    tiles.push(createMangaTile({
                        id: `${series[id]}`,
                        title: createIconText({ text: series[title] }),
                        image: `${kavitaAPIUrl}/image/series-cover?seriesId=${series[id]}`
                    }));
                }
                section.items = tiles;
                sectionCallback(section);
            }));
        }
        // Make sure the function completes
        await Promise.all(promises);
    }
    async getViewMoreItems(homepageSectionId, 
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    metadata) {
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const { pageSize } = await (0, Common_1.getOptions)(this.stateManager);
        const page = metadata?.page ?? 0;
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        // rome-ignore lint/style/useSingleVarDeclarator: <explanation>
        let apiPath, body = {}, id = 'id', title = 'name';
        switch (homepageSectionId) {
            case 'ondeck':
                apiPath = `${kavitaAPIUrl}/Series/on-deck`;
                break;
            case 'recentlyupdated':
                apiPath = `${kavitaAPIUrl}/Series/recently-updated-series`;
                id = 'seriesId', title = 'seriesName';
                break;
            case 'newlyadded':
                apiPath = `${kavitaAPIUrl}/Series/recently-added`;
                break;
            default:
                apiPath = `${kavitaAPIUrl}/Series/all`;
                body = { 'libraries': [parseInt(homepageSectionId)] };
                break;
        }
        const request = createRequestObject({
            url: apiPath,
            data: JSON.stringify(body),
            method: 'POST'
        });
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        let result;
        if (this.cacheManager.getCachedData((0, Common_1.reqeustToString)(request)) !== undefined) {
            result = this.cacheManager.getCachedData((0, Common_1.reqeustToString)(request));
        }
        else {
            const response = await this.requestManager.schedule(request, 1);
            result = JSON.parse(response.data);
            this.cacheManager.setCachedData((0, Common_1.reqeustToString)(request), result);
        }
        const tiles = [];
        for (const series of result.slice(page * pageSize, (page + 1) * pageSize)) {
            tiles.push(createMangaTile({
                id: `${series[id]}`,
                title: createIconText({ text: series[title] }),
                image: `${kavitaAPIUrl}/image/series-cover?seriesId=${series[id]}`
            }));
        }
        metadata = tiles.length === 0 ? undefined : { page: page + 1 };
        return createPagedResults({
            results: tiles,
            metadata: metadata
        });
    }
}
exports.Kavya = Kavya;

},{"./CacheManager":48,"./Common":49,"./Search":51,"./Settings":52,"paperback-extensions-common":4}],51:[function(require,module,exports){
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
        (0, Common_1.log)('searchRequest failed because server settings are invalid');
        return createPagedResults({
            results: (0, Common_1.getServerUnavailableMangaTiles)(),
        });
    }
    const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(stateManager);
    const { enableRecursiveSearch, excludeBookTypeLibrary, pageSize } = await (0, Common_1.getOptions)(stateManager);
    const page = metadata?.page ?? 0;
    const excludeLibraryIds = [];
    if (excludeBookTypeLibrary) {
        const request = createRequestObject({
            url: `${kavitaAPIUrl}/Library`,
            method: 'GET'
        });
        const response = await requestManager.schedule(request, 1);
        const result = JSON.parse(response.data);
        for (const library of result) {
            if (library.type === 2) {
                excludeLibraryIds.push(library.id);
            }
        }
    }
    const titleSearchIds = [];
    const tagSearchTiles = [];
    const titleSearchTiles = [];
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    let result;
    if (cacheManager.getCachedData((0, Common_1.searchRequestToString)(searchQuery)) !== undefined) {
        result = cacheManager.getCachedData((0, Common_1.searchRequestToString)(searchQuery));
    }
    else {
        if (typeof searchQuery.title === 'string' && searchQuery.title !== '') {
            const titleRequest = createRequestObject({
                url: `${kavitaAPIUrl}/Search/search`,
                param: `?queryString=${encodeURIComponent(searchQuery.title)}`,
                method: 'GET'
            });
            // We don't want to throw if the server is unavailable
            const titleResponse = await requestManager.schedule(titleRequest, 1);
            const titleResult = JSON.parse(titleResponse.data);
            for (const manga of titleResult.series) {
                if (excludeLibraryIds.includes(manga.libraryId)) {
                    continue;
                }
                titleSearchIds.push(manga.seriesId);
                titleSearchTiles.push(createMangaTile({
                    id: `${manga.seriesId}`,
                    title: createIconText({ text: manga.name }),
                    image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.seriesId}`
                }));
            }
            if (enableRecursiveSearch) {
                const tagNames = ['persons', 'genres', 'tags'];
                for (const tagName of tagNames) {
                    for (const item of titleResult[tagName]) {
                        let titleTagRequest;
                        switch (tagName) {
                            case 'persons':
                                titleTagRequest = createRequestObject({
                                    url: `${kavitaAPIUrl}/Series/all`,
                                    data: JSON.stringify({ [KAVITA_PERSON_ROLES[item.role]]: [item.id] }),
                                    method: 'POST'
                                });
                                break;
                            default:
                                titleTagRequest = createRequestObject({
                                    url: `${kavitaAPIUrl}/Series/all`,
                                    data: JSON.stringify({ [tagName]: [item.id] }),
                                    method: 'POST'
                                });
                        }
                        const titleTagResponse = await requestManager.schedule(titleTagRequest, 1);
                        const titleTagResult = JSON.parse(titleTagResponse.data);
                        for (const manga of titleTagResult) {
                            if (!titleSearchIds.includes(manga.id)) {
                                titleSearchIds.push(manga.id);
                                titleSearchTiles.push(createMangaTile({
                                    id: `${manga.id}`,
                                    title: createIconText({ text: manga.name }),
                                    image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.id}`
                                }));
                            }
                        }
                    }
                }
            }
        }
        if (typeof searchQuery.includedTags !== 'undefined') {
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            let body = {};
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
            const peopleRequest = createRequestObject({
                url: `${kavitaAPIUrl}/Metadata/people`,
                method: 'GET'
            });
            const peopleResponse = await requestManager.schedule(peopleRequest, 1);
            const peopleResult = JSON.parse(peopleResponse.data);
            for (const people of peopleResult) {
                if (peopleTags.includes(people.name)) {
                    body[KAVITA_PERSON_ROLES[people.role]] = body[KAVITA_PERSON_ROLES[people.role]] ?? [];
                    body[KAVITA_PERSON_ROLES[people.role]].push(people.id);
                }
            }
            const tagRequst = createRequestObject({
                url: `${kavitaAPIUrl}/Series/all`,
                data: JSON.stringify(body),
                method: 'POST'
            });
            const tagResponse = await requestManager.schedule(tagRequst, 1);
            const tagResult = JSON.parse(tagResponse.data);
            for (const manga of tagResult) {
                tagSearchTiles.push(createMangaTile({
                    id: `${manga.id}`,
                    title: createIconText({ text: manga.name }),
                    image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.id}`,
                }));
            }
        }
        result = (tagSearchTiles.length > 0 && titleSearchTiles.length > 0) ? tagSearchTiles.filter((value) => titleSearchTiles.some((target) => target.image === value.image)) : titleSearchTiles.concat(tagSearchTiles);
        cacheManager.setCachedData((0, Common_1.searchRequestToString)(searchQuery), result);
    }
    result = result.slice(page * pageSize, (page + 1) * pageSize);
    metadata = result.length === 0 ? undefined : { page: page + 1 };
    return createPagedResults({
        results: result,
        metadata: metadata
    });
}
exports.searchRequest = searchRequest;

},{"./Common":49}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStateData = exports.retrieveStateData = exports.serverSettingsMenu = void 0;
const Common_1 = require("./Common");
/* UI definition */
// NOTE: Submitted data won't be tested
const serverSettingsMenu = (stateManager, interceptor) => {
    return createNavigationButton({
        id: "server_settings",
        value: "",
        label: "Server Settings",
        form: createForm({
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            onSubmit: async (values) => setStateData(stateManager, interceptor, values),
            validate: async () => true,
            sections: async () => [
                createSection({
                    id: "information",
                    header: undefined,
                    rows: async () => [
                        createMultilineLabel({
                            label: "Demo Server",
                            value: "Server URL: https://demo.kavitareader.com\nUsername: demouser\nPassword: Demouser64\n\nNote: Values are case-sensitive.",
                            id: "description",
                        }),
                    ],
                }),
                createSection({
                    id: "serverSettings",
                    header: "Server Settings",
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        createInputField({
                            id: "kavitaAddress",
                            label: "Server URL",
                            placeholder: "http://127.0.0.1:8080",
                            value: values.kavitaURL,
                            maskInput: false,
                        }),
                        // TS-Ignoring because this isnt documented yet
                        // Fallback to default input field if the app version doesnt support
                        // SecureInputField
                        // @ts-ignore
                        (typeof createSecureInputField === 'undefined' ? createInputField : createSecureInputField)({
                            id: "kavitaAPIKey",
                            label: "API Key",
                            placeholder: "Kavita API Key",
                            value: values.kavitaAPIKey
                        }),
                        createInputField({
                            id: 'pageSize',
                            label: 'Page Size',
                            placeholder: 'Recommended size is 20 for iOS and 40 for iPadOS',
                            value: values.pageSize.toString(),
                            maskInput: false,
                        })
                    ]),
                }),
                createSection({
                    id: "sourceOptions",
                    header: "Source Options",
                    footer: "",
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        createSwitch({
                            id: 'showOnDeck',
                            label: 'Show On Deck',
                            value: values.showOnDeck,
                        }),
                        createSwitch({
                            id: 'showRecentlyUpdated',
                            label: 'Show Recently Updated',
                            value: values.showRecentlyUpdated,
                        }),
                        createSwitch({
                            id: 'showNewlyAdded',
                            label: 'Show Newly Added',
                            value: values.showNewlyAdded,
                        }),
                        createSwitch({
                            id: 'excludeBookTypeLibrary',
                            label: 'Exclude Book Type Library',
                            value: values.excludeBookTypeLibrary,
                        })
                    ]),
                }),
                createSection({
                    id: "searchOptions",
                    header: "Search Options",
                    footer: "",
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        createSwitch({
                            id: 'enableRecursiveSearch',
                            label: 'Enable Recursive Search',
                            value: values.enableRecursiveSearch,
                        })
                    ]),
                }),
                createSection({
                    id: "miscellaneous",
                    header: "MISCELLANEOUS",
                    footer: "",
                    rows: async () => retrieveStateData(stateManager).then((values) => [
                        createSwitch({
                            id: 'displayReadInstedOfUnread',
                            label: 'Display Status With Read Instead Of Unread',
                            value: values.displayReadInstedOfUnread,
                        })
                    ]),
                }),
            ],
        }),
    });
};
exports.serverSettingsMenu = serverSettingsMenu;
async function retrieveStateData(stateManager) {
    const kavitaURL = await stateManager.retrieve('kavitaAddress') ?? Common_1.DEFAULT_VALUES.kavitaAddress;
    const kavitaAPIKey = await stateManager.keychain.retrieve('kavitaAPIKey') ?? Common_1.DEFAULT_VALUES.kavitaAPIKey;
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? Common_1.DEFAULT_VALUES.showOnDeck;
    const showRecentlyUpdated = await stateManager.retrieve('showRecentlyUpdated') ?? Common_1.DEFAULT_VALUES.showRecentlyUpdated;
    const showNewlyAdded = await stateManager.retrieve('showNewlyAdded') ?? Common_1.DEFAULT_VALUES.showNewlyAdded;
    const excludeBookTypeLibrary = await stateManager.retrieve('excludeBookTypeLibrary') ?? Common_1.DEFAULT_VALUES.excludeBookTypeLibrary;
    const enableRecursiveSearch = await stateManager.retrieve('enableRecursiveSearch') ?? Common_1.DEFAULT_VALUES.enableRecursiveSearch;
    const displayReadInstedOfUnread = await stateManager.retrieve('displayReadInstedOfUnread') ?? Common_1.DEFAULT_VALUES.displayReadInstedOfUnread;
    const pageSize = await stateManager.retrieve('pageSize') ?? Common_1.DEFAULT_VALUES.pageSize;
    return { kavitaURL, kavitaAPIKey, showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch, displayReadInstedOfUnread, pageSize };
}
exports.retrieveStateData = retrieveStateData;
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
async function setStateData(stateManager, interceptor, data) {
    const apiUri = data['kavitaAddress'] ?? Common_1.DEFAULT_VALUES.kavitaAddress;
    const pageSize = typeof data['pageSize'] === 'string' ? parseInt(data['pageSize']) === 0 ? Common_1.DEFAULT_VALUES.pageSize : parseInt(data['pageSize']) : Common_1.DEFAULT_VALUES.pageSize;
    let promises = [];
    promises.push(stateManager.store('kavitaAddress', apiUri));
    promises.push(stateManager.store('kavitaAPIUrl', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api')));
    promises.push(stateManager.keychain.store('kavitaAPIKey', data['kavitaAPIKey'] ?? Common_1.DEFAULT_VALUES.kavitaAPIKey));
    promises.push(stateManager.store('pageSize', pageSize));
    await Promise.all(promises);
    await interceptor.updateAuthorization();
    promises = [];
    promises.push(stateManager.store('showOnDeck', data['showOnDeck'] ?? Common_1.DEFAULT_VALUES.showOnDeck));
    promises.push(stateManager.store('showRecentlyUpdated', data['showRecentlyUpdated'] ?? Common_1.DEFAULT_VALUES.showRecentlyUpdated));
    promises.push(stateManager.store('showNewlyAdded', data['showNewlyAdded'] ?? Common_1.DEFAULT_VALUES.showNewlyAdded));
    promises.push(stateManager.store('excludeBookTypeLibrary', data['excludeBookTypeLibrary'] ?? Common_1.DEFAULT_VALUES.excludeBookTypeLibrary));
    promises.push(stateManager.store('enableRecursiveSearch', data['enableRecursiveSearch'] ?? Common_1.DEFAULT_VALUES.enableRecursiveSearch));
    promises.push(stateManager.store('displayReadInstedOfUnread', data['displayReadInstedOfUnread'] ?? Common_1.DEFAULT_VALUES.displayReadInstedOfUnread));
    await Promise.all(promises);
}
exports.setStateData = setStateData;

},{"./Common":49}]},{},[50])(50)
});
