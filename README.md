[![Build Status](https://travis-ci.org/LocusEnergy/ember-d3-helpers.svg?branch=master)](https://travis-ci.org/LocusEnergy/ember-d3-helpers)

<!-- [![Code Climate](https://codeclimate.com/github/spencer516/ember-d3-helpers/badges/gpa.svg)](https://codeclimate.com/github/spencer516/ember-d3-helpers)
[![Ember Observer Score](http://emberobserver.com/badges/ember-d3-helpers.svg)](http://emberobserver.com/addons/ember-d3-helpers)
 -->

# ember-d3-helpers

This library provides a collection of helpers for building D3 graphs via Ember.js templates.
Component and helpers provided in this library are intended to be primitives that one could use to build a D3 graphs.

Support for more features is ongoing.

## Configuration

Currently, there are no configuration options for this addon in `config/environment.js`. At the moment, this addon will add all the required `d3` dependencies.

## Live Examples

You can view a demo of a few ways to use these helpers [here](http://locusenergy.github.io/ember-d3-helpers).
Checkout [`ember-sparkles`](https://github.com/LocusEnergy/ember-sparkles) to see example implementations using these primitives.

## Components
* [`d3-graph`](#d3-graph)
* [`d3-element`](#d3-element)

## Helpers
* [Selection Helpers](#selection-helpers)
  - [`d3-select`](#d3-select)
  - [`d3-select-all`](#d3-select-all)
  - [`d3-join`](#d3-join)
  - [`d3-attr`](#d3-attr)
  - [`d3-call`](#d3-call)
* [Shape helpers](#shape-helpers)
  - [`d3-arc`](#d3-arc)
  - [`d3-area`](#d3-area)
  - [`d3-line`](#d3-line)  
  - [`d3-pie`](#d3-pie)
* [Transition Helpers](#transition-helpers)
  - [`d3-transition`](#d3-transition-transition)
  - [`d3-transition-delay`](#d3-transition-delay-amount)
  - [`d3-attr-tween`](#d3-attr-tween)
* [Linear Scales](#linear-scales)
	- [`linear-scale`](#linear-scale)
	- [`time-scale`](#time-scale)
  - [`seq-color-scale`](#seq-color-scale)
* [Ordinal Scales](#ordinal-scales)
	- [`band-scale`](#band-scale)
	- [`point-scale`](#point-scale)
  - [`cat-color-scale`](#cat-color-scale)
* [Scale Derivatives](#scale-derivatives)
	- [`scale-tics`](#scale-ticks)
	- [`scale-value`](#scale-value)
* [Misc Helpers](#misc-helpers)
	- [`immut-array`](#immut-array)
	- [`time-interval`](#time-interval)

# Usage

## `{{d3-graph}}`

`d3-graph` is used to provide root level
selection to render discrete D3 elements, such as SVG `<svg>` and groups `<g>`.
You can change this with by specifying the component's `tagName`
(ie `{{d3-graph (pipe ...) tagName="svg"}}`).

It can be used inline.

```hbs
{{d3-graph (pipe
  (d3-attr "name" "fred")
)}}
```

It can be nested to allow multiple graph pipes to be rendered into the root component.

```hbs
{{#d3-graph as |d3|}}
  {{d3.graph (pipe ...)}}
  {{d3.graph (pipe ...)}}
{{/d3-graph}}
```

You can pass a graph pipe into the parent component. The nested components will receive selection that's a result of the parent's graph pipe.

```hbs
{{#d3-graph (pipe
    (d3-select-all "rect")
    (d3-data data)
  ) as |d3|}}
  {{! selection here will be result of pipe above }}
  {{d3.graph (pipe ...)}}
  {{d3.graph (pipe ...)}}
{{
```
----------


## `{{d3-element}}`

`d3-element` is used to render simple SVG elements using d3's dynamic data join.

#### Properties

_required_
* `element-name`: a string specifying the type of SVG element to render (`circle`, `rect`, etc.)
* `data`: data to be bound to the component

_optional_
* `selector`: a unique selector string
* `data-accessor`: accessor function to pass to d3's data join method
* `transition`: a d3 transition object


#### Configurable Pipes

_required_
* `on-enter`

_optional_
* `enter-transition`
* `update-transition`
* `on-update`: if not provided, the post-transition update step uses `on-enter` (mirrors typical D3 behavior)
* `exit-transition`
* `on-exit`

#### example
```hbs
{{d3-element
  element-name='circle'
  selector='rotator'
  data=points
  on-enter=(pipe
    (d3-attr 'cx' (r/get 'cx'))
    (d3-attr 'cy' (r/get 'cy'))
    (d3-attr 'r' 3)
  )
  update-transition=(pipe
    (d3-attr 'r' 0)
  )
  on-exit=(pipe
    (d3-attr 'r' 200)
  )
}}

```

----------

### Selection Helpers

#### `(d3-select selector)`
[D3 Select](https://github.com/d3/d3-selection#select)

Select an element matching selector and return a selection object.

```hbs
{{d3-graph (pipe
  (d3-select "#my-link")
  (d3-attr "name" "fred")
)}}
```

#### `(d3-select-all selector)`
[D3 Select All](https://github.com/d3/d3-selection#selectAll)

Selects all elements that match the specified selector string.

```hbs
{{d3-graph (pipe
  (d3-select-all "rect")
  (d3-data data)
  (d3-style "color" "red")
)}}
```

#### `(d3-data data [key])`
[D3 Data](https://github.com/d3/d3-selection#selection_data)

Joins the specified array of data with the selected elements, returning a new selection that it represents the update selection: the elements successfully bound to data.

```hbs
{{d3-graph (pipe
  (d3-select-all "rect")
  (d3-data data key)
  (d3-join
    enter=(pipe
      (d3-append "rect")
      (d3-text (r/get "number"))
    )
  )
)}}
```

#### `(d3-join [enter=] [update=] [exit=])`

Helper for implementing D3's general update pattern. This helper doesn't have a corresponding function in the API because
this helper represents a pattern rather than a specific function in the API. Use it when you need to specify `selection.enter().update().exit()`.

Read more about [D3's General Update Pattern](https://bl.ocks.org/mbostock/3808218).

```hbs
{{d3-graph (pipe
  (d3-select "svg")
  (d3-select-all "rect")
  (d3-data data)
  (d3-join
    enter=(pipe
      (d3-append "rect")
      (d3-text (r/param))
    )
    update=(pipe
      (d3-text (r/param))
    )
    exit=(pipe
      (d3-remove)
    )
  )
)}}
```

#### `(d3-attr name value)`
[D3 Attr](https://github.com/d3/d3-selection#selection_attr)

Set attribute with specified name to specified value. Value can be a string or a function.

```hbs
{{d3-graph (pipe
  (d3-select ".myelement")
  (d3-attr "name" name)
)}}
```

#### `(d3-call (pipe ...))`
[D3 Call](https://github.com/d3/d3-selection#selection_call)

Invokes the specified function exactly once, passing in this selection along with any optional arguments.

```hbs
{{d3-graph (pipe
  (d3-select ".test-items")
  (d3-call (pipe
    (d3-select-all ".car")
    (d3-attr "color" "red")
  ))
  (d3-call (pipe
    (d3-select-all ".boat")
    (d3-attr "color" "blue")
  ))
  (d3-append 'i')
  (d3-attr "class" "truck")
)}}
```
#### `(d3-on typenames [listener [capture]])`
[D3 On](https://github.com/d3/d3-selection#selection_on)

Adds or removes a _listener_ to each selected element for the specified event
_typenames_. The specified _listener_ will be evaluated for each selected
element, being passed the current datum (_d_), the current index (_i_), and the
current group (_nodes_), with this as the current DOM element.

An optional _capture_ flag may be specified which corresponds to the W3C
[useCapture flag](https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration).

```hbs
{{d3-graph (pipe
  (d3-select ".test-items")
  (d3-call (pipe
    (d3-select-all ".car")
    (d3-on "click" listener)
  ))
)}}
```

----------


### Shape Helpers

### `(d3-arc params {innerRadius, outerRadius, startAngle, endAngle})`
[D3 Arc](https://github.com/d3/d3-shape/blob/master/README.md#arcs)

The arc generator produces a circular or annular sector, as in a pie or donut chart.


### `(d3-area [xScale, yScale] {xAccessor, yAccessor})`
[D3 Areas](https://github.com/d3/d3-shape/blob/master/README.md#areas)

The area generator produces an area, as in an area chart.

```hbs
{{d3-graph
  (pipe
    (d3-select-all 'path')
    (d3-data data)
    (d3-join
      enter=(pipe
        (d3-append 'path')
        (d3-attr 'd'
          (d3-area
            xScale
            yScale
            xAccessor=(d3-get 'x')
            yAccessor=(d3-get 'y')
          )
        )
      )
    )
  )
}}
```

### `(d3-line [xScale, yScale] {xAccessor, yAccessor})`
[D3 Lines](https://github.com/d3/d3-shape/blob/master/README.md#lines)

The line generator produces a spline or polyline, as in a line chart.

----------


### Transition Helpers

#### `(d3-transition [transition])`
[D3 Transition](https://github.com/d3/d3-transition/blob/master/README.md#transition)

Apply transition to a selection. Transition can be a name for this transition or a parent transition.

```hbs
{{d3-graph (pipe
  (d3-select-all "rect")
  (d3-data data)
  (d3-join
    enter=(pipe
      (d3-append "rect")
      (d3-attr height)
      (d3-transition)
      (d3-attr (r/get "y"))
  ))
)}}
```

#### `(d3-transition-delay amount)`
[D3 Transition Delay](https://github.com/d3/d3-transition/blob/master/README.md#transition_delay)

Apply a delay to a transition. Must be chained behind a transition.

```hbs
{{d3-graph (pipe
  (d3-join
    enter=(pipe
      (d3-append "rect")
      (d3-attr height)
      (d3-transition)
      (d3-delay 300)
      (d3-attr (r/get "y"))
  ))
)}}
```

#### `(d3-attr-tween)`
[D3 Attr Tween](https://github.com/d3/d3-transition/blob/master/README.md#transition_attrTween)

For each selected element, creates a tween for the attribute with the specified name with the specified interpolator value.

Good description of `transition.attrTween` can be found in [this example](http://bl.ocks.org/cmdoptesc/6228457).

----------

### Linear scales

#### `linear-scale`
[D3 Linear Scale](https://github.com/d3/d3-scale#linear-scales)

```js
export default Ember.Component.extend({
  domain: [0, 10],
  range: [0, 100]
});
```

```hbs
{{#with (linear-scale domain range nice=true) as |scale|}}
  <span>I am {{scale-value scale 5}} 50 years old.</span>
{{/with}}
```

#### `time-scale`
[D3 Time Scale](https://github.com/d3/d3-scale#time-scales)

```js
export default Ember.Component.extend({
  domain: [
    new Date(2016, 2, 1),
    new Date(2016, 2, 31)
  ]
});
```

```hbs
{{#with (time-scale domain) as |scale|}}
  {{#each (scale-ticks scale (time-interval 'day')) as |date|}}
    <a>{{date}}</a>
  {{/each}}
{{/with}}
```
### `seq-color-scale`
Sequential color scale description.

### Ordinal scales

#### `band-scale`
Band scale description

#### `point-scale`
Point Scale description

#### `cat-color-scale`
Categorical color scale.

----------

### Scale Derivatives

#### `scale-ticks`
Scale ticks

#### `scale-value`
Get the calculated value from a scale

----------

### Misc Helpers

#### `immut-array`
Immutable array helper description

#### `time-interval`
A time interval helper.

----------


## Installation

* `git clone <repository-url>` this repository
* `cd ember-d3-helpers`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
