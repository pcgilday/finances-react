// @flow
import React from 'react'
import {Progress} from 'rebass'
import {formatCurrency} from '../formatting'
import {
    Flex,
    Text,
    spacing,
    colors,
} from './base'


export const ProgressSummary = (
    {name, planned, actual}:
    {name: string, planned: number, actual: number},
) => (
    <div style={{paddingBottom: spacing[1]}}>
        <Flex justifyContent='space-between' spacing={`0 0 ${spacing[0]} 0`}>
            <Text size={3} bold >
                {name}
            </Text>

            <div>
                <Text size={2} bold >
                    {formatCurrency(actual)}
                </Text>
                <Text size={1} >
                    {' of '}
                </Text>
                <Text size={2} bold >
                    {formatCurrency(planned)}
                </Text>
            </div>
        </Flex>
        <Progress
            height={'25px'}
            value={actual / planned}
            color={actual < planned ? colors.green : colors.red} />
    </div>
)
