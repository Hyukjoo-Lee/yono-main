import FindForm from './Component/FindForm';

export function FindID() {
  const find = '아이디 찾기';

  return (
    <div>
      <FindForm find={find} $visibleID="true" />
    </div>
  );
}
