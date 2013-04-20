###
Shows loading mask with loading message in the top of the viewport
implemented in form of Semaphore
###
Ext.define "MsAdmin.LoadMask",
  requires: ["Ext.data.Connection"]
  singleton: true
  
  ###
  @var {Ext.Element} reference to mask-el
  ###
  mask: null
  
  ###
  @var {Ext.window.Window} reference to loading-window cmp
  ###
  wnd: null
  
  ###
  @var {Number} defines load-mask using, 0 - means, that there is no component
  that requires load-mask
  ###
  counter: 0
  
  ###
  @var {Number} contains timeoutID for mask-el
  @private
  ###
  timeout: null
  
  ###
  @var {Number} contains timeoutID for loading-window
  @private
  ###
  loadingWindowTimeout: null
  
  ###
  @var {Boolean} flag becames true, if #init has been called atleast once
  ###
  initialized: false
  
  ###
  @var {Number} defines css-prop z-index for transparent-mask
  ###
  MAX_ZINDEX: 99999999
  
  ###
  attaches required listeners
  ###
  constructor: ->
    MsAdmin.Event.on "CJ.mask.init", @init, this

  
  ###
  performs component's full-initialization
  @returns {undefined}
  ###
  init: ->
    return  if @initialized
    MsAdmin.Event.on "CJ.mask", @showMask, this
    MsAdmin.Event.on "CJ.unmask", @hideMask, this
    Ext.Ajax.on "beforerequest", @showMask, this
    Ext.Ajax.on "requestcomplete", @hideMask, this
    Ext.Ajax.on "requestexception", @hideMask, this
    @initWindow()
    @initMask()
    @initialized = true

  
  ###
  creates window for showing loading-message
  @returns {undefined}
  ###
  initWindow: ->
    @wnd = Ext.createByAlias("widget.window",
      closable: false
      closeAction: "hide"
      moveable: false
      resizable: false
      modal: false
      hidden: true
      plain: true
      autoRender: true
      renderTo: Ext.getBody()
      minHeight: 40
      minWidth: 160
      width: 160
      frameHeader: false
      preventHeader: true
      bodyPadding: "6 50 6 50"
      html: "Loading"
      listeners:
        scope: this
        afterrender: (wnd) ->
          wnd.getEl().setStyle "z-index", @MAX_ZINDEX + 1
          wnd.zIndexManager.unregister wnd
    )

  
  ###
  creates transparent overlay-mask
  @returns {undefined}
  ###
  initMask: ->
    @mask = Ext.createByAlias("widget.container",
      renderTo: Ext.getBody()
      autoRender: true
      hidden: true
      autoEl:
        tag: "div"
        cls: "cj-overlay"

      listeners:
        scope: this
        afterrender: (container) ->
          container.getEl().setStyle "z-index", @MAX_ZINDEX
    )

  
  ###
  shows overlay-mask and window
  increments #counter, means new component requires a mask
  clears all hide-timeouts, shows mask, window
  
  @returns {undefined}
  ###
  showMask: ->
    @counter++
    @clearTimeouts()
    return  if @wnd and @wnd.getEl().isVisible()
    @wnd.getEl().show()
    
    #this.mask.show();
    
    #this.wnd.getEl().setHeight(43);
    #this.wnd.getEl().setWidth(160);
    @wnd.setPosition @wnd.container.getWidth() / 2 - @wnd.getWidth() / 2, 0

  
  ###
  hides both mask and window
  function waits unless #current != 0
  when #current == 0, it runs deferred-functions to show mask and window,
  deferred is used because of component-rendering time,
  please note, counter may be < 0, because application can use stores with autoLoad: true,
  so stores will load data before mask will be initialized
  
  @param {Object} config
  @param {Number|undefined} config.minus how much show-times shoud be removed
  @returns {undefined}
  ###
  hideMask: (config) ->
    config = config or {}
    @counter -= (config.minus - 1)  if config.minus
    if --@counter > 0 #still some component requires loadmask
      @clearTimeouts()
      return
    @counter = 0
    
    # loadmask should be removed, because there is no a component, that requires it
    @timeout = Ext.defer(->
      
      #this.mask && this.mask.hide();
      @loadingWindowTimeout = Ext.defer(->
        @wnd and @wnd.getEl().hide()
      , 250, this)
    , 50, this)

  
  ###
  clears all timeouts
  @returns {undefined}
  ###
  clearTimeouts: ->
    clearTimeout @timeout
    clearTimeout @loadingWindowTimeout
