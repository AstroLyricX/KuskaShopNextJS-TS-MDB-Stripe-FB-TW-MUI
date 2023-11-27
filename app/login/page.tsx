import { getCurrenUser } from "@/actions/getCurrenUser";
import { Container } from "../components/Container";
import { FromWrap } from "../components/FromWrap";
import { LoginForm } from "./LoginForm";

const Login = async () => {
  const currentUser = await getCurrenUser();
  return (
    <Container>
      <FromWrap>
        <LoginForm currentUser={currentUser} />
      </FromWrap>
    </Container>
  );
};

export default Login;
