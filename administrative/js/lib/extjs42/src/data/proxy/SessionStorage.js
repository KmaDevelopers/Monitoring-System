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
 * @author Ed Spencer
 *
 * Proxy which uses HTML5 session storage as its data storage/retrieval mechanism. If this proxy is used in a browser
 * where session storage is not supported, the constructor will throw an error. A session storage proxy requires a
 * unique ID which is used as a key in which all record data are stored in the session storage object.
 *
 * It's important to supply this unique ID as it cannot be reliably determined otherwise. If no id is provided but the
 * attached store has a storeId, the storeId will be used. If neither option is presented the proxy will throw an error.
 *
 * Proxies are almost always used with a {@link Ext.data.Store store}:
 *
 *     new Ext.data.Store({
 *         proxy: {
 *             type: 'sessionstorage',
 *             id  : 'myProxyKey'
 *         }
 *     });
 *
 * Alternatively you can instantiate the Proxy directly:
 *
 *     new Ext.data.proxy.SessionStorage({
 *         id  : 'myOtherProxyKey'
 *     });
 *
 * Note that session storage is different to local storage (see {@link Ext.data.proxy.LocalStorage}) - if a browser
 * session is ended (e.g. by closing the browser) then all data in a SessionStorageProxy are lost. Browser restarts
 * don't affect the {@link Ext.data.proxy.LocalStorage} - the data are preserved.
 */
Ext.define('Ext.data.proxy.SessionStorage', {
    extend: 'Ext.data.proxy.WebStorage',
    alias: 'proxy.sessionstorage',
    alternateClassName: 'Ext.data.SessionStorageProxy',
    
    //inherit docs
    getStorageObject: function() {
        return window.sessionStorage;
    }
});
