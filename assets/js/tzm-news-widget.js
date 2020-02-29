// If jQuery isn't already installed, then install it ( copied from https://stackoverflow.com/a/10371471/7299352 )
// Alternatively we could use https://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
if (typeof jQuery == 'undefined') {
    var oScriptElem = document.createElement("script");
    oScriptElem.type = "text/javascript";
    oScriptElem.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"; // or through Cloudflare https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
    document.head.insertBefore(oScriptElem, document.head.getElementsByTagName("script")[0])
}


// On dom.ready
var _tzm_news_widget = function () {

    let news = [];
    let loadedNews = false;
    let baseNewsUrl = 'https://news.tzm.community/';

    let config = {
        maxEntries: 10,// Max entries to show
        newsNotAvailableMessage: `<div class="tzm-news-error">Error: Unable to get any TZM News entries.<br /> Please visit <a href="${baseNewsUrl}" target="_blank">${baseNewsUrl}</a> directly</div>`,
        newsLoadingMessage: `<p class="tzm-news-info">Loading the <a href="${baseNewsUrl}" target="_blank">TZM News Entries</a> please wait.</p>`,
        location: '#tzm-news-widget', // Default location a div with an ID of tzm-news-widget
        showPagination: true,
        showPrePagination: true,
        showPostPagination: true,
        headerType: 'full', // Accepts: 'full', 'medium', 'short', 'none'
        dateType: 'medium', // Accepts: 'full', 'medium', 'short' (likely should be changed in line with the headerType)
    };

    const getTzmNews = function (force = false) {
        const messagesUrl = baseNewsUrl + 'messages.json'; // https://news.tzm.community/messages.json

        if (news.length > 0 && false === force) {
            console.log("Returning the existing news");
            return news;
        }

        console.log("TZM News is being fetched from : ", messagesUrl);
        $.get(messagesUrl, function (data) {
            news = data;
            console.log("TZM News returned: ", data);
            loadedNews = true;
            render();
        }).fail(function () {
            // No news, it failed to load
            loadedNews = true;
            news = [];
            render();
        });
    };
    const render = function (definedLocation) {
        if (definedLocation) {
            console.debug("Setting the location to ", definedLocation);
            config.location = definedLocation;
        }
        let $location = jQuery(config.location); // jQuerified
        if (!$location) {
            console.error(`Unable to find ${$location} to render the tzm news widget to`);
            return false;
        }

        if (news.length === 0 && loadedNews !== true) {
            // Get the news which will then call render
            getTzmNews(false);
            console.log("Getting the news entries");
            $location.html(newsReturnHtml(!loadedNews));
            return false;
        }

        // $location.html('<pre>' + JSON.stringify(news, null, 2) + '</pre>');
        $location.html(newsReturnHtml());
        console.log("rendered out the news ", news);
    };

    /**
     * News Return HTML
     *
     * This is where the HTML is worked out
     * @param loading boolean - If still loading then show a loading message instead of a not available message
     * @returns {string}
     */
    const newsReturnHtml = function (loading = false) {

        // Initial
        let html = '<div class="tzm-news-container">';
        if (!news || news.length === 0) {
            if (loading === true) {
                html += config.newsLoadingMessage + "</div>";

            } else {
                html += config.newsNotAvailableMessage + "</div>";
            }
            return html;
        }

        // ------------------------------------------------
        //   Pre Pagination
        // ------------------------------------------------
        if (config.showPagination && config.showPrePagination) {
            html += `<div class="tzm-news-pagination tzm-news-pagination-pre"><span class="tzm-news-entry-counter">Showing the most recent <strong class="tzm-news-entry-count">${config.maxEntries}</strong> of <strong class="tzm-news-entry-total">${news.length - 1}</strong> <a href="${baseNewsUrl}" target="_blank">TZM News entries</a></span></div>`;
        }
        html += `<div class="tzm-news-posts-container">`;

        // ------------------------------------------------
        //   News Posts
        // ------------------------------------------------
        let validEntries = 0;
        for (let index = news.length - 1; validEntries < config.maxEntries; index--) {
            let newsEntry = news[index];
            if (!isValidNewsEntry(newsEntry)) {
                console.warn("Ignoring news entry: ", index, newsEntry);
                continue; // Ignore this entry
            }
            validEntries++;
            let dateCreated = new Date(newsEntry.timestamp);

            let newsEntryHtml = `<div class='tzm-news-post tzm-news-post_${index + 1}'>\n`;

            switch (config.headerType) {
                case 'full':
                    newsEntryHtml += `<div class="tzm-news-header"><span class="tzm-news-item-number">Entry #${index + 1}</span> published <a href="${returnDirectNewsLink(newsEntry)}" class="tzm-news-day-news-link" target="_blank">${returnNiceDateOutput(dateCreated)}</a> by ${newsEntry.username}</div>`
                    break;
                case 'medium':
                    newsEntryHtml += `<div class="tzm-news-header"><span class="tzm-news-item-number">#${index + 1}</span> | <a href="${returnDirectNewsLink(newsEntry)}" class="tzm-news-day-news-link" target="_blank">${returnNiceDateOutput(dateCreated)}</a> | ${newsEntry.username}</div>`
                    break;
                case 'short':
                    newsEntryHtml += `<div class="tzm-news-header"><span class="tzm-news-item-number"><a href="${returnDirectNewsLink(newsEntry)}" class="tzm-news-day-news-link" target="_blank" title="Created ${returnNiceDateOutput(dateCreated)} by ${quoteAttr(newsEntry.username)}">#${index + 1}</a></span></div>`
                    break;
                case 'none':
                default:
                    // Don't output a header by defafult
                    break;

            }

            newsEntryHtml += `
            <div class="tzm-news-message"><p class="tzm-news-message-contents">${returnTextAsHtml(newsEntry.text)}</p></div>
            </div>`;

            html += newsEntryHtml;
        }

        // End the "tzm-news-posts-container"
        html += `</div>`;


        // ------------------------------------------------
        //   Ending Pagination
        // ------------------------------------------------
        if (config.showPagination && config.showPostPagination) {
            if (config.maxEntries < news.length - 1) {
                // Add show all button
                html += `<div class="tzm-news-pagination tzm-news-pagination-post"><span class="tzm-news-entry-counter">Showing the most recent <strong class="tzm-news-entry-count">${config.maxEntries}</strong> of <strong class="tzm-news-entry-total">${news.length - 1}</strong>  <a href="${baseNewsUrl}" target="_blank">TZM News entries</a></span>. You can <button class="tzm-news-show-all-entries-button" onclick="_tzm_news_widget.setConfig({maxEntries: ${news.length - 1}});_tzm_news_widget.render();">View ALL entries</button></div>`;
            } else {
                html += `<div class="tzm-news-pagination tzm-news-pagination-post"><span class="tzm-news-entry-counter">Showing all <strong class="tzm-news-entry-count">${config.maxEntries}</strong>  <a href="${baseNewsUrl}" target="_blank">TZM News entries</a></span></div>`;
            }
        }

        html += `</div>`;
        return html;

    };

    // e.g https://news.tzm.community/2019/11/07/news.html
    const returnDirectNewsLink = function (newsEntry) {
        let date = new Date(newsEntry.timestamp);
        return `${baseNewsUrl}${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}/news.html`;
    };

    /**
     * Return Nice Date Output
     *
     * Shows the date in a nice format
     *
     * Expects a JS Date object, otherwise uses the current time
     *
     * @param date
     * @param type string - Can be 'full', 'medium' or 'short'
     * @returns {string}
     *
     * type = "full" example:    Mon the 27th of October 2019
     * type = "medium" example:  27th October 2019
     * type = "short" example:   2019-10-27th
     *
     */
    const returnNiceDateOutput = function (date = null, type = null) {
            if (!date) {
                date = new Date();
            }
            if (!type) {
                type = config.dateType;
            }
            let days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'October', 'November', 'December'];

            let month = date.getMonth(); // FYI: JS Date returns 0-11 not 1-12 for the Month number
            let day = date.getDate(); // e.g 27 (27th of the month)
            let dayOfWeek = date.getDay();
            let year = date.getFullYear();

            if ('full' === type) {
                return `${days[dayOfWeek]} the ${day}${getDateCardinalSuffix(day)} of ${months[month]} ${year}`; // e.g Mon the 27th of October 2019
            } else if ('medium' === type) {
                // else type = 'medium'
                return `${day}${getDateCardinalSuffix(day)} ${months[month]} ${year}`; // e.g 27th October 2019
            } else {
                // e.g 'short' or 'machine-readable'
                return `${year}-${month + 1}-${day}${getDateCardinalSuffix(day)}`; // e.g 2019-10-27th
            }
        }
    ;

    /**
     * e.g 27 = 'th'
     * 1 = st
     * 11 = th (that's the annoying one, damn 11)
     * @param number
     */
    const getDateCardinalSuffix = function (number) {
        let numberAsString = String(number);
        let cardinalSuffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th']; // e.g 1st, 2nd, 3rd, 4th, 5th...
        let dayLastChar = Number(numberAsString.charAt(numberAsString.length - 1)); // e.g 7 (for the 27th of the month)

        if (number === 11) {
            // Damn you for being a special exception, can't you just be 'st'?? Bah
            return 'th';
        } else if (number === 13) {
            return 'th';
        }
        return cardinalSuffix[dayLastChar];
    };


    const isValidNewsEntry = function (newsEntry) {
        return !(!newsEntry || !newsEntry.text || !newsEntry.timestamp || !newsEntry.published || !newsEntry.username);

        /*
         -- News Entry usually contains --
         * "_id": "5bbb4b00830f18fbde55b5d8",
         "messageid": "477030110201905163",
         "text": "A new #scientific-articles channel is now created under Topics! You can use it so share and discuss relevant scientific literature.",
         "count": 3,
         "username": "Teemu K (fin)",
         "createdAt": "2018-8-9",
         "timestamp": 1533803241063,
         "published": true
         */
    };

    const returnTextAsHtml = function (newsText) {
        if (!newsText) {
            return newsText;
        }
        let newsHtml = returnUrlifiedHtml(newsText); // Convert URL's to actual A href links (open in new window)
        newsHtml = newsHtml.replace(/\n/g, "<br>\n"); // Convert the \n to <br />

        return newsHtml;
    };


    /**
     * Return URL'd text
     *
     * Converts what looks like links into actual HREF's
     * Based on https://stackoverflow.com/a/25821576/7299352
     * @param text
     * @returns {void | string}
     */
    const returnUrlifiedHtml = function (text) {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return text.replace(urlRegex, function (url, b, c) {
            var url2 = (c === 'www.') ? 'http://' + url : url;
            return '<a href="' + url2 + '" target="_blank">' + url + '</a>';
        })
    };

    /**
     * Quote Attribute String
     *
     * based on https://stackoverflow.com/a/9756789/7299352
     * @param s String
     * @param preserveCR
     * @returns {string}
     */
    const quoteAttr = function (s, preserveCR) {
        preserveCR = preserveCR ? '&#13;' : '\n';
        return ('' + s) /* Forces the conversion to string. */
            .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
            .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
            .replace(/[\r\n]/g, preserveCR);
    };

    const setConfig = function (userSetConfig) {
        config = Object.assign({}, config, userSetConfig);
    };

    return {
        render,
        setConfig
    };
}();

