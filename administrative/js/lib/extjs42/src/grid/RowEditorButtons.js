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
 * Private Container class used by the {@link Ext.grid.RowEditor} to hold its buttons.
 */
Ext.define('Ext.grid.RowEditorButtons', {
    extend: 'Ext.container.Container',
    alias: 'widget.roweditorbuttons',

    frame: true,

    constructor: function(config) {
        var rowEditor = config.rowEditor,
            cssPrefix = Ext.baseCSSPrefix,
            plugin = rowEditor.editingPlugin;

        config = Ext.apply({
            floating: {
                shadow: false
            },
            baseCls: cssPrefix + 'grid-row-editor-buttons',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                xtype: 'button',
                ui: rowEditor.buttonUI,
                scope: plugin,
                flex: 1,
                minWidth: Ext.panel.Panel.prototype.minButtonWidth
            },
            items: [{
                cls: cssPrefix + 'row-editor-update-button',
                itemId: 'update',
                handler: plugin.completeEdit,
                text: rowEditor.saveBtnText,
                disabled: rowEditor.updateButtonDisabled
            }, {
                cls: cssPrefix + 'row-editor-cancel-button',
                handler: plugin.cancelEdit,
                text: rowEditor.cancelBtnText
            }]
        }, config);
        this.callParent([config]);
    },
    
    getFramingInfoCls: function(){
        return this.baseCls;
    },

    getTargetEl: function() {
        return this.el;
    },

    // Work round position absolute 100% width bug in IEQuirks
    afterComponentLayout: function() {
        if (Ext.isIEQuirks && !this.componentLayoutCounter) {
            this.el.setWidth(this.width = this.layout.innerCt.getWidth() + this.getFrameInfo().width);
        }
        this.callParent(arguments);        
    }
});