interface Props {
  color?: string;
}

export default function LightningIcon({ color }: Props) {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.6106 18.2812C27.4456 18.2812 26.5272 17.2894 26.6165 16.1279L27.7102 1.91032C27.7895 0.879849 26.9747 0 25.9412 0C25.3774 0 24.8472 0.267913 24.5128 0.721763L7.70501 23.5324C6.73199 24.8529 7.67483 26.7188 9.31512 26.7188H15.8536C17.0187 26.7188 17.9371 27.7106 17.8477 28.8721L16.7541 43.0897C16.6748 44.1202 17.4896 45 18.5231 45C19.0869 45 19.617 44.7321 19.9515 44.2782L36.7593 21.4676C37.7323 20.1471 36.7894 18.2812 35.1492 18.2812H28.6106Z"
        fill={color || 'url(#paint0_linear_4_78)'}
      />
      <defs>
        <linearGradient
          id="paint0_linear_4_78"
          x1="5.35714"
          y1="22.5"
          x2="39.1071"
          y2="22.5"
          gradientUnits="userSpaceOnUse">
          <stop offset="0.479099" stopColor="#EA0004" />
          <stop offset="1" stopColor="#EA0004" />
        </linearGradient>
      </defs>
    </svg>
  );
}
