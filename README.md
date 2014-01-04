Promiscous jQuery Deferreds
---------------------------

Have you ever done this?

```Javascript
var deferred = $.get("small_balls.txt").then(function(ballsString){
    return ballsString.toUpperCase();
});

if (userChangedSomethingOhCrapStop)
    deferred.abort();

*** EXPLODE ***
```

... only to remember that jQuery doesn't copy the AJAX methods when you chain the AJAX deferred?

BLAH.

Well this stupid code lets you do this:

```Javascript
var deferred = $.Deferred.makePromiscuous($.get("small_balls.txt"), "abort").then(function(ballsString){
    return ballsString.toUpperCase();
});

if (userChangedSomethingOhCrapStop)
    deferred.abort();

*** oh, okay I'll stop that for you ***
```

Yay.  You specify the properties you want to retain throughout the chaining and the "promiscuous" Deferred copies those properties across each step.

This library basically wraps the jQuery Deferred methods and copies the properties from promise to promise along the way.

```Javascript
var getVeggies = function(){
    return $.Deferred.makePromiscuous($.get("huge_vegetables"), ["abort", "getAllResponseHeaders"]).
        then(function(veggies){
            return digest(veggies);
        }).
        done(function(usedToBeVeggies){
            $("body").append(digestedVeggies);
        });
};

var request = getVeggies().always(stopSpinner).fail(terribleError);

if (noLikeVeggies)
    request.abort();

> request.getAllResponseHeaders();
"X-Pingback: http://api.jquery.com/xmlrpc.php
Date: Thu, 02 Jan 2014 07:10:31 GMT
Content-Encoding: gzip
Server: nginx/1.4.4
X-Powered-By: PHP/5.3.27-1~dotdeb.0
Transfer-Encoding: chunked
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Link: <http://api.jquery.com/?p=311>; rel=shortlink
"
```

Is this code a good idea?  I don't know yet.  It's experimental.

What Methods Do You Patch?
---------------------

We got:

* always
* done
* fail
* pipe
* reject
* rejectWith
* resolve
* resolveWith
* then

And of course if you don't call $.Deferred.makePromiscuous on the promise it isn't affected at all.
