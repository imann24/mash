import React from "react";
import { Container, Grid, Modal, Card, Spacer, Text } from '@nextui-org/react';

const CrossOutList = ({ listGroups }) => {
    return (
        <Container>
            <Modal open={true} blur={true}>
                <Card bordered>
                    <Grid.Container gap={3}>
                        {Object.entries(listGroups).map(([key, vals]) =>
                            <Grid md={true}>
                                <Container>
                                <Text weight="bold">{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                                <ol>
                                    {vals.map((el) =>
                                        <li key={el.value}>{el.value}</li>
                                    )}
                                </ol>
                                <Spacer/>
                                </Container>
                            </Grid>
                        )}
                    </Grid.Container>
                </Card>
            </Modal>
        </Container>
    )
};

export default CrossOutList;
