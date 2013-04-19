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
Ext.define('Ext.rtl.slider.Multi', {
    override: 'Ext.slider.Multi',
    
    initComponent: function(){
        if (this.getHierarchyState().rtl) {
            this.horizontalProp = 'right';
        }    
        this.callParent();
    },
    
    onDragStart: function(){
        this.callParent(arguments);
        // Cache the width so we don't recalculate it during the drag
        this._rtlInnerWidth = this.innerEl.getWidth();
    },
    
    onDragEnd: function(){
        this.callParent(arguments);
        delete this._rtlInnerWidth;
    },
    
    transformTrackPoints: function(pos){
        var left, innerWidth;
        
        if (this.isOppositeRootDirection()) {
            left = pos.left;
            delete pos.left;
            
            innerWidth = typeof this._rtlInnerWidth !== 'undefined' ? this._rtlInnerWidth : this.innerEl.getWidth();
            pos.right = innerWidth - left;
            
            return pos;
        } else {
            return this.callParent(arguments);
        }
    },
    
    getSubTplData : function() {
        var me = this,
            data = me.callParent(),
            rtlCls = me._rtlCls;
        
        if (rtlCls && me.getHierarchyState().rtl) {
            data.childElCls = ' ' + rtlCls;
        }

        return data;
    }
});