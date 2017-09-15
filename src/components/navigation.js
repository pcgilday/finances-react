// @flow
import {map} from 'lodash'
import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {
    Box,
    Flex,
    Text,
} from 'rebass'


const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 1rem;
`

export const Navigation = ({items}: {items: Array<{url: string, label: string}>}) => (
    <Box is='nav' bg='green'>
        <Flex>
            {map(items, ({label, url}) => (
                <StyledLink to={url} key={url} >
                    <Text color='white' fontSize={[2, 3]} >
                        {label}
                    </Text>
                </StyledLink>
            ))}
        </Flex>
    </Box>
)
