import React from 'react'
import styled from 'styled-components'

import ButtonSubmit from './../Buttons/ButtonSubmit'
import TextRenderer from './../TextRenderer'

const Wrapper = styled.div`
    
`

const Title = styled.h4`
    display: block;

    margin-bottom: ${props => props.theme.sizes.desktop};

    font-family: ${props => props.theme.fontFamilies.nbBold};
    font-size: ${props => props.theme.fontSizes.desktop.h5};

    text-transform: uppercase;
`

const Form = styled.form`
    color: ${props => props.theme.colors.light};

    padding: ${props => props.theme.desktopVW(80)} 0;
`

const Field = styled.div`
	&:not(:first-child) {
		margin-top: ${props => props.theme.sizes.desktop};
	}
`

const Label = styled.label`
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.s};

    opacity: 0.5;
`

const Input = styled.input`
	display: block;
    
    width: 100%;
	height: calc(${props => props.theme.sizes.desktop} * 1.5);
    
    margin-top: 0.1rem;
    padding: 0 0.8rem 0 0;
    
	background: transparent;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.light};
    border-radius: 0;
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.p};

    color: ${props => props.theme.colors.light};

    &::placeholder {
        color: ${props => props.theme.colors.light};
    }
`

const GDPR = styled.div`
  	margin: ${props => props.theme.sizes.desktop} 0;
`

const CheckboxField = styled.div`
	display: flex;
	align-items: center;
`

const CheckboxWrapper = styled.div`
    flex: 0 0 2rem;
    
    position: relative;
    
    height: 2rem;
    
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
    
    width: 1rem;
	height: 1rem;
    
    border-radius: 0.6rem;
    background: white;
    
    pointer-events: none;
    
	${/* sc-selector */ Checkbox}:checked + & {
		display: block;
	}
`

const CheckboxLabel = styled.label`
	display: block;
    
    margin-left: calc(${props => props.theme.sizes.desktop} / 2);

    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.m};

    color: ${props => props.theme.colors.light};
    
    cursor: pointer;
`

const Note = styled.p`
    margin-top: ${props => props.theme.sizes.desktop};
    
    font-family: ${props => props.theme.fontFamilies.plainLight};
    font-size: ${props => props.theme.fontSizes.desktop.s};

    opacity: 0.5;
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
                action='https://cth-events.us4.list-manage.com/subscribe/post?u=f6104507653206db0b0ff6596&amp;id=01c466415e'
                method='post'
                name='mc-embedded-subscribe-form'
                target='_blank'
                noValidate
                className={className}
            >
                <Field>
                    <Label htmlFor='mce-LNAME'>Your first name</Label>
                    <Input
                        type='text'
                        name='LNAME'
                        className='required'
                        id='mce-LNAME'
                        placeholder='Fill in your first name'
                    />
                </Field>
                <Field>
                    <Label htmlFor='mce-FNAME'>Your last name</Label>
                    <Input
                        type='text'
                        name='FNAME'
                        className='required'
                        id='mce-FNAME'
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
                                id='gdpr_205'
                                name='gdpr[205]'
                                defaultValue='Y'
                            />
                            <CheckboxFacade />
                        </CheckboxWrapper>
                        <CheckboxLabel htmlFor='gdpr_205'>
                            Vink dit vakje aan als we je e-mails mogen sturen
                        </CheckboxLabel>
                    </CheckboxField>
                    <Note>
                        We gebruiken Mailchimp voor onze e-mail marketing. Door op aanmelden te klikken geef je toestemming aan Mailchimp om je informatie te verwerken.
                        <Anchor href='https://mailchimp.com/legal/' target='_blank'>Lees meer over Mailchimp's privacy beleid hier.</Anchor>
                    </Note>
                </GDPR>
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden='true'>
                    <input
                        type='text'
                        name='b_f6104507653206db0b0ff6596_01c466415e'
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
