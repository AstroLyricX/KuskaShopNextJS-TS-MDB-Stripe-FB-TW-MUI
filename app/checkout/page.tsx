import { Container } from "../components/Container";
import { FromWrap } from "../components/FromWrap";
import { CheckoutClient } from "./CheckoutClient";

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FromWrap>
          <CheckoutClient />
        </FromWrap>
      </Container>
    </div>
  );
};

export default Checkout;
