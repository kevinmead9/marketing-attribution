function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function addParameter(url, parameterName, parameterValue, atStart/*Add param before others*/){
    replaceDuplicates = true;
    if(url.indexOf('#') > 0){
        var cl = url.indexOf('#');
        urlhash = url.substring(url.indexOf('#'),url.length);
    } else {
        urlhash = '';
        cl = url.length;
    }
    sourceUrl = url.substring(0,cl);

    var urlParts = sourceUrl.split("?");
    var newQueryString = "";

    if (urlParts.length > 1)
    {
        var parameters = urlParts[1].split("&");
        for (var i=0; (i < parameters.length); i++)
        {
            var parameterParts = parameters[i].split("=");
            if (!(replaceDuplicates && parameterParts[0] == parameterName))
            {
                if (newQueryString == "")
                    newQueryString = "?";
                else
                    newQueryString += "&";
                newQueryString += parameterParts[0] + "=" + (parameterParts[1]?parameterParts[1]:'');
            }
        }
    }
    if (newQueryString == "")
        newQueryString = "?";

    if(atStart){
        newQueryString = '?'+ parameterName + "=" + parameterValue + (newQueryString.length>1?'&'+newQueryString.substring(1):'');
    } else {
        if (newQueryString !== "" && newQueryString != '?')
            newQueryString += "&";
        newQueryString += parameterName + "=" + (parameterValue?parameterValue:'');
    }
    return urlParts[0] + newQueryString + urlhash;
}
window.addEventListener("load", function(event) {
    var referrer = document.referrer;
    var channel = getParameterByName("channel");
    var param_channel = channel;
    var medium = getParameterByName("medium");
    var param_medium = medium;
    if (channel === undefined) {

        if (referrer.includes('google.com') || referrer.includes('medium=Google')) {
            click_id = getParameterByName('gclid');
            if (click_id !== '' && click_id !== null) {
                // ads
                channel = 'Paid';
                medium = 'Google - Ads';
            } else {
                // search
                channel = 'Organic';
                medium = 'Google - Search';
            }
        } else if (referrer.includes('instagram.com') || referrer.includes('medium=Instagram')) {
            if (referrer.includes('l.instagram.com')) {
                channel = 'Paid';
                medium = 'Instagram - Ads';
            } else {
                channel = 'Social';
                medium = 'Instagram - Feed';
            }
        } else if (referrer.includes('facebook.com') || referrer.includes('medium=Facebook')) {
            if (referrer.includes('l.facebook.com') || referrer.includes('lm.facebook.com') || referrer.includes('channel=Paid')) {
                medium = 'Facebook - Ads';
                channel = 'Paid';
            } else {
                channel = 'Social';
                medium = 'Facebook - Feed'
            }
        } else if (referrer.includes('youtube.com') || referrer.includes('medium=Youtube')) {
            click_id = getParameterByName('gclid');
            console.log(click_id);
            if (click_id !== '' && click_id !== null) {
                // ad
                medium = 'Youtube - Ads';
                channel = 'Paid';
            } else {
                // social
                channel = 'Social';
                medium = 'Youtube - Feed';
            }
        } else if (referrer.includes('tiktok.com') || referrer.includes('medium=TikTok')) {
            if (referrer.includes('tiktok.com')) {
                // ads
                channel = 'Paid';
                medium = 'TikTok - Ads';
            } else {
                // ads
                channel = 'Social';
                medium = 'TikTok - Feed';
            }
        } else if (referrer.includes('infusionsoft.com') || referrer.includes('channel=Biz Dev')) {
            channel = 'Biz Dev';
        }
    } else if (medium !== undefined) {
        if (referrer.includes('google.com') || referrer.includes('medium=Google')) {
            click_id = getParameterByName('gclid');
            if (click_id !== '' && click_id !== null) {
                // ads
                channel = 'Paid';
                medium = 'Google - Ads';
            } else {
                // search
                channel = 'Organic';
                medium = 'Google - Search';
            }
        } else if (referrer.includes('instagram.com') || referrer.includes('medium=Instagram')) {
            if (referrer.includes('l.instagram.com')) {
                channel = 'Paid';
                medium = 'Instagram - Ads';
            } else {
                channel = 'Social';
                medium = 'Instagram - Feed';
            }
        } else if (referrer.includes('facebook.com') || referrer.includes('medium=Facebook')) {
            if (referrer.includes('l.facebook.com') || referrer.includes('lm.facebook.com') || referrer.includes('channel=Paid')) {
                medium = 'Facebook - Ads';
                channel = 'Paid';
            } else {
                channel = 'Social';
                medium = 'Facebook - Feed'
            }
        } else if (referrer.includes('linkedin.com') || referrer.includes('medium=LinkedIn')) {
            click_id = getParameterByName('cid ');
            if (referrer.includes('linkedin.com') && click_id !== null) {
                // ads
                channel = 'Paid';
                medium = 'LinkedIn - Ads';
            } else {
                // ads
                channel = 'Social';
                medium = 'LinkedIn - Feed';
            }
        } else if (referrer.includes('youtube.com') || referrer.includes('medium=Youtube')) {
            click_id = getParameterByName('gclid');
            if (click_id !== '' && click_id !== null) {
                // ad
                medium = 'Youtube - Ads';
                channel = 'Paid';
            } else {
                // social
                channel = 'Social';
                medium = 'Youtube - Feed';
            }
        } else if (referrer.includes('tiktok.com') || referrer.includes('medium=TikTok')) {
            if (referrer.includes('tiktok.com')) {
                // ads
                channel = 'Paid';
                medium = 'TikTok - Ads';
            } else {
                // ads
                channel = 'Social';
                medium = 'TikTok - Feed';
            }
        } else if (referrer.includes('infusionsoft.com') || referrer.includes('channel=Biz Dev')) {
            channel = 'Biz Dev';
        }
    }
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        if (channel !== undefined && channel !== null) {
            if (medium !== undefined && medium !== null) {
                if(anchors[i].href.indexOf('?') !== -1){
                    anchors[i].href = addParameter(addParameter(anchors[i].href, "channel", channel), "medium", medium);
                } else{
                    anchors[i].href = addParameter(addParameter(anchors[i].href, "channel", channel), "medium", medium);
                }

            } else {
                if(anchors[i].href.indexOf('?') !== -1){
                    anchors[i].href = addParameter(anchors[i].href, "channel", channel);
                } else{
                    anchors[i].href = addParameter(anchors[i].href, "channel", channel);
                }

            }
        } else if (medium !== undefined && medium !== null) {
            if(anchors[i].href.indexOf('?') !== -1){
                anchors[i].href = addParameter(anchors[i].href, "medium", medium);
            } else{
                anchors[i].href = addParameter(anchors[i].href, "medium", medium);
            }

        }

    }


});
window.addEventListener("message", function(event) {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        var site = null; // pull the url
        var url = location.hostname;
        if ((!(url.includes('learn.self-publishingschool'))) && !(url.includes('lpages.com'))) {
            if (url.includes('self-publishingschool.com')) {
                site = 'SPS';
            } else if (url.includes('selfpublishing.com')) {
                site = 'SP';
            } else if (url.includes('thewritelife.com')) {
                site = 'TWL';
            } else if (url.includes('makealivingwriting.com')) {
                site = 'MALW';
            } else if (url.includes('thebookdesigner.com')) {
                site = 'TBD';
            } else if (url.includes('freelancewritersden.com')) {
                site = 'FWD'
            }
        }
        var referrer = document.referrer;
        var medium = getParameterByName("medium");
        var channel = getParameterByName("channel");

        if (referrer.includes('google.com') || referrer.includes('medium=Google')) {
            click_id = getParameterByName('gclid');
            if (click_id !== '' && click_id !== null) {
                // ads
                channel = 'Paid';
                medium = 'Google - Ads';
            } else {
                // search
                channel = 'Organic';
                medium = 'Google - Search';
            }
        } else if (referrer.includes('instagram.com') || referrer.includes('medium=Instagram')) {
            if (referrer.includes('l.instagram.com')) {
                channel = 'Paid';
                medium = 'Instagram - Ads';
            } else {
                channel = 'Social';
                medium = 'Instagram - Feed';
            }
        } else if (referrer.includes('facebook.com') || referrer.includes('medium=Facebook')) {
            if (referrer.includes('l.facebook.com') || referrer.includes('lm.facebook.com') || referrer.includes('channel=Paid')) {
                medium = 'Facebook - Ads';
                channel = 'Paid';
            } else {
                channel = 'Social';
                medium = 'Facebook - Feed'
            }
        } else if (referrer.includes('youtube.com') || referrer.includes('medium=Youtube')) {
            click_id = getParameterByName('gclid');
            if (click_id !== '' && click_id !== null) {
                // ad
                medium = 'Youtube - Ads';
                channel = 'Paid';
            } else {
                // social
                channel = 'Social';
                medium = 'Youtube - Feed';
            }
        } else if (referrer.includes('linkedin.com') || referrer.includes('medium=LinkedIn')) {
            click_id = getParameterByName('cid ');
            if (referrer.includes('linkedin.com') && click_id !== null) {
                // ads
                channel = 'Paid';
                medium = 'LinkedIn - Ads';
            } else {
                // ads
                channel = 'Social';
                medium = 'LinkedIn - Feed';
            }
        }
        else if (referrer.includes('tiktok.com') || referrer.includes('medium=TikTok')) {
            click_id = getParameterByName('ttclid ');
            if (referrer.includes('tiktok.com') && click_id !== null) {
                // ads
                channel = 'Paid';
                medium = 'TikTok - Ads';
            } else {
                // ads
                channel = 'Social';
                medium = 'TikTok - Feed';
            }
        } else if (referrer.includes('infusionsoft.com') || referrer.includes('channel=Biz Dev')) {
            channel = 'Biz Dev';
        } else {
            channel = getParameterByName("channel");
            medium = getParameterByName("medium");
            url = referrer;
            if (url.includes('self-publishingschool.com')) {
                site = 'SPS';
            } else if (url.includes('selfpublishing.com')) {
                site = 'SP';
            } else if (url.includes('thewritelife.com')) {
                site = 'TWL';
            } else if (url.includes('makealivingwriting.com')) {
                site = 'MALW';
            } else if (url.includes('thebookdesigner.com')) {
                site = 'TBD';
            } else if (url.includes('freelancewritersden.com')) {
                site = 'FWD'
            }
        }
        if (typeof site === 'undefined' || site === null) {
            site = getParameterByName("site");
        }

        var all_forms_on_page = document.getElementsByClassName("hs-form");
        for (var i = 0; i < all_forms_on_page.length; i++) {
            if(site !== undefined && site !== ''){
                all_forms_on_page[i].querySelector('input[name="last_touch___site"]').value = site;
                console.log("Site: " + site);
            } else{
                console.log("No site");
            }
            if(medium !== undefined && medium !== ''){
                all_forms_on_page[i].querySelector('input[name="last_touch_medium"]').value = medium;
                console.log("Medium: " + medium);
            } else{
                console.log("No Medium");
            }
            if(channel !== undefined && channel !== ''){
                all_forms_on_page[i].querySelector('input[name="last_touch_channel_new"]').value = channel;
                console.log("Channel: " + channel);
            } else{
                console.log("No channel");
            }

        }
    }
});
