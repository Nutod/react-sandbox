import React, { CSSProperties } from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  } as CSSProperties,
}

export default class Loading extends React.Component<
  { text: string; speed: number },
  { content: string }
> {
  state = { content: this.props.text }
  interval: number | undefined
  static propTypes: {
    text: PropTypes.Validator<string>
    speed: PropTypes.Validator<number>
  }
  static defaultProps: { text: string; speed: number }

  componentDidMount() {
    const { speed, text } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }))
    }, speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return <p style={styles.content}>{this.state.content}</p>
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
}
