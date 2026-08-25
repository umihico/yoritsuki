// ブランドロックアップ（2段）。表示言語側が上段、もう一方が下段に入れ替わる。
export default function Brand() {
  return (
    <>
      <div className="name">
        <span className="ja">ヨリツキ</span>
        <span className="en">YORITSUKI</span>
      </div>
      <div className="roman mono">
        <span className="ja">YORITSUKI</span>
        <span className="en">ヨリツキ</span>
      </div>
    </>
  );
}
