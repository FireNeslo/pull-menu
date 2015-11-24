angular.module('pullMenu', [])
.directive('pullMenuItem', function pullMenuItem() {
  return {
    require: '^pullMenu',
    link: function linkItem(scope, element, attrs, menu) {
      menu.elements.push(element)
      scope.$on('$destroy', function onDestroy() {
        menu.elements.splice(menu.elements.indexOf(element), 1)
      })
    }
  }
})
.directive('pullMenu', function pullMenu($document) {
  var prefix = 'transform' in $document[0].body.style ?
    'transform' : 'WebkitTransform'
  function client(axis,event) {
    event = event.touches?event.touches[0] || {} : event
    return event['client'+axis.toUpperCase()] || Infinity
  }
  function transform(string) {
    var style = {}
    style[prefix] = string
    return style
  }
  return {
    controller: function PullMenuController() {
      this.elements = []
    },
    controllerAs: 'pullMenu',
    link: function linkMenu(scope, element, attrs, menu) {
      var height = 0
      var dragging = false
      var position = []
      var previous = []
      var options = []
      var elements = menu.elements
      $document.on('mousedown touchstart', function start(event) {
        var weight = (window.innerWidth / 100) * 0.25
        height = element[0].offsetHeight
        dragging = true
        position = [client('x', event), client('y', event)]
        options = elements
          .map(function optionLimits(element, index) {
            if(index === 0) return {element:element, position: -Infinity}
            var relative = element[0].offsetLeft - position[0]
            return {
              position: relative / weight,
              element: element
            }
          })
          .sort(function positionSort(a, b) {
            return a.position - b.position
          })
      })
      function inRange(event, callback) {
        var selected = client('x',event) -  position[0]
        options.forEach(function(option, index) {
          var start = option.position
          var end = (options[index+1]||{}).position || Infinity
          callback(selected >= start && selected < end, option.element)
        })
      }
      $document.on('touchmove mousemove', function move(event) {
        if(!dragging) return
        previous = [client('x', event), client('y', event)]
        var relative = previous[1] - position[1] - height
        inRange(event, function isInRange(inrange, element) {
          if(inrange) {
            element.addClass('pull-menu-item-selected')
          } else {
            element.removeClass('pull-menu-item-selected')
          }
        })

        if(relative >= 0) return
        element.css(transform('translateY('+(relative)+'px)'))
        if(relative+height >= height/2) element.css(transform('translateY(0)'))
      })
      $document.on('mouseup touchend touchcancel', function(event) {
        dragging = false
        element.css(transform('translateY(-100%)' ))
        if(previous[1] - position[1] < height) return
        var selected = element[0].querySelector('.pull-menu-item-selected')
        if(selected) {
          scope.$eval(selected.getAttribute('on-select'))
          scope.$applyAsync()
        }
      })
    }
  }
})
