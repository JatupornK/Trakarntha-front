export default function ButtonSubmitForm ({text,cName}) {
    return (
        <button type="submit" className={cName}>{text}</button>
    )
}