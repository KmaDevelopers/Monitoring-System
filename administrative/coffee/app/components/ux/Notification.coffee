
# 
# *    Notification / Toastwindow extension for Ext JS 4.x
# *
# *	Copyright (c) 2011 Eirik Lorentsen (http://www.eirik.net/)
# *
# *	Examples and documentation at: http://www.eirik.net/Ext/ux/window/Notification.html
# *
# *	Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
# *	and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
# *
# *	Version: 1.3
# *	Last changed date: 2011-09-13
# 
Ext.define "MsAdmin.components.ux.Notification",
  extend: "Ext.window.Window"
  alias: "widget.uxNotification"
  title: "Notification"
  cls: "ux-notification-light"
  autoDestroy: true
  autoHeight: true
  plain: false
  draggable: false
  shadow: false
  focus: Ext.emptyFn
  
  # For alignment and to store array of rendered notifications. Defaults to document if not set.
  manager: null
  useXAxis: false
  
  # Options: br, bl, tr, tl
  corner: "tr"
  
  # Pixels between each notification
  spacing: 6
  
  # Pixels from the managers borders to start the first notification
  paddingX: 30
  paddingY: 10
  slideInAnimation: "easeIn"
  slideDownAnimation: "bounceOut"
  autoDestroyDelay: 2000
  slideInDelay: 500
  slideDownDelay: 500
  fadeDelay: 500
  stickOnClick: true
  stickWhileHover: true
  
  # Private. Do not override!
  underDestruction: false
  readyToDestroy: false
  
  # Caching position coordinate to avoid windows overlapping when fading in simultaneously
  xPos: 0
  yPos: 0
  statics:
    defaultManager:
      notifications: []
      el: null

  initComponent: ->
    me = this
    me.callParent arguments_
    switch me.corner
      when "br"
        me.paddingFactorX = -1
        me.paddingFactorY = -1
        me.siblingAlignment = "br-br"
        if me.useXAxis
          me.managerAlignment = "bl-br"
        else
          me.managerAlignment = "tr-br"
      when "bl"
        me.paddingFactorX = 1
        me.paddingFactorY = -1
        me.siblingAlignment = "bl-bl"
        if me.useXAxis
          me.managerAlignment = "br-bl"
        else
          me.managerAlignment = "tl-bl"
      when "tr"
        me.paddingFactorX = -1
        me.paddingFactorY = 1
        me.siblingAlignment = "tr-tr"
        if me.useXAxis
          me.managerAlignment = "tl-tr"
        else
          me.managerAlignment = "br-tr"
      when "tl"
        me.paddingFactorX = 1
        me.paddingFactorY = 1
        me.siblingAlignment = "tl-tl"
        if me.useXAxis
          me.managerAlignment = "tr-tl"
        else
          me.managerAlignment = "bl-tl"
    me.manager = Ext.getCmp(me.manager)  if typeof me.manager is "string"
    
    # If no manager is provided or found, then the static object is used and the el property pointed to the body document.
    unless me.manager
      me.manager = me.statics().defaultManager
      me.manager.el = Ext.getBody()  unless me.manager.el
    me.manager.notifications = []  if typeof me.manager.notifications is "undefined"

  onRender: ->
    me = this
    me.callParent arguments_
    Ext.fly(me.body.dom).on "click", me.cancelAutoDestroy, me  if me.body and me.body.dom  if me.stickOnClick
    if me.autoDestroy
      me.task = new Ext.util.DelayedTask(me.doAutoDestroy, me)
      me.task.delay me.autoDestroyDelay
    me.el.hover (->
      me.mouseIsOver = true
    ), (->
      me.mouseIsOver = false
    ), me

  getXposAlignedToManager: ->
    me = this
    xPos = 0
    if me.corner is "br" or me.corner is "tr"
      xPos += me.manager.el.getRight()
      xPos -= (me.el.getWidth() + me.paddingX)
    else
      xPos += me.manager.el.getLeft()
      xPos += me.paddingX
    xPos

  getYposAlignedToManager: ->
    me = this
    yPos = 0
    if me.corner is "br" or me.corner is "bl"
      yPos += me.manager.el.getBottom()
      yPos -= (me.el.getHeight() + me.paddingY)
    else
      yPos += me.manager.el.getTop()
      yPos += me.paddingY
    yPos

  getXposAlignedToSibling: (sibling) ->
    me = this
    if me.useXAxis
      if me.corner is "tl" or me.corner is "bl"
        
        # Using sibling's width when adding
        sibling.xPos + sibling.el.getWidth() + sibling.spacing
      else
        
        # Using own width when subtracting
        sibling.xPos - me.el.getWidth() - me.spacing
    else
      me.el.getLeft()

  getYposAlignedToSibling: (sibling) ->
    me = this
    if me.useXAxis
      me.el.getTop()
    else
      if me.corner is "tr" or me.corner is "tl"
        
        # Using sibling's width when adding
        sibling.yPos + sibling.el.getHeight() + sibling.spacing
      else
        
        # Using own width when subtracting
        sibling.yPos - me.el.getHeight() - sibling.spacing

  beforeShow: ->
    me = this
    if me.manager.notifications.length
      me.el.alignTo me.manager.notifications[me.manager.notifications.length - 1].el, me.siblingAlignment, [0, 0]
      me.xPos = me.getXposAlignedToSibling(me.manager.notifications[me.manager.notifications.length - 1])
      me.yPos = me.getYposAlignedToSibling(me.manager.notifications[me.manager.notifications.length - 1])
    else
      me.el.alignTo me.manager.el, me.managerAlignment, [(me.paddingX * me.paddingFactorX), (me.paddingY * me.paddingFactorY)]
      me.xPos = me.getXposAlignedToManager()
      me.yPos = me.getYposAlignedToManager()
    Ext.Array.include me.manager.notifications, me
    me.el.animate
      to:
        x: me.xPos
        y: me.yPos

      easing: me.slideInAnimation
      duration: me.slideInDelay
      dynamic: true


  slideDown: ->
    me = this
    index = Ext.Array.indexOf(me.manager.notifications, me)
    
    # Not animating the element if it already started to destroy itself
    if not me.underDestruction and me.el
      if index
        me.xPos = me.getXposAlignedToSibling(me.manager.notifications[index - 1])
        me.yPos = me.getYposAlignedToSibling(me.manager.notifications[index - 1])
      else
        me.xPos = me.getXposAlignedToManager()
        me.yPos = me.getYposAlignedToManager()
      me.el.animate
        to:
          x: me.xPos
          y: me.yPos

        easing: me.slideDownAnimation
        duration: me.slideDownDelay
        dynamic: true


  cancelAutoDestroy: ->
    me = this
    me.addClass "notification-fixed"
    if me.autoDestroy
      me.task.cancel()
      me.autoDestroy = false

  doAutoDestroy: ->
    me = this
    
    # Delayed destruction when mouse leaves the component.
    #		   Doing this before me.mouseIsOver is checked below to avoid a race condition while resetting event handlers 
    me.el.hover (->
    ), (->
      me.destroy()
    ), me
    
    # Destroy immediately
    me.destroy()  unless me.stickWhileHover and me.mouseIsOver

  listeners:
    beforehide: (me, eOpts) ->
      unless me.underDestruction
        
        # Force window to animate and destroy, instead of hiding
        me.destroy()
        false

  destroy: ->
    me = this
    
    # Avoids starting the last animation on an element already underway with its destruction
    unless me.underDestruction
      me.underDestruction = true
      me.cancelAutoDestroy()
      me.stopAnimation()
      me.el.animate
        to:
          opacity: 0

        easing: "easeIn"
        duration: me.fadeDelay
        dynamic: true
        listeners:
          afteranimate: ->
            index = Ext.Array.indexOf(me.manager.notifications, me)
            unless index is -1
              Ext.Array.erase me.manager.notifications, index, 1
              
              # Slide "down" all notifications "above" the destroyed one
              while index < me.manager.notifications.length
                me.manager.notifications[index].slideDown()
                index++
            me.readyToDestroy = true
            me.destroy()

    
    # After animation is complete the component may be destroyed
    @callParent arguments_  if me.readyToDestroy
