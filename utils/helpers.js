//////////////////////////////////////////////////////////////////////////

module.exports = {

    //////////////////////////////////////////////////////////////////////////////
    // Function to address URL shortening
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    }
}


