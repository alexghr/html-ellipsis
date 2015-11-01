'use strict';

var test = require('tape');
var truncate = require('../html-ellipsis');

test('should properly handle astral code points', function(t) {
    t.plan(4);

    t.equals(truncate('💩', 1), '💩', 'astral code points should be kept whole');
    t.equals(truncate('💩unicode', 2), '💩u');
    t.equals(truncate('💩unicode', 2, true), '💩&hellip;');

    // the high surrogate of 💩
    t.equals(truncate('\uD83D', 1), '\uD83D');
});
