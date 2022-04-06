import Head from 'next/head'
import{ ApolloClient, InMemoryCache, gql} from "@apollo/client";
import rocketClient from "../apollo-client";
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { ServerStyles, createStylesServer } from '@mantine/next';
import {Calendar} from "@mantine/dates";
import {useState} from "react";
import {
    Accordion, Affix,
    AppShell,
    Badge,
    Button,
    Card, Center,
    Chip,
    Group,
    Header,
    Image,
    Navbar, RingProgress,
    SimpleGrid, Space,
    Text, Timeline,
    useMantineTheme
} from "@mantine/core";
import {GraphQLString} from "graphql";
import {useWindowScroll} from "@mantine/hooks";
const stylesServer = createStylesServer();
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


export default function Home( {spacexStuff}) {
  console.log('launches', spacexStuff);
    const theme = useMantineTheme();
    const [value, setValue] = useState(null);
    const [scroll, scrollTo] = useWindowScroll();
    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div className={styles.container}>
            <Head>
                <title>SpaceX API</title>
                <meta name="description" content="Get info from SpaceX rockets with GraphQL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    SpaceX Launches
                </h1>
                <p className={styles.description}>
                    Latest Launches From SpaceX
                </p>
            </main>
            <SimpleGrid cols={3} spacing="xl">

                {spacexStuff.map( rocket => {
                    console.log(rocket.active)
                    console.log(new Date(rocket.first_flight).toLocaleDateString("en-US"))
                    return (
                        <Card key="thecard" shadow="sm" p="lg">
                            <Group position="apart" style={{marginBottom: 5, marginTop: theme.spacing.sm}}>

                                <Text weight={500}> <strong>{rocket.name}</strong> </Text>
                                <Chip checked={false}>{rocket.type.toUpperCase()}</Chip>
                                {rocket.active ? (<Badge color="green" variant="light">
                                    Active
                                </Badge>) : (<Badge color="red" variant="light">
                                    Deactivate
                                </Badge>)}
                                <RingProgress size={140} thickness={11} label={
                                    <Text size="xs" align="center">
                                        Success Rate {rocket.success_rate_pct}%
                                    </Text>
                                }
                                              sections={[
                                                  {value: rocket.success_rate_pct, color: 'green'},
                                              ]}
                                />
                                <Space h="md" />
                                <Badge><strong>{ formatter.format( rocket.cost_per_launch) }</strong></Badge>
                            </Group>
                            <Space h="md" />
                                <Link href={rocket.wikipedia} passHref={true}>
                                    <Button>Learn more on Wiki</Button>
                                </Link>
                            <Space h="md" />
                            <Accordion>
                                <Accordion.Item label="Company">
                                    The rocket is provided by <strong> {rocket.company}</strong>
                                </Accordion.Item>
                                <Accordion.Item label="Description">
                                    <Badge> Made in {rocket.country}</Badge>
                                    <Space h="md" />
                                    <Badge> Rocket mass :  {rocket.mass.kg} (Kg)</Badge>
                                    <Space h="md" />
                                    <Badge> Rocket diameter :  {rocket.diameter.meters} (m)</Badge>
                                    <Space h="md" />
                                    {rocket.description}
                                </Accordion.Item>
                            </Accordion>
                            <Space h="md" />
                            <Timeline active={1}>
                                <Timeline.Item title="First launch" bulletSize={24}>
                                    <Text color="dimmed" size="sm">
                                        {rocket.first_flight}
                                    </Text>
                                </Timeline.Item>
                                <Timeline.Item title="Upcoming" bulletSize={24}>
                                    <Text color="dimmed" size="sm">
                                      Next Missions
                                    </Text>
                                </Timeline.Item>
                            </Timeline>
                        </Card>
                    );
                })}
    {/*            <Chip checked={rocket.active} value="vue" >Active</Chip>*/}
            </SimpleGrid>
        </div>
  )
}

export async function getStaticProps() {
  const { data } = await rocketClient.query({
    query: gql`query ExampleQuery{
  rockets(limit: 10) {
    name
    type
    wikipedia
    id
    height {
      meters
    }
    country
    first_flight
    diameter {
      meters
    }
    mass {
      kg
    }
    success_rate_pct
    company
    description
    active
    cost_per_launch
  }
}
`,
  });

  return {
    props: {
      spacexStuff: data.rockets,
    },
  };
}
