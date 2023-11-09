import React from "react";

const InvoiceSingleFailIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4" filter="url(#filter0_d_686_17435)">
        <path
          d="M50.0006 91.6668C73.0125 91.6668 91.6673 73.012 91.6673 50.0002C91.6673 26.9883 73.0125 8.3335 50.0006 8.3335C26.9888 8.3335 8.33398 26.9883 8.33398 50.0002C8.33398 73.012 26.9888 91.6668 50.0006 91.6668Z"
          fill="#EC1D1D"
        />
      </g>
      <path
        d="M54.4167 50L64 40.4167C65.2083 39.2083 65.2083 37.2083 64 36C62.7917 34.7917 60.7917 34.7917 59.5833 36L50 45.5833L40.4167 36C39.2083 34.7917 37.2083 34.7917 36 36C34.7917 37.2083 34.7917 39.2083 36 40.4167L45.5833 50L36 59.5833C34.7917 60.7917 34.7917 62.7917 36 64C36.625 64.625 37.4167 64.9167 38.2083 64.9167C39 64.9167 39.7917 64.625 40.4167 64L50 54.4167L59.5833 64C60.2083 64.625 61 64.9167 61.7917 64.9167C62.5833 64.9167 63.375 64.625 64 64C65.2083 62.7917 65.2083 60.7917 64 59.5833L54.4167 50Z"
        fill="#EC1D1D"
      />
      <defs>
        <filter
          id="filter0_d_686_17435"
          x="2.33398"
          y="3.3335"
          width="105.334"
          height="105.333"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="9"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_686_17435"
          />
          <feOffset dx="5" dy="6" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.352941 0 0 0 0 0.541176 0 0 0 0 0.941176 0 0 0 0.28 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_686_17435"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_686_17435"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default InvoiceSingleFailIcon;
