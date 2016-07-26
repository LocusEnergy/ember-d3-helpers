[![Build Status](https://travis-ci.org/LocusEnergy/ember-d3-helpers.svg?branch=master)](https://travis-ci.org/LocusEnergy/ember-d3-helpers)

<!-- [![Code Climate](https://codeclimate.com/github/spencer516/ember-d3-helpers/badges/gpa.svg)](https://codeclimate.com/github/spencer516/ember-d3-helpers)
[![Ember Observer Score](http://emberobserver.com/badges/ember-d3-helpers.svg)](http://emberobserver.com/addons/ember-d3-helpers)
 -->

# ember-d3-helpers

This library provides a suite of Ember helpers around the d3v4 API. Support for more features is ongoing.

## Configuration

Currently, there are no configuration options for this addon in `config/environment.js`. At the moment, this addon will add all the required `d3` dependencies.

## Live Examples

You can view a demo of a few ways to use these helpers [here](http://locusenergy.github.io/ember-d3-helpers)

## Available Helpers
* [Selection Helpers]
  - [`d3-select`](#d3-select)
  - [`d3-select-all`](#d3-select-all)
  - [`d3-join`](#d3-join)
  - [`d3-attr`](#d3-attr)
  - [`d3-call`](#d3-call)
* [Transition Helpers]
  - [`d3-transition`](#d3-transition)
  - [`d3-transition-delay`](#d3-transition-delay)
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

## Usage

### Selection Helpers

#### `(d3-select selector)`
[D3 Select](https://github.com/d3/d3-selection#select)

Select an element matching selector and return a selection object.

```hbs
{{shhh (compute (pipe 
  (d3-select "#my-link")
  (d3-attr "name" "fred")
  ))
}}
```

#### `(d3-select-all selector)`
[D3 Select All](https://github.com/d3/d3-selection#selectAll)

Selects all elements that match the specified selector string.

```hbs
{{shhh (compute (pipe
    (d3-select-all "rect")
    (d3-join data)
    (d3-style "color" "red")
  ))
}}
```

#### `(d3-data data [key])`
[D3 Data](https://github.com/d3/d3-selection#selection_data)

Joins the specified array of data with the selected elements, returning a new selection that it represents the update selection: the elements successfully bound to data.

```hbs
{{shhh (compute (pipe
    (d3-select "svg")
    (d3-select-all "rect")
    (d3-data data key)
    (d3-join 
      enter=(pipe
        (d3-append "rect")
        (d3-text (r/get "number"))
      )
    )
  ))
}}
```

#### `(d3-join selector data accessor [enter=] [update=] [exit=])`

Helper for implementing D3's general update pattern. This helper doesn't have a corresponding function in the API because 
this helper represents a pattern rather than a specific function in the API. Use it when you need to specify `selection.enter().update().exit()`.

Read more about [D3's General Update Pattern](https://bl.ocks.org/mbostock/3808218). 

```hbs
{{shhh (compute (pipe
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
  ))
}}
```

#### `(d3-attr name value)`
[D3 Attr](https://github.com/d3/d3-selection#selection_attr)

Set attribute with specified name to specified value. Value can be a string or a function.

```hbs
{{shhh (compute (pipe
    (d3-select ".myelement")
    (d3-attr "name" name)
  ))
}}
```

#### `(d3-call (pipe ...))`
[D3 Call](https://github.com/d3/d3-selection#selection_call)

Invokes the specified function exactly once, passing in this selection along with any optional arguments.

```hbs
{{shhh (compute (pipe 
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
  ))
}}
```

### Transition Helpers

#### `(d3-transition [transition])`
[D3 Transition](https://github.com/d3/d3-transition/blob/master/README.md#transition)

Apply transition to a selection. Transition can be a name for this transition or a parent transition. 

```hbs
{{d3-join 'rect' data
  enter=(pipe
    (d3-append 'rect')
    (d3-attr height)
    (d3-transition)
    (d3-attr (r/get 'y'))
  )
}}
```

#### `(d3-transition-delay amount)`
[D3 Transition Delay](https://github.com/d3/d3-transition/blob/master/README.md#transition_delay)

Apply a delay to a transition. Must be chained behind a transition.

```hbs
{{d3-join 'rect' data
  enter=(pipe
    (d3-append 'rect')
    (d3-attr height)
    (d3-transition)
    (d3-delay 300)
    (d3-attr (r/get 'y'))
  )
}}
```

#### `(d3-attr-tween)`
[D3 Attr Tween](https://github.com/d3/d3-transition/blob/master/README.md#transition_attrTween)

For each selected element, creates a tween for the attribute with the specified name with the specified interpolator value. 

Good description of `transition.attrTween` can be found in [this example](http://bl.ocks.org/cmdoptesc/6228457).

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

### Scale Derivatives

#### `scale-ticks`
Scale ticks

#### `scale-value`
Get the calculated value from a scale

### Misc Helpers

#### `immut-array`
Immutable array helper description

#### `time-interval`
A time interval helper.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
