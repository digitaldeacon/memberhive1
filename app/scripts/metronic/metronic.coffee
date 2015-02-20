###*
Core script to handle the entire theme and core functions
*
###

window.Metronic = do ->
  # IE mode
  isRTL = false
  isIE8 = false
  isIE9 = false
  isIE10 = false
  resizeHandlers = []
  assetsPath = '../../assets/'
  globalImgPath = 'global/img/'
  globalPluginsPath = 'global/plugins/'
  globalCssPath = 'global/css/'
  # theme layout color set
  brandColors =
    'blue': '#89C4F4'
    'red': '#F3565D'
    'green': '#1bbc9b'
    'purple': '#9b59b6'
    'grey': '#95a5a6'
    'yellow': '#F8CB00'
  # initializes main settings

  handleInit = ->
    if $('body').css('direction') == 'rtl'
      isRTL = true
    isIE8 = ! !navigator.userAgent.match(/MSIE 8.0/)
    isIE9 = ! !navigator.userAgent.match(/MSIE 9.0/)
    isIE10 = ! !navigator.userAgent.match(/MSIE 10.0/)
    if isIE10
      $('html').addClass 'ie10'
    # detect IE10 version
    if isIE10 or isIE9 or isIE8
      $('html').addClass 'ie'
    # detect IE10 version
    return

  # runs callback functions set by Metronic.addResponsiveHandler().

  _runResizeHandlers = ->
    # reinitialize other subscribed elements
    i = 0
    while i < resizeHandlers.length
      each = resizeHandlers[i]
      each.call()
      i++
    return

  # handle the layout reinitialization on window resize

  handleOnResize = ->
    resize = undefined
    if isIE8
      currheight = undefined
      $(window).resize ->
        if currheight == document.documentElement.clientHeight
          return
        #quite event since only body resized not window.
        if resize
          clearTimeout resize
        resize = setTimeout((->
          _runResizeHandlers()
          return
        ), 50)
        # wait 50ms until window resize finishes.
        currheight = document.documentElement.clientHeight
        # store last body client height
        return
    else
      $(window).resize ->
        if resize
          clearTimeout resize
        resize = setTimeout((->
          _runResizeHandlers()
          return
        ), 50)
        # wait 50ms until window resize finishes.
        return
    return

  # Handles portlet tools & actions

  handlePortletTools = ->
    # handle portlet remove
    $('body').on 'click', '.portlet > .portlet-title > .tools > a.remove', (e) ->
      e.preventDefault()
      portlet = $(this).closest('.portlet')
      if $('body').hasClass('page-portlet-fullscreen')
        $('body').removeClass 'page-portlet-fullscreen'
      portlet.find('.portlet-title .fullscreen').tooltip 'destroy'
      portlet.find('.portlet-title > .tools > .reload').tooltip 'destroy'
      portlet.find('.portlet-title > .tools > .remove').tooltip 'destroy'
      portlet.find('.portlet-title > .tools > .config').tooltip 'destroy'
      portlet.find('.portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand')
          .tooltip 'destroy'
      portlet.remove()
      return
    # handle portlet fullscreen
    $('body').on 'click', '.portlet > .portlet-title .fullscreen', (e) ->
      e.preventDefault()
      portlet = $(this).closest('.portlet')
      if portlet.hasClass('portlet-fullscreen')
        $(this).removeClass 'on'
        portlet.removeClass 'portlet-fullscreen'
        $('body').removeClass 'page-portlet-fullscreen'
        portlet.children('.portlet-body').css 'height', 'auto'
      else
        height = Metronic.getViewPort().height - portlet.children('.portlet-title').outerHeight() -
            parseInt(portlet.children('.portlet-body').css('padding-top')) -
            parseInt(portlet.children('.portlet-body').css('padding-bottom'))
        $(this).addClass 'on'
        portlet.addClass 'portlet-fullscreen'
        $('body').addClass 'page-portlet-fullscreen'
        portlet.children('.portlet-body').css 'height', height
      return
    $('body').on 'click', '.portlet > .portlet-title > .tools > a.reload', (e) ->
      e.preventDefault()
      el = $(this).closest('.portlet').children('.portlet-body')
      url = $(this).attr('data-url')
      error = $(this).attr('data-error-display')
      if url
        Metronic.blockUI
          target: el
          animate: true
          overlayColor: 'none'
        $.ajax
          type: 'GET'
          cache: false
          url: url
          dataType: 'html'
          success: (res) ->
            Metronic.unblockUI el
            el.html res
            return
          error: (xhr, ajaxOptions, thrownError) ->
            Metronic.unblockUI el
            msg = 'Error on reloading the content. Please check your connection and try again.'
            if error == 'toastr' and toastr
              toastr.error msg
            else if error == 'notific8' and $.notific8
              $.notific8 'zindex', 11500
              $.notific8 msg,
                theme: 'ruby'
                life: 3000
            else
              alert msg
            return
      else
        # for demo purpose
        Metronic.blockUI
          target: el
          animate: true
          overlayColor: 'none'
        window.setTimeout (->
          Metronic.unblockUI el
          return
        ), 1000
      return
    # load ajax data on page init
    $('.portlet .portlet-title a.reload[data-load="true"]').click()
    $('body').on 'click', '.portlet-title > .tools > .collapse, .portlet-title > .tools > .expand', (e) ->
      e.preventDefault()
      el = $(this).closest('.portlet').children('.portlet-body')
      if $(this).hasClass('collapse')
        $(this).removeClass('collapse').addClass 'expand'
        el.slideUp 200
      else
        $(this).removeClass('expand').addClass 'collapse'
        el.slideDown 200
      return
    return

  # Handles custom checkboxes & radios using jQuery Uniform plugin

  handleUniform = ->
    if !$().uniform
      return
    test = $('input[type=checkbox]:not(.toggle, .make-switch, .icheck),' +
        'input[type=radio]:not(.toggle, .star, .make-switch, .icheck)')
    if test.size() > 0
      test.each ->
        if $(this).parents('.checker').size() == 0
          $(this).show()
          $(this).uniform()
        return
    return

  # Handles custom checkboxes & radios using jQuery iCheck plugin

  handleiCheck = ->
    if !$().iCheck
      return
    $('.icheck').each ->
      checkboxClass = if $(this).attr('data-checkbox') then $(this).attr('data-checkbox') else 'icheckbox_minimal-grey'
      radioClass = if $(this).attr('data-radio') then $(this).attr('data-radio') else 'iradio_minimal-grey'
      if checkboxClass.indexOf('_line') > -1 or radioClass.indexOf('_line') > -1
        $(this).iCheck
          checkboxClass: checkboxClass
          radioClass: radioClass
          insert: '<div class="icheck_line-icon"></div>' + $(this).attr('data-label')
      else
        $(this).iCheck
          checkboxClass: checkboxClass
          radioClass: radioClass
      return
    return

  # Handles Bootstrap switches

  handleBootstrapSwitch = ->
    if !$().bootstrapSwitch
      return
    $('.make-switch').bootstrapSwitch()
    return

  # Handles Bootstrap confirmations

  handleBootstrapConfirmation = ->
    if !$().confirmation
      return
    $('[data-toggle=confirmation]').confirmation
      container: 'body'
      btnOkClass: 'btn-xs btn-success'
      btnCancelClass: 'btn-xs btn-danger'
    return

  # Handles Bootstrap Accordions.

  handleAccordions = ->
    $('body').on 'shown.bs.collapse', '.accordion.scrollable', (e) ->
      Metronic.scrollTo $(e.target)
      return
    return

  # Handles Bootstrap Tabs.

  handleTabs = ->
    #activate tab if tab id provided in the URL
    if location.hash
      tabid = location.hash.substr(1)
      $('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each ->
        tabid = $(this).attr('id')
        $('a[href="#' + tabid + '"]').click()
        return
      $('a[href="#' + tabid + '"]').click()
    return

  # Handles Bootstrap Modals.

  handleModals = ->
    # fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class.
    $('body').on 'hide.bs.modal', ->
      if $('.modal:visible').size() > 1 and $('html').hasClass('modal-open') == false
        $('html').addClass 'modal-open'
      else if $('.modal:visible').size() <= 1
        $('html').removeClass 'modal-open'
      return
    # fix page scrollbars issue
    $('body').on 'show.bs.modal', '.modal', ->
      if $(this).hasClass('modal-scroll')
        $('body').addClass 'modal-open-noscroll'
      return
    # fix page scrollbars issue
    $('body').on 'hide.bs.modal', '.modal', ->
      $('body').removeClass 'modal-open-noscroll'
      return
    # remove ajax content and remove cache on modal closed
    $('body').on 'hidden.bs.modal', '.modal:not(.modal-cached)', ->
      $(this).removeData 'bs.modal'
      return
    return

  # Handles Bootstrap Tooltips.

  handleTooltips = ->
    # global tooltips
    $('.tooltips').tooltip()
    # portlet tooltips
    $('.portlet > .portlet-title .fullscreen').tooltip
      container: 'body'
      title: 'Fullscreen'
    $('.portlet > .portlet-title > .tools > .reload').tooltip
      container: 'body'
      title: 'Reload'
    $('.portlet > .portlet-title > .tools > .remove').tooltip
      container: 'body'
      title: 'Remove'
    $('.portlet > .portlet-title > .tools > .config').tooltip
      container: 'body'
      title: 'Settings'
    $('.portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip
      container: 'body'
      title: 'Collapse/Expand'
    return

  # Handles Bootstrap Dropdowns

  handleDropdowns = ->

    ###
      Hold dropdown on click
    ###

    $('body').on 'click', '.dropdown-menu.hold-on-click', (e) ->
      e.stopPropagation()
      return
    return

  handleAlerts = ->
    $('body').on 'click', '[data-close="alert"]', (e) ->
      $(this).parent('.alert').hide()
      $(this).closest('.note').hide()
      e.preventDefault()
      return
    $('body').on 'click', '[data-close="note"]', (e) ->
      $(this).closest('.note').hide()
      e.preventDefault()
      return
    $('body').on 'click', '[data-remove="note"]', (e) ->
      $(this).closest('.note').remove()
      e.preventDefault()
      return
    return

  # Handle Hower Dropdowns

  handleDropdownHover = ->
    $('[data-hover="dropdown"]').not('.hover-initialized').each ->
      $(this).dropdownHover()
      $(this).addClass 'hover-initialized'
      return
    return

  # Handles Bootstrap Popovers
  # last popep popover
  lastPopedPopover = undefined

  handlePopovers = ->
    $('.popovers').popover()
    # close last displayed popover
    $(document).on 'click.bs.popover.data-api', (e) ->
      if lastPopedPopover
        lastPopedPopover.popover 'hide'
      return
    return

  # Handles scrollable contents using jQuery SlimScroll plugin.

  handleScrollers = ->
    Metronic.initSlimScroll '.scroller'
    return

  # Handles Image Preview using jQuery Fancybox plugin

  handleFancybox = ->
    if !jQuery.fancybox
      return
    if $('.fancybox-button').size() > 0
      $('.fancybox-button').fancybox
        groupAttr: 'data-rel'
        prevEffect: 'none'
        nextEffect: 'none'
        closeBtn: true
        helpers: title: type: 'inside'
    return

  # Fix input placeholder issue for IE8 and IE9

  handleFixInputPlaceholderForIE = ->
    #fix html5 placeholder attribute for ie7 & ie8
    if isIE8 or isIE9
      # ie8 & ie9
      # this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class
      # will be skipped(e.g: we need this for password fields)
      $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each ->
        input = $(this)
        if input.val() == '' and input.attr('placeholder') != ''
          input.addClass('placeholder').val input.attr('placeholder')
        input.focus ->
          if input.val() == input.attr('placeholder')
            input.val ''
          return
        input.blur ->
          if input.val() == '' or input.val() == input.attr('placeholder')
            input.val input.attr('placeholder')
          return
        return
    return

  # Handle Select2 Dropdowns

  handleSelect2 = ->
    if $().select2
      $('.select2me').select2
        placeholder: 'Select'
        allowClear: true
    return

  #* END:CORE HANDLERS *//
  {
  init: ->
    #IMPORTANT!!!: Do not modify the core handlers call order.
    #Core handlers
    handleInit()
    # initialize core variables
    handleOnResize()
    # set and handle responsive
    #UI Component handlers
    handleUniform()
    # hanfle custom radio & checkboxes
    handleiCheck()
    # handles custom icheck radio and checkboxes
    handleBootstrapSwitch()
    # handle bootstrap switch plugin
    handleScrollers()
    # handles slim scrolling contents
    handleFancybox()
    # handle fancy box
    handleSelect2()
    # handle custom Select2 dropdowns
    handlePortletTools()
    # handles portlet action bar functionality(refresh, configure, toggle, remove)
    handleAlerts()
    #handle closabled alerts
    handleDropdowns()
    # handle dropdowns
    handleTabs()
    # handle tabs
    handleTooltips()
    # handle bootstrap tooltips
    handlePopovers()
    # handles bootstrap popovers
    handleAccordions()
    #handles accordions
    handleModals()
    # handle modals
    handleBootstrapConfirmation()
    # handle bootstrap confirmations
    # Hacks
    handleFixInputPlaceholderForIE()
    #IE8 & IE9 input placeholder issue fix
    return
  initAjax: ->
    handleUniform()
    # handles custom radio & checkboxes
    handleiCheck()
    # handles custom icheck radio and checkboxes
    handleBootstrapSwitch()
    # handle bootstrap switch plugin
    handleDropdownHover()
    # handles dropdown hover
    handleScrollers()
    # handles slim scrolling contents
    handleSelect2()
    # handle custom Select2 dropdowns
    handleFancybox()
    # handle fancy box
    handleDropdowns()
    # handle dropdowns
    handleTooltips()
    # handle bootstrap tooltips
    handlePopovers()
    # handles bootstrap popovers
    handleAccordions()
    #handles accordions
    handleBootstrapConfirmation()
    # handle bootstrap confirmations
    return
  initComponents: ->
    @initAjax()
    return
  setLastPopedPopover: (el) ->
    lastPopedPopover = el
    return
  addResizeHandler: (func) ->
    resizeHandlers.push func
    return
  runResizeHandlers: ->
    _runResizeHandlers()
    return
  scrollTo: (el, offeset) ->
    pos = if el and el.size() > 0 then el.offset().top else 0
    if el
      if $('body').hasClass('page-header-fixed')
        pos = pos - $('.page-header').height()
      pos = pos + (if offeset then offeset else -1 * el.height())
    $('html,body').animate { scrollTop: pos }, 'slow'
    return
  initSlimScroll: (el) ->
    $(el).each ->
      if $(this).attr('data-initialized')
        return
      # exit
      height = undefined
      if $(this).attr('data-height')
        height = $(this).attr('data-height')
      else
        height = $(this).css('height')
      $(this).slimScroll
        allowPageScroll: true
        size: '7px'
        color: if $(this).attr('data-handle-color') then $(this).attr('data-handle-color') else '#bbb'
        wrapperClass: if $(this).attr('data-wrapper-class') then $(this).attr('data-wrapper-class') else 'slimScrollDiv'
        railColor: if $(this).attr('data-rail-color') then $(this).attr('data-rail-color') else '#eaeaea'
        position: if isRTL then 'left' else 'right'
        height: height
        alwaysVisible: if $(this).attr('data-always-visible') == '1' then true else false
        railVisible: if $(this).attr('data-rail-visible') == '1' then true else false
        disableFadeOut: true
      $(this).attr 'data-initialized', '1'
      return
    return
  destroySlimScroll: (el) ->
    $(el).each ->
      if $(this).attr('data-initialized') == '1'
        # destroy existing instance before updating the height
        $(this).removeAttr 'data-initialized'
        $(this).removeAttr 'style'
        attrList = {}
        # store the custom attribures so later we will reassign.
        if $(this).attr('data-handle-color')
          attrList['data-handle-color'] = $(this).attr('data-handle-color')
        if $(this).attr('data-wrapper-class')
          attrList['data-wrapper-class'] = $(this).attr('data-wrapper-class')
        if $(this).attr('data-rail-color')
          attrList['data-rail-color'] = $(this).attr('data-rail-color')
        if $(this).attr('data-always-visible')
          attrList['data-always-visible'] = $(this).attr('data-always-visible')
        if $(this).attr('data-rail-visible')
          attrList['data-rail-visible'] = $(this).attr('data-rail-visible')
        $(this).slimScroll
          wrapperClass: if $(this).attr('data-wrapper-class') then $(this).attr('data-wrapper-class') \
              else 'slimScrollDiv'
          destroy: true
        the = $(this)
        # reassign custom attributes
        $.each attrList, (key, value) ->
          the.attr key, value
          return
      return
    return
  scrollTop: ->
    Metronic.scrollTo()
    return
  blockUI: (options) ->
    options = $.extend(true, {}, options)
    html = ''
    if options.animate
      html = '<div class="loading-message ' + (if options.boxed then 'loading-message-boxed' else '') + '">' +
          '<div class="block-spinner-bar"><div class="bounce1"></div>' +
          '<div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>'
    else if options.iconOnly
      html = '<div class="loading-message ' + (if options.boxed then 'loading-message-boxed' else '') +
          '"><img src="' + @getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>'
    else if options.textOnly
      html = '<div class="loading-message ' + (if options.boxed then 'loading-message-boxed' else '') +
          '"><span>&nbsp;&nbsp;' + (if options.message then options.message else 'LOADING...') + '</span></div>'
    else
      html = '<div class="loading-message ' + (if options.boxed then 'loading-message-boxed' else '') +
          '"><img src="' + @getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' +
          (if options.message then options.message else 'LOADING...') + '</span></div>'
    if options.target
      # element blocking
      el = $(options.target)
      if el.height() <= $(window).height()
        options.cenrerY = true
      el.block
        message: html
        baseZ: if options.zIndex then options.zIndex else 1000
        centerY: if options.cenrerY != undefined then options.cenrerY else false
        css:
          top: '10%'
          border: '0'
          padding: '0'
          backgroundColor: 'none'
        overlayCSS:
          backgroundColor: if options.overlayColor then options.overlayColor else '#555'
          opacity: if options.boxed then 0.05 else 0.1
          cursor: 'wait'
    else
      # page blocking
      $.blockUI
        message: html
        baseZ: if options.zIndex then options.zIndex else 1000
        css:
          border: '0'
          padding: '0'
          backgroundColor: 'none'
        overlayCSS:
          backgroundColor: if options.overlayColor then options.overlayColor else '#555'
          opacity: if options.boxed then 0.05 else 0.1
          cursor: 'wait'
    return
  unblockUI: (target) ->
    if target
      $(target).unblock onUnblock: ->
        $(target).css 'position', ''
        $(target).css 'zoom', ''
        return
    else
      $.unblockUI()
    return
  startPageLoading: (options) ->
    if options and options.animate
      $('.page-spinner-bar').remove()
      $('body').append '<div class="page-spinner-bar"><div class="bounce1"></div>' +
        '<div class="bounce2"></div><div class="bounce3"></div></div>'
    else
      $('.page-loading').remove()
      $('body').append '<div class="page-loading"><img src="' + @getGlobalImgPath() +
          'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' +
          (if options and options.message then options.message else 'Loading...') + '</span></div>'
    return
  stopPageLoading: ->
    $('.page-loading, .page-spinner-bar').remove()
    return
  alert: (options) ->
    options = $.extend(true, {
      container: ''
      place: 'append'
      type: 'success'
      message: ''
      close: true
      reset: true
      focus: true
      closeInSeconds: 0
      icon: ''
    }, options)
    id = Metronic.getUniqueID('Metronic_alert')
    html = '<div id="' + id + '" class="Metronic-alerts alert alert-' + options.type + ' fade in">' +
        (if options.close then \
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' else '') +
        (if options.icon != '' then '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' else '') +
        options.message + '</div>'
    if options.reset
      $('.Metronic-alerts').remove()
    if !options.container
      if $('body').hasClass('page-container-bg-solid')
        $('.page-title').after html
      else
        if $('.page-bar').size() > 0
          $('.page-bar').after html
        else
          $('.page-breadcrumb').after html
    else
      if options.place == 'append'
        $(options.container).append html
      else
        $(options.container).prepend html
    if options.focus
      Metronic.scrollTo $('#' + id)
    if options.closeInSeconds > 0
      setTimeout (->
        $('#' + id).remove()
        return
      ), options.closeInSeconds * 1000
    id
  initUniform: (els) ->
    if els
      $(els).each ->
        if $(this).parents('.checker').size() == 0
          $(this).show()
          $(this).uniform()
        return
    else
      handleUniform()
    return
  updateUniform: (els) ->
    $.uniform.update els
    # update the uniform checkbox & radios UI after the actual input control state changed
    return
  initFancybox: ->
    handleFancybox()
    return
  getActualVal: (el) ->
    el = $(el)
    if el.val() == el.attr('placeholder')
      return ''
    el.val()
  getURLParameter: (paramName) ->
    searchString = window.location.search.substring(1)
    i = undefined
    val = undefined
    params = searchString.split('&')
    i = 0
    while i < params.length
      val = params[i].split('=')
      if val[0] == paramName
        return unescape(val[1])
      i++
    null
  isTouchDevice: ->
    try
      document.createEvent 'TouchEvent'
      return true
    catch e
      return false
    return
  getViewPort: ->
    e = window
    a = 'inner'
    if !('innerWidth' in window)
      a = 'client'
      e = document.documentElement or document.body
    {
    width: e[a + 'Width']
    height: e[a + 'Height']
    }
  getUniqueID: (prefix) ->
    'prefix_' + Math.floor(Math.random() * (new Date).getTime())
  isIE8: ->
    isIE8
  isIE9: ->
    isIE9
  isRTL: ->
    isRTL
  isAngularJsApp: ->
    if typeof angular == 'undefined' then false else true
  getAssetsPath: ->
    assetsPath
  setAssetsPath: (path) ->
    assetsPath = path
    return
  setGlobalImgPath: (path) ->
    globalImgPath = path
    return
  getGlobalImgPath: ->
    assetsPath + globalImgPath
  setGlobalPluginsPath: (path) ->
    globalPluginsPath = path
    return
  getGlobalPluginsPath: ->
    assetsPath + globalPluginsPath
  getGlobalCssPath: ->
    assetsPath + globalCssPath
  getBrandColor: (name) ->
    if brandColors[name]
      brandColors[name]
    else
      ''
  getResponsiveBreakpoint: (size) ->
    # bootstrap responsive breakpoints
    sizes =
      'xs': 480
      'sm': 768
      'md': 992
      'lg': 1200
    if sizes[size] then sizes[size] else 0

  }
