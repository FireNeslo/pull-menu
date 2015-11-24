fn-drag-drop-angular
===
#### also check out
* [The jQuery wrapper](jquery.md)
* [The polyfill (experimental)](polyfill.md)
* [fnDragDrop](../README.md)

AngularJS wrapper for fnDragDrop

## Install
### npm
```bash
$ npm install FireNeslo/pull-menu --save
```
```js
angular.module('application', [require('pull-menu')])
```
### bower
```bash
$ bower install FireNeslo/pull-menu --save
```
```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/pull-menu/build/pull-menu.js"></script>
<link rel="stylesheet" href="bower_components/pull-menu/build/pull-menu.css">
```
## Usage
```js
angular.module('application', ['pullMenu'])
```
```html
<pull-menu>
  <pull-menu-item on-select="selected = 'one'">
    <h3>One</h3>
  </pull-menu-item>
  <pull-menu-item on-select="selected = 'two'">
    <h3>Two</h3>
  </pull-menu-item>
</pull-menu>

<h1>
  Selected: {{selected}}
</h1>
```

## demo
  [check it out live](http://fireneslo.github.io/pull-menu/demo)

##API

## &lt;pull-menu /&gt;
pull menu container

## &lt;pull-menu on-select="select()" /&gt;
pull menu item
* **on-select** *angular expression* - called when item is selected
