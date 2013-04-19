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
Ext.define('Ext.rtl.resizer.SplitterTracker', {
    override: 'Ext.resizer.SplitterTracker',

    getVertPrevConstrainLeft: function(o) {
        return (!this.splitter.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            ((o.prevCmp.maxWidth ? o.prevBox.right - o.prevCmp.maxWidth :
            o.nextBox.x + (o.nextCmp.minWidth || o.defaultMin)) - o.splitWidth) :
            this.callParent(arguments);
    },

    getVertPrevConstrainRight: function(o) {
        return (!this.splitter.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            o.prevBox.right - (o.prevCmp.minWidth || o.defaultMin) :
            this.callParent(arguments);
    },


    getVertNextConstrainLeft: function(o) {
        return (!this.splitter.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            o.nextBox.x + (o.nextCmp.minWidth || o.defaultMin) :
            this.callParent(arguments);
    },

    getVertNextConstrainRight: function(o) {
        return (!this.splitter.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            ((o.nextCmp.maxWidth ? o.nextBox.x + o.nextCmp.maxWidth :
            o.prevBox.right - (o.prevBox.minWidth || o.defaultMin)) + o.splitWidth) :
            this.callParent(arguments);
    },

    getResizeOffset: function() {
        var offset = this.getOffset('dragTarget');
        if (!this.splitter.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) {
            offset[0] = -offset[0];
        }
        return offset;
    }
});