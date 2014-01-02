// Promiscuous Deferreds
//
// Copyright (c) 2014 Dan Connor

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
(function(jQuery){
    var newMethodName,
        // these are the Deferred methods we'll be extending to have
        // promiscuous counterparts
        methodsToExtend = [
            "always",
            "done",
            "fail",
            "pipe",
            "reject",
            "rejectWith",
            "resolve",
            "resolveWith",
            "then"
        ],
        extractMethods = function(promise){
            var methods = {};
            jQuery.each(promise, function(propName, property){
                // extract the property if it's a method and if it
                // isn't one of our extended methods
                if (jQuery.isFunction(property) && methodsToExtend.indexOf(propName) === -1)
                    methods[propName] = property;
            });

            return methods;
        };

    jQuery.Deferred.promiscuous = function(promise){
        jQuery.each(methodsToExtend, function(i, methodName){
            // postfix our counterpart methods with "Promiscuous"
            newMethodName = [methodName, "Promiscuous"].join("");

            promise[newMethodName] = promise[newMethodName] || function(/* ... */){
                // let's get the decorator methods
                var methods    = extractMethods(this);

                // run our method as usual
                var newPromise = this[methodName].apply(this, arguments);

                // merge on the decorators
                jQuery.extend(newPromise, methods);

                // make the new promise also promiscuous because
                // that's how promiscuous things roll
                return jQuery.Deferred.promiscuous(newPromise);
            };
        });

        return promise;
    };
})(jQuery);
