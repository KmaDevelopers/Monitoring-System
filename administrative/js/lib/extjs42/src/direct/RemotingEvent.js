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
 * An event that is fired when data is received from a 
 * {@link Ext.direct.RemotingProvider}. Contains a method to the
 * related transaction for the direct request, see {@link #getTransaction}
 */
Ext.define('Ext.direct.RemotingEvent', {
    extend: 'Ext.direct.Event',
    alias:  'direct.rpc',
    
    /**
     * Get the transaction associated with this event.
     * @return {Ext.direct.Transaction} The transaction
     */
    getTransaction: function() {
        var me = this;
        
        return me.transaction || Ext.direct.Manager.getTransaction(me.tid);
    }
});
