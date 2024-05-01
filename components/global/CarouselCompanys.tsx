export default function CarouselCompanys() {
  const images = [
    "https://images.ctfassets.net/k0lk9kiuza3o/6fo1ntHspDIwlAN45IgxRU/fbba98755d036e6d87631d0c5eccab25/doordash-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/Y595RQBDR1fW5blQZfd9l/b9f3e2557c598b1ea51bb4e55f507833/lyft-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/6PFPRWMRMxRXthyXYcDRiR/ee7cc3f3ca0ed78752db06ce662a95f8/compass-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/42drnxHfXrNOGKnVE9iA3r/a7f1bea3f67ca614e359eb6de12d8ba1/loreal-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/4AUQ47IN6ZBtXtWXt65L3D/24dae32ff49baaf8feecf9471804420d/zendesk-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/bOnLOncEyDdb8izczJggp/b98f4d8da30cfff0a87e8dce2bced46e/dropbox-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/k5u1aoWgLdVtFfc4tsyg3/cae65a31428205e2b46b229963d3b41e/Gong-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/7xVuRmZcIPeKLv5QaP2IFS/fe2200bf305c145f19a9657c3c6a7ec1/carnival-customer-logo.svg",
    "https://images.ctfassets.net/k0lk9kiuza3o/Fk2s4fCN5ubFpjQpZf8ef/90cb997106a745d0c6d3ed62acfa2324/indiana-university-customer-logo.svg",
  ];
  return (
    <div className="w-full flex items-center justify-center gap-10 overflow-hidden animTralst">
      {images.map((i) => (
        <picture key={i}>
          <img
            className="max-w-[176px] w-auto h-[32px] object-contain imgFilterBlack"
            src={i}
            alt="image"
            loading="lazy"
          />
        </picture>
      ))}
    </div>
  );
}
