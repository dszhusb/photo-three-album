"use client"
import { useStore } from '@/store/zustand'
import { Overlay } from '@/components/Overlay'
import { useRouter } from 'next/navigation'

export default function Page() {
    const { setUrlList } = useStore()
    const urlList = ['/victoria/1.JPG', '/victoria/2.JPG', '/victoria/3.JPG', '/victoria/4.JPG', '/victoria/5.JPG', '/victoria/6.JPG', '/victoria/7.jpg', '/victoria/8.jpg', '/victoria/9.jpg', '/victoria/10.jpg', '/victoria/11.jpg', '/victoria/12.jpg']
    const router = useRouter()

    function handleSubmit() {
        setUrlList(urlList)
        router.push('/Collection')
    }

    return (
        <>
            <div onClick={() => handleSubmit()}>LOL</div>
            <Overlay />
        </>
    )
}