import { OverlayContainer, OverlayButton, LinksContainer, LogoLink } from './OverlayStyles'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function Overlay({ back = true }) {
    const router = useRouter()
    return (
        <div>
            <OverlayContainer>
                {back &&
                    <OverlayButton onClick={() => router.back()}>
                        <Image src='/arrow.svg' alt='Back' width={15} height={15}
                            style={{ top: '50%' }} />
                    </OverlayButton>
                }
                <OverlayButton onClick={() => router.push('/')}>ABOUT</OverlayButton>
                <OverlayButton onClick={() => router.push('/Machine')}>MACHINE</OverlayButton>
            </OverlayContainer>
            <LinksContainer>
                <LogoLink href='https://dszhusd.vercel.app' target="_blank">
                    <Image priority={true} src='/site-logo.svg' alt='Daniel Zhu' width={32} height={40} />
                </LogoLink>
                <LogoLink href='https://github.com/dszhusb/photo-three-album' target="_blank">
                    <Image src='/github-mark.svg' alt='github' width={40} height={40} />
                </LogoLink>
            </LinksContainer>
        </div>
    )
}