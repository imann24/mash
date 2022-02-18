import React from "react";
import { Container, Grid, Modal, Card, Spacer, Text } from "@nextui-org/react";
import { cl as DynamicClassList } from "dynamic-class-list";

const CrossOutList = ({ listGroups, shouldShowList }) => {
    return (
        <Container>
            <Modal open={shouldShowList} blur={true}>
                <Card bordered>
                    <Grid.Container gap={3}>
                        {Object.entries(listGroups).map(([key, vals]) =>
                            <Grid key={key + "-grid"} md={true}>
                                <Container>
                                    <Text weight="bold">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Text>
                                    <ol key={key + "-list"}>
                                        {vals.map((el) =>
                                            <li key={key + el.value}
                                                className={DynamicClassList({
                                                    "crossed-out": el.crossedOut,
                                                    "chosen": el.chosen
                                                })}>
                                                {el.value}
                                            </li>
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
