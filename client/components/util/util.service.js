"use strict";

(function () {

    angular.module('proftestApp.util')
        .factory('Util', ['$window', UtilService]);

	let regexParamsMain = /(.+?)(\[(.+?)\])/;
	let regexParamsFields = /\[(.+?)\]/;

    /**
     * The Util service is for thin, globally reusable, utility functions
     */
    function UtilService($window) {

        return {
            /**
             * Return a callback or noop function
             *
             * @param  {Function|*} cb - a 'potential' function
             * @return {Function}
             */
            safeCb(cb) {
                return (angular.isFunction(cb)) ? cb : angular.noop;
            },

            /**
             * Parse a given url with the use of an anchor element
             *
             * @param  {String} url - the url to parse
             * @return {Object}     - the parsed url, anchor element
             */
            urlParse(url) {
                var a = document.createElement('a');
                a.href = url;

                // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
                if (a.host === '') {
                    a.href = a.href;
                }

                return a;
            },

            /**
             * Test whether or not a given url is same origin
             *
             * @param  {String}           url       - url to test
             * @param  {String|String[]}  [origins] - additional origins to test against
             * @return {Boolean}                    - true if url is same origin
             */
            isSameOrigin(url, origins) {
                url = this.urlParse(url);
                origins = (origins && [].concat(origins)) || [];
                origins = origins.map(this.urlParse);
                origins.push($window.location);
                origins = origins.filter(function (o) {
                    return url.hostname === o.hostname &&
                        url.port === o.port &&
                        url.protocol === o.protocol;
                });
                return (origins.length >= 1);
            },


			parseRouteParams(params) {
				var res = {};
				for (let key in params) {
					let regRes1 = regexParamsMain.exec(key);
					if (regRes1) {
						let str = regRes1[0], objStr = regRes1[1], fieldStr = regRes1[3];
						res[objStr] = res[objStr] || {};
						res[objStr][fieldStr] = res[objStr][fieldStr] || {};
						let replaced = key.replace(str, '');
						if (replaced.length) {
							let obj = res[objStr][fieldStr];
							do {
								var regRes2 = regexParamsFields.exec(replaced);
								var field2Str = regRes2[1];
								obj[field2Str] = obj[field2Str] || {};
								replaced = replaced.replace(regRes2[0], '');
								if (replaced.length) obj = obj[field2Str];
							} while (replaced.length);
							obj[field2Str] = params[key];
						}
						else res[objStr][fieldStr] = params[str];
					}
					else res[key] = params[key];
				}
				return res;
			}
        };

    }

})();
