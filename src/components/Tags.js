import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

const Tag = styled.li`
    display: inline-block;
    vertical-align: middle;

    height: ${props => props.theme.mobileVW(25)};

    padding: 0 ${props => props.theme.mobileVW(10)};

    background-color: #1a1b1d;
    border-radius: ${props => props.theme.mobileVW(4)};

    &:not(:first-of-type) {
        margin-left: calc(${props => props.theme.sizes.mobile} / 4);
    }

    ${props => props.theme.above.desktop`
        height: ${props.theme.desktopVW(40)};

        margin-bottom: calc(${props.theme.sizes.desktop} / 4);
        padding: 0 ${props.theme.desktopVW(20)};

        border-radius: ${props.theme.desktopVW(4)};

        &:not(:first-of-type) {
            margin-left: calc(${props.theme.sizes.desktop} / 4);
        }
    `}
`

const Label = styled.span`
    white-space: nowrap;
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.xxs};
    line-height: ${props => props.theme.mobileVW(25)};

    color: ${props => props.theme.colors.light};

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.xs};
        line-height: ${props.theme.desktopVW(38)};
    `}
`

const Tags = ({
    data,
    className,
    slice
}) => {
    
    const items = slice ? data.slice(0, slice) : data

    return (
        <List className={className}>
            {items.map((tag, i) => {
                return (
                    <Tag key={i}>
                        <Label>{tag}</Label>
                    </Tag>
                )
            })}
        </List>
    )
}

export default Tags
