'use client'
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import logo from '/public/pedrologo.png';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})


export default function Page() {
    const readyStyle =`text-2xl flex flex-row justify-evenly gap-5 mx-auto w-6/12 lg:w-4/12 border-2 rounded-2xl shadow-2xl dark:shadow-xl
    transition duration-300 ease-out hover:scale-105 p-3 bg-[--primary] border-[--primary] `

    const notReadyStyle =`text-2xl flex flex-row justify-evenly gap-5 mx-auto w-6/12 lg:w-4/12 rounded-2xl shadow-2xl dark:shadow-xl
     p-3 bg-[grey] `

    const [file, setFile] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [ready, setReady] = useState(true);
    const [spinner, setSpinner] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setFile(file);
          setImageUrl(URL.createObjectURL(file));
          setReady(!ready);
        }
    };

    const displayInfo = (e: any) => {
        toast('Insert a png image, preferably square and without background. Note: no image you upload will be saved or collected in any way.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
                backgroundColor: '#333',
                color: '#fff'
            }
        });
    };

    return (
        <>
        { !spinner ? (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
        </head>
        <body>
        <main className={`${roboto.className} lg:flex-row flex-col justify-between  `}>
            <ToastContainer />
            <h1 className="lg:w-full flex justify-center py-6 my-auto mx-auto ">
                <Image 
                    src={logo} 
                    alt="Pedro the Raccoon"
                    width={500}
                    height={300}
                    className="lg:w-auto w-full"
                />
            </h1>
            <div className="flex flex-col justify-center gap-20 h-full w-full rounded-xl shadow-2xl bg-[--background-contrast]  ">
                <form className=" bg-[--primary] lg:w-1/2 flex mx-auto flex-col gap-5 rounded-xl p-4 shadow-2xl " >
                    <label className="text-sky-950 dark:text-sky-50 text-xl font-medium text-center">
                        Select an image <span className='cursor-pointer' onClick={displayInfo} >ⓘ</span>
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept=".png"
                        className="bg-[--background-input] rounded-lg p-2 text-left cursor-pointer"
                        onChange={handleFileChange}
                    />
                </form>
                <button className={ready? notReadyStyle : readyStyle} disabled={ready} onClick={(e) => setSpinner(!spinner)}>
                    Start spinner <i className=" text-[--text-button] my-10 fa-solid fa-sync fa-2xl"></i>
                </button>
            </div>
        </main>
        </body>
        </html>
        ) : (
            <html lang="en">
            <body className="bg-[#161616] m-0 h-[100dvh] grid place-content-center">
                <div className="bg-[#f5dad8] rounded-full overflow-hidden w-48 aspect-square animate-rotate" >
                    <img src={imageUrl} alt="Your personal spinner" className="block w-full animate-bounceAlt" />
                </div>

                <audio autoPlay={true} loop={true}>
                    <source src="audio.mp3" type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>

                <div className="absolute top-4 right-4 h-50 ">
                    <button onClick={(e) => {setSpinner(!spinner); setReady(!ready)}} className='p-3 bg-[grey] rounded-10'>
                        Back
                    </button>
                </div>
            </body>
            </html>
            )
        }
        </>
    )
}