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
exports.setStateData = exports.retrieveStateData = exports.getOptions = exports.getAuthorizationString = exports.getKavitaAPIUrl = exports.getServerUnavailableMangaTiles = exports.log = void 0;
function log(message) {
    console.log(`[Kavya] ${message}`);
}
exports.log = log;
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
// 
// KAVITA API STATE METHODS
//
const DEFAULT_KAVITA_SERVER_ADDRESS = 'https://demo.kavitareader.com';
const DEFAULT_KAVITA_SERVER_API_URL = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api`;
const DEFAULT_KAVITA_SERVER_API_KEY = '';
const DEFAULT_SHOW_ON_DECK = true;
const DEFAULT_SHOW_RECENTLY_UPDATED = true;
const DEFAULT_SHOW_NEWLY_ADDED = true;
async function getKavitaAPIUrl(stateManager) {
    return await stateManager.retrieve('kavitaAPIUrl') ?? DEFAULT_KAVITA_SERVER_API_URL;
}
exports.getKavitaAPIUrl = getKavitaAPIUrl;
async function getAuthorizationString(stateManager) {
    const apiUri = await stateManager.retrieve('kavitaAPIUrl') ?? DEFAULT_KAVITA_SERVER_API_URL;
    const apiKey = await stateManager.keychain.retrieve('kavitaAPIKey') ?? DEFAULT_KAVITA_SERVER_API_KEY;
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
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? DEFAULT_SHOW_ON_DECK;
    const showRecentlyUpdated = await stateManager.retrieve('showRecentlyUpdated') ?? DEFAULT_SHOW_RECENTLY_UPDATED;
    const showNewlyAdded = await stateManager.retrieve('showNewlyAdded') ?? DEFAULT_SHOW_NEWLY_ADDED;
    return { showOnDeck, showRecentlyUpdated, showNewlyAdded };
}
exports.getOptions = getOptions;
async function retrieveStateData(stateManager) {
    const kavitaURL = await stateManager.retrieve('kavitaAddress') ?? DEFAULT_KAVITA_SERVER_ADDRESS;
    const kavitaAPIKey = await stateManager.keychain.retrieve('kavitaAPIKey') ?? DEFAULT_KAVITA_SERVER_API_KEY;
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? DEFAULT_SHOW_ON_DECK;
    const showRecentlyUpdated = await stateManager.retrieve('showRecentlyUpdated') ?? DEFAULT_SHOW_RECENTLY_UPDATED;
    const showNewlyAdded = await stateManager.retrieve('showNewlyAdded') ?? DEFAULT_SHOW_NEWLY_ADDED;
    return { kavitaURL, kavitaAPIKey, showOnDeck, showRecentlyUpdated, showNewlyAdded };
}
exports.retrieveStateData = retrieveStateData;
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
async function setStateData(stateManager, interceptor, data) {
    await setKavitaServer(stateManager, data['kavitaAddress'] ?? DEFAULT_KAVITA_SERVER_ADDRESS, data['kavitaAPIKey'] ?? DEFAULT_KAVITA_SERVER_API_KEY);
    await interceptor.updateAuthorization();
    await setOptions(stateManager, data['showOnDeck'] ?? DEFAULT_SHOW_ON_DECK, data['showRecentlyUpdated'] ?? DEFAULT_SHOW_RECENTLY_UPDATED, data['showNewlyAdded'] ?? DEFAULT_SHOW_NEWLY_ADDED);
}
exports.setStateData = setStateData;
async function setKavitaServer(stateManager, apiUri, apiKey) {
    await stateManager.store('kavitaAddress', apiUri);
    await stateManager.store('kavitaAPIUrl', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api'));
    await stateManager.keychain.store('kavitaAPIKey', apiKey);
}
async function setOptions(stateManager, showOnDeck, showRecentlyUpdated, showNewlyAdded) {
    await stateManager.store('showOnDeck', showOnDeck);
    await stateManager.store('showRecentlyUpdated', showRecentlyUpdated);
    await stateManager.store('showNewlyAdded', showNewlyAdded);
}

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kavya = exports.KavitaRequestInterceptor = exports.KavyaInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Settings_1 = require("./Settings");
const Common_1 = require("./Common");
exports.KavyaInfo = {
    version: '1.0.0',
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
class KavitaRequestInterceptor {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.authorization = '';
    }
    async isServerAvailable() {
        if (this.authorization === '') {
            this.updateAuthorization();
        }
        return this.authorization.startsWith('Bearer ');
    }
    async updateAuthorization() {
        this.authorization = await (0, Common_1.getAuthorizationString)(this.stateManager);
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
class Kavya extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.stateManager = createSourceStateManager({});
        this.interceptor = new KavitaRequestInterceptor(this.stateManager);
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 20000,
            interceptor: this.interceptor,
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
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const seriesRequest = createRequestObject({
            url: `${kavitaAPIUrl}/Series/${mangaId}`,
            method: 'GET',
        });
        const metadataRequest = createRequestObject({
            url: `${kavitaAPIUrl}/Series/metadata`,
            param: `?seriesId=${mangaId}`,
            method: 'GET',
        });
        const seriesResponse = await this.requestManager.schedule(seriesRequest, 1);
        const seriesResult = typeof seriesResponse.data === 'string' ? JSON.parse(seriesResponse.data) : seriesResponse.data;
        const metadataResponse = await this.requestManager.schedule(metadataRequest, 1);
        const metadataResult = typeof metadataResponse.data === 'string' ? JSON.parse(metadataResponse.data) : metadataResponse.data;
        return createManga({
            id: mangaId,
            titles: [seriesResult.name],
            image: `${kavitaAPIUrl}/image/series-cover?seriesId=${mangaId}`,
            rating: seriesResult.userRating,
            status: paperback_extensions_common_1.MangaStatus.UNKNOWN,
            covers: [`${kavitaAPIUrl}/image/series-cover?seriesId=${mangaId}`],
            desc: metadataResult.summary,
            lastUpdate: seriesResult.lastChapterAdded
        });
    }
    async getChapters(mangaId) {
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const request = createRequestObject({
            url: `${kavitaAPIUrl}/Series/volumes`,
            param: `?seriesId=${mangaId}`,
            method: 'GET',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const chapters = [];
        for (const volume of result) {
            for (const chapter of volume.chapters) {
                chapters.push(createChapter({
                    id: `${chapter.id}`,
                    mangaId: mangaId,
                    chapNum: volume.number,
                    name: volume.name,
                    //volume: chapter.volumeId,
                    // @ts-ignore
                    sortingIndex: volume.number,
                }));
            }
        }
        return chapters;
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
        for (let i = 0; i <= result.pages; i++) {
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
        // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
        if (!(await this.interceptor.isServerAvailable())) {
            (0, Common_1.log)('searchRequest failed because server settings are invalid');
            return createPagedResults({
                results: (0, Common_1.getServerUnavailableMangaTiles)(),
            });
        }
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const ids = [];
        let tiles = [];
        const titleRequest = createRequestObject({
            url: `${kavitaAPIUrl}/Search/search`,
            param: `?queryString=${encodeURIComponent(searchQuery.title ?? '""')}`,
            method: 'GET'
        });
        // We don't want to throw if the server is unavailable
        const titleResponse = await this.requestManager.schedule(titleRequest, 1);
        const titleResult = JSON.parse(titleResponse.data);
        for (const manga of titleResult.series) {
            ids.push(manga.seriesId);
            tiles.push(createMangaTile({
                id: `${manga.seriesId}`,
                title: createIconText({ text: manga.name }),
                image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.seriesId}`
            }));
        }
        if (typeof searchQuery.includedTags !== 'undefined') {
            tiles = [];
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            let body = { genres: [], tags: [] };
            searchQuery.includedTags.forEach(async (tag) => {
                switch (tag.id.split('-')[0]) {
                    case 'genres':
                        body.genres.push(parseInt(tag.id.split('-')[1] ?? '0'));
                        break;
                    case 'tags':
                        body.tags.push(parseInt(tag.id.split('-')[1] ?? '0'));
                        break;
                    default:
                }
            });
            const tagRequst = createRequestObject({
                url: `${kavitaAPIUrl}/Series/all`,
                data: JSON.stringify(body),
                method: 'POST'
            });
            const tagResponse = await this.requestManager.schedule(tagRequst, 1);
            const tagResult = JSON.parse(tagResponse.data);
            for (const manga of tagResult) {
                if (ids.includes(manga.id)) {
                    tiles.push(createMangaTile({
                        id: `${manga.id}`,
                        title: createIconText({ text: manga.name }),
                        image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.id}`,
                    }));
                }
            }
        }
        return createPagedResults({
            results: tiles
        });
    }
    async getSearchTags() {
        // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
        if (!(await this.interceptor.isServerAvailable())) {
            (0, Common_1.log)('getSearchTags failed because server settings are invalid');
            return [];
        }
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
        const tags = ['genres', 'tags'];
        const tagSections = [];
        for (const [i, tag] of tags.entries()) {
            const request = createRequestObject({
                url: `${kavitaAPIUrl}/Metadata/${tag}`,
                method: 'GET',
            });
            const response = await this.requestManager.schedule(request, 1);
            const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
            tagSections.push(createTagSection({
                id: `${i}`,
                label: tag,
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                tags: result.map((item) => createTag({ id: `${tag}-${item.id}`, label: item.title }))
            }));
        }
        return tagSections;
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
        const { showOnDeck, showRecentlyUpdated, showNewlyAdded } = await (0, Common_1.getOptions)(this.stateManager);
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
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        for (const library of result) {
            sections.push(createHomeSection({
                id: `${library.id}`,
                title: library.name,
                view_more: true,
            }));
        }
        const promises = [];
        for (const section of sections) {
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
                let result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                const tiles = [];
                for (const series of result) {
                    tiles.push(createMangaTile({
                        id: `${series[id]}`,
                        title: createIconText({ text: series[title] }),
                        image: `${kavitaAPIUrl}/image/series-cover?seriesId=${series[id]}`
                    }));
                }
                if (tiles.length > 0) {
                    section.items = tiles;
                }
            }));
        }
        // Make sure the function completes
        await Promise.all(promises);
        for (const section of sections) {
            if (typeof section.items !== 'undefined' && section.items.length > 0) {
                sectionCallback(section);
            }
        }
    }
    async getViewMoreItems(homepageSectionId, 
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    metadata) {
        const kavitaAPIUrl = await (0, Common_1.getKavitaAPIUrl)(this.stateManager);
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
            method: 'POST',
        });
        const response = await this.requestManager.schedule(request, 1);
        const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const tiles = [];
        for (const series of result) {
            tiles.push(createMangaTile({
                id: `${series[id]}`,
                title: createIconText({ text: series[title] }),
                image: `${kavitaAPIUrl}/image/series-cover?seriesId=${series[id]}`
            }));
        }
        return createPagedResults({
            results: tiles
        });
    }
}
exports.Kavya = Kavya;

},{"./Common":48,"./Settings":50,"paperback-extensions-common":4}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSettingsMenu = void 0;
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
            onSubmit: async (values) => (0, Common_1.setStateData)(stateManager, interceptor, values),
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
                    rows: async () => (0, Common_1.retrieveStateData)(stateManager).then((values) => [
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
                    ]),
                }),
                createSection({
                    id: "sourceOptions",
                    header: "Source Options",
                    footer: "",
                    rows: async () => (0, Common_1.retrieveStateData)(stateManager).then((values) => [
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
                        })
                    ]),
                }),
            ],
        }),
    });
};
exports.serverSettingsMenu = serverSettingsMenu;

},{"./Common":48}]},{},[49])(49)
});
