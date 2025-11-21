type CTAbuttonProps = {
    btnName: string;
    className?: string;
    onClick: ()=>void
}

const CTAbuttons = ({btnName, className, onClick} : CTAbuttonProps) => {
  return (
    <button className={`${className} text-center py-3 px-5 shadow-sm rounded-xl hover:opacity-80 cursor-pointer hover:transition-all hover:duration-200` } onClick={onClick}>{btnName}</button>
  )
}

export default CTAbuttons