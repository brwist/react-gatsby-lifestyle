import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import ButtonSubmit from './../Buttons/ButtonSubmit'
import TextRenderer from './../TextRenderer'
import Question from './Question'

import { questions, results } from './../../data/selftest'

const Wrapper = styled.div``

const Title = styled.h4`
    display: block;

    margin-bottom: ${props => props.theme.sizes.mobile};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.mobile.h5};

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};

        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Description = styled.p``

const Questions = styled.div``

const Form = styled.form`
    margin-top: ${props => props.theme.mobileVW(80)};
    
    ${props => props.theme.above.desktop`
        margin-top: ${props.theme.desktopVW(80)};
    `}
`

const ResultWrapper = styled.div``

const SelfTest = ({
    lang,
    className,
    data
}) => {

    const [answers, setAnswers] = useState([])
    const [formResult, setFormResult] = useState(0)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [submitActive, setSubmitActive] = useState(false)
    
    const checkResult = (e) => {
        e.preventDefault()

        let faults = 0

        answers.forEach((el, i) => {
            if (questions[i].correct != el) faults++
        })

        setFormResult(faults < 3 ? 0 : 1)
        setFormSubmitted(true)
    }

    useEffect(() => {
        let defaultAnswers = []

        questions.forEach((el) => {
            defaultAnswers.push(2)
        })

        setAnswers(defaultAnswers)
    }, [])

    const changeAnswers = (value, index) => {
        let currentAnswers = answers

        currentAnswers[index] = value

        setAnswers(currentAnswers)

        if (!currentAnswers.includes(2)) {
            setSubmitActive(true)
        }
    }

    return (
        <Wrapper className={className}>
            {formSubmitted ? (
                <ResultWrapper>
                    <Title>{results[formResult].title}</Title>
                    <Description>{results[formResult].description}</Description>
                    <ButtonPrimary label='More information' to='' />
                </ResultWrapper>
            ) : (
                <Questions>
                    {data && (
                        <>
                            <Title>{data.contentTitle}</Title>
                            <TextRenderer data={data.contentDescription} />
                        </>
                    )}
                    <Form>
                        {questions.map((question, i) => {
                            return (
                                <Question 
                                    key={i} 
                                    index={i + 1}
                                    data={question}
                                    questionState={e => changeAnswers(e, i)}
                                />
                            )
                        })}
                        <ButtonSubmit
                            inactive={submitActive ? 'true' : 'false'}
                            onClick={(e) => checkResult(e)}
                                value={submitActive ? 'View my testresults' : 'Answer all questions'}
                        />
                    </Form>
                </Questions>
            )}
        </Wrapper>
    )
}

export default SelfTest
