import React from 'react';
import {render} from 'react-dom';

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount() {
    this.state = null
  }

  classSet(...args) {
    let result = []
    args.forEach((arg) => {
      if (arg) {
        if (Array.isArray(arg)) result.push(this.classSet(...arg))
        else if (typeof arg === 'string') result.push(arg)
        else if (typeof arg === 'object') result.push(...(Object.keys(arg).filter(k => arg[k])))
      }
    })

    return result.join(' ')
  }
}

export {
  React,
  Component,
  render
}