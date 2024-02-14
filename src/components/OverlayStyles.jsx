import styled from 'styled-components'

export const OverlayContainer = styled.div`
    position: fixed;
    top: 4rem;
    left: 4rem;
    overflow: hidden;
`

export const OverlayButton = styled.button`
    display: block;
    padding: 1rem 2rem 1rem 2rem;
    margin-right: 1rem;
    float: left;

    font-family: 'Hatton';
    font-size: 2rem;
    color: black;

    background: none;
    border: 1.5px solid black;
    border-radius: 3rem;
`

export const LinksContainer = styled.div`
    position: fixed;
    top: 3rem;
    right: 3rem;
    overflow: hidden;
`

export const LogoLink = styled.a`
    width: fit-content;
    float: right;
    margin-left: 1rem;
`
