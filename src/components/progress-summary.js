// @flow
import React from 'react'
import styled from 'styled-components'
import {Progress} from 'rebass'
import {Link} from 'react-router-dom'
import {formatCurrency} from '../formatting'
import {
    Flex,
    Text,
    spacing,
    colors,
} from './base'


const StyledProgressSummary = styled.div`
    border: 0.5px solid ${colors.lightGray};
    padding: ${spacing[0]} ${spacing[0]};
    margin-bottom: ${spacing[0]};
    color: ${colors.black};
    &:hover {
        background-color: ${colors.lightGray};
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;

`

export const ProgressSummary = (
    {name, planned, actual, link}:
    {name: string, planned: number, actual: number, link: string},
) => (
    <StyledLink to={link} >
        <StyledProgressSummary >
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
        </StyledProgressSummary>
    </StyledLink>
)
