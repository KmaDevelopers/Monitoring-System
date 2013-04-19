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
 * This class implements the global event domain. This domain represents event fired from
 * {@link Ext#globalEvents} Observable instance. No selectors are supported for this domain.
 * 
 * @protected
 */
Ext.define('Ext.app.domain.Global', {
    extend: 'Ext.app.EventDomain',
    singleton: true,

    type: 'global',

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.monitor(Ext.globalEvents);
    },
    
    /**
     * This method adds listeners on behalf of a controller. Since Global domain does not
     * support selectors, we skip this layer and just accept an object keyed by events.
     * For example:
     *
     *      domain.listen({
     *          idle: function() { ... },
     *          afterlayout: {
     *              fn: function() { ... },
     *              delay: 10
     *          }
     *      });
     *
     * @param {Object} listeners Config object containing listeners.
     *
     * @private
     */              
    listen: function(listeners, controller) {
        // Parent method requires selectors so we just wrap passed listeners
        // in a dummy selector
        this.callParent([{ global: listeners }, controller]);
    },

    match: function() {
        return true;
    }
});
