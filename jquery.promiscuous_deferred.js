(function(jQuery){
    var newMethodName;
    var methodsToExtend = [
        "always",
        "done",
        "fail",
        "pipe",
        "reject",
        "rejectWith",
        "resolve",
        "resolveWith",
        "then"
    ];

    var extractMethods = function(promise){
        var methods = {};
        jQuery.each(promise, function(propName, property){
            if (jQuery.isFunction(property) && methodsToExtend.indexOf(propName) === -1)
                methods[propName] = property;
        });

        return methods;
    };

    jQuery.Deferred.promiscuous = function(promise){
        jQuery.each(methodsToExtend, function(i, methodName){
            newMethodName = [methodName, "Promiscuous"].join("");
            promise[newMethodName] = promise[newMethodName] || function(/* ... */){
                var methods    = extractMethods(this);
                var newPromise = this[methodName].apply(this, arguments);

                jQuery.extend(newPromise, methods);
                return jQuery.Deferred.promiscuous(newPromise);
            };
        });

        return promise;
    };
})(jQuery);
