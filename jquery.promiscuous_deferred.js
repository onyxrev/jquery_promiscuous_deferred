// Promiscuous Deferreds
// https://github.com/onyxrev/jquery_promiscuous_deferred
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
        extractProperties = function(promise, propertiesToCopy){
            var methods = {}, property;

            jQuery.each(propertiesToCopy, function(i, propName){
                property = promise[propName];

                // extract the property if isn't one of our methods
                if (methodsToExtend.indexOf(propName) === -1)
                    methods[propName] = property;
            });

            return methods;
        };

    jQuery.Deferred.makePromiscuous = function(promise, propertiesToCopy){
        jQuery.each(methodsToExtend, function(i, methodName){
            var originalMethod = promise[methodName];

            promise[methodName] = function(/* ... */){
                // let's get the properties
                var copiedProperties = extractProperties(this, jQuery.makeArray(propertiesToCopy));

                // run our method as usual
                var newPromise = originalMethod.apply(this, arguments);

                // merge on the decorators
                jQuery.extend(newPromise, copiedProperties);

                // make the new promise also promiscuous because
                // that's how promiscuous things roll
                return jQuery.Deferred.makePromiscuous(newPromise);
            };
        });

        return promise;
    };
})(jQuery);
