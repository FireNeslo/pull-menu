directive('pullMenuItem', function pullMenuItem() {
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
