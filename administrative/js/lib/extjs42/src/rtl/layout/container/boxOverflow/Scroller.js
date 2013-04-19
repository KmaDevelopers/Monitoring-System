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
Ext.define('Ext.rtl.layout.container.boxOverflow.Scroller', {
    override: 'Ext.layout.container.boxOverflow.Scroller',
    
    scrollLeft: function(internal) {
        var me = this,
            layout = me.layout;
        
        if (layout.direction === 'horizontal' && layout.owner.getHierarchyState().rtl) {
            if (internal) {
                me.scrollBy(me.scrollIncrement, false);
            } else {
                me.scrollRight(true);
            }
        } else {
            me.callParent();
        }
    },

    scrollRight: function(internal) {
        var me = this,
            layout = me.layout;
        
        if (layout.direction === 'horizontal' && layout.owner.getHierarchyState().rtl) {
            if (internal) {
                me.scrollBy(-me.scrollIncrement, false);
            } else {
                me.scrollLeft(true);
            }
        } else {
            me.callParent();
        }
    },
    
    atExtremeBefore: function(internal) {
        var layout = this.layout;
        
        if (!internal && layout.direction === 'horizontal' && layout.owner.getHierarchyState().rtl) {
            return this.atExtremeAfter(true);
        } else {
            return this.callParent();
        }
    },
    
    atExtremeAfter: function(internal) {
        var layout = this.layout;
        
        if (!internal && layout.direction === 'horizontal' && layout.owner.getHierarchyState().rtl) {
            return this.atExtremeBefore(true);
        } else {
            return this.callParent();
        }
    }
});
