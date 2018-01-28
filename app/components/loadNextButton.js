import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentForward from 'material-ui/svg-icons/content/forward';

const LoadNextButton = (props) => {
  return (
    <FloatingActionButton
      style={{
        position: "fixed",
        bottom: 16,
        right: 16
      }}
      {...props}
    >
      <ContentForward />
    </FloatingActionButton>
  );
};

export default LoadNextButton;
