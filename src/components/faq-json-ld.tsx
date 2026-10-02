import { safeJsonLd } from "@/lib/safe-json-ld";

const FAQ = [
  {
    q: "リットル表記だけで買って失敗するのはなぜ？",
    a: "同じ30Lでも、袋の寸法はメーカーごとに違います。口まわりと高さのバランスが大事で、容量だけでは合わないことがあります。",
  },
  {
    q: "自治体指定袋でも使えますか？",
    a: "目安にはできますが、指定袋の実寸を優先してください。フクロメは一般的な家庭用ポリ袋の概算です。",
  },
  {
    q: "マチ付き袋やボックス型は？",
    a: "いまはマチなし平袋の一般寸法で判定しています。マチ付きは口が広がりやすいので、ギリギリなら一回り大きいサイズが安心です。",
  },
];

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
