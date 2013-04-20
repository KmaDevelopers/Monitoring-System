/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-04-10 13:07:48 (5666a13403de1690768122924485271bdcc83b7f)
*/
/*
 * This file is generated by Sencha Cmd and should NOT be edited. It will be replaced by
 * "sencha package upgrade".
 */
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
        // This is very important for getting transparency on corners.
        document.body.style.backgroundColor = 'transparent';
    });
}

// This variable is watched by the Slicer. Once it is set, the data is saved with the
// screenshot.
var slicerManifest;

function generateSlicerManifest () {
    var elements = document.body.querySelectorAll('.x-slicer-target');
    var widgets = [];
    var slicesRe = /^'x-slicer\:(.+)'$/;

    function getData (el) {
        var data = el.getAttribute('data-slicer');
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    function getSlices (slices, src) {
        var content = src && src.content;
        if (content) {
            var m = slicesRe.exec(content);
            if (m && m[1]) {
                slices.push(m[1]);
            }
        }
    }

    function forEach (it, fn) {
        for (var i = 0; i < it.length; ++i) {
            fn(it[i]);
        }
    }

    forEach(elements, function (el) {
        var view = el.ownerDocument.defaultView;
        var style = view.getComputedStyle(el, null);
        var bg = style['background-image'];
        var box = el.getBoundingClientRect();

        var entry = {
            box: {
                x: window.scrollX + box.left,
                y: window.scrollY + box.top,
                w: box.right - box.left,
                h: box.bottom - box.top
            },
            radius: {
                tl: parseInt(style['border-top-left-radius'], 10) || 0,
                tr: parseInt(style['border-top-right-radius'], 10) || 0,
                br: parseInt(style['border-bottom-right-radius'], 10) || 0,
                bl: parseInt(style['border-bottom-left-radius'], 10) || 0
            },
            border: {
                t: parseInt(style['border-top-width'], 10) || 0,
                r: parseInt(style['border-right-width'], 10) || 0,
                b: parseInt(style['border-bottom-width'], 10) || 0,
                l: parseInt(style['border-left-width'], 10) || 0
            }
        };

        if (el.id) {
            entry.id = el.id;
        }

        if (bg.indexOf('-gradient') !== -1) {
            if (bg.indexOf('50% 0') !== -1 || bg.indexOf('top') !== -1 ||
                                              bg.indexOf('bottom') !== -1) {
                entry.gradient = 'top';
            } else {
                entry.gradient = 'left';
            }
        }

        var slices = [];
        getSlices(slices, view.getComputedStyle(el, ':before'));
        getSlices(slices, view.getComputedStyle(el, ':after'));

        if (slices.length) {
            entry.slices = slices.join(', ').split(', ');
        }
        var extra = getData(el);
        if (extra) {
            entry.extra = extra;
        }

        widgets.push(entry);
    });

    slicerManifest = getData(document.body) || {};
    slicerManifest.widgets = widgets;
    if (!slicerManifest.format) {
        // legacy support sets format to "1.0"
        slicerManifest.format = '2.0';
    }
}