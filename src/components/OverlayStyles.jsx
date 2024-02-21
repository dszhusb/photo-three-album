import styled from 'styled-components'

export const OverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    padding: 1rem;
    margin: 2rem;

    width: fit-content;
    border-radius: 3rem;
    background-color: black;
`

export const LinksContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    margin: 2rem;
    width: fit-content;
`

export const OverlayButton = styled.button`
    display: block;
    padding: 0.5rem 1rem 0.5rem 1rem;
    float: left;

    font-family: 'RadioGrotesk';
    font-weight: 200;
    font-size: 1.5rem;
    color: white;
    background: none;
    border: none;
`

export const LogoLink = styled.a`
    padding: 0rem 0.5rem 0rem 0.5rem;
    float: right;
`
