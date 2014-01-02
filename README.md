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

As long as you chain with the fooPromiscuous methods you'll maintain your decorators:

```Javascript
var getVeggies = function(){
    return $.Deferred.promiscuous($.get("huge_vegetables")).
        thenPromiscuous(function(veggies){
            return digest(veggies);
        }).
        donePromiscuous(function(usedToBeVeggies){
            $("body").append(digestedVeggies);
        });
};

var request = getVeggies().alwaysPromiscuous(stopSpinner).failPromiscuous(terribleError);

if (noLikeVeggies)
    request.abort();
```

Is this code a good idea?  I don't know yet.  It's experimental.

What Methods You Got?
---------------------

We got:

* alwaysPromiscuous
* donePromiscuous
* failPromiscuous
* pipePromiscuous
* rejectPromiscuous
* rejectWithPromiscuous
* resolvePromiscuous
* resolveWithPromiscuous
* thenPromiscuous

I'm Tired of Typing Promiscuous
-------------------------------

Me too!  Do you have a better name?  TELL ME.
