import React from 'react';
import { SvgXml } from 'react-native-svg';

const logoXml = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="20" fill="#6200EE"/>
  <path d="M50 100 L150 100" stroke="white" stroke-width="8"/>
  <circle cx="70" cy="130" r="20" stroke="white" stroke-width="8" fill="none"/>
  <circle cx="130" cy="130" r="20" stroke="white" stroke-width="8" fill="none"/>
  <path d="M50 100 L50 70 L150 70 L150 100" stroke="white" stroke-width="8" fill="none"/>
</svg>
`;

export const LogoIcon = ({ width = 200, height = 200 }) => (
  <SvgXml xml={logoXml} width={width} height={height} />
);
