import { ApolloClient, InMemoryCache } from "@apollo/client";

const rocketClient = new ApolloClient({
    uri: "https://api.spacex.land/graphql",
    cache: new InMemoryCache(),
});
export default rocketClient;
