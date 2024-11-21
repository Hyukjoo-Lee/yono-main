import React from "react";
import  FindForm  from "./Component/FindForm";
export function FindPassword() {
  const find="비밀번호 찾기";
  return (
    <div>
      <FindForm find={find}/>
    </div>
  );
}