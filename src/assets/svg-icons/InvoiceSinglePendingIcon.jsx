import React from "react";

const InvoiceSinglePendingIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_686_17418)">
        <g opacity="0.4" filter="url(#filter0_d_686_17418)">
          <path
            d="M50.0006 91.6668C73.0131 91.6668 91.6673 73.0127 91.6673 50.0002C91.6673 26.9877 73.0131 8.3335 50.0006 8.3335C26.9882 8.3335 8.33398 26.9877 8.33398 50.0002C8.33398 73.0127 26.9882 91.6668 50.0006 91.6668Z"
            fill="#FFC700"
          />
        </g>
        <path
          d="M65.4583 66.3831C64.8965 66.3932 64.3446 66.2335 63.875 65.9248L50.9583 58.2165C47.75 56.2998 45.375 52.0915 45.375 48.3831V31.2998C45.375 29.5915 46.7917 28.1748 48.5 28.1748C50.2083 28.1748 51.625 29.5915 51.625 31.2998V48.3831C51.625 49.8831 52.875 52.0915 54.1667 52.8415L67.0833 60.5498C68.5833 61.4248 69.0417 63.3415 68.1667 64.8415C67.8834 65.3074 67.4861 65.6935 67.0123 65.9632C66.5384 66.233 66.0036 66.3775 65.4583 66.3831Z"
          fill="#FFC700"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_686_17418"
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
            result="effect1_dropShadow_686_17418"
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
            result="effect1_dropShadow_686_17418"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_686_17418"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_686_17418">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InvoiceSinglePendingIcon;
