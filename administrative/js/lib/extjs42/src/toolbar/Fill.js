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
 * A non-rendering placeholder item which instructs the Toolbar's Layout to begin using
 * the right-justified button container.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *          title: 'Toolbar Fill Example',
 *          width: 300,
 *          height: 200,
 *          tbar : [
 *              'Item 1',
 *              { xtype: 'tbfill' },
 *              'Item 2'
 *          ],
 *          renderTo: Ext.getBody()
 *      });
 */
Ext.define('Ext.toolbar.Fill', {
    extend: 'Ext.Component',
    alias: 'widget.tbfill',
    alternateClassName: 'Ext.Toolbar.Fill',
    /**
     * @property {Boolean} isFill
     * `true` in this class to identify an object as an instantiated Fill, or subclass thereof.
     */
    isFill : true,
    flex: 1
});