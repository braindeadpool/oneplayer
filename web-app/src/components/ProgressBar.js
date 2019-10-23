import React from 'react';
import { Slider,FormattedTime, Direction } from 'react-player-controls';

const Bar = ({ style, children, ...props }) => (
  <div
    style={{
      height: 6,
      width: '100%',
      ...style,
    }}
  >
    {children}
  </div>
)

// Create a basic bar that represents time
const TimeBar = ({ children }) => (
  <div
    style={{
      height: 6,
      width: '100%',
      background: 'blue',
    }}
  >
    {children}
  </div>
)

const TimeTooltip = ({ numSeconds, style = {} }) => (
  <div
    style={{
      display: 'inline-block',
      position: 'absolute',
      bottom: '100%',
      transform: 'translateX(-50%)',
      padding: 8,
      borderRadius: 3,
      background: 'darkblue',
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      lineHeight: 16,
      textAlign: 'center',
      ...style,
    }}
  >
    <FormattedTime numSeconds={numSeconds} />
  </div>
)

export class ProgressBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // This will be a normalised value between 0 and 1,
      // or null when not hovered
      hoverValue: null,
    }

    this.handleIntent = this.handleIntent.bind(this)
    this.handleIntentEnd = this.handleIntentEnd.bind(this)
  }

  handleIntent(value) {
    this.setState({
      hoverValue: value,
    })
  }

  handleIntentEnd() {
    // Note that this might not be invoked if the user ends
    // a control change with the mouse outside of the slider
    // element, so you might want to do this inside a
    // onChangeEnd callback too.
    this.setState({
      hoverValue: null,
    })
  }

  render() {
    const { hoverValue } = this.state

    return (
      <Slider
        direction={Direction.HORIZONTAL}
        style={{
          position: 'relative',
        }}
        onIntent={this.handleIntent}
        onIntentEnd={this.handleIntentEnd}
      >
        {/* Buffer bar */}
        <Bar style={{ background: 'silver', width: `${this.props.amountBuffered * 100}%` }} />

        <TimeBar />

        {hoverValue !== null && (
          <TimeTooltip
            numSeconds={hoverValue * this.props.duration}
            style={{
              left: `${hoverValue * 100}%`,
            }}
          />
        )}
      </Slider>
    )
  }
}
