directive('pullMenu', function pullMenu($document) {
  var transform = 'transform' in $document[0].body.style ?
    'transform' : 'WebkitTransform'
  function client(axis,event) {
    return (event.touches?event.touches[0]||{}:event)
      ['client'+axis.toUpperCase()] || Infinity
  }
  return {
    controller: function PullMenuController() {
      this.elements = []
    },
    controllerAs: 'pullMenu',
    link: function linkMenu(scope, element, attrs, menu) {
      var height = 0
      var dragging = false
      var position = 0

      var options = []
      var elements = menu.elements
      $document.on('mousedown touchstart', function start(event) {
        height = element[0].offsetHeight
        dragging = true
        position = client('y', event)
        options = elements
          .map(function optionLimits(element) {
            return {
              position: element[0].offsetLeft,
              element: element
            }
          })
          .sort(function positionSort(a, b) {
            return a.position - b.position
          })
      })
      function inRange(event, callback) {
        var selected = client('x',event)
        options.forEach(function(option, index) {
          var start = option.position
          var end = (options[index+1]||{}).position || Infinity
          callback(selected >= start && selected < end, option.element)
        })
      }
      var last = 0;
      $document.on('touchmove mousemove', function move(event) {
        if(!dragging) return
        var relative = client('y',event) - position - height
        inRange(event, function isInRange(inrange, element) {
          if(inrange) {
            element.addClass('pull-menu-item-selected')
          } else {
            element.removeClass('pull-menu-item-selected')
          }
        })

        if(relative >= 0) return
        element.css({[transform]: 'translateY('+(relative)+'px)'})
        if(relative+height >= height/2) element.css({
          [transform]: 'translateY(0)'
        })
      })
      $document.on('mouseup touchend touchcancel', function(event) {
        dragging = false
        var relative = client('y', event) - position
        element.css({[transform]: 'translateY(-100%)' })
        if(relative < height/2) return
        var selected = element[0].querySelector('.pull-menu-item-selected')
        if(selected) {
          scope.$eval(selected.getAttribute('on-select'))
          scope.$applyAsync()
        }
      })
    }
  }
})
