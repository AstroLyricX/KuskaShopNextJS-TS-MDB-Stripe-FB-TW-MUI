import { getCurrenUser } from "@/actions/getCurrenUser";
import { Container } from "../components/Container";
import { FromWrap } from "../components/FromWrap";
import { RegisterForm } from "./RegisterForm";

const Register = async () => {
  const currentUser = await getCurrenUser();
  return (
    <Container>
      <FromWrap>
        <RegisterForm currentUser={currentUser} />
      </FromWrap>
    </Container>
  );
};

export default Register;
