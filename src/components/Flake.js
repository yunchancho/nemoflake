import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import { func, bool } from 'prop-types';
import AnimatedFlake from './AnimatedFlake';

import { getEmptyImage } from 'react-dnd-html5-backend';
import { Draggable, DragItemTypes } from './Interactable';

const option = {
  type: DragItemTypes.FLAKE,
  spec: {
    beginDrag(props, monitor, component) {
      console.log('begin drag!')
      // TODO sometimes getBoundingClientRect doesn't get proper size of element
      // in case of transform with rotation. Why? 
      // And we need to pass current angle of element.
      const afElement = ReactDOM.findDOMNode(component.af);
      const geometry = afElement.getBoundingClientRect();
      return { ...props.item, geometry };
    },
    endDrag(props, monitor) {
      console.log('end drag!');
      if (!monitor.didDrop()) {
        return;
      }

      console.log('result: ', monitor.getDropResult());
      if (props.item.link.type === 'url') {
        //window.open(props.item.link.value, "_blank");
        window.alert(`card${props.item.id} dropped!`);
      }
    }
  },
  collect: (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
  }
};

class Flake extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO we need to check if props, state changed or not
    // This func should return only true if only needed.
    return true;
  }

  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div>
        <ReactTransitionGroup key="AnimatedFlake" component='div'>
          <AnimatedFlake ref={af => this.af = af} {...this.props} />
        </ReactTransitionGroup>
      </div>
    );
  }
}

Flake.propTypes = {
  connectDragSource: func.isRequired,
  connectDragPreview: func.isRequired,
  isDragging: bool.isRequired
}

export default Draggable(Flake, option);