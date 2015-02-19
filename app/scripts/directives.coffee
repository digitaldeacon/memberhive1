# Route State Load Spinner(used on page or content load)
window.GemmiiApp.directive 'ngSpinnerBar', [
  '$rootScope'
  ($rootScope) ->
    { link: (scope, element, attrs) ->
      # by defult hide the spinner bar
      element.addClass 'hide'
      # hide spinner bar by default
      # display the spinner bar whenever the route changes(the content part started loading)
      $rootScope.$on '$stateChangeStart', ->
        element.removeClass 'hide'
        # show spinner bar
        return
      # hide the spinner bar on rounte change success(after the content loaded)
      $rootScope.$on '$stateChangeSuccess', ->
        element.addClass 'hide'
        # hide spinner bar
        $('body').removeClass 'page-on-load'
        # remove page loading indicator
        Layout.setSidebarMenuActiveLink 'match'
        # activate selected link in the sidebar menu
        # auto scorll to page top
        setTimeout (->
          Metronic.scrollTop()
          # scroll to the top on content load
          return
        ), $rootScope.settings.layout.pageAutoScrollOnLoad
        return
      # handle errors
      $rootScope.$on '$stateNotFound', ->
        element.addClass 'hide'
        # hide spinner bar
        return
      # handle errors
      $rootScope.$on '$stateChangeError', ->
        element.addClass 'hide'
        # hide spinner bar
        return
      return
    }
]
# Handle global LINK click
window.GemmiiApp.directive 'a', ->
  {
  restrict: 'E'
  link: (scope, elem, attrs) ->
    if attrs.ngClick or attrs.href == '' or attrs.href == '#'
      elem.on 'click', (e) ->
        e.preventDefault()
        # prevent link click for above criteria
        return
    return

  }
# Handle Dropdown Hover Plugin Integration
window.GemmiiApp.directive 'dropdownMenuHover', ->
  { link: (scope, elem) ->
    #elem.dropdownHover()
    return
  }
