export default function ButtonSubmitForm ({text,cName, onClick}) {
    return (
        <button onClick={onClick} className={cName}>{text}</button>
    )
}