import React from 'react';

interface ArataLogoProps {
  className?: string;
  size?: number | string;
}

export const ArataLogo: React.FC<ArataLogoProps> = ({ className = 'w-full h-full', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      width={size || '100%'}
      height={size || '100%'}
      className={className}
      aria-label="Arata Manufacturing Logo"
    >
      {/* Latar Belakang Biru #556BFF */}
      <rect width="600" height="600" fill="#556BFF" rx="40" />

      <g fill="#FFFFFF" transform="translate(50, 0)">
        {/* Manufacturing */}
        <text
          x="390"
          y="245"
          fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
          fontSize="22"
          fontWeight="300"
          textAnchor="end"
          letterSpacing="0.5"
        >
          Manufacturing
        </text>

        {/* Huruf A */}
        <path d="M 90 350 L 122 250 L 152 250 L 184 350 L 153 350 L 146 325 L 128 325 L 121 350 Z M 132 303 L 142 303 L 137 272 Z" />

        {/* Huruf r */}
        <path d="M 194 285 L 217 285 L 217 296 C 223 287 234 283 245 284 L 245 308 C 233 306 220 312 217 322 L 217 350 L 194 350 Z" />

        {/* Huruf a (pertama) */}
        <path d="M 252 317 C 252 297 268 283 292 283 C 316 283 331 296 331 315 L 331 350 L 309 350 L 309 340 C 302 348 290 353 278 353 C 261 353 250 342 250 328 C 250 314 263 305 285 304 L 309 303 L 309 300 C 309 292 300 287 290 287 C 280 287 273 291 272 297 Z M 309 318 L 289 319 C 278 320 272 323 272 328 C 272 334 278 338 286 338 C 298 338 309 330 309 321 Z" />

        {/* Huruf t (Lengkungan Kustom) */}
        <path d="M 338 285 L 358 285 L 358 262 L 380 262 L 380 285 L 402 285 L 402 304 L 380 304 L 380 325 C 380 334 385 338 393 338 C 397 338 401 337 404 335 L 404 352 C 398 354 391 355 384 355 C 367 355 358 346 358 328 L 358 304 L 338 304 Z" />

        {/* Huruf a (kedua) */}
        <path d="M 409 317 C 409 297 425 283 449 283 C 473 283 488 296 488 315 L 488 350 L 466 350 L 466 340 C 459 348 447 353 435 353 C 418 353 407 342 407 328 C 407 314 420 305 442 304 L 466 303 L 466 300 C 466 292 457 287 447 287 C 437 287 430 291 429 297 Z M 466 318 L 446 319 C 435 320 429 323 429 328 C 429 334 435 338 443 338 C 455 338 466 330 466 321 Z" />

        {/* Katakana アラタ */}
        <text
          x="290"
          y="380"
          fontFamily="'Hiragino Sans', 'Meiryo', 'MS Gothic', 'Noto Sans JP', sans-serif"
          fontSize="18"
          textAnchor="middle"
          letterSpacing="10"
        >
          アラタ
        </text>
      </g>
    </svg>
  );
};
