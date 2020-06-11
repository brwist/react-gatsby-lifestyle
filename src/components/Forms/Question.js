import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'

const CheckboxField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: calc(${props => props.theme.sizes.mobile} / 2);
    padding-bottom: calc(${props => props.theme.sizes.mobile} / 2);
    
    border-bottom: 1px solid rgba(224, 226, 228, 0.2);

    &:last-of-type {
        margin-bottom: ${props => props.theme.sizes.mobile};
    }

    ${props => props.theme.above.desktop`
        align-items: flex-end;

        margin-bottom: ${props.theme.sizes.desktop};
        padding-bottom: ${props.theme.sizes.desktop};

        &:last-of-type {
            margin-bottom: calc(${props.theme.sizes.desktop} * 2);
        }
    `}
`

const QuestionWrapper = styled.div`    
    width: 70%;
`

const Title = styled.p`
    display: block;
    
    margin-bottom: ${props => props.theme.mobileVW(10)};

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};

    color: ${props => props.theme.colors.light};

    opacity: 0.5;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.desktopVW(10)};

        font-size: ${props.theme.fontSizes.desktop.s};
    `}
`

const AnswerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    width: 25%;
`

const Answer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    text-align: center;

    &:not(:last-of-type) {
        margin-right: calc(${props => props.theme.sizes.mobile} / 3);
    }

    ${props => props.active == 'true' ? `
        opacity: 1;
    ` : `
        opacity: 0.5;
    `}

    ${props => props.theme.above.desktop`
        flex-direction: row;

        &:not(:last-of-type) {
            margin-right: ${props.theme.sizes.desktop};
        }
    `}
`

const CheckboxWrapper = styled.div`
    position: relative;
    
    width: 1.5rem;
    height: 1.5rem;

    margin-bottom: ${props => props.theme.mobileVW(10)};
    
    border: 0.1rem solid white;
    border-radius: 1rem;

    ${props => props.theme.above.desktop`
        margin-bottom: 0;
        margin-right: ${props.theme.desktopVW(10)};
    `}
`

const Checkbox = styled.input`
    position: absolute;
    
    top: 0;
    left: 0;
    
	width: 100%;
	height: 100%;
    
	margin: 0;
    
    opacity: 0;
    
    cursor: pointer;
`

const CheckboxFacade = styled.div`
    display: none;
    
    position: absolute;
    
    top: 50%;
	left: 50%;
    
	transform: translate(-50%, -50%);
    
    width: 0.75rem;
	height: 0.75rem;
    
    border-radius: 0.6rem;
    background: white;
    
    pointer-events: none;
    
	${Checkbox}:checked + & {
		display: block;
	}
`

const StyledQuestion = styled.label`
	display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};
    line-height: 1.5;

    color: ${props => props.theme.colors.light};
    
    cursor: pointer;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const Label = styled.span`
    display: block;

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.xs};

    color: ${props => props.theme.colors.white};

    ${props => props.theme.above.desktop`
        display: inline-block;
        vertical-align: middle;

        font-size: ${props.theme.fontSizes.desktop.p};

        color: ${props.theme.colors.light};
    `}
`

const Question = ({
    questionState,
    index,
    data: {
        title
    }
}) => {

    const [active, setActive] = useState(2)

    const toggleActive = i => {
        setActive(i)
        questionState(i)
    }

    return (
        <CheckboxField answerState={active}>
            <QuestionWrapper>
                <Title>{`Question ${index}`}</Title>
                <StyledQuestion>{title}</StyledQuestion>
            </QuestionWrapper>
            <AnswerWrapper>
                <Answer active={active == 0 ? 'true' : 'fase'} onClick={() => toggleActive(0)}>
                    <CheckboxWrapper>
                        <Checkbox type='checkbox' checked={active == 0 ? true : false} readOnly />
                        <CheckboxFacade />
                    </CheckboxWrapper>
                    <Label>Yes</Label>
                </Answer>
                <Answer active={active == 1 ? 'true' : 'fase'} onClick={() => toggleActive(1)}>
                    <CheckboxWrapper>
                        <Checkbox type='checkbox' checked={active == 1 ? true : false} readOnly />
                        <CheckboxFacade />
                    </CheckboxWrapper>
                    <Label>No</Label>
                </Answer>
            </AnswerWrapper>
        </CheckboxField>
    )
}

export default Question
