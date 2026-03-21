// 1. Install the PostHog SDK
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

// 2. Initialize with your project token
posthog.init('{{{ POSTHOG_API_KEY }}}', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-01-30',
    session_recording: {
        captureCanvas: true,        // Enable WebGL recording
        canvasFps: 1,               // Minimal 1 FPS snapshot rate
        maskAllInputs: false,       // Allows observing UI interaction
        maskTextSelector: null      // Add this to ensure the canvas isn't considered a private element
    },
    autocapture: true,              // Automatically logs clicks/inputs on the canvas
    capture_pageview: true
});

// Create a globally accessible function
window.syncUnityCanvas = function(progress) {
    if (progress == null || progress < 1)
    {
        return;
    }
    console.log("PostHog: Waiting for Unity to stabilize...");
    setTimeout(() => {
        // Capturing a custom event forces PostHog to re-scan the DOM for the canvas
        posthog.capture('$canvas_sync', { status: 'stabilized' });
        console.log("PostHog: Canvas re-sync complete.");
    }, 2500); // Slightly longer than 2s to be safe
};
