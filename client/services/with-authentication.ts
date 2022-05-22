import axios from "axios";

export default function withAuthentication(getServerSideProps) {
  return async (context) => {
    const jwt = context?.req?.cookies?.jwt;
    if (!jwt) {
      return {
        redirect: {
          destination: "/?e=no-token",
          permanent: false,
        },
      };
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NETWORK_API_URL}/validate`,
        {
          token: jwt,
        }
      );

      return getServerSideProps(
        context,
        {
          name: `${response.data.firstName} ${response.data.lastName}`,
        },
        jwt
      );
    } catch (e) {
      return {
        redirect: {
          destination: "/?e=invalid-token",
          permanent: false,
        },
      };
    }
  };
}
