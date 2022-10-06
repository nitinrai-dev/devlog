import styled, { css } from 'styled-components'

export const Flex = styled.div`
  display: flex;
  gap: ${props => props.gap || "0"};
  width: 100%;
  height: 100%;
  
  ${props =>
    props.alignCenter &&
    css`
      align-items: center;
    `};
  ${props =>
    props.alignStart &&
    css`
      align-items: flex-start;
    `};
  ${props =>
    props.alignEnd &&
    css`
      align-items: flex-end;
    `};
  ${props =>
    props.alignStretch &&
    css`
      align-items: stretch;
    `};
  ${props =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
    `};
  ${props =>
    props.justifyStart &&
    css`
      justify-content: flex-start;
    `};
  ${props =>
    props.justifyEnd &&
    css`
      justify-content: flex-end;
    `};
  ${props =>
    props.justifyCenter &&
    css`
      justify-content: center;
    `};
  ${props =>
    props.flexColumn &&
    css`
      flex-direction: column;
    `};
    ${props =>
    props.flexWrap &&
    css`
      flex-wrap: wrap;
    `};
    ${props =>
    props.autoHeight &&
    css`
      height: auto;
    `};
`