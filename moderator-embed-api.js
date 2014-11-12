// Copyright 2010 Google Inc.  All Rights Reserved.

/**
 * @fileoverview Basic embedding API for Google Moderator
 */

(function() {

  /**
   * Finds a parameter value in a url.
   * @param {string} param The parameter name to find.
   * @param {string} url The URL to search in.
   * @return {string} The value of the parameter in the url, or null.
   */
  function getUrlParam(param, url) {
    var regex = new RegExp("[\\?&/]" + param + "=([^&#]*)");
    var results = regex.exec(url);
    if (results != null) {
      return results[1];
    }
  }

  /**
  * Checks if a value is valid hex.
  * @param {string} param The value to check
  * @return {string} The value if it is valid, or null.
  */
  function hexOnly(param) {
    var filter = /^[a-fA-F0-9]+$/;
    if (filter.test(param)) {
      return param;
    } else {
      return null;
    }
  }

  /**
   * Counter for the number of currently existing callback functions.
   */
  var callbackCounter = 0;

  /**
   * Class to handle one embedding of Moderator.
   * @param {string} url The URL of the series / topic / question to embed
   * @constructor
   */
  function Moderator(url) {
    if (url.indexOf('spreadsheets.google.com/feeds/cells') > 0 &&
            (url.indexOf('http://') == 0 || url.indexOf('https://') == 0)) {
      this.embedSpreadsheet(url);
    } else {
      this.initUrl(url);
    }
  }

  /**
   * URL for Google Moderator, with a trailing slash.
   * @type {string}
   */
  Moderator.prototype.baseUrl;

  /**
   * DOM ID to embed in.
   * @type {string}
   */
  Moderator.prototype.embedTarget = null;

  /**
   * If the Moderator URL has been properly parsed and we're ready to embed.
   * This will remain false until we receive the JSONP callback when the
   * spreadsheet embedding method is used.
   * @type {boolean}
   */
  Moderator.prototype.readyToEmbed = false;

  /**
   * URL of the page Moderator is being embedded on.
   * @type {string}
   */
  Moderator.prototype.currentUrl;

  /**
   * Keys for the series, topic, and submission to embed, or null.
   * @type {string}
   */
  Moderator.prototype.seriesKey = null;
  Moderator.prototype.topicKey = null;
  Moderator.prototype.submissionKey = null;

  /**
   * Sorting method, either POPULAR, DATE, or HOT
   * @type {string}
   */
  Moderator.prototype.sort = "POPULAR";

  /**
   * UI type to display, either MAIN or COMPACT (youtube)
   * @type {string}
   */
  Moderator.prototype.ui = "MAIN";

  /*
   * Width and height of the IFRAME we are embedding.
   * @type {int}
   */
  Moderator.prototype.width = 800;
  Moderator.prototype.height = 800;

  /**
   * Language to use in the embedded version.
   * @type {string}
   */
  Moderator.prototype.hl = "en";

  /**
   * Parses a Moderator URL and sets up the emebd.
   */
  Moderator.prototype.initUrl = function(url) {
    if (url != null && url.indexOf('google.com/moderator') > 0) {
      this.seriesKey = getUrlParam('e', url);
      this.topicKey = getUrlParam('t', url);
      this.submissionKey = getUrlParam('q', url);
      if (lang = getUrlParam('hl', url)) {
        this.hl = lang;
      }
      this.readyToEmbed = true;
    }

    // Get params from the current URL to support sharing URLs
    // to specific series, topics, and questions inside embedded
    // instances.
    if (series = hexOnly(getUrlParam('modSeries', window.location.href))) {
      this.seriesKey = series;
      if (topic = hexOnly(getUrlParam('modTopic', window.location.href))) {
        this.topicKey = this.seriesKey + "." + topic;
      } else {
        this.topicKey = null;
      }
      if (submission = hexOnly(getUrlParam('modSubmission', window.location.href))) {
        this.submissionKey = this.seriesKey + "." + submission;
      } else {
        this.submissionKey = null;
      }
    }
  }

  /**
   * Return the proper URL component for the sort.
   * @return {string} What to add to the end of the URL.
   */
  Moderator.prototype.getSort = function() {
    if (this.sort == "POPULAR") {
      return "";
    } else if (this.sort == "HOT") {
      return "&v=23";
    } else if (this.sort == "DATE") {
      return "&v=24";
    }
  }

  /**
   * Generates the URL fragment containing series, topic, and question info.
   * @return {string} URL fragment to go after embed and hl params.
   */
  Moderator.prototype.genUrl = function() {
    var url;
    if (this.seriesKey != null && this.topicKey == null) {
      url = ["#16/e=", escape(this.seriesKey)].join("");
    } else if (this.seriesKey != null && this.topicKey != null && this.submissionKey == null) {
      url = ["#15/e=", escape(this.seriesKey),
             "&t=", escape(this.topicKey)].join("");
    } else if (this.seriesKey != null && this.topicKey != null && this.submissionKey != null) {
      url = ["#15/e=", escape(this.seriesKey),
             "&t=", escape(this.topicKey),
             "&q=", escape(this.submissionKey)].join("");
    }
    return url;
  }

  /**
   * Returns the URL to embed.
   */
  Moderator.prototype.getUrl = function() {
    this.baseUrl = "//www.google.com/moderator/";
    if (this.ui == "COMPACT") {
      this.baseUrl += "g/yt/";
    }

    this.currentUrl = window.location.href;
    return [this.baseUrl,
            "?hl=", escape(this.hl),
            "&embed=", escape(this.currentUrl),
            "&using=embed-api",
            this.genUrl(),
            this.getSort()].join("");
  }

  /**
   * Sets the embed target and executes the embed if ready.
   * @param {string} id The ID of the element to insert Moderator into.
   */
  Moderator.prototype.embed = function(el) {
    this.embedTarget = el;
    this.maybeEmbed();
  }

  /**
   * If the embed has been properly initialized, performs the embed.
   */
  Moderator.prototype.maybeEmbed = function() {
    if (this.embedTarget != null && this.readyToEmbed) {
      var url = this.getUrl();
      var iframe = ["<iframe src='", url,
                    "' height='", parseInt(this.height, 10),
                    "' width='", parseInt(this.width, 10),
                    "' frameborder=0 ",
                    "allowtransparency='true' ",
                    "scrolling='auto'></iframe>"].join("");
      this.embedTarget.innerHTML = iframe;
    }
  }

  /**
   * Handles embedding the series URL found in cell A1 of a Google Spreadsheet.
   *
   * This uses JSONP to request the contents of cell A1 from the spreadsheet,
   * and creates and registers a callback function with the window to continue
   * the embedding process once the contents are returned.  The call to initUrl()
   * parses the Moderator URL hopefully found in A1 as if it was initially passed
   * to the constructor of this Moderator object.
   *
   * It also sets the readyToEmbed parameter so that client calls to this.embed()
   * will function.  If this.embed() has already been called before the callback
   * has returned, embed() stores the target DOM ID.  Then, the call to maybeEmbed()
   * in the callback will find the stored ID and perform the embed.
   *
   * Finally, the callback removes itself from the definition, as it should never
   * be called more than once.
   */
  Moderator.prototype.embedSpreadsheet = function(url) {
    var callbackName = 'MODERATOR_callback_' + callbackCounter;
    var mod = this;
    callbackCounter++;

    window[callbackName] = function(json) {
      mod.initUrl(json.feed.entry[0].content.$t);
      mod.maybeEmbed();
      window[callbackName] = null;
    };

    var script = document.createElement('script');
    var scriptSrc = url + "?range=A1&alt=json-in-script&callback=" + callbackName;
    script.setAttribute('src', scriptSrc);
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script);
  }

  /**
   * Convenience function to embed Moderator from a URL with no special settings.
   * @param {string} url The URL of the Moderator series, topic, or question
   * @param {*} el An element to embed onto
   */
  function embedModerator(url, el, width) {
    var mod = new Moderator(url);
    mod.width = width;
    mod.embed(el);
  }

  // Export the MODERATOR_embed method
  window['MODERATOR_embed'] = embedModerator;
  window['MODERATOR'] = Moderator;
})();
