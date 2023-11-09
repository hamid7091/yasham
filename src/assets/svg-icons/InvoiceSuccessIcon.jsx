import React from "react";

const InvoiceSuccessIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4" filter="url(#filter0_d_609_15243)">
        <path
          d="M50.0006 91.6668C73.0125 91.6668 91.6673 73.012 91.6673 50.0002C91.6673 26.9883 73.0125 8.3335 50.0006 8.3335C26.9888 8.3335 8.33398 26.9883 8.33398 50.0002C8.33398 73.012 26.9888 91.6668 50.0006 91.6668Z"
          fill="#008C72"
        />
      </g>
      <path
        d="M44.084 64.9168C43.2507 64.9168 42.459 64.5835 41.8757 64.0002L30.084 52.2085C28.8757 51.0002 28.8757 49.0002 30.084 47.7918C31.2923 46.5835 33.2923 46.5835 34.5007 47.7918L44.084 57.3752L65.5007 35.9585C66.709 34.7502 68.709 34.7502 69.9173 35.9585C71.1257 37.1668 71.1257 39.1668 69.9173 40.3752L46.2923 64.0002C45.709 64.5835 44.9173 64.9168 44.084 64.9168Z"
        fill="#008C72"
      />
      <defs>
        <filter
          id="filter0_d_609_15243"
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
            result="effect1_dropShadow_609_15243"
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
            result="effect1_dropShadow_609_15243"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_609_15243"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default InvoiceSuccessIcon;
