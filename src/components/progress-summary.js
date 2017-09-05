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
        <Flex justifyContent='space-between' spacing={`${spacing[2]} 0`}>
            <Text bold >
                {name}
            </Text>
            <div>
                <Text bold >
                    {formatCurrency(actual)}
                </Text>
                <Text>
                    {' of '}
                </Text>
                <Text bold >
                    {formatCurrency(planned)}
                </Text>
            </div>
        </Flex>
        <Progress value={actual / planned} color={actual < planned ? colors.green : colors.red} />
    </div>
)
