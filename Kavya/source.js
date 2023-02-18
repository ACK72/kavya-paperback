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
exports.setStateData = exports.retrieveStateData = exports.getOptions = exports.getKavitaOPDS = exports.getKavitaAPI = exports.getServerUnavailableMangaTiles = void 0;
function getServerUnavailableMangaTiles() {
    // This tile is used as a placeholder when the server is unavailable
    return [
        createMangaTile({
            id: "placeholder-id",
            title: createIconText({ text: "Server" }),
            image: "",
            subtitleText: createIconText({ text: "unavailable" }),
        }),
    ];
}
exports.getServerUnavailableMangaTiles = getServerUnavailableMangaTiles;
// 
// KAVITA API STATE METHODS
//
const DEFAULT_KAVITA_SERVER_ADDRESS = 'https://demo.kavitareader.com';
const DEFAULT_KAVITA_SERVER_API_KEY = '';
const DEFAULT_KAVITA_API = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api`;
const DEFAULT_KAVITA_OPDS = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api/opds/${DEFAULT_KAVITA_SERVER_API_KEY}`;
const DEFAULT_SHOW_ON_DECK = true;
const DEFAULT_SHOW_RECENTLY_ADDED = true;
async function getKavitaAPI(stateManager) {
    return await stateManager.retrieve('kavitaAPI') ?? DEFAULT_KAVITA_API;
}
exports.getKavitaAPI = getKavitaAPI;
async function getKavitaOPDS(stateManager) {
    return await stateManager.retrieve('kavitaOPDS') ?? DEFAULT_KAVITA_OPDS;
}
exports.getKavitaOPDS = getKavitaOPDS;
async function getOptions(stateManager) {
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? DEFAULT_SHOW_ON_DECK;
    const showRecentlyAdded = await stateManager.retrieve('showRecentlyAdded') ?? DEFAULT_SHOW_RECENTLY_ADDED;
    return { showOnDeck, showRecentlyAdded };
}
exports.getOptions = getOptions;
async function retrieveStateData(stateManager) {
    const serverURL = await stateManager.retrieve('serverAddress') ?? DEFAULT_KAVITA_SERVER_ADDRESS;
    const serverAPIKey = await stateManager.retrieve('serverAPIKey') ?? DEFAULT_KAVITA_SERVER_API_KEY;
    const showOnDeck = await stateManager.retrieve('showOnDeck') ?? DEFAULT_SHOW_ON_DECK;
    const showRecentlyAdded = await stateManager.retrieve('showRecentlyAdded') ?? DEFAULT_SHOW_RECENTLY_ADDED;
    return { serverURL, serverAPIKey, showOnDeck, showRecentlyAdded };
}
exports.retrieveStateData = retrieveStateData;
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
async function setStateData(stateManager, data) {
    await setKavitaServer(stateManager, data['serverAddress'] ?? DEFAULT_KAVITA_SERVER_ADDRESS, data['serverAPIKey'] ?? DEFAULT_KAVITA_SERVER_API_KEY);
    await setOptions(stateManager, data['showOnDeck'] ?? DEFAULT_SHOW_ON_DECK, data['showRecentlyAdded'] ?? DEFAULT_SHOW_RECENTLY_ADDED);
}
exports.setStateData = setStateData;
async function setKavitaServer(stateManager, apiUri, apiKey) {
    await stateManager.keychain.store('serverAPIKey', apiKey);
    await stateManager.store('serverAddress', apiUri);
    await stateManager.store('kavitaAPI', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api'));
    await stateManager.store('kavitaOPDS', apiUri + (apiUri.slice(-1) === '/' ? 'api/opds/' : '/api/opds/') + apiKey);
}
async function setOptions(stateManager, showOnDeck, showRecentlyAdded) {
    await stateManager.store('showOnDeck', showOnDeck);
    await stateManager.store('showRecentlyAdded', showRecentlyAdded);
}

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kavya = exports.KavyaInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Settings_1 = require("./Settings");
const Common_1 = require("./Common");
exports.KavyaInfo = {
    version: "0.1.0",
    name: "Kavya",
    icon: "icon.png",
    author: "ACK72",
    authorWebsite: "https://github.com/ACK72",
    description: "Kavita client extension for Paperback",
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: "https://www.kavitareader.com/",
    sourceTags: [
        {
            text: "Kavita",
            type: paperback_extensions_common_1.TagType.GREEN,
        },
    ],
};
class Kavya extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.stateManager = createSourceStateManager({});
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 20000
        });
    }
    async getSourceMenu() {
        return createSection({
            id: "main",
            header: "Source Settings",
            rows: async () => [
                (0, Settings_1.serverSettingsMenu)(this.stateManager)
            ],
        });
    }
    async getMangaDetails(mangaId) {
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const kavitaOPDS = await (0, Common_1.getKavitaOPDS)(this.stateManager);
        const request = createRequestObject({
            url: `${kavitaOPDS}/series/${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data, { xmlMode: true });
        return createManga({
            id: mangaId,
            titles: [$("title").first().text()],
            image: `${kavitaAPI}/image/series-cover?seriesId=${mangaId}`,
            desc: "",
            status: paperback_extensions_common_1.MangaStatus.UNKNOWN,
        });
    }
    async getChapters(mangaId) {
        const kavitaOPDS = await (0, Common_1.getKavitaOPDS)(this.stateManager);
        const request = createRequestObject({
            url: `${kavitaOPDS}/series/${mangaId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data, { xmlMode: true });
        const chapters = [];
        $("entry").each((index, element) => {
            chapters.push(createChapter({
                id: $("id", element).first().text(),
                mangaId: mangaId,
                chapNum: parseFloat($("id", element).first().text()),
                name: `${$("title").first().text()} - ${$("title", element).first().text()}`,
                // @ts-ignore
                sortingIndex: index
            }));
        });
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const kavitaOPDS = await (0, Common_1.getKavitaOPDS)(this.stateManager);
        const request = createRequestObject({
            url: `${kavitaOPDS}/series/4/volume/${chapterId}/chapter/${chapterId}`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data, { xmlMode: true });
        const pages = [];
        const pool = {};
        $('[rel="http://vaemendis.net/opds-pse/stream"]').each((_, element) => {
            const url = $(element).attr("href") ?? "";
            const count = parseInt($(element).attr("p5:count") ?? "0");
            let start = pool[url] ?? 0;
            for (let i = 1; i <= count; i++) {
                pages.push(kavitaAPI + url.slice(4).replace('{pageNumber}', `${start + i}`));
            }
            pool[url] = start + count;
        });
        return createChapterDetails({
            id: chapterId,
            longStrip: false,
            mangaId: mangaId,
            pages: pages,
        });
    }
    async getSearchResults(searchQuery, 
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    metadata) {
        // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const kavitaOPDS = await (0, Common_1.getKavitaOPDS)(this.stateManager);
        if (kavitaOPDS === null) {
            console.log("searchRequest failed because server settings are unset");
            return createPagedResults({
                results: (0, Common_1.getServerUnavailableMangaTiles)(),
            });
        }
        const request = createRequestObject({
            url: `${kavitaOPDS}/series`,
            param: `?query=${encodeURIComponent(searchQuery.title ?? "''")}`,
            method: "GET"
        });
        // We don't want to throw if the server is unavailable
        let response;
        try {
            response = await this.requestManager.schedule(request, 1);
        }
        catch (error) {
            console.log(`searchRequest failed with error: ${error}`);
            return createPagedResults({
                results: (0, Common_1.getServerUnavailableMangaTiles)(),
            });
        }
        let $ = this.cheerio.load(response.data, { xmlMode: true });
        const tiles = [];
        $("entry").each((_, element) => {
            tiles.push(createMangaTile({
                id: $("id", element).first().text(),
                title: createIconText({ text: $("title", element).first().text() }),
                image: `${kavitaAPI}/image/series-cover?seriesId=${$("id", element).first().text()}`,
            }));
        });
        return createPagedResults({
            results: tiles
        });
    }
    async getHomePageSections(sectionCallback) {
        // This function is called on the homepage and should not throw if the server is unavailable
        // We won't use `await this.getKavitaAPI()` as we do not want to throw an error on
        // the homepage when server settings are not set
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const kavitaOPDS = await (0, Common_1.getKavitaOPDS)(this.stateManager);
        const { showOnDeck, showRecentlyAdded } = await (0, Common_1.getOptions)(this.stateManager);
        if (kavitaOPDS === null) {
            console.log("searchRequest failed because server settings are unset");
            const section = createHomeSection({
                id: "unset",
                title: "Go to source settings to set your Kavita server.",
                view_more: false,
                items: (0, Common_1.getServerUnavailableMangaTiles)(),
            });
            sectionCallback(section);
            return;
        }
        // The source define two homepage sections: new and latest
        const sections = [];
        if (showOnDeck) {
            sections.push(createHomeSection({
                id: 'ondeck',
                title: 'On Deck',
                view_more: false,
            }));
        }
        if (showRecentlyAdded) {
            sections.push(createHomeSection({
                id: 'new',
                title: 'Recently added series',
                view_more: true,
            }));
        }
        const request = createRequestObject({
            url: `${kavitaOPDS}/libraries`,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data, { xmlMode: true });
        $("entry").each((_, element) => {
            sections.push(createHomeSection({
                id: $("id", element).first().text(),
                title: $("title", element).first().text(),
                view_more: true,
            }));
        });
        const promises = [];
        for (const section of sections) {
            // Let the app load empty tagSections
            sectionCallback(section);
            let apiPath;
            switch (section.id) {
                case 'ondeck':
                    apiPath = `${kavitaOPDS}/on-deck`;
                    break;
                case 'new':
                    apiPath = `${kavitaOPDS}/recently-added`;
                    break;
                default:
                    apiPath = `${kavitaOPDS}/libraries/${section.id}`;
                    break;
            }
            const request = createRequestObject({
                url: apiPath,
                method: "GET",
            });
            // Get the section data
            promises.push(this.requestManager.schedule(request, 1).then((response) => {
                let $ = this.cheerio.load(response.data, { xmlMode: true });
                const tiles = [];
                $("entry").each((_, element) => {
                    tiles.push(createMangaTile({
                        id: $("id", element).first().text(),
                        title: createIconText({ text: $("title", element).first().text() }),
                        image: `${kavitaAPI}/image/series-cover?seriesId=${$("id", element).first().text()}`,
                    }));
                });
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
        const kavitaAPI = await (0, Common_1.getKavitaAPI)(this.stateManager);
        const kavitaOPDS = await (0, Common_1.getKavitaOPDS)(this.stateManager);
        let apiPath;
        switch (homepageSectionId) {
            case 'ondeck':
                apiPath = `${kavitaOPDS}/on-deck`;
                break;
            case 'new':
                apiPath = `${kavitaOPDS}/recently-added`;
                break;
            default:
                apiPath = `${kavitaOPDS}/libraries/${homepageSectionId}`;
                break;
        }
        const request = createRequestObject({
            url: apiPath,
            method: "GET",
        });
        const response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data, { xmlMode: true });
        const tiles = [];
        $("entry").each((_, element) => {
            tiles.push(createMangaTile({
                id: $("id", element).first().text(),
                title: createIconText({ text: $("title", element).first().text() }),
                image: `${kavitaAPI}/image/series-cover?seriesId=${$("id", element).first().text()}`,
            }));
        });
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
const serverSettingsMenu = (stateManager) => {
    return createNavigationButton({
        id: "server_settings",
        value: "",
        label: "Server Settings",
        form: createForm({
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            onSubmit: async (values) => (0, Common_1.setStateData)(stateManager, values),
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
                            id: "serverAddress",
                            label: "Server URL",
                            placeholder: "http://127.0.0.1:8080",
                            value: values.serverURL,
                            maskInput: false,
                        }),
                        // TS-Ignoring because this isnt documented yet
                        // Fallback to default input field if the app version doesnt support
                        // SecureInputField
                        // @ts-ignore
                        (typeof createSecureInputField === 'undefined' ? createInputField : createSecureInputField)({
                            id: "serverAPIKey",
                            label: "API Key",
                            placeholder: "Kavita API Key",
                            value: values.serverAPIKey
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
                            id: 'showRecentlyAdded',
                            label: 'Show Recently Added',
                            value: values.showRecentlyAdded,
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
