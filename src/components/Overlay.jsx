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
                        <Image src='/arrow.svg' alt='Back' width={20} height={20}
                            style={{ top: '50%' }} />
                    </OverlayButton>
                }
                <OverlayButton onClick={() => router.push('/')}>About</OverlayButton>
                <OverlayButton onClick={() => router.push('/Machine')}>Machine</OverlayButton>
            </OverlayContainer>
            <LinksContainer>
                <LogoLink href='https://dszhusd.vercel.app' target="_blank">
                    <Image priority={true} src='/site-logo.svg' alt='Daniel Zhu' width={38} height={50} />
                </LogoLink>
                <LogoLink href='https://github.com/dszhusb/photo-three-album' target="_blank">
                    <Image style={{ marginTop: 5 }} src='/github-mark.svg' alt='github' width={40} height={40} />
                </LogoLink>
            </LinksContainer>
        </div>
    )
}