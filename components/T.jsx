// 二言語テキスト。表示側の出し分けは CSS（:root[data-lang] .ja/.en）が担う。
export default function T({ ja, en }) {
  return (
    <>
      <span className="ja">{ja}</span>
      <span className="en">{en}</span>
    </>
  );
}
