"use client"
import { useStore } from '@/store/zustand'
import { Overlay } from '@/components/Overlay'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Page() {
    const { setUrlList } = useStore()
    const urlList = ['/victoria/1.JPG', '/victoria/2.JPG', '/victoria/3.JPG', '/victoria/4.JPG', '/victoria/5.JPG', '/victoria/6.JPG', '/victoria/7.jpg', '/victoria/8.jpg', '/victoria/9.jpg', '/victoria/10.jpg', '/victoria/11.jpg', '/victoria/12.jpg']
    const router = useRouter()
    const c = "#e04e43"

    function handleSubmit() {
        console.log('click')
        setUrlList(urlList)
        router.push('/Machine')
    }

    return (
        <div style={{ position: 'relative', textAlign: 'center', width: '100vw', height: '100vh', margin: 0, backgroundColor: c, overflow: 'hidden'}}>
            <Images urlList={urlList} />
            <h1 style={{
                position: 'absolute',
                fontSize: '10rem',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#f59c02'
            }} onClick={() => handleSubmit()}>
                Happy Valentines
                Day Bub!
            </h1>
            <Overlay />
        </div>
    )
}

function Images({ urlList }) {
    return (
        <>
            <Image
                style={{ position: 'absolute', top: '10%', left: '20%' }}
                src={urlList[0]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '50%', left: '30%' }}
                src={urlList[1]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '40%', left: '80%' }}
                src={urlList[2]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '20%', left: '70%' }}
                src={urlList[3]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '60%', left: '-10%' }}
                src={urlList[4]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '-30%', left: '45%' }}
                src={urlList[5]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '80%', left: '50%' }}
                src={urlList[6]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '-25%', left: '90%' }}
                src={urlList[7]}
                width={'300'}
                height={'400'}
                alt="v"
            />
            <Image
                style={{ position: 'absolute', top: '-10%', left: '-10%' }}
                src={urlList[8]}
                width={'300'}
                height={'400'}
                alt="v"
            />
        </>
    )
}