import styled from 'styled-components';
import { HEADER_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH, BREAK_POINT_MOBILE, BREAK_POINT_TABLET, BREAK_POINT_PC } from '../config/config';

export const Link = styled.a`
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

export const Button = styled.div`
  width: 100%;
  display: block;
  padding: 0.5em 0.3em 0.5em 0.3em;
  color: #ffffff;
  background-color: #4177c9;
  font-size: 0.8em;
  text-align: center;
  border-radius: 0.1em;
  border-width: 1px;
  border-color: #4177c9;
  :hover {
    background-color: #3167c9;
    cursor: pointer;
  }
`

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
  width: 70%;
`;

export const Input = styled.input`
  display: block;
  padding: 0.5em 0.3em 0.5em 0.3em;
  font-size: 0.8em;
  border-color: #333333;
  border-width: 1px;
  background-color: #ffffff;
  color: #777777;
  width: 100%;
  margin: 0.7em 0 0.7em 0;
`

const calcWidthPercent = span => {
  if (!span) return;

  const width = (span / 12) * 100;
  return width;
};

export const Col = styled.div`
  float: left;
  width: ${({ xs }) => (xs ? `${calcWidthPercent(xs)}%` : `100%`)};
  padding: 1rem;

  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: ${({ sm }) => sm && `${calcWidthPercent(sm)}%`};
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: ${({ md }) => md && `${calcWidthPercent(md)}%`};
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: ${({ lg }) => lg && `${calcWidthPercent(lg)}%`};
  }
`;