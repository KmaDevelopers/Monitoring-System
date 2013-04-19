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
Ext.define('ExtThemeNeptune.Component', {
    override: 'Ext.Component',

    initComponent: function() {
        this.callParent();

        if (this.dock && this.border === undefined) {
            this.border = false;
        }
    },

    initStyles: function() {
        var me = this,
            border = me.border;

        if (me.dock) {
            // prevent the superclass method from setting the border style.  We want to
            // allow dock layout to decide which borders to suppress.
            me.border = null;
        }
        me.callParent(arguments);
        me.border = border;
    }
});