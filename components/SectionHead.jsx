// 全ページ共通のセクション見出し。h2 + 小さな青ラベルの1パターンのみ。
// 表示言語の反対側の言語がラベルに入る（JA時: 英語ラベル / EN時: 日本語ラベル）。
export default function SectionHead({ ja, en }) {
  return (
    <div className="section-head" data-reveal>
      <h2>
        <span className="ja">{ja}</span>
        <span className="en">{en}</span>
      </h2>
      <span className="section-en mono">
        <span className="ja">{en}</span>
        <span className="en">{ja}</span>
      </span>
    </div>
  );
}
