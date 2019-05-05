import * as React from 'react'
import { PureComponent } from 'react'
import { Input } from './styles'

class PanelTextInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || '',
    }

    this.handleRef = this.handleRef.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        value: nextProps.defaultValue,
      })
    }
  }

  onMouseDown() {
    const { onMouseDown } = this.props

    if (onMouseDown) {
      onMouseDown()
    }
  }

  onBlur() {
    const { onBlur } = this.props

    if (onBlur) {
      onBlur()
    }
  }

  render() {
    const { placeholder, width } = this.props
    const { value } = this.state
    return React.createElement(Input, {
      type: 'text',
      placeholder,
      value,
      onChange: this.handleChange,
      onKeyDown: this.handleKeydown,
      onMouseDown: this.onMouseDown,
      onBlur: this.onBlur,
      ref: this.handleRef,
      width,
    })
  }

  focus() {
    const { input } = this

    if (input) {
      input.focus()
    }
  }

  handleChange() {
    const { onChange } = this.props

    if (this.input) {
      this.setState({
        value: this.input.value,
      })
    }

    if (onChange && this.input) {
      onChange(this.input.value)
    }
  }

  handleKeydown(e) {
    if (e.keyCode === 13 && this.props.onSubmit) {
      e.preventDefault() // Prevent from submitting if an editor is inside a form.

      this.props.onSubmit(this.input.value)
    } else if (e.keyCode === 27 && this.props.onCancel) {
      this.props.onCancel()
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e)
    }
  }

  handleRef(input) {
    if (input instanceof HTMLInputElement) {
      this.input = input

      if (this.props.autoFocus) {
        // Need this to prevent jumping when we render TextInput inside Portal @see ED-2992
        window.setTimeout(() => input.focus())
      }
    } else {
      this.input = undefined
    }
  }
}

export default PanelTextInput