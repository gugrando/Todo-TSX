type Props = {
    children?: React.ReactNode
}
export const Modal = ({children}: Props) => {

    const closeModal = (e: React.MouseEvent): void => {
        const modal = document.querySelector('#modal');
        modal?.classList.add('hide');
    }

    return ( 
        <div id="modal" className="hide">
            <div onClick={closeModal} className="backdrop-blur-sm w-full h-screen absolute top-0 left-0 bg-white/30"></div>
            <div className="absolute top-[20%] left-0 right-0 mx-auto w-[500px] h-[400px] z-10 bg-white flex flex-col justify-center text-center">
                <h2></h2>
                {children}
            </div>
        </div>
    );
}