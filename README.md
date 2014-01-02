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
var deferred = $.Deferred.promiscuous($.get("small_balls.txt")).thenPromiscous(function(ballsString){
    return ballsString.toUpperCase();
});

if (userChangedSomethingOhCrapStop)
    deferred.abort();

*** oh, okay I'll stop that for you ***
```

Yay.

This library basically creates counterpart methods to the Deferred methods that copy all the methods from promise to promise except for the Deferred methods themselves.

Is this code a good idea?  I don't know yet.  It's experimental.
