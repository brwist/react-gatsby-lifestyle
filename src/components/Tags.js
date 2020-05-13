import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const Tag = styled.li`
    display: inline-block;
    vertical-align: middle;

    height: ${props => props.theme.desktopVW(40)};

    margin-bottom: calc(${props => props.theme.sizes.desktop} / 4);
    padding: 0 ${props => props.theme.desktopVW(20)};

    background-color: rgba(255, 255, 255, 0.05);
    border-radius: ${props => props.theme.desktopVW(4)};

    &:not(:last-of-type) {
        margin-right: calc(${props => props.theme.sizes.desktop} / 4);
    }
`

const Label = styled.span`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.s};
    line-height: ${props => props.theme.desktopVW(38)};

    color: ${props => props.theme.colors.light};
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
