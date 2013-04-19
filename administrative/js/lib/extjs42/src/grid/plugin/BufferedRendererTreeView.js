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
 * @private
 * A set of overrides required by the presence of the BufferedRenderer plugin.
 * 
 * These overrides of Ext.tree.View take into account the affect of a buffered renderer and
 * divert execution from the default course where necessary.
 */
Ext.define('Ext.grid.plugin.BufferedRendererTreeView', {
    override: 'Ext.tree.View',

    onRemove: function(store, records, indices) {

        // Using buffered rendering - removal (eg folder node collapse)
        // Has to refresh the view
        if (this.bufferedRenderer) {
            this.onDataRefresh();
        }
        // No BufferedRenderer preent
        else {
            this.callParent([store, records, indices]);
        }
    }    
});
