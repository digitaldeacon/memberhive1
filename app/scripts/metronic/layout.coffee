###
Core script to handle the entire theme and core functions
###

window.Layout = do ->
  # BEGIN:CORE HANDLERS
  # this function handles responsive layout on screen size resize or mobile device rotate.
  # Handle sidebar menu links

  handleSidebarMenuActiveLink = (mode, el) ->
    url = location.hash.toLowerCase()
    menu = $('.page-sidebar-menu')
    if mode == 'click' or mode == 'set'
      el = $(el)
    else if mode == 'match'
      menu.find('li > a').each ->
        path = $(this).attr('href').toLowerCase()
        # url match condition
        if path.length > 1 and url.substr(1, path.length - 1) == path.substr(1)
          el = $(this)
          return
        return
    if !el or el.size() == 0
      return
    if el.attr('href').toLowerCase() == 'javascript:;' or el.attr('href').toLowerCase() == '#'
      return
    # disable active states
    menu.find('li.active').removeClass 'active'
    menu.find('li > a > .selected').remove()
    if menu.hasClass('page-sidebar-menu-hover-submenu') == false
      menu.find('li.open').each ->
        if $(this).children('.sub-menu').size() == 0
          $(this).removeClass 'open'
          $(this).find('> a > .arrow.open').removeClass 'open'
        return
    else
      menu.find('li.open').removeClass 'open'
    el.parents('li').each ->
      $(this).addClass 'active'
      $(this).find('> a > span.arrow').addClass 'open'
      if $(this).parent('ul.page-sidebar-menu').size() == 1
        $(this).find('> a').append '<span class="selected"></span>'
      if $(this).children('ul.sub-menu').size() == 1
        $(this).addClass 'open'
      return
    if mode == 'click'
      if Metronic.getViewPort().width < window.Metronic.getResponsiveBreakpoint('md') and \
          $('.page-sidebar').hasClass('in')
        # close the menu on mobile view while laoding a page
        $('.page-header .responsive-toggler').click()
    return

  # Handle sidebar menu

  handleSidebarMenu = ->
    resBreakpointMd = Metronic.getResponsiveBreakpoint('md')
    $('.page-sidebar').on 'click', 'li > a', (e) ->
      if Metronic.getViewPort().width >= resBreakpointMd and \
          $(this).parents('.page-sidebar-menu-hover-submenu').size() == 1
        # exit of hover sidebar menu
        return
      if $(this).next().hasClass('sub-menu') == false
        if Metronic.getViewPort().width < resBreakpointMd and $('.page-sidebar').hasClass('in')
          # close the menu on mobile view while laoding a page
          $('.page-header .responsive-toggler').click()
        return
      if $(this).next().hasClass('sub-menu always-open')
        return
      parent = $(this).parent().parent()
      the = $(this)
      menu = $('.page-sidebar-menu')
      sub = $(this).next()
      autoScroll = menu.data('auto-scroll')
      slideSpeed = parseInt(menu.data('slide-speed'))
      keepExpand = menu.data('keep-expanded')
      if keepExpand != true
        parent.children('li.open').children('a').children('.arrow').removeClass 'open'
        parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp slideSpeed
        parent.children('li.open').removeClass 'open'
      slideOffeset = -200
      if sub.is(':visible')
        $('.arrow', $(this)).removeClass 'open'
        $(this).parent().removeClass 'open'
        sub.slideUp slideSpeed, ->
          if autoScroll == true and $('body').hasClass('page-sidebar-closed') == false
            if $('body').hasClass('page-sidebar-fixed')
              menu.slimScroll 'scrollTo': the.position().top
            else
              Metronic.scrollTo the, slideOffeset
          return
      else
        $('.arrow', $(this)).addClass 'open'
        $(this).parent().addClass 'open'
        sub.slideDown slideSpeed, ->
          if autoScroll == true and $('body').hasClass('page-sidebar-closed') == false
            if $('body').hasClass('page-sidebar-fixed')
              menu.slimScroll 'scrollTo': the.position().top
            else
              Metronic.scrollTo the, slideOffeset
          return
      e.preventDefault()
      return
    # handle ajax links within sidebar menu
    $('.page-sidebar').on 'click', ' li > a.ajaxify', (e) ->
      e.preventDefault()
      Metronic.scrollTop()
      url = $(this).attr('href')
      menuContainer = $('.page-sidebar ul')
      pageContent = $('.page-content')
      pageContentBody = $('.page-content .page-content-body')
      menuContainer.children('li.active').removeClass 'active'
      menuContainer.children('arrow.open').removeClass 'open'
      $(this).parents('li').each ->
        $(this).addClass 'active'
        $(this).children('a > span.arrow').addClass 'open'
        return
      $(this).parents('li').addClass 'active'
      if Metronic.getViewPort().width < resBreakpointMd and $('.page-sidebar').hasClass('in')
        # close the menu on mobile view while laoding a page
        $('.page-header .responsive-toggler').click()
      Metronic.startPageLoading()
      the = $(this)
      $.ajax
        type: 'GET'
        cache: false
        url: url
        dataType: 'html'
        success: (res) ->
          if the.parents('li.open').size() == 0
            $('.page-sidebar-menu > li.open > a').click()
          Metronic.stopPageLoading()
          pageContentBody.html res
          Layout.fixContentHeight()
          # fix content height
          Metronic.initAjax()
          # initialize core stuff
          return
        error: (xhr, ajaxOptions, thrownError) ->
          Metronic.stopPageLoading()
          pageContentBody.html '<h4>Could not load the requested content.</h4>'
          return
      return
    # handle ajax link within main content
    $('.page-content').on 'click', '.ajaxify', (e) ->
      e.preventDefault()
      Metronic.scrollTop()
      url = $(this).attr('href')
      pageContent = $('.page-content')
      pageContentBody = $('.page-content .page-content-body')
      Metronic.startPageLoading()
      if Metronic.getViewPort().width < Metronic.getResponsiveBreakpoint('md') and $('.page-sidebar').hasClass('in')
        # close the menu on mobile view while laoding a page
        $('.page-header .responsive-toggler').click()
      $.ajax
        type: 'GET'
        cache: false
        url: url
        dataType: 'html'
        success: (res) ->
          Metronic.stopPageLoading()
          pageContentBody.html res
          Layout.fixContentHeight()
          # fix content height
          Metronic.initAjax()
          # initialize core stuff
          return
        error: (xhr, ajaxOptions, thrownError) ->
          pageContentBody.html '<h4>Could not load the requested content.</h4>'
          Metronic.stopPageLoading()
          return
      return
    # handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
    $(document).on 'click', '.page-header-fixed-mobile .responsive-toggler', ->
      Metronic.scrollTop()
      return
    return

  # Helper function to calculate sidebar height for fixed sidebar layout.

  _calculateFixedSidebarViewportHeight = ->
    sidebarHeight = Metronic.getViewPort().height - $('.page-header').outerHeight() - 30
    if $('body').hasClass('page-footer-fixed')
      sidebarHeight = sidebarHeight - $('.page-footer').outerHeight()
    sidebarHeight

  # Handles fixed sidebar

  handleFixedSidebar = ->
    menu = $('.page-sidebar-menu')
    Metronic.destroySlimScroll menu
    if $('.page-sidebar-fixed').size() == 0
      return
    if Metronic.getViewPort().width >= Metronic.getResponsiveBreakpoint('md')
      menu.attr 'data-height', _calculateFixedSidebarViewportHeight()
      Metronic.initSlimScroll menu
    return

  # Handles sidebar toggler to close/hide the sidebar.

  handleFixedSidebarHoverEffect = ->
    body = $('body')
    if body.hasClass('page-sidebar-fixed')
      $('.page-sidebar').on('mouseenter', ->
        if body.hasClass('page-sidebar-closed')
          $(this).find('.page-sidebar-menu').removeClass 'page-sidebar-menu-closed'
        return
      ).on 'mouseleave', ->
        if body.hasClass('page-sidebar-closed')
          $(this).find('.page-sidebar-menu').addClass 'page-sidebar-menu-closed'
        return
    return

  # Hanles sidebar toggler

  handleSidebarToggler = ->
    body = $('body')
    if $.cookie and $.cookie('sidebar_closed') == '1' and
        Metronic.getViewPort().width >= Metronic.getResponsiveBreakpoint('md')
      $('body').addClass 'page-sidebar-closed'
      $('.page-sidebar-menu').addClass 'page-sidebar-menu-closed'
    # handle sidebar show/hide
    $('body').on 'click', '.sidebar-toggler', (e) ->
      sidebar = $('.page-sidebar')
      sidebarMenu = $('.page-sidebar-menu')
      $('.sidebar-search', sidebar).removeClass 'open'
      if body.hasClass('page-sidebar-closed')
        body.removeClass 'page-sidebar-closed'
        sidebarMenu.removeClass 'page-sidebar-menu-closed'
        if $.cookie
          $.cookie 'sidebar_closed', '0'
      else
        body.addClass 'page-sidebar-closed'
        sidebarMenu.addClass 'page-sidebar-menu-closed'
        if body.hasClass('page-sidebar-fixed')
          sidebarMenu.trigger 'mouseleave'
        if $.cookie
          $.cookie 'sidebar_closed', '1'
      $(window).trigger 'resize'
      return
    handleFixedSidebarHoverEffect()
    # handle the search bar close
    $('.page-sidebar').on 'click', '.sidebar-search .remove', (e) ->
      e.preventDefault()
      $('.sidebar-search').removeClass 'open'
      return
    # handle the search query submit on enter press
    $('.page-sidebar .sidebar-search').on 'keypress', 'input.form-control', (e) ->
      if e.which == 13
        $('.sidebar-search').submit()
        return false
      #<---- Add this line
      return
    # handle the search submit(for sidebar search and responsive mode of the header search)
    $('.sidebar-search .submit').on 'click', (e) ->
      e.preventDefault()
      if $('body').hasClass('page-sidebar-closed')
        if $('.sidebar-search').hasClass('open') == false
          if $('.page-sidebar-fixed').size() == 1
            $('.page-sidebar .sidebar-toggler').click()
          #trigger sidebar toggle button
          $('.sidebar-search').addClass 'open'
        else
          $('.sidebar-search').submit()
      else
        $('.sidebar-search').submit()
      return
    # handle close on body click
    if $('.sidebar-search').size() != 0
      $('.sidebar-search .input-group').on 'click', (e) ->
        e.stopPropagation()
        return
      $('body').on 'click', ->
        if $('.sidebar-search').hasClass('open')
          $('.sidebar-search').removeClass 'open'
        return
    return

  # Handles the horizontal menu

  handleHeader = ->
    # handle search box expand/collapse
    $('.page-header').on 'click', '.search-form', (e) ->
      $(this).addClass 'open'
      $(this).find('.form-control').focus()
      $('.page-header .search-form .form-control').on 'blur', (e) ->
        $(this).closest('.search-form').removeClass 'open'
        $(this).unbind 'blur'
        return
      return
    # handle hor menu search form on enter press
    $('.page-header').on 'keypress', '.hor-menu .search-form .form-control', (e) ->
      if e.which == 13
        $(this).closest('.search-form').submit()
        return false
      return
    # handle header search button click
    $('.page-header').on 'mousedown', '.search-form.open .submit', (e) ->
      e.preventDefault()
      e.stopPropagation()
      $(this).closest('.search-form').submit()
      return
    return

  # Handles the go to top button at the footer

  handleGoTop = ->
    offset = 300
    duration = 500
    if navigator.userAgent.match(/iPhone|iPad|iPod/i)
      # ios supported
      $(window).bind 'touchend touchcancel touchleave', (e) ->
        if $(this).scrollTop() > offset
          $('.scroll-to-top').fadeIn duration
        else
          $('.scroll-to-top').fadeOut duration
        return
    else
      # general
      $(window).scroll ->
        if $(this).scrollTop() > offset
          $('.scroll-to-top').fadeIn duration
        else
          $('.scroll-to-top').fadeOut duration
        return
    $('.scroll-to-top').click (e) ->
      e.preventDefault()
      $('html, body').animate { scrollTop: 0 }, duration
      false
    return

  # END:CORE HANDLERS
  {
  initHeader: ->
    handleHeader()
    # handles horizontal menu
    return
  setSidebarMenuActiveLink: (mode, el) ->
    handleSidebarMenuActiveLink mode, el
    return
  initSidebar: ->
    #layout handlers
    handleFixedSidebar()
    # handles fixed sidebar menu
    handleSidebarMenu()
    # handles main menu
    handleSidebarToggler()
    # handles sidebar hide/show
    if Metronic.isAngularJsApp()
      handleSidebarMenuActiveLink 'match'
    # init sidebar active links
    Metronic.addResizeHandler handleFixedSidebar
    # reinitialize fixed sidebar on window resize
    return
  initContent: ->
    return
  initFooter: ->
    handleGoTop()
    #handles scroll to top functionality in the footer
    return
  init: ->
    @initHeader()
    @initSidebar()
    @initContent()
    @initFooter()
    return
  fixContentHeight: ->
    return
  initFixedSidebarHoverEffect: ->
    handleFixedSidebarHoverEffect()
    return
  initFixedSidebar: ->
    handleFixedSidebar()
    return

  }
