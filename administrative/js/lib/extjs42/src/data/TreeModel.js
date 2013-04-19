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
 * This class can be used as a base class from which to derived Models used in Trees.
 */
Ext.define('Ext.data.TreeModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.NodeInterface'
    ]
},
function () {
    Ext.data.NodeInterface.decorate(this);
});