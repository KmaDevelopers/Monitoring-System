/**
 * Shows loading mask with loading message in the top of the viewport
 * implemented in form of Semaphore
 */
Ext.define("MsAdmin.LoadMask", {
	requires: [
		'Ext.data.Connection'
	],
	singleton: true,
	/**
	 * @var {Ext.Element} reference to mask-el
	 */
	mask: null,
	/**
	 * @var {Ext.window.Window} reference to loading-window cmp
	 */
	wnd: null,
	/**
	 * @var {Number} defines load-mask using, 0 - means, that there is no component
	 *				 that requires load-mask
	 */
	counter: 0,
	/**
	 * @var {Number} contains timeoutID for mask-el
	 * @private
	 */
	timeout: null,
	/**
	 * @var {Number} contains timeoutID for loading-window
	 * @private
	 */
	loadingWindowTimeout: null,
	/**
	 * @var {Boolean} flag becames true, if #init has been called atleast once
	 */
	initialized: false,
	/**
	 * @var {Number} defines css-prop z-index for transparent-mask
	 */
	MAX_ZINDEX: 99999999,

	/**
	 * attaches required listeners
	 */
	constructor: function() {
		MsAdmin.Event.on('CJ.mask.init', this.init, this);
	},

	/**
	 * performs component's full-initialization
	 * @returns {undefined}
	 */
	init: function() {
		if(this.initialized) {
			return ;
		}

		MsAdmin.Event.on('CJ.mask', this.showMask, this);
		MsAdmin.Event.on('CJ.unmask', this.hideMask, this);

		Ext.Ajax.on('beforerequest', this.showMask, this);
		Ext.Ajax.on("requestcomplete", this.hideMask, this);
		Ext.Ajax.on("requestexception", this.hideMask, this);

		this.initWindow();
		this.initMask();	

		this.initialized = true;
	},

	/**
	 * creates window for showing loading-message
	 * @returns {undefined}
	 */
	initWindow: function() {
		this.wnd = Ext.createByAlias("widget.window", {
           	closable: false,
           	closeAction: 'hide',
          	moveable: false,
           	resizable: false,
           	modal: false,
           	hidden: true,
           	plain: true,
           	autoRender: true,
           	renderTo: Ext.getBody(),
           	minHeight: 40,
           	minWidth: 160,
           	width: 160,
           	frameHeader: false,
           	preventHeader: true,
           	bodyPadding: '6 50 6 50',
           	html: "Loading",
           	listeners: {
           		scope: this,
           		afterrender: function(wnd) {
           			wnd.getEl().setStyle("z-index", this.MAX_ZINDEX + 1);
           			wnd.zIndexManager.unregister(wnd);
           		}
           	}
       	});
	},

	/**
	 * creates transparent overlay-mask
	 * @returns {undefined}
	 */
	initMask: function() {
		this.mask = Ext.createByAlias("widget.container", {
			renderTo: Ext.getBody(),
			autoRender: true,
			hidden: true,
			autoEl: {
				tag: "div",
				cls: "cj-overlay"
			},
			listeners: {
				scope: this,
				afterrender: function(container) {
					container.getEl().setStyle("z-index", this.MAX_ZINDEX);
				}
			}
		});
	},

	/**
	 * shows overlay-mask and window
	 * increments #counter, means new component requires a mask
	 * clears all hide-timeouts, shows mask, window
	 *
	 * @returns {undefined}
	 */
	showMask: function() {
		this.counter++;

		this.clearTimeouts();

		if(this.wnd && this.wnd.getEl().isVisible()) {
			return ;
		}

		this.wnd.getEl().show();
		//this.mask.show();
		
		//this.wnd.getEl().setHeight(43);
		//this.wnd.getEl().setWidth(160);
		
       	this.wnd.setPosition(this.wnd.container.getWidth()/2 - this.wnd.getWidth()/2, 0);
	},

	/**
	 * hides both mask and window
	 * function waits unless #current != 0
	 * when #current == 0, it runs deferred-functions to show mask and window,
	 * deferred is used because of component-rendering time,
	 * please note, counter may be < 0, because application can use stores with autoLoad: true,
	 * so stores will load data before mask will be initialized
	 *
	 * @param {Object} config
	 * @param {Number|undefined} config.minus how much show-times shoud be removed
	 * @returns {undefined}
	 */
	hideMask: function(config) {
		config = config || {};
		
		if(config.minus) {
			this.counter -= (config.minus-1);
		}

		if(--this.counter > 0) { //still some component requires loadmask
			this.clearTimeouts();
			return ;
		}
		
		this.counter = 0;
		// loadmask should be removed, because there is no a component, that requires it
		this.timeout = Ext.defer(function() {
			//this.mask && this.mask.hide();
			this.loadingWindowTimeout = Ext.defer(function() {
        		this.wnd && this.wnd.getEl().hide();
        	}, 250, this);
		}, 50, this);
	},

	/**
	 * clears all timeouts 
	 * @returns {undefined}
	 */
	clearTimeouts: function() {
		clearTimeout(this.timeout);
		clearTimeout(this.loadingWindowTimeout);
	}
})