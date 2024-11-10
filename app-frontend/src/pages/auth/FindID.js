import FindForm from "./authComponents/FindForm";
export function FindID() {
  const find = "아이디 찾기";
  return (
    <div>
      <FindForm find={find} />
    </div>
  );
}
