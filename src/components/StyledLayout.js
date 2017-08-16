import React from 'react';
import styled from 'styled-components'; 

const StyledLayout = ({children}) => {
  const Wrapper = styled.div`
    position: fixed;
    left: 0%;
    top: 0%;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    flex-flow: row wrap;
    align-items: center;    
    background-color: transparent;
  `;

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

export default StyledLayout;