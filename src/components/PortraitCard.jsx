export function PortraitCard() {
  return (
    <figure className="portrait-card reveal-item">
      <div className="portrait-card__image-wrap">
        <img
          src={`${import.meta.env.BASE_URL}assets/pocholo-portrait.webp`}
          alt="Black-and-white portrait of Pocholo wearing sunglasses beside a young child."
          width="576"
          height="1024"
          fetchPriority="high"
        />
      </div>
      <figcaption>POCHOLO / DAVAO CITY / 19</figcaption>
    </figure>
  );
}
