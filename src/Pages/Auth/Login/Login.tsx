import { LoginMobile } from "./LoginMobile";
import { LoginDesk } from "./LoginDesk";

export default function Login() {
  return (
    <div>
      <div className="md:hidden">
        <LoginMobile />
      </div>
      <div className="max-md:hidden">
        <LoginDesk/>
      </div>
    </div>
  );
}
