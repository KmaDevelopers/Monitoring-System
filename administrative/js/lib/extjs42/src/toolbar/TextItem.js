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
/**
 * A simple class that renders text directly into a toolbar.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Panel with TextItem',
 *         width: 300,
 *         height: 200,
 *         tbar: [
 *             { xtype: 'tbtext', text: 'Sample Text Item' }
 *         ],
 *         renderTo: Ext.getBody()
 *     });
 *
 * @constructor
 * Creates a new TextItem
 * @param {Object} text A text string, or a config object containing a #text property
 */
Ext.define('Ext.toolbar.TextItem', {
    extend: 'Ext.toolbar.Item',
    requires: ['Ext.XTemplate'],
    alias: 'widget.tbtext',
    alternateClassName: 'Ext.Toolbar.TextItem',

    /**
     * @cfg {String} text
     * The text to be used as innerHTML (html tags are accepted).
     */
    text: '',

    renderTpl: '{text}',
    //
    baseCls: Ext.baseCSSPrefix + 'toolbar-text',

    beforeRender : function() {
        var me = this;

        me.callParent();

        Ext.apply(me.renderData, {
            text: me.text
        });
    },

    /**
     * Updates this item's text, setting the text to be used as innerHTML.
     * @param {String} text The text to display (html accepted).
     */
    setText : function(text) {
        var me = this;
        me.text = text;
        if (me.rendered) {
            me.el.update(text);
            me.updateLayout();
        }
    }
});