
import * as env from '../config/env'
import * as is from '../util/is'
import * as array from '../util/array'
import * as object from '../util/object'
import * as string from '../util/string'
import * as validator from '../util/validator'

function getComponentInfo(node, instance, callback) {
  let { component, attrs } = node
  instance.component(
    component,
    function (options) {
      let props = { }
      array.each(
        attrs,
        function (node) {
          props[string.camelCase(node.name)] = node.getValue()
        }
      )
      if (object.has(options, 'propTypes')) {
        validator.validate(props, options.propTypes)
      }
      callback(props, options)
    }
  )
}

export default {

  attach: function ({ el, node, instance }) {
    el.$component = [ ]
    getComponentInfo(
      node,
      instance,
      function (props, options) {
        let { $component } = el
        if (is.array($component)) {
          el.$component = instance.create(
            options,
            {
              el,
              props,
              replace: env.TRUE,
            }
          )
          array.each(
            $component,
            function (callback) {
              callback(el.$component)
            }
          )
        }
      }
    )
  },

  update: function ({ el, node, instance}) {
    let { $component } = el
    if (is.object($component)) {
      getComponentInfo(
        node,
        instance,
        function (props) {
          $component.set(props, env.TRUE)
        }
      )
    }
  },

  detach: function ({ el }) {
    let { $component } = el
    if ($component) {
      if (is.object($component)) {
        $component.destroy(env.TRUE)
      }
      el.$component = env.NULL
    }
  }

}
