let timerId: number | undefined = undefined;
let interval: number | undefined = 100;

self.onmessage = function(evt)
{
    if (evt.data == "start")
    {
        console.log("starting");
        timerId = setInterval( function() { postMessage("tick"); }, interval );
    }
    else if (evt.data.interval)
    {
        console.log("setting interval");

        interval = evt.data.interval;
        console.log(`interval = ${interval}`);

        if (timerId)
        {
            clearInterval(timerId);
            timerId = setInterval( function() { postMessage("tick"); }, interval );
        }
    }
    else if (evt.data == "stop")
    {
        console.log("stopping");

        clearInterval(timerId);
        timerId = undefined;
    }
}

postMessage("hi there");