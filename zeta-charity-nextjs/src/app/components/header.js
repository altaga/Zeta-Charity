import Image from "next/image";

export default function Header() {
  const size = 0.14;
  return (
    <div className="header-absolute">
      <Image
        src="/logoW.png"
        alt="Next.js Logo"
        width={1022 * size}
        height={443 * size}
        priority
      />
      <w3m-button />
    </div>
  );
}
