import { OverlayContainer, OverlayButton } from './OverlayStyles'

export function Overlay({ setScene }) {
    return (
        <>
            <OverlayContainer>
                <OverlayButton onClick={() => setScene({name: 'gacha'})}>Gacha</OverlayButton>
                <OverlayButton onClick={() => setScene({name: 'collection'})}>Collection</OverlayButton>
                <OverlayButton onClick={() => setScene({name: 'collection'})}>Individual</OverlayButton>
            </OverlayContainer>
        </>
    )
}