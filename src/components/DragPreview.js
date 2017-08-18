import React from 'react';
import PropTypes from 'prop-types';
import { DragItemTypes } from './Interactable';
import { DragLayer } from 'react-dnd';
import { injectGlobal } from 'styled-components';

// TODO if you define transform feature here using styled-components,
// it doesn't work well. All element using this are positioned (0, 0)
injectGlobal`
  @keyframes preview-effect-alpha {
    from { opacity: 1.0; transform:scale(1.1)}
    to { opacity: 0.3; transform:scale(0.9)}
  }
`;

function getItemStyles(props) {
  const { currentOffset, currentOffsetDiff } = props;
  const { geometry } = props.item;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffsetDiff;
  let moveX = geometry.left + x;
  let moveY = geometry.top + y;
  return {
    position: 'fixed',
    left: moveX,
    top: moveY,
    opacity: 0.7,
    backgroundColor: 'transparent',
    width: geometry.width,
    height: geometry.height,
    animation: 'preview-effect-alpha 500ms ease-in-out infinite alternate'
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    currentOffsetDiff: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging()
  };
}

class CustomDragLayer extends React.Component {
  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    const previewStyle = {
      width: '100%'
    };

    let previewContent = item.id;
    if (item.preview.type === 'image') {
      previewContent = <img src={item.preview.src} style={previewStyle} />
    } else if (item.preview.type === 'video') {
      previewContent = <video src={item.preview.src}  style={previewStyle} loop autoPlay />
    } else {
      console.error('not supported type: ', item.preview.type);
    }

    return (
      <div style={getItemStyles(this.props)}>
        {previewContent}
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

export default DragLayer(collect)(CustomDragLayer);
