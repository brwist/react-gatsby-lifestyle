import React from 'react'
import styled from 'styled-components'

import ButtonSubmit from './../Buttons/ButtonSubmit'
import TextRenderer from './../TextRenderer'

const Wrapper = styled.div``

const Title = styled.h4`
    display: block;

    margin-bottom: ${props => props.theme.sizes.mobile};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.mobile.h5};

    text-transform: uppercase;

    ${props => props.theme.above.desktop`
        margin-bottom: ${props.theme.sizes.desktop};

        font-family: ${props.theme.fontFamilies.nbBold};
        font-size: ${props.theme.fontSizes.desktop.h5};
    `}
`

const Form = styled.form`
    width: 100%;

    padding: ${props => props.theme.sizes.mobile} 0 0 0;
    
    color: ${props => props.theme.colors.light};

    ${props => props.theme.above.desktop`
        max-width: ${props.theme.desktopVW(500)};
    
        padding: ${props.theme.desktopVW(80)} 0 0 0;
    `}
`

const Field = styled.div`
	&:not(:first-child) {
		margin-top: ${props => props.theme.sizes.mobile};
    }
    
    ${props => props.theme.above.desktop`
        &:not(:first-child) {
            margin-top: ${props.theme.sizes.desktop};
        }
    `}
`

const Label = styled.label`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};

    opacity: 0.5;

    ${props => props.theme.above.desktop`
        font-size: ${props.theme.fontSizes.desktop.s};
    `}
`

const Input = styled.input`
	display: block;
    
    width: 100%;
	height: calc(${props => props.theme.sizes.mobile} * 1.5);
    
    margin-top: 0.1rem;
    padding: 0 0.8rem 0 0;
    
	background: transparent;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.light};
    border-radius: 0;
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};

    color: ${props => props.theme.colors.light};

    &::placeholder {
        color: ${props => props.theme.colors.light};
    }

    ${props => props.theme.above.desktop`
        height: calc(${props.theme.sizes.desktop} * 1.5);

        font-size: ${props.theme.fontSizes.desktop.p};
    `}
`

const GDPR = styled.div`
    margin: ${props => props.theme.sizes.mobile} 0;
    
    ${props => props.theme.above.desktop`
        margin: ${props.theme.sizes.desktop} 0;
    `}
`

const CheckboxField = styled.div`
	display: flex;
	align-items: center;
`

const CheckboxWrapper = styled.div`
    position: relative;
    
    width: 1.5rem;
    height: 1.5rem;
    
    border: 0.1rem solid white;
    border-radius: 1rem;
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

const CheckboxLabel = styled.label`
	display: block;
    
    margin-left: calc(${props => props.theme.sizes.mobile} / 2);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.s};

    color: ${props => props.theme.colors.light};
    
    cursor: pointer;

    ${props => props.theme.above.desktop`
        margin-left: calc(${props.theme.sizes.desktop} / 2);

        font-size: ${props.theme.fontSizes.desktop.m};
    `}
`

const Note = styled.p`
    margin-top: ${props => props.theme.sizes.mobile};
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.mobile.xs};

    opacity: 0.5;

    ${props => props.theme.above.desktop`
        margin-top: ${props.theme.sizes.desktop};
        
        font-size: ${props.theme.fontSizes.desktop.s};
    `}
`

const Anchor = styled.a`
    margin-left: 0.25rem;
    
	color: ${props => props.theme.colors.light};
    
    text-decoration: underline;
`

const JoinUs = ({
    className,
    data
}) => {

    return (
        <Wrapper>
            {data && (
                <>
                    <Title>{data.contentTitle}</Title>
                    <TextRenderer data={data.contentDescription}/>
                </>
            )}
            <Form
                action='https://rockstarlifestyle.us8.list-manage.com/subscribe/post?u=86397600011aa7ae66131d8b8&amp;id=5c30063382'
                method='post'
                name='mc-embedded-subscribe-form'
                target='_blank'
                noValidate
                className={className}
            >
                <Field>
                    <Label htmlFor='mce-FNAME'>Your first name</Label>
                    <Input
                        type='text'
                        name='FNAME'
                        className='required'
                        id='mce-FNAME'
                        placeholder='Fill in your first name'
                    />
                </Field>
                <Field>
                    <Label htmlFor='mce-LNAME'>Your last name</Label>
                    <Input
                        type='text'
                        name='LNAME'
                        className='required'
                        id='mce-LNAME'
                        placeholder='Fill in your last name'
                    />
                </Field>
                <Field>
                    <Label htmlFor='mce-EMAIL'>Your email please</Label>
                    <Input
                        type='email'
                        name='EMAIL'
                        className='required email'
                        id='mce-EMAIL'
                        placeholder='name@address.com'
                    />
                </Field>
                <Field>
                    <Label htmlFor='mce-PHONE'>Your phone number</Label>
                    <Input
                        type='text'
                        name='PHONE'
                        className='required'
                        id='mce-PHONE'
                        placeholder='+31 6 12345678'
                    />
                </Field>
                <Field>
                    <Label htmlFor='mce-MOTIVATION'>And your motivation to join Rockstar Lifestyle</Label>
                    <Input
                        type='text'
                        name='MOTIVATION'
                        className='required'
                        id='mce-MOTIVATION'
                        placeholder='I want to join Rockstar Lifestyle ..'
                    />
                </Field>

                <GDPR>
                    <CheckboxField>
                        <CheckboxWrapper>
                            <Checkbox
                                type='checkbox'
                                id='gdpr_22926'
                                name='gdpr[22926]'
                                defaultValue='Y'
                            />
                            <CheckboxFacade />
                        </CheckboxWrapper>
                        <CheckboxLabel htmlFor='gdpr_22926'>
                            Check this box if we can send you emails
                        </CheckboxLabel>
                    </CheckboxField>
                    <Note>
                        We use Mailchimp for our email marketing. By clicking on sign up you give Mailchimp permission to process your information.
                        <Anchor href='https://mailchimp.com/legal/' target='_blank'>Read more about Mailchimp's privacy policy here.</Anchor>
                    </Note>
                </GDPR>
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden='true'>
                    <input
                        type='text'
                        name='b_86397600011aa7ae66131d8b8_5c30063382'
                        tabIndex='-1'
                        defaultValue=''
                    />
                </div>
                <ButtonSubmit
                    value='Submit my application'
                    name='subscribe'
                    id='mc-embedded-subscribe'
                />
            </Form>
        </Wrapper>
    )
}

export default JoinUs
