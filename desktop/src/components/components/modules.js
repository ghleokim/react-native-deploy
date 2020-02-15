import styled from 'styled-components';
import { HEADER_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/config';

export const Button = styled.a`
  font-size: 1em;
  text-align: center;
  margin-bottom: 0.5em;
  padding: 0 0.3em 0 0.3em;
  text-decoration: none;
  color: '#333333'; 
  :hover {
    color: salmon;
    text-decoration: underline;
  }
`;

export const CoveredPage = styled.div`
  height: ${SCREEN_HEIGHT}px;
  width: ${SCREEN_WIDTH}px;
  align-content: center;
  justify-content: center;
  text-align: center;
  background-color: #edeaea;
  display: flex;
`

export const ContentContainer = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;

