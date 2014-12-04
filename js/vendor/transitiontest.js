/*!
 * Test for CSS3 Transitions
 * http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
 */

function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }

    return false;
}

function getPrefixed(prop){
    var i, s = document.createElement('p').style, v = ['ms','O','Moz','Webkit'];
    if( s[prop] == '' ) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for( i = v.length; i--; )
        if( s[v[i] + prop] == '' )
            return (v[i] + prop);
}