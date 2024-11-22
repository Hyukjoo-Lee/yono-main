import FindForm from './Component/FindForm';
import AlarmID from './AlarmID';
export function FindID() {
  const find = '아이디 찾기';
  const address = '/AlarmID';
  return (
    <div>
      <FindForm find={find} address={address} />
      <AlarmID $visible={true} />
    </div>
  );
}
