import styled from 'styled-components'
export { OverlayContainer, OverlayButton }

const OverlayContainer = styled.div`
    position: absolute;
    top: 40px;
    left: 40px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
`

const OverlayButton = styled.button`
    display: block;
    color: black;
    padding: 10px 20px 10px 20px;
    font-size: 13px
`