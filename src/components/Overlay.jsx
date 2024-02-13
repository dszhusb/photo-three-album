import { OverlayContainer, OverlayButton } from './OverlayStyles'
import { useRouter } from 'next/navigation'

export function Overlay() {
    const router = useRouter()
    return (
        <OverlayContainer>
            <OverlayButton onClick={() => router.back()}>Back</OverlayButton>
            <OverlayButton onClick={() => router.push('/')}>About</OverlayButton>
            <OverlayButton onClick={() => router.push('/Machine')}>Machine</OverlayButton>
        </OverlayContainer>
    )
}